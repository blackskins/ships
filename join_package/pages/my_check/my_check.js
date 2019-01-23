// join_package/pages/my_check/my_check.js
import { My_check_model } from './my_check_model.js'
var my_check_model = new My_check_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailInfoList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getCheckHistory() //获取审核记录
  },
  //获取审核记录
  _getCheckHistory(){
    my_check_model.getCheckHistory((res)=>{
      console.log(res)
      this.setData({
        detailInfoList:res.data
      })
    })
  },
  // 拨打电话
  phoneCall(){
    wx.makePhoneCall({
      phoneNumber: '15623548653',
    })
  },
  // 查看原因
  checkReason(){
    wx.navigateTo({
      url: '../check_reason/check_reason',
    })
  }
})