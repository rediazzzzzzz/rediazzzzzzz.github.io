Page({

    /**
     * 页面的初始数据
     */
    data: {
      //当前导航索引
      currentIndexNav:0,
    },

    //点击导航
    activeNav(e)
    {
      console.log("点击导航");
      this.setData({
        currentIndexNav:e.target.dataset.index
      })
      console.log( e.target.dataset.index)
    },
  })