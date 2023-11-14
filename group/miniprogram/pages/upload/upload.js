// pages/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      Ptitle:'',
      Pcontent:'',
      Pimg:[],
      my_user:{
        user:{},
        post:[],

      },
      time_now:"2023/11/14 16:09",
  },

  toPost(e)
  {
    var time = new Date().toLocaleDateString() + ' ' + new Date().toTimeString().substring(0,5)
    this.setData({
      Ptitle : e.detail.value.post_title,
      Pcontent : e.detail.value.post_content,
      time_now:time
    });

    this.data.my_user.post.push({time:this.data.time_now,title:this.data.Ptitle,content:this.data.Pcontent,img:this.data.Pimg,tag:[],cmt:[],})
    this.setData({
      [`my_user.post`]:this.data.my_user.post,
    })
    const app = getApp()
    app.globalData.my_user.post = this.data.my_user.post

    console.log("to post:\n")
    console.log("title:\n")
    console.log(this.data.Ptitle)
    console.log("content:\n")
    console.log(this.data.Pcontent)
    console.log("my new post list:\n")
    console.log(app.globalData.my_user.post)
    //向后端发送请求更新帖子数据：

    //发布完毕后自动回到“我的帖子”页面以方便查看
    wx.redirectTo({
      url: '/pages/my_card/my_card',
    })
  },
  onLoad:function(options)
  {
    const app = getApp();
    var time = new Date().toLocaleDateString() + ' ' + new Date().toTimeString().substring(0,5)
    this.setData({
      my_user:app.globalData.my_user,
      time_now:time,
    })

    console.log("upload receive options:\n")
    console.log("get my user:\n")
    console.log(this.data.my_user)
    console.log("get time now:\n")
    console.log(this.data.time_now)
  }
})