Page({

    /**
     * 页面的初始数据
     */
    data: {
      //当前导航索引
      currentIndexNav:0,
      //底部导航索引
      bt_index:0,
      //浏览区帖子信息
      scan_list:[],
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
      wx.redirectTo({
        url: '/pages/recommend/recommend',
      })
    },


  //分区2-浏览区

    //进入个人主页
    click_home()
    {
      console.log("点击个人主页")
      wx.navigateTo({
        url:'/pages/home/home'
      })
    },

    //进入帖子详情
    click_detail()
    {
      console.log("点击帖子详情")
      wx.navigateTo({
        url:'/pages/detail/detail'
      })
    },

    //点赞
    zan(e)
    {
      console.log("点赞");
    },

    //评论
    comment(e)
    {
      console.log("评论");
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
      }
      if(e.currentTarget.dataset.id==2)
      {
        console.log("点击我的")
        wx.redirectTo({
          url: '/pages/my/my',
        })
      }
    },

    //获取帖子信息
    get_scan_list()
    {
      wx.request({
        url:"",
        data:{},
        success(res)
        {
          if(res.statusCode == 200) {
            console.log(res)//请求成功后的res
            this.setData({
              scan_list:res.data.scan_list
            })
          } 
          else {
            console.error('保存到后端失败:', res);
          }
        }
      })
    },

    onLoad:function(options){
      //获取帖子数据
      this.get_scan_list();
    },
  })