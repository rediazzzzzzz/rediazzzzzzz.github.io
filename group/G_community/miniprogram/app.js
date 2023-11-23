// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }

    this.globalData = {
      my_user:{
        user:{
          head:"/images/流汗.jpg",
          myname:"盲点好",
          mycredit:100,
        },
        search_history:["梳子","橘子","卷子"],
        post:[
          {
            time:"2023/11/22 12:03",
            title:"开罗全新游戏即将发售",
            content:"和哆啦A梦联动！！！！！谁买了借我玩凸(>皿<)凸~~~~~~",
            img:[
              "/images/game2.jpg",
              "/images/k1.jpg",
              "/images/k2.jpg",
            ],
            tag:["开罗游戏","kairosoft"],
            zan:{
              num:120,
              flag:false,
              img:"/icons/zan0.png"
            },
            cmt:[
              {
                head:"/images/糖果.jpg",
                name:"糖糖堂",
                content:"不错不错",
                time:"2023/11/22 12：06",
              },
            ],
          },
          {
            time:"2023/11/20 20:33",
            title:"新买的猫猫吐司^^",
            content:"你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了你怎么知道我有猫了",
            img:[
              "/images/mi1.jpg",
              "/images/mi2.jpg",
              "/images/mi3.jpg",
              "/images/mi4.jpg"
            ],
            tag:["猫咪","猫猫","猫","pussy"],
            zan:{
              num:999,
              flag:true,
              img:"/icons/zan2.png"
            },
            cmt:[
              {
                head:"/images/mao.jpg",
                name:"我是猫",
                content:"这吐司不是我刚生的吗快还给我~",
                time:"2023/11/20 20：34",
              },
              {
                head:"/images/石矶.jpg",
                name:"石矶娘娘",
                content:"小猫咪躲在吐司里面就是想要我亲亲啦！",
                time:"2023/11/20 20：45",
              },
              {
                head:"/images/帽子.jpg",
                name:"帽帽",
                content:"猫猫说她想来35号楼",
                time:"2023/11/20 20：49",
              },
            ],
          },
        ]
      },
      timing:""
    };
  },
  ask_time()  //求当前时间，形式为 系统的时间显示形式，如xxxx/xx/xx xx:xx
  {
    return new Date().toLocaleDateString() + ' ' + new Date().toTimeString().substring(0,5)
  }
});
