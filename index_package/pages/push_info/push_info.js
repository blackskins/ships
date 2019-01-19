// category_package/pages/push_info/push_info.js
var $ = require('../../../utils/common.js')
import {
  Push_info_model
} from './push_info_model.js'
var push_info_model = new Push_info_model()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '',
    showMask: false,
    shopType: false,
    areaType: false,
    dealType: false,
    type: false,
    array: ['服务', '用品', '维修', '助航', '加油'],
    dealArray: [],
    typeList: [], //类型列表
    typeArray: [], //类型中名称数组
    // typeCodeArray:[],
    index: 0,
    dealIndex: 0,
    typeIndex: 0,
    areaIndex: 0,
    region: [],
    areaName: ['北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区', '台湾省', '香港特别行政区', '澳门特别行政区'],
    areaCode: ['110000', '120000', '130000', '140000', '150000', '210000', '220000', '230000', '310000', '320000', '330000', '340000', '350000', '360000', '370000', '410000', '420000', '430000', '440000', '450000', '460000', '500000', '510000', '520000', '530000', '540000', '610000', '620000', '630000', '640000', '650000', '710000', '810000', '820000'],
    imgs: [], //轮播图
    type: '',
    infoImgs: [], //详细信息图
    currentId: '',
    locationName: '', //当前地区
    locationCode: '', //当前地区码
    tradeTypeName: '', //当前交易类型
    tradeTypeCode: '', //当前交易类型码
    typeName: '', //当前类型
    typeCode: '', //当前类型码
    titleFocus: false, //标题输入框聚焦情况
    companyFocus: false, //公司输入框聚焦情况
    nameFocus: false, //姓名输入框聚焦情况
    phoneFocus: false, //电话输入框聚焦情况
    infomationFocus: false, //详细信息文本域聚焦情况
    location: '',
    baseInfoList: [], //基本信息字段列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const info = wx.getSystemInfoSync()
    var height = info.windowHeight - (98 * info.windowWidth / 750)
    this.setData({
      scrollHeight: height,
      classifyCode: options.classify
    })
    this._getBaseInfo() //获取平台发布信息 基本信息配置字段
    this._getDealType() //获取交易类型信息
    this._getType() //获取类型信息
  },
  // 禁止弹窗蒙层下可滑动
  stopMove() {
    return false
  },
  //获取平台发布信息 基本信息配置字段
  _getBaseInfo() {
    var classifyCode = this.data.classifyCode
    push_info_model.getBaseInfo(classifyCode, (res) => {
      console.log(res)
      this.setData({
        baseInfoList: res.data,
      })
      for (let i = 0; i < res.data.length; i++) {
        this.data['baseInfoStr' + i] = false
      }
    })

  },
  //获取交易类型信息
  _getDealType() {
    push_info_model.getDealType((res) => {
      console.log(res)
      var data = res.data
      var dealTypeName = new Array()
      for (let i = 0; i < data.length; i++) {
        dealTypeName.push(data[i].typeName)
      }
      this.setData({
        dealArrayList: res.data,
        dealArray: dealTypeName
      })
    })
  },
  //获取类型信息
  _getType() {
    var classifyCode = this.data.classifyCode
    push_info_model.getType(classifyCode, (res) => {
      console.log(res)
      var typeName = new Array()
      // var typeCode = new Array()
      var data = res.data
      for (let i = 0; i < data.length; i++) {
        typeName.push(data[i].typeName)
      }
      this.setData({
        typeArray: typeName,
        typeList: res.data
      })
    })
  },
  //平台添加发布信息
  _pushInfo() {
    var data = {
      classifyCode: this.data.classifyCode,
      classifyName: this.data.classifyName,
      title: title,
      basicInfo: [{
        field: '起订',
        value: '1月16日',
        sort: 1
      }],
      company: 'xx公司',
      name: '名字',
      phone: '15632566332',
      locationCode: 100014,
      locationName: '广州',
      typeCode: '3',
      typeName: '船舶交易',
      information: '详细信息',
      imgList: []
    }
    push_info_model.pushInfo(data, (res) => {
      console.log(res)
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
    if (id == 0) {
      var imgs = this.data.imgs;
    } else if (id == 1) {
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
  },
  //选择地区
  bindAreaChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var locationName = this.data.areaName[e.detail.value]
    var locationCode = this.data.areaCode[e.detail.value]
    this.setData({
      areaType: true,
      areaIndex: e.detail.value,
      locationName: locationName,
      locationCode: locationCode
    })
  },
  //选择交易类型
  bindDealChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var tradeTypeName = this.data.dealArray[e.detail.value]
    var tradeTypeCode = this.data.dealArrayList[e.detail.value].typeCode
    this.setData({
      dealType: true,
      dealIndex: e.detail.value,
      tradeTypeName: tradeTypeName,
      tradeTypeCode: tradeTypeCode
    })
  },
  //选择类型
  bindTypeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var typeName = this.data.typeArray[e.detail.value]
    var typeCode = this.data.typeList[e.detail.value].typeCode
    this.setData({
      type: true,
      typeIndex: e.detail.value,
      typeName: typeName,
      typeCode: typeCode
    })
  },
  // 提交表单
  formSubmit(e) {
    var that = this
    console.log('sfsasfsdfsafdsdfsdfsadfsa')
    var baseInfoList = that.data.baseInfoList
    console.log(e)
    var data = {
      title: e.detail.value.title,
      company: e.detail.value.company,
      name: e.detail.value.name,
      phone: e.detail.value.phone,
      information: e.detail.value.information,
      remark: e.detail.value.projectFunction,
      locationCode: that.data.locationCode,
      locationName: that.data.locationName,
      tradeTypeCode: that.data.tradeTypeCode,
      tradeTypeName: that.data.tradeTypeName,
      typeName: that.data.typeName,
      typeCode: that.data.typeCode,
      imgList: that.data.imgs,
      imgList1: that.data.infoImgs,
      basicInfo :[]
    }
    var reg = /^1(3|4|5|7|8)\d{9}$/;
    for (let i = 0; i < baseInfoList.length; i++) {
      var arr = {
        filed: baseInfoList[i].field,
        value: e.detail.value['baseInfoStr' + i],
        sort: baseInfoList[i].sort
      }
      data.basicInfo.push(arr)
    }
    console.log(data.basicInfo)
    if (data.title == "") {
      $.prompt('标题不能为空')
      that.setData({
        location: 'title'
      }, () => {
        setTimeout(() => {
          that.setData({
            titleFocus: true,
          })
        }, 300)
      })
      return false
    } else if (data.imgList == "") {
      $.prompt('请上传商品轮播图')
      that.setData({
        // companyFocus: true,
        location: 'slider_img'
      })
      return false
    } else if (baseInfoList.length != 0) {
      for (let i = 0; i < baseInfoList.length; i++) {
        if (e.detail.value['baseInfoStr' + i] == '') {
          $.prompt('请填写' + baseInfoList[i].field + '信息')
          var str = 'that.data.baseInfoStr[' + i + ']'
          var str1 = 'baseInfoStr' + i
          that.setData({
            location: str1
          }, () => {
            setTimeout(() => {
              that.setData({
                str: true
              })
            }, 300)
          })
          return false
        }
      }
    } else if (data.company == "") {
      $.prompt('请填写您的公司名称')
      that.setData({
        location: 'company'
      }, () => {
        setTimeout(() => {
          that.setData({
            companyFocus: true
          })
        }, 300)
      })
      return false
    } else if (data.name == "") {
      $.prompt('请填写您的姓名')
      that.setData({
        location: 'name'
      }, () => {
        setTimeout(() => {
          that.setData({
            nameFocus: true
          })
        }, 300)
      })
      return false
    } else if (!reg.test(data.phone)) {
      $.prompt('请填写正确的手机号码')
      that.setData({
        location: 'phone'
      }, () => {
        setTimeout(() => {
          that.setData({
            phoneFocus: true
          })
        }, 300)
      })
      return false
    } else if (data.locationName == "") {
      $.prompt('请选择地区信息')
      that.setData({
        // companyFocus: true,
        location: 'area'
      })
      return false
    } else if (data.tradeTypeName == "") {
      $.prompt('请选择交易类型')
      that.setData({
        // companyFocus: true,
        location: 'deal_type'
      })
      return false
    } else if (data.typeName == "") {
      $.prompt('请选择分类类型')
      that.setData({
        // companyFocus: true
        location: 'type'
      })
      return false
    } else if (data.information == "") {
      $.prompt('请填写商品详情描述信息')
      that.setData({
        location: 'detail_info'
      }, () => {
        setTimeout(() => {
          that.setData({
            infomationFocus: true
          })
        }, 300)
      })
      return false
    }
    $.openLoad('正在发布...')
    push_info_model.pushInfo(data, (res) => {
      console.log(res)
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
      }
      $.closeLoad()
      $.prompt('发布成功',2500,'success')
    })
  }
})