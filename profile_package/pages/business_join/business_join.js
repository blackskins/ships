// profile_package/pages/business_join/business_join.js
var $ =require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img1: '',
    img2: '',
    img3: '',
    showMask: false,
    currentId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 选择图片
  chooseImg(e) {
    var that = this
    var id = e.currentTarget.id
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 1,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths;
        if (id == 0) {
          that.setData({
            //将临时变量赋值给已经在data中定义好的变量
            img1: tempFilePaths
          })
        } else if (id == 1) {
          that.setData({
            //将临时变量赋值给已经在data中定义好的变量
            img2: tempFilePaths
          })
        } else if (id == 2) {
          that.setData({
            //将临时变量赋值给已经在data中定义好的变量
            img3: tempFilePaths
          })
        }

      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  // 删除相关证件
  delImg(e) {
    var id = e.currentTarget.id
    this.setData({
      currentId: id,
      showMask: true
    })
  },
  // 确认删除
  confirm() {
    if (this.data.currentId == 0) {
      this.setData({
        showMask: false,
        img1:''
      }, () => {
        $.prompt('移除成功')
      })
    }else if(this.data.currentId == 1){
      this.setData({
        showMask: false,
        img2:''
      }, () => {
        $.prompt('移除成功')
      })
    }else if(this.data.currentId == 2){
      this.setData({
        showMask: false,
        img3:''
      }, () => {
        $.prompt('移除成功')
      })
    }
  },
  // 取消删除图片
  cancelDel() {
    this.setData({
      showMask: false
    })
  },
  // 跳转到我的审核
  toMyCheck() {
    wx.navigateTo({
      url: '../../../join_package/pages/my_check/my_check',
    })
  }
})