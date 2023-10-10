// pages/ready/ready.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
       count: 3,
       money: 100,
    },
  
    toSelect:function(e) {
      //console.log(e.detail.value),
      //console.log(this.data.money),
      this.setData({
        count : e.detail.value.count,
        money : e.detail.value.money,
      });
      //console.log(this.data.money),
      wx.navigateTo({
        url: '/pages/select/select?count='+this.data.count+'&money='+this.data.money,
        success: function(res) {
          // 在目标页面中获取传递过来的表单数据
          console.log("send finished")
        }
      })
      
    },
  })