// pages/recommend/recommend.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
      //当前导航索引
      currentIndexNav:1,
      //底部导航索引
      bt_index:0,
      //搜索关键词
      key_word:'',
    },
  
  //分区1-首部导航
  
    //点击导航
    activeNav(e)
    {
      console.log("点击导航");
      this.setData({
        currentIndexNav:e.target.dataset.index
      })
      console.log(e.target.dataset.index)
      if(this.data.currentIndexNav==0)
      wx.redirectTo({
        url: '/pages/recommend/recommend',
      })
    },
  
  //分区2-搜索区

  //表单数据
  toSearch(e){
      console.log(e.detail.value.info);
      this.setData({
        key_word:e.detail.value.info
      })
  },
  
  //分区3-底部导航
  
    //底部导航
    skip(e)
    {
      console.log( e.currentTarget.dataset.id)
      this.setData({
        bt_index:e.currentTarget.dataset.id
      })
      if(e.currentTarget.dataset.id==0)
      {
        console.log("点击首页")
        wx.redirectTo({
          url: '/pages/index/index',
        })
      }
      if(e.currentTarget.dataset.id==1)
      {
        console.log("点击发帖")
        wx.navigateTo({
          url:'pages/upload/upload',
        })
      }
      if(e.currentTarget.dataset.id==2)
      {
        console.log("点击我的")
        wx.redirectTo({
          url: '/pages/my/my',
        })
      }
    },
  
  
    onLoad:function(options){

    },

})