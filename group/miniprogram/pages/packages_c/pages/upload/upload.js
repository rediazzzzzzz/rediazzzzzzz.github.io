// pages/upload/upload.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      Ptitle:'',
      Pcontent:'',
      Pimg:[],
      Ptag:[],
      my_user:{
        user:{},
        post:[],

      },
      time_now:"2023/11/14 16:09",
  },

  //添加图片
  add_img(e)
  {
    console.log("请求上传图片")
    var that = this
    wx.chooseMedia({
      count: 1,       //一次只能上传一张，可多次上传
      mediaType: ['image','video'],     //实际测试视频无法上传？
      sourceType: ['album', 'camera'],    
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res)
        console.log("选择图片：",res.tempFiles[0].tempFilePath)
        var imgs = that.data.Pimg
        imgs.unshift(res.tempFiles[0].tempFilePath)
        that.setData({
          Pimg:imgs
        })
      }
    })
  },

  toPost(e)
  {
    if(e.detail.value.post_title.length<5||e.detail.value.post_title.trim()=='')  //标题不能为空
      {
        wx.showToast({
        icon:"none",
        title: '标题不少于5个字(ﾟДﾟ)ﾉ',
        })
        console.log("标题为空")
        return;
      } 
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定发送٩(๑òωó๑)۶',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            title: '(=_=)zzz...',
          })
          var time = app.ask_time()
          that.setData({
            Ptitle : e.detail.value.post_title,
            Pcontent : e.detail.value.post_content,
            time_now:time,
            Ptag:e.detail.value.post_tag.split('#').filter(item => item !== ''),
          });
      
          that.data.my_user.post.push({time:that.data.time_now,title:that.data.Ptitle,content:that.data.Pcontent,img:that.data.Pimg,tag:that.data.Ptag,cmt:[],zan:{num:0,flag:false,img:"/icons/zan0.png"}})
          that.setData({
            [`my_user.post`]:that.data.my_user.post,
          })
          
          app.globalData.my_user.post = that.data.my_user.post
      
          console.log("to post:\n")
          console.log("title:\n")
          console.log(that.data.Ptitle)
          console.log("content:\n")
          console.log(that.data.Pcontent)
          console.log("my new post list:\n")
          console.log(app.globalData.my_user.post)
          //向后端发送请求更新帖子数据：
          
          wx.hideLoading()
          //发布完毕后自动回到“我的帖子”页面以方便查看
          wx.reLaunch({
            url: '/pages/packages_c/pages/my_card/my_card',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  onLoad:function(options)
  {
    var time = app.ask_time()
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