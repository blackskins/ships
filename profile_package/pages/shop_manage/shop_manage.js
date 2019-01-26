// profile_package/pages/shop_manage/shop_manage.js
import { Shop_manage_model } from './shop_manage_model.js'
var shop_manage_model = new Shop_manage_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // itemHeight:0,
    shopBasicInfo:'',
    userId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId:options.userId
    })
  },
  onShow(){
    this._getShopBasicInfo()//获取店铺基本信息
  },
  //获取店铺基本信息
  _getShopBasicInfo(){
    $.openLoad()
    shop_manage_model.getShopBasicInfo((res)=>{
      console.log(res)
      if(res.code != 0){
        $.prompt(res.msg,2500)
        return false
      }
      this.setData({
        shopBasicInfo:res.data,
      },(res)=>{
        $.closeLoad()
        // this.setData({
        //   itemHeight:96
        // })
      })
    })
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