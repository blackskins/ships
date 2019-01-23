// shopManage_package/pages/slider_img/slider_img.js
import { Slider_img_model } from './slider_img_model.js'
var slider_img_model = new Slider_img_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opacity: 0, //背景蒙层的透明度
    animate: '', //删除图片 动画弹窗
    showMask: false,
    imgType:'',//修改图片的种类 0：修改店铺图  1：修改店铺轮播图
    imgs: [],
    shopAvatar:[],
    _id:'',//店铺唯一ID标识

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
      imgType:options.port,
      _id:options._id
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
    $.openLoad('正在上传...')
    $.uploadImage(upload_url, imgs, count, (res) => {
      imgs.push(res.data.url)
      if (type == 'slider') {
        this.setData({
          imgs: imgs
        },()=>{
          $.closeLoad()
        })
      } else if (type == 'info') {
        this.setData({
          shopAvatar: imgs
        }, () => {
          $.closeLoad()
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
      type: type,
      opacity:1,
      animate:'animate .3s'
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
        opacity:0,
        animate:'back .5s'
      },()=>{
        setTimeout(()=>{
          this.setData({
            showMask: false,
            imgs: list
          }, () => {
            $.prompt('移除成功')
          })
        },500)
      })
    } else if (type == 'info') {
      this.setData({
        opacity:0,
        animate:'back .5s'
      },()=>{
        setTimeout(()=>{
          this.setData({
            showMask: false,
            shopAvatar: list
          }, () => {
            $.prompt('移除成功')
          })
        },500)
      })
    }
  },
  // 取消删除图片
  cancelDel() {
    this.setData({
      opacity:0,
      animate:'back .5s'
    },()=>{
      setTimeout(()=>{
        this.setData({
          showMask: false
        })
      },500)
    })
  },
  //上传/更新店铺头像接口
  _updateShopAvatar() {
    var _id = this.data._id
    var shopLogo = this.data.shopAvatar[0]
    slider_img_model.updateShopAvatar(_id, shopLogo, (res) => {
      console.log(res)
      if(res.code != 0){
        $.prompt(res.msg,2500)
        return false
      }
      $.prompt('保存成功')
      setTimeout(()=>{
        wx.navigateBack({
          delta:1
        })
      },1500)
    })
  },
  //上传/更新店铺店铺轮播图接口
  _updateSliderImg() {
    var _id = this.data._id
    var imgList = this.data.imgs
    slider_img_model.updateSliderImg(_id, imgList, (res) => {
      console.log(res)
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
        return false
      }
      $.prompt('保存成功')
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1500)
    })
  },
  //保存更改信息
  saveFile(){
    var type = this.data.imgType //上传图片类型 
    var len = this.data.shopAvatar.length//店铺图长度
    var len1 = this.data.imgs.length //轮播图长度
    if(type == 0){
      if(len == 0){
        $.prompt('请选择图片')
        return false
      }else{
        this._updateShopAvatar()//上传/更新店铺头像接口
      }
    }else{
      if(len1 == 0){
        $.prompt('至少上传一张图片')
        return false
      }else{
        console.log('hello world')
        this._updateSliderImg()//上传/更新店铺头像接口
      }
    }
  }
})