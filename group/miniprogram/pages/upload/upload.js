// pages/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      Ptitle:'',
      Pcontent:'',
      Pimg:[],
  },

  toPost(e)
  {
    this.setData({
      Ptitle : e.detail.value.post_title,
      Pcontent : e.detail.value.post_content,
      Pimg:e.detail.value.post_img,
    });
  },
})