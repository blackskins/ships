// shopManage_package/pages/slider_img/slider_img.js
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMask: false,
    imgType:'',
    imgs: [],
    shopAvatar:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.port == 0) {
      wx.setNavigationBarTitle({
        title: '修改店铺图',
      })
    }
    this.setData({
      imgType:options.port
    })
  },
  // 禁止弹窗蒙层下可滑动
  stopMove() {
    return false
  },
  // 选择图片
  upload(e) {
    var upload_url = 'https://dz1api.weishangshouji.cn/resource/imgUpload'
    var type = e.currentTarget.dataset.type
    console.log(type)
    if (type == 'slider') {
      var imgs = this.data.imgs
      var count = 4 - imgs.length
    } else if (type == 'info') {
      var imgs = this.data.shopAvatar
      var count = 1 - this.data.shopAvatar.length
    }
    console.log(count)
    $.uploadImage(upload_url, imgs, count, (res) => {
      imgs.push(res.data.url)
      if (type == 'slider') {
        this.setData({
          imgs: imgs
        })
      } else if (type == 'info') {
        this.setData({
          shopAvatar: imgs
        })
      }
    })
  },

  // 预览图片
  previewImg(e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.id;
    //所有图片
    if (id == 0) {
      var imgs = this.data.imgs;
    } else if (id == 1) {
      var imgs = this.data.shopAvatar;
    }
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  // 删除图片
  del(e) {
    var id = e.currentTarget.id
    var type = e.currentTarget.dataset.type
    this.setData({
      showMask: true,
      delId: id,
      type: type
    })
  },
  // 确认删除
  confirm() {
    var id = this.data.delId
    var type = this.data.type
    if (type == 'slider') {
      var list = this.data.imgs
    } else if (type == 'info') {
      var list = this.data.shopAvatar
    }
    list.splice(id, 1)
    if (type == 'slider') {
      this.setData({
        showMask: false,
        imgs: list
      }, () => {
        $.prompt('移除成功')
      })
    } else if (type == 'info') {
      this.setData({
        showMask: false,
        shopAvatar: list
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
})