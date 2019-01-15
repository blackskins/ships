// index_package/pages/goods_detail/goods_detail.js
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollList: [{
      imgUrl: '/images/banner.png'
    },
    {
      imgUrl: '/images/banner.png'
    },
    {
      imgUrl: '/images/banner.png'
    },
    {
      imgUrl: '/images/banner.png'
    },
    {
      imgUrl: '/images/banner.png'
    },
    ],
    phoneNumber: '13684519757',
    collectStatus: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 收藏详情
  collect() {
    if (this.data.collectStatus == true) {
      this.setData({
        collectStatus: false
      }, () => {
        $.prompt('收藏成功')
      })
    }
  },
  //打电话 询价
  phoneCall() {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.phoneNumber,
      success: () => {
        console.log('成功了')
      },
      fail: () => {
        console.log('失败了')
      }
    })
  }
})