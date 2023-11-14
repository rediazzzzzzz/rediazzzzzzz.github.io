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
          my_obj:[
            {
              intro:"111",
              image:"/images/橘子.jpg",
            },
            {
              intro:"222",
              image:"/images/帽子.jpg",
            },
            {
              intro:"333",
              image:"/images/吃.jpg",
            }
          ],
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
            cmt:[
              {
                head:"/images/糖果.jpg",
                name:"糖糖堂",
                content:"不错不错",
                time:"2023/11/14 15：19",
              },
            ],
          },
        ]
      },
    };
  }
});
