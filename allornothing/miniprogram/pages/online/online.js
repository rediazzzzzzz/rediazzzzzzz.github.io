// pages/online/online.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  cancel:function()
  {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }
})