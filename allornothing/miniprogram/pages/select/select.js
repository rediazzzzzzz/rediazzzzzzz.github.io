// pages/select/select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 3,
    money: 100,
  },

  local:function()
  {
    wx.navigateTo({
      url: '/pages/local/local'+'?count='+this.data.count+'&money='+this.data.money,
    })
  },
  ai:function()
  {
    wx.navigateTo({
      url: '/pages/ai/ai'+'?count='+this.data.count+'&money='+this.data.money,
    })
  },
  online:function()
  {
    wx.navigateTo({
      url: '/pages/online/online'+'?count='+this.data.count+'&money='+this.data.money,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    that.setData({
      count:options.count,
      money:options.money,
    })
    console.log("select "+that.data.count)
    console.log("select "+that.data.money)
  },

  
})