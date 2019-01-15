// profile_package/pages/business_join/business_join.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 跳转到我的审核
  toMyCheck(){
    wx.navigateTo({
      url: '../../../join_package/pages/my_check/my_check',
    })
  }
})