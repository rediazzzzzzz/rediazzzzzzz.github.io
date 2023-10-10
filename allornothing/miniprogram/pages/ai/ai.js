// pages/ai/ai.js
Page({
  data: {
    win_name:"name",
    count: 3,
    money: 100,
    round_now:1,
    times_now:0,
    rates_total:2,
    unactive_dice:[[false,false,false,false,false],[false,false,false,false,false]],
    true_unactive_dice:[[false,false,false,false,false],[false,false,false,false,false]],
    add:[0,1,2,3],
    index:0,
    image_source:[["../../images/1pink.png","../../images/1pink.png","../../images/1pink.png","../../images/1pink.png","../../images/1pink.png","../../images/1pink.png",],["../../images/1pink.png","../../images/1pink.png","../../images/1pink.png","../../images/1pink.png","../../images/1pink.png","../../images/1pink.png",]],
    image_source_pink:["../../images/1pink.png","../../images/2pink.png","../../images/3pink.png","../../images/4pink.png","../../images/5pink.png","../../images/6pink.png"],
    image_source_blue:["../../images/1blue.png","../../images/2blue.png","../../images/3blue.png","../../images/4blue.png","../../images/5blue.png","../../images/6blue.png"],
    user_d1:{
      myname: "tuk",
      mydices: [1, 2, 3, 4, 5],
      mydots: 5,
      mytypes: "none",
      myrates: 1,
      mymoney: 0,
      myscore:0
    },
    user_d2:{
      myname: "机器人",
      mydices: [1, 2, 3, 4, 5],
      mydots: 5,
      mytypes: "none",
      myrates: 1,
      mymoney: 0,
      myscore:0
    },
    type_score:{
      "双对":10,
      "三连":10,
      "葫芦":20,
      "四连":40,
      "五连":100,
      "小顺子":30,
      "大顺子":60,
      "none":0
    }
  },
  onLoad(options) {
    var that = this;
    /*setData执行结束之后赋值才成功*/
    that.setData({
      count:options.count,
      money:options.money,
      user_d1:{mydices:[1,1,1,1,1],mydots:5,mytypes:"五连",myrates:1,mymoney:options.money,myscore:0,myname:"tuk"},
      user_d2:{mydices:[1,1,1,1,1],mydots:5,mytypes:"五连",myrates:1,mymoney:options.money,myscore:0,myname:"秃克"} 
    })
    console.log("用户数据初始化："+this.data.user_d1)
    console.log("ai数据初始化："+this.data.user_d2)
  }
})