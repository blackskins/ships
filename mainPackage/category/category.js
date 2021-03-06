// indexPages/category/category.js
import { Index_model } from '../index/index_model.js'
var index_model = new Index_model()
var $ = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList:[],
    // cateHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $.openLoad()
    this._getIndexCategory()
  },
  //获取首页分类导航
  _getIndexCategory() {
    index_model.getIndexCategory((res) => {
      console.log(res)
      this.setData({
        cateList: res.data
      },()=>{
        $.closeLoad()
        // this.setData({
        //   cateHeight:160
        // })
      })
    })
  },
  // 跳转分类列表
  toCategoryList(e){
    var id = e.currentTarget.dataset.id
    var title = e.currentTarget.dataset.title
    var classify = e.currentTarget.dataset.classify
    wx.navigateTo({
      url: '/index_package/pages/category_list/category_list?id='+id +'&title='+title+'&classify='+classify,
    })
  }
})