// mainPackage/profile/profile.js
var $ = require('../../utils/common.js')
import { Common } from '../../utils/common_model.js'
var common = new Common()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // itemHeight:0,
    vipMask: true,
    userData:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    itemHeight:0
  },
  onShow(options){
    this._getUserData()
  },
  // 获取用户信息
  _getUserData(){
    $.openLoad()
    common.getUserData((res)=>{
      if(res.code !=0){
        $.prompt(res.msg,2500)
        return false
      }
      console.log(res)
      this.setData({
        userData:res.data,
      },()=>{
        $.closeLoad()
        // this.setData({
        //   itemHeight:96
        // })
      })
    })
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
  toMyPush(e){
    var userId = this.data.userData.userId
    wx.navigateTo({
      url: '../../profile_package/pages/my_push/my_push?port=0'+'&userId='+userId,
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
    var userId = this.data.userData.userId
    wx.navigateTo({
      url: '../../profile_package/pages/shop_manage/shop_manage?userId='+userId,
    })
  },
  // 跳转到休闲购物
  toShopping(){
    $.prompt('此功能暂未上线，敬请期待',2500)
  }
})