// profile_package/pages/beVip/beVip.js
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMask: false ,
    opacity: 0,
    animate: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  // 成为会员
  beVip(){
    this.setData({
      showMask: true,
      opacity: 1,
      animate: 'animate .3s'
    })
  },

  // 禁止弹窗蒙层下可滑动
  stopMove() {
    return false
  },
  // 确认成为会员
  confirm() {
    this.setData({
      animate:'back .5s',
      opacity:0
    }, () => {
      setTimeout(()=>{
        this.setData({
          showMask: false,
        })
        // $.prompt('跳转页面')
        wx.navigateTo({
          url: '../vip_pay/vip_pay',
        })
      },300)
    })
  },
  // 取消
  cancelDel() {
    this.setData({
      animate:'back .5s',
      opacity:0
    },()=>{
      setTimeout(()=>{
        this.setData({
          showMask: false
        })
      },300)
    })
  },
})