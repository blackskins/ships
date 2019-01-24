// index_package/pages/goods_detail/goods_detail.js
import {
  Goods_detail_model
} from './goods_detail_model.js'
var goods_detail_model = new Goods_detail_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList: '',
    type: '',
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    $.openLoad()
    console.log(options.type)
    this.setData({
      type: options.type,
      id: options.id
    })
    if(options.type == 0){
      this._getInfoDetail(options.id) //获取信息详情
    }else if(options.type == 1){
      this._getBusinessInfoDetail(options.id)
    }
  },
  //获取平台信息详情
  _getInfoDetail(_id) {
    goods_detail_model.getInfoDetail(_id, (res) => {
      console.log(res)
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
        return false
      }
      this.setData({
        detailList: res.data
      }, () => {
        $.closeLoad()
      })
    })
  },
  //获取商家信息详情
  _getBusinessInfoDetail(_id) {
    goods_detail_model.getBusinessInfoDetail(_id, (res) => {
      console.log(res)
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
        return false
      }
      this.setData({
        detailList: res.data
      }, () => {
        $.closeLoad()
      })
    })
  },
  // 收藏详情
  collect() {
    var postId = this.data.id
    goods_detail_model.addCollection(postId, (res) => {
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
        return false
      }
      this.setData({
        "detailList.isFavorite": true
      }, () => {
        $.prompt('收藏成功')
      })
    })
  },
  //打电话 询价
  phoneCall(e) {
    var postId = this.data.id
    var phoneNumber = e.currentTarget.dataset.num
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
      success: () => {
        console.log('成功了')
        goods_detail_model.addChat(postId,(res)=>{
          console.log(res)
          if(res.code != 0){
            $.prompt(res.msg,2500)
            return false
          }
          console.log('成功添加到联系列表')
        })
      },
      fail: () => {
        console.log('失败了')
      }
    })
  }
})