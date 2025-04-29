package com.MRS.recommender

import java.net.InetAddress

import com.mongodb.casbah.commons.MongoDBObject
import com.mongodb.casbah.{MongoClient, MongoClientURI}
import org.apache.spark.SparkConf
import org.apache.spark.sql.{DataFrame, SparkSession}
import org.elasticsearch.action.admin.indices.create.CreateIndexRequest
import org.elasticsearch.action.admin.indices.delete.DeleteIndexRequest
import org.elasticsearch.action.admin.indices.exists.indices.IndicesExistsRequest
import org.elasticsearch.common.settings.Settings
import org.elasticsearch.common.transport.InetSocketTransportAddress
import org.elasticsearch.transport.client.PreBuiltTransportClient

//样例类

/**
 * Movie数据集   ^分割
 *
 260    电影mid   int
 Star Wars: Episode IV - A New Hope (1977)    电影名称name    string
 Princess Leia is captured and held hostage by the evil Imperial forces in    详情描述descri
 121 minutes    时长timelong
 September 21, 2004   发行时间issue
 1977   拍摄时间shoot
 English    语言language
 Action|Adventure|Sci-Fi    类型genres
 Mark Hamill|Harrison Ford|Carrie Fisher|Peter    演员表actors
 George Lucas   导演表directors
 *
 */

case class Movie(mid: Int, name: String, descri: String, timelong: String, issue: String,
                  shoot: String, language: String, genres: String, actors: String, directors: String)

/**
 * Rating数据集
 *
 1,31,2.5,1260759144
 *
 *
 */

case class Rating(uid: Int, mid: Int, score: Double, timestamp: Int)

/**
 * Tag数据集
 *
 * 15,1955,dentist,1193435061
 *
 */

case class Tag(uid: Int, mid: Int, tag: String, timestamp: Int)

//  把mongo和es的配置封装成样例类

/**
 *
 * @param uri MongoDB连接
 * @param db  MongoDB数据库
 */

case class MongoConfig(uri:String, db:String)

/**
 *
 * @param httpHosts  http主机列表，逗号分割
 * @param transportHosts  transport主机列表
 * @param index   需要操作的索引
 * @param clustername   集群名称，默认elasticsearch
 */

case class ESConfig(httpHosts:String, transportHosts:String, index:String, clustername:String)

object DataLoader {

  //  定义常量
  val MOVIE_DATA_PATH = "D:\\TOOLS\\Scala\\Projects\\MRS_02\\recommender\\DataLoader\\src\\main\\resources\\movies.csv"
  val RATING_DATA_PATH = "D:\\TOOLS\\Scala\\Projects\\MRS_02\\recommender\\DataLoader\\src\\main\\resources\\ratings.csv"
  val TAG_DATA_PATH = "D:\\TOOLS\\Scala\\Projects\\MRS_02\\recommender\\DataLoader\\src\\main\\resources\\tags.csv"

  val MONGODB_MOVIE_COLLECTION = "Movie"
  val MONGODB_RATING_COLLECTION = "Rating"
  val MONGODB_TAG_COLLECTION = "Tag"
  val ES_MOVIE_INDEX = "Movie"

  def main(args: Array[String]): Unit = {

    val config = Map(
      "spark.cores" -> "local[*]",
      "mongo.uri" -> "mongodb://localhost:27017/recommender",
      "mongo.db" -> "recommender",
      "es.httpHosts" -> "localhost:9200",
      "es.transportHosts" -> "localhost:9300",
      "es.index" -> "recommender",
      "es.cluster.name" -> "elasticsearch"
    )

    //  创建sparkConf对象
    val sparkConf = new SparkConf().setMaster(config("spark.cores")).setAppName("DataLoader")

    //  创建SparkSession
    val spark = SparkSession.builder().config(sparkConf).getOrCreate()

    import spark.implicits._

    //  加载数据
    val movieRDD = spark.sparkContext.textFile(MOVIE_DATA_PATH)

    val movieDF = movieRDD.map(
      item => {
        val attr = item.split("\\^")
        Movie(attr(0).toInt,attr(1).trim,attr(2).trim,attr(3).trim,attr(4).trim,attr(5).trim,attr(6).trim,attr(7).trim,attr(8).trim,attr(9).trim)
      }
    ).toDF()

    val ratingRDD = spark.sparkContext.textFile(RATING_DATA_PATH)

    val ratingDF = ratingRDD.map(item => {
      val attr = item.split(",")
      Rating(attr(0).toInt,attr(1).toInt,attr(2).toDouble,attr(3).toInt)
    }).toDF()

    val tagRDD = spark.sparkContext.textFile(TAG_DATA_PATH)

    val tagDF = tagRDD.map(item => {
      val attr = item.split(",")
      Tag(attr(0).toInt,attr(1).toInt,attr(2).trim,attr(3).toInt)
    }).toDF()

    //  mongoconfig隐式定义
    implicit val mongoConfig = MongoConfig(config("mongo.uri"),config("mongo.db"))

    //  数据存入mongodb
    storeDataInMongoDB(movieDF,ratingDF,tagDF)

    //  数据预处理   将用户评分信息tag添加到电影信息movie中，加一列string（形式同于‘类别’、‘演员表’，用竖线分隔）

    import org.apache.spark.sql.functions._


    //  根据mid选出所有的tag，聚合
    /**
     * mid,tags
     *
     * tags:  tag1|tag2|tag3...
     */

    val newTag = tagDF.groupBy($"mid")
      .agg( concat_ws( "|", collect_set($"tag") ).as("tags") )
      .select("mid", "tags")

    //  newTag join 到 movie，左外连接
    val movieWithTagsDF = movieDF.join(newTag,Seq("mid"),"left")

    implicit val esConfig = ESConfig(config("es.httpHosts"),config("es.transportHosts"),config("es.index"),config("es.cluster.name"))

    //  数据保存到ES
    storeDataInES(movieWithTagsDF)

    spark.stop()

  }

  def storeDataInMongoDB(movieDF:DataFrame,ratingDF:DataFrame,tagDF:DataFrame)(implicit mongoConfig: MongoConfig): Unit = {
    //  新建一个mongodb的连接
    val mongoClient = MongoClient(MongoClientURI(mongoConfig.uri))

    //  如果mongodb中已有相应的数据库，先删除
    mongoClient(mongoConfig.db)(MONGODB_MOVIE_COLLECTION).dropCollection()
    mongoClient(mongoConfig.db)(MONGODB_RATING_COLLECTION).dropCollection()
    mongoClient(mongoConfig.db)(MONGODB_TAG_COLLECTION).dropCollection()

    //  将DF数据写入对应的mongo表中
    movieDF.write
      .option("uri",mongoConfig.uri)
      .option("collection",MONGODB_MOVIE_COLLECTION)
      .mode("overwrite")
      .format("com.mongodb.spark.sql")
      .save()

    ratingDF.write
      .option("uri",mongoConfig.uri)
      .option("collection",MONGODB_RATING_COLLECTION)
      .mode("overwrite")
      .format("com.mongodb.spark.sql")
      .save()

    tagDF.write
      .option("uri",mongoConfig.uri)
      .option("collection",MONGODB_TAG_COLLECTION)
      .mode("overwrite")
      .format("com.mongodb.spark.sql")
      .save()

    //对数据表建索引
    mongoClient(mongoConfig.db)(MONGODB_MOVIE_COLLECTION).createIndex(MongoDBObject("mid" -> 1))
    mongoClient(mongoConfig.db)(MONGODB_RATING_COLLECTION).createIndex(MongoDBObject("uid" -> 1))
    mongoClient(mongoConfig.db)(MONGODB_RATING_COLLECTION).createIndex(MongoDBObject("mid" -> 1))
    mongoClient(mongoConfig.db)(MONGODB_TAG_COLLECTION).createIndex(MongoDBObject("uid" -> 1))
    mongoClient(mongoConfig.db)(MONGODB_TAG_COLLECTION).createIndex(MongoDBObject("mid" -> 1))

    //关闭 MongoDB 的连接
    mongoClient.close()
  }

  def storeDataInES(movieDF: DataFrame)(implicit esConfig: ESConfig): Unit = {
    //  新建es配置
    val settings: Settings = Settings.builder().put("cluster.name",esConfig.clustername).build()

    //  新建es客户端
    val esClient = new PreBuiltTransportClient(settings)

    //  主机名，端口号 数字
    val REGEX_HOST_PORT = "(.+):(\\d+)".r
    esConfig.transportHosts.split(",").foreach{
      case REGEX_HOST_PORT(host: String,port: String) => {
        esClient.addTransportAddress(new InetSocketTransportAddress( InetAddress.getByName(host),port.toInt ))
      }
    }

    //  清理遗留的数据
    if( esClient.admin().indices().exists( new IndicesExistsRequest(esConfig.index) )
      .actionGet()
      .isExists
    ){
      esClient.admin().indices().delete( new DeleteIndexRequest(esConfig.index) )
    }

    esClient.admin().indices().create( new CreateIndexRequest(esConfig.index) )

    movieDF.write
      .option("es.nodes",esConfig.httpHosts)
      .option("es.http.timeout","100m")
      .option("es.mapping.id","mid")
      .mode("overwrite")
      .format("org.elasticsearch.spark.sql")
      .save(esConfig.index + "/" + ES_MOVIE_INDEX)

  }
}
