// pages/congradulations/congradulations.js

Page({
    data:{
        name:"kkk"
    },
    onLoad(options) {
        var that = this;
        /*setData执行结束之后赋值才成功*/
        that.setData({
          name:options.winner,
        })
        console.log("Congratulations to "+this.data.name+" for winning")
      },
    back:function()
    {
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
})