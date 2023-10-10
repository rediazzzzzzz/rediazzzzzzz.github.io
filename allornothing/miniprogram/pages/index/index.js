// index.js
// const app = getApp()

Page({
  data: {
    hello : "hello world"
  },
  enroll:function(){
    console.log("hello")
  },
  ready:function()
  {
    wx.navigateTo({
      url: '/pages/ready/ready'
    })
  },
  select:function()
  {
    wx.navigateTo({
      url: '/pages/select/select'
    })
  },
  rule:function()
  {
    wx.navigateTo({
      url: '/pages/rule/rule'
    })
  },
  ranking:function()
  {
    wx.navigateTo({
      url: '/pages/ranking/ranking'
    })
  },
});
