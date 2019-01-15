// shopManage_package/pages/slider_img/slider_img.js
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMask: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 禁止弹窗蒙层下可滑动
  stopMove() {
    return false
  },
  // 删除图片
  del() {
    this.setData({
      showMask: true
    })
  },
  // 确认删除
  confirm() {
    this.setData({
      showMask: false
    }, () => {
      $.prompt('移除成功')
    })
  },
  // 取消删除图片
  cancelDel() {
    this.setData({
      showMask: false
    })
  },
})