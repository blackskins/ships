// shopManage_package/pages/edit_goods/edit_goods.js
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMask: false,
    shopType: false,
    areaType: false,
    dealType: false,
    type: false,
    array: ['服务', '用品', '维修', '助航', '加油'],
    dealArray: ['服务', '用品', '维修', '助航', '加油'],
    typeArray: ['服务', '用品', '维修', '助航', '加油'],
    index: 0,
    dealIndex: 0,
    typeIndex: 0,
    areaIndex: 0,
    region: [],
    areaName: ['北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区', '台湾省', '香港特别行政区', '澳门特别行政区'],
    areaCode: ['110000', '120000', '130000', '140000', '150000', '210000', '220000', '230000', '310000', '320000', '330000', '340000', '350000', '360000', '370000', '410000', '420000', '430000', '440000', '450000', '460000', '500000', '510000', '520000', '530000', '540000', '610000', '620000', '630000', '640000', '650000', '710000', '810000', '820000'],
    imgs: [],
    delId: '',
    type: '',
    infoImgs: [],
    port: '',
    isRecommend:false,
    editStatus: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.id) {
      this.setData({
        editStatus: options.id,
        port: options.port
      })
    }
    console.log(options.id)
    if (options.id == 0) {
      wx.setNavigationBarTitle({
        title: '发布消息',
      })
    } else if (options.id == 1) {
      wx.setNavigationBarTitle({
        title: '编辑',
      })
    }
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      shopType: true,
      index: e.detail.value
    })
  },
  bindAreaChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      areaType: true,
      areaIndex: e.detail.value
    })
  },
  bindDealChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dealType: true,
      dealIndex: e.detail.value
    })
  },
  bindTypeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      type: true,
      typeIndex: e.detail.value
    })
  },
  // 禁止弹窗蒙层下可滑动
  stopMove() {
    return false
  },
  //是否加为推荐
  bindChange(e){
    console.log(e)
    // if(e.detail.value)
    this.setData({
      isRecommend:e.detail.value
    })
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
      var imgs = this.data.infoImgs
      var count = 4 - this.data.infoImgs.length
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
          infoImgs: imgs
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
    if(id == 0){
    var imgs = this.data.imgs;
    }else if(id == 1){
      var imgs = this.data.infoImgs;
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
      var list = this.data.infoImgs
    }
    list.splice(id, 1)
    if(type == 'slider'){
      this.setData({
        showMask: false,
        imgs: list
      }, () => {
        $.prompt('移除成功')
      })
    }else if(type == 'info'){
      this.setData({
        showMask: false,
        infoImgs: list
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
  }
})