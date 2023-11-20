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
          head:"/images/橘子.jpg",
          myname:"tuk",
          mycredit:100,
        },
        search_history:["梳子","橘子","卷子"],
        post:[
          {
            time:"2023/11/14 13:58",
            title:"大四二手出售：这次体验超棒",
            content:"这次从学姐手里买的橘子，简直开阔了我的眼界",
            img:[
              "/images/橘子.jpg",
              "/images/tuk.jpg",
              "/images/gou.jpg",
            ],
            tag:["橘子","眼界"],
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
                time:"2023/11/14 15：19",
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
                time:"2023/11/20 20：24",
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
                content:"吐司里面怎么长猫了这有问题呀快寄过来我看看",
                time:"2023/11/20 20：49",
              },
            ],
          },
        ]
      },
    };
  }
});
