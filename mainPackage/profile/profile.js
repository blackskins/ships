// mainPackage/profile/profile.js
var $ = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipMask: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 成为会员
  beVip(){
    wx.navigateTo({
      url: '../../profile_package/pages/beVip/beVip',
    })
  },
  // 跳转到入驻商家
  toJoinBusiness(){
    wx.navigateTo({
      url: '../../profile_package/pages/business_join/business_join',
    })
  },
  // 跳转到我的发布
  toMyPush(){
    wx.navigateTo({
      url: '../../profile_package/pages/my_push/my_push',
    })
  },
  // 关闭弹窗
  closeTips(){
    this.setData({
      vipMask:false
    })
  },
  // 跳转到我的收藏
  toMyCollect() {
    wx.navigateTo({
      url: '../../profile_package/pages/my_collection/my_collection',
    })
  },
  // 跳转到我的联系
  toMyChat() {
    wx.navigateTo({
      url: '../../profile_package/pages/my_chat/my_chat',
    })
  },
  // 跳转到店铺管理
  toShopManage(){
    wx.navigateTo({
      url: '../../profile_package/pages/shop_manage/shop_manage',
    })
  },
  // 跳转到休闲购物
  toShopping(){
    $.prompt('此功能暂未上线，敬请期待',2500)
  }
})