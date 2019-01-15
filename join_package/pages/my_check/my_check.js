// join_package/pages/my_check/my_check.js
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
  // 拨打电话
  phoneCall(){
    wx.makePhoneCall({
      phoneNumber: '15623548653',
    })
  },
  // 查看原因
  checkReason(){
    wx.navigateTo({
      url: '../check_reason/check_reason',
    })
  }
})