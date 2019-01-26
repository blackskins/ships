// shopManage_package/pages/shop_category/shop_category.js
import { Shop_category_model } from './shop_category_model.js'
var shop_category_model = new Shop_category_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // itemHeight:0,
    shopCategory: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getCategoryNum()
  },
  //获取所有分类及商品数量
  _getCategoryNum(){
    $.openLoad()
    shop_category_model.getCategoryNum((res)=>{
      console.log(res)
      if(res.code != 0){
        $.prompt(res.msg,2500)
        return false
      }
      this.setData({
        shopCategory:res.data
      },()=>{
        $.closeLoad()
        // this.setData({
        //   itemHeight:88
        // })
      })
    })
  },
  // 跳转到相应的列表详情
  toListDetail(e){
    var title = e.currentTarget.dataset.title
    var classifyCode = e.currentTarget.dataset.classify
    console.log(title)
    wx.navigateTo({
      url: '../../../shop_package/pages/service_list/service_list?title=' + title +'&classifyCode='+classifyCode+'&port=list',
    })
  }
})