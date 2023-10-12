// pages/local/local.js
Page({

  /**
   * 页面的初始数据
   *//*定义数据时要赋初值不然无法使用*/
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
      myname: "秃克",
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
  //修改倍率
  bindRateChange:function(e) {
    var id = e.currentTarget.dataset.user
    if(id == 1)
    {
        var newdata = Number(e.detail.value) +this.data.user_d1.myrates
        this.setData({
          'user_d1.myrates':newdata
        })
    }
    else
    {
      var newdata = Number(e.detail.value) +this.data.user_d2.myrates
      this.setData({
        'user_d2.myrates':newdata
      })
    }
    //修改总倍率，采用相加的形式
    var newrates = this.data.user_d1.myrates+this.data.user_d2.myrates
    this.setData({
      'rates_total':newrates
    })
  },

  //判断牌型的函数
  isBigStraight(arr) {
    // 判断是否为大顺子
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] !== (arr[i + 1]-1)) {
        return false;
      }
    }
    return true;
  },

  isSmallStraight(arr) {
    // 判断是否为小顺子
    for (let i = 0; i < arr.length -1; i++) {
      if (arr[i] !== (arr[i + 1]-1)&&arr[i] !== (arr[i + 1]-2)) {
        return false;
      }
    }
    return true;
  },

  isFullHouse(arr) {
    // 判断是否为葫芦
    // 统计每个牌面出现的次数
    const counts = {};
    for (let i = 0; i < arr.length; i++) {
      const card = arr[i];
      if (!counts[card]) {
        counts[card] = 1;
      } else {
        counts[card]++;
      }
    }
    // 判断是否有三张一样的牌和两张一样的牌
    const threeOfAKindCount = Object.values(counts).filter(count => count === 3).length;
    const twoOfAKindCount = Object.values(counts).filter(count => count === 2).length;
    return threeOfAKindCount == 1 && twoOfAKindCount == 1;
  },

  isFourOfAKind(arr) {
    // 判断是否为四连
    var counts=[0,0,0,0,0,0,0];
    for(var i=0;i<arr.length;i++)
    {
      counts[arr[i]]++;
      if(counts[arr[i]] == 4)
        return true;
    }
    return false;
  },

  isFiveOfAKind(arr) {
    // 判断是否为五连
    var counts=[0,0,0,0,0,0,0];
    for(var i=0;i<arr.length;i++)
    {
      counts[arr[i]]++;
      if(counts[arr[i]] == 5)
        return true;
    }
    return false;
  },

  isDoublePair(arr) {
    // 判断是否为双对
    const counts = {};
    for (let i = 0; i < arr.length; i++) {
      const card = arr[i];
      if (!counts[card]) {
        counts[card] = 1;
      } else {
        counts[card]++;
      }
    }
    // 判断是否有两张一样的牌和另外三张不一样的牌
    const twoOfAKindCount = Object.values(counts).filter(count => count === 2).length;
    return twoOfAKindCount == 2;
  },

  isThreeOfAKind(arr) {
    // 判断是否为三连
    var counts=[0,0,0,0,0,0,0];
    for(var i=0;i<arr.length;i++)
    {
      counts[arr[i]]++;
      if(counts[arr[i]] == 3)
        return true;
    }
    return false;
  },

  judge_type(arr)
  {
    if(this.isFullHouse(arr))
    {
        var type_dice = "葫芦"
        console.log("葫芦")
    }
    else if(this.isBigStraight(arr))
    {
        var type_dice = "大顺子"
        console.log("大顺子")
    }
    else if(this.isSmallStraight(arr))
    {
        var type_dice = "小顺子"
        console.log("小顺子")
    }
    else if(this.isFiveOfAKind(arr))
    {
        var type_dice = "五连"
        console.log("五连")
    }
    else if(this.isFourOfAKind(arr))
    {
       var type_dice = "四连"
       console.log("四连")
    }
    else if(this.isDoublePair(arr))
    {
      var type_dice = "双对"
      console.log("双对")
    }
    else if(this.isThreeOfAKind(arr))
    {
      var type_dice = "三连"
      console.log("三连")
    }
    else
    {
      var type_dice = "none"
    }
    return type_dice
  },

  click_select:function(e)  //选定骰子
  {
      var i=e.currentTarget.dataset.id1
      var j=e.currentTarget.dataset.id2
      var rep=`unactive_dice[${i}][${j}]`
      this.setData({    //将对应的骰子设为选定
          [rep]:true
      })
      var z = Number(j)+1
      if(i==0)   //第一个用户
      {
        var dice_dot = this.data.user_d1.mydices[j]
        console.log("正在选定用户1第 "+z+" 个的骰子")
      }
      else
      {
        var dice_dot = this.data.user_d2.mydices[j]
        console.log("正在选定用户2第 "+z+" 个的骰子")
      }
      console.log("该骰子的点数为："+dice_dot)
      var newdice_src = this.data.image_source_blue[dice_dot-1]   //替换骰子外观
      console.log("该骰子的新外观为："+newdice_src)
      this.setData({
        [`image_source[${i}][${z}]`]:newdice_src
      })
  },

  roll_dice_1:function(){
    console.log("Round:"+this.data.round_now+"-"+this.data.times_now)

    var newtimes = this.data.times_now + 1
    var newround = this.data.round_now
    if(newtimes > 3)
    {
      newtimes -= 3
      newround += 1
    }
    this.setData({
      round_now:newround,
      times_now:newtimes
    })
    console.log("Round:"+this.data.round_now+"-"+this.data.times_now)
    //选择倍率
    //到第三次投掷完毕计分
    if(this.data.times_now === 1 && this.data.round_now > 1 )
    {
      var score1 = this.data.user_d1.mydots + this.data.type_score[this.data.user_d1.mytypes]
      this.setData({
        //user_d1:{...this.data.user_d1,myscore:score1}
        'user_d1.myscore':score1
      })
      var score2 = this.data.user_d2.mydots + this.data.type_score[this.data.user_d2.mytypes]
      this.setData({
        'user_d2.myscore':score2
      })
      console.log("d1.score:"+this.data.user_d1.myscore)
      console.log("d2.score:"+this.data.user_d2.myscore)
      //分数最高的玩家从所有其它玩家手里赢得（二人分差的绝对值）*（总倍率）的筹码。
      var newscore = Math.abs(score1-score2)
      var newmoney = newscore*this.data.rates_total
      if(this.data.user_d1.myscore>this.data.user_d2.myscore)
      {
        var money1 = Number(this.data.user_d1.mymoney)+Number(newmoney)
        var money2 = Number(this.data.user_d2.mymoney)-Number(newmoney)
        this.setData({
          'user_d1.mymoney':money1,
          'user_d2.mymoney':money2,
        })
      }
      else
      {
        var money1 = Number(this.data.user_d2.mymoney)+Number(newmoney)
        var money2 = Number(this.data.user_d1.mymoney)-Number(newmoney)
        this.setData({
          'user_d2.mymoney':money1,
          'user_d1.mymoney':money2,
        })
      }
      //筹码小于0全部 击飞
      if(this.data.user_d1.mymoney < 0 ||this.data.user_d2.mymoney < 0)
      {
        wx.showModal({
          title: '失败',
          content: '筹码小于0，您已被击飞！',
          success (res) {
            if (res.confirm) {
              wx.reLaunch({
                url: '/pages/index/index'
              })
            }
            
            else if (res.cancel) {
              wx.reLaunch({
                url: '/pages/index/index'
              })
            }       
           }
        })
      }
    }
    //新的一轮取消选定
    if(this.data.times_now === 1 && this.data.round_now > 1 )
    {
      for(var i =0;i<2;i++)
      {
        for(var j =0;j<5;j++)
        {
          if(this.data.unactive_dice[i][j] === true)
          {
            //改变骰子外观，先获取点数
            if(i === 0)
            {
              var newdot = this.data.user_d1.mydices[j]
            }
            else
            {
              var newdot = this.data.user_d2.mydices[j]
            }
            var d = Number(newdot) - 1
            var new_src = this.data.image_source_pink[d]
            //替换外观
            this.setData({
              [`image_source[${i}][${j+1}]`]:new_src
            })
          }
        }
        
      }
      //unactive_dice全部赋值为假
      this.setData({
        'unactive_dice':[[false,false,false,false,false],[false,false,false,false,false]],
      })
      console.log("新局全部取消选定")
      console.log(this.data.unactive_dice)
    }
    //终局
    if(this.data.times_now+(this.data.round_now-1)*3 > this.data.count*3)   
    {
      console.log("终局")
      console.log("win_name "+this.data.win_name)
      if(this.data.user_d1.mymoney > this.data.user_d2.mymoney)
      {
        //var win_name = this.data.user_d1.myname
        this.setData({
          'win_name':this.data.user_d1.myname
        })
      }
      else 
      {
        //var win_name = this.data.user_d2.myname
        this.setData({
          'win_name':this.data.user_d2.myname
        })
      }
      console.log("winner is "+this.data.win_name)

      //将数据存储,存储内容为{name:,score:},如果name不存在，加一条，否则修改对应的数据
      var app=getApp()
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          // const { nickName, avatarUrl } = res.userInfo;
          this.setData({
             userInfo: res.userInfo,
          })
        }
      })
      
      rank=app.data_ranking.ranking
      const { avatarUrl, nickName } = this.data.userInfo;
      // let arrSome =  app.data_ranking.ranking.some(item =>{
      //   return  name==nickName
      // })
      for(var k=0;k<rank.length;k++){
        if(rank[k].name==nickName){
          
        }
      }

      



      var pname = this.data.win_name
      wx.showModal({
        title: '游戏结束',
        content: 'winner is '+this.data.win_name,
        success (res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '/pages/congradulations/congradulations?winner='+pname,
            })
          }
          else if (res.cancel) {
            wx.reLaunch({
              url: '/pages/congradulations/congradulations?winner='+pname,
            })
          }       
         }
      })
    }



    var arr = Array.from({length: 5}, () => Math.floor(Math.random() * 6) + 1);   //投掷五个骰子
    console.log(arr)
    //选定-不改变
    for(var k=0;k<arr.length;k++)
    {
      //console.log(this.data.user_d1.mydices)
      //console.log("unactive_dice"+k+":  "+this.data.unactive_dice[0][k])
      //console.log("骰子"+k+":  "+this.data.user_d1.mydices[k]);
      if(this.data.unactive_dice[0][k] === false)   //骰子未被选定
      {
        let keyy = `user_d1.mydices[${k}]`;
        this.setData({
          [keyy]:arr[k]
        })
        console.log("更新骰子"+k+":  "+this.data.user_d1.mydices[k]);
      }
      else{
        //console.log("arr["+k+"]:   "+arr[k])
        arr[k] = this.data.user_d1.mydices[k]
        //console.log("更新arr["+k+"]:   "+arr[k])
      }
      console.log("骰子现点数"+k+":  "+this.data.user_d1.mydices[k]);
    }
    
    console.log("user_d1 newdices: "+this.data.user_d1.mydices);
    var newdots = 0
    for (var i = 0; i < arr.length; i++) {
      var newdice_src = this.data.image_source_pink[arr[i]-1]
      newdots += arr[i]     //记录点数
      var j = i + 1
      if(this.data.unactive_dice[0][i] === false)
      {
        this.setData({
        [`image_source[${0}][${j}]`]:newdice_src    //替换骰子外观
        })
      }
      
    }
    //更新牌型判断
    //排序
    arr.sort(function(a, b) {
      return a - b;
    });
    console.log("排序后："+arr)
    var newtype = this.judge_type(arr)
    console.log("判断牌型1："+newtype)
    this.setData({
      //user_d1:{mydots:newdots,mytypes:newtype}    //更新点数和牌型
      'user_d1.mydots':newdots,
      'user_d1.mytypes':newtype,
    })
    console.log("更新牌型1："+this.data.user_d1.mytypes)
    
  },

  roll_dice_2:function(){
    console.log("Round:"+this.data.round_now+"-"+this.data.times_now)
    const arr = Array.from({length: 5}, () => Math.floor(Math.random() * 6) + 1);   //投掷五个骰子
    console.log(arr);
    //选定-不改变
    for(var k=0;k<arr.length;k++)
    {
      //console.log(this.data.user_d2.mydices)
      console.log("unactive_dice"+k+":  "+this.data.unactive_dice[1][k])
      //console.log("骰子"+k+":  "+this.data.user_d2.mydices[k]);
      if(this.data.unactive_dice[1][k] === false)   //骰子未被选定
      {
        let keyt = `user_d2.mydices[${k}]`;
        this.setData({
          [keyt]:arr[k]
        })
        console.log("更新骰子"+k+":  "+this.data.user_d2.mydices[k]);
      }
      else{
        //console.log("arr["+k+"]:   "+arr[k])
        arr[k] = this.data.user_d2.mydices[k]
        //console.log("更新arr["+k+"]:   "+arr[k])
      }
      console.log("骰子现点数"+k+":  "+this.data.user_d2.mydices[k]);
    }
    console.log("user_d2 newdices: "+this.data.user_d2.mydices);    //更新骰子数据
    var newdots = 0
    for (var i = 0; i < arr.length; i++) {
      var newdice_src = this.data.image_source_pink[arr[i]-1]
      newdots += arr[i]     //记录点数
      var j = Number(i) + 1
      if(this.data.unactive_dice[1][i] === false)
      {
        this.setData({
        [`image_source[${1}][${j}]`]:newdice_src    //替换骰子外观
        })
      }
    }
    //更新牌型判断
    //排序
    arr.sort(function(a, b) {
      return a - b;
    });
    console.log("排序后："+arr)
    var newtype = this.judge_type(arr)
    console.log("判断牌型2："+newtype)
    this.setData({
      //user_d2:{mydots:newdots,mytypes:newtype}    //更新点数和牌型
      'user_d2.mydots':newdots,
      'user_d2.mytypes':newtype,
    })
    console.log("更新牌型2："+this.data.user_d2.mytypes)
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    /*setData执行结束之后赋值才成功*/
    that.setData({
      count:options.count,
      money:options.money,
      user_d1:{mydices:[1,1,1,1,1],mydots:5,mytypes:"五连",myrates:1,mymoney:options.money,myscore:0,myname:"tuk"},
      user_d2:{mydices:[1,1,1,1,1],mydots:5,mytypes:"五连",myrates:1,mymoney:options.money,myscore:0,myname:"秃克"} 
    })
    console.log(this.data.user_d1)
    console.log(this.data.user_d2)
    console.log("local "+this.data.count)
    console.log("local "+this.data.money)
  },
})
