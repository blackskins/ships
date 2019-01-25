// shop_package/pages/more_list/more_list.js
import { More_list_model } from './more_list_model.js'
var aa = new More_list_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight:'',
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getBusinessCategory()
  },
  //获取所有分类列表
  _getBusinessCategory(){
    aa.getBusinessCategory((res)=>{
      $.openLoad()
      console.log(res)
      if(res.code != 0){
        $.prompt(res.msg,2500)
        return false
      }
      this.setData({
        list:res.data
      },()=>{
        $.closeLoad()
      })
    })
  },
  // 跳转到列表详情页
  toListDetail(e){
    var id = e.currentTarget.id
    var title = e.currentTarget.dataset.title
    var port = e.currentTarget.dataset.port
    wx.navigateTo({
      url: '../service_list/service_list?id='+id+'&title='+title+'&port='+port,
    })
  }
})