// profile_package/pages/shop_manage/shop_manage.js
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
  // 跳转相应的页面
  toUrl(e){
    var url = e.currentTarget.dataset.url
    console.log(url)
    wx.navigateTo({
      url: url,
    })
  }
})