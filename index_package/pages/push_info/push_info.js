// category_package/pages/push_info/push_info.js
var $ = require('../../../utils/common.js')
import { Push_info_model } from './push_info_model.js'
var push_info_model = new Push_info_model()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight:'',
    showMask:false,
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
    imgs:[],
    type: '',
    infoImgs: [],
    currentId:'',
    locationName:'',
    locationCode:'',
    tradeTypeName:'',
    tradeTypeCode:'',
    typeName:'',
    titleFocus: false,
    companyFocus: false,
    nameFocus: false,
    phoneFocus:false,
    infomationFocus:false,
    location:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const info = wx.getSystemInfoSync()
    var height = info.windowHeight - (98 * info.windowWidth / 750)
    this.setData({
      scrollHeight:height,
      classifyCode:options.classify
    })
    this._getBaseInfo()//获取平台发布信息 基本信息配置字段
    this._getType()//获取类型信息
  },
  // 禁止弹窗蒙层下可滑动
  stopMove(){
    return false
  },
  //获取平台发布信息 基本信息配置字段
  _getBaseInfo(){
    var classifyCode = this.data.classifyCode
    push_info_model.getBaseInfo(classifyCode,(res)=>{
      console.log(res)
    })
  },
  //获取类型信息
  _getType(){
    var classifyCode = this.data.classifyCode
    push_info_model.getType(classifyCode,(res)=>{
      console.log(res)
    })
  },
  //平台添加发布信息
  _pushInfo(){
    var data = {
      classifyCode:this.data.classifyCode,
      classifyName:this.data.classifyName,
      title:title,
      basicInfo:[
        {
          field:'起订',
          value:'1月16日',
          sort:1
        }
      ],
      company:'xx公司',
      name:'名字',
      phone:'15632566332',
      locationCode:100014,
      locationName:'广州',
      typeCode:'3',
      typeName:'船舶交易',
      information:'详细信息',
      imgList:[]
    }
    push_info_model.pushInfo(data,(res)=>{
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
  cancelDel(){
    this.setData({
      showMask:false
    })
  },
  //选择地区
  bindAreaChange: function (e) {
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
  bindDealChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var tradeTypeName = this.data.dealArray[e.detail.value]
    var tradeTypeCode = e.detail.value
    this.setData({
      dealType: true,
      dealIndex: e.detail.value,
      tradeTypeName: tradeTypeName,
      tradeTypeCode:tradeTypeCode
    })
  },
  //选择类型
  bindTypeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      type: true,
      typeIndex: e.detail.value
    })
  },
  // 提交表单
  formSubmit(e){
    console.log(e)
    var title = e.detail.value.title,
        company = e.detail.value.company,
        name = e.detail.value.name,
        phone = e.detail.value.phone,
        information = e.detail.value.information,
        remark = e.detail.value.projectFunction,
        locationCode = this.data.locationCode,
        locationName = this.data.locationName,
        tradeTypeCode = this.data.tradeTypeCode,
        tradeTypeName = this.data.tradeTypeName,
        typeName = this.data.typeName,
        typeCode = this.data.typeCode,
        imgList = this.data.imgs,
        imgList1 = this.data.infoImgs,
        reg = /^1(3|4|5|7|8)\d{9}$/;

    if (title == "") {
      $.prompt('标题不能为空')
      this.setData({
        location:'title'
      },()=>{
        setTimeout(()=>{
          this.setData({
            titleFocus: true,
          })
        },300)
      })
      return false
    } else if (company == "") {
      $.prompt('请填写您的公司名称')
      this.setData({
        location:'company'
      },()=>{
        setTimeout(()=>{
          this.setData({
            companyFocus: true
          })
        },300)
      })
      return false
    } else if (name == "") {
      $.prompt('请填写您的姓名')
      this.setData({
        location:'name'
      },()=>{
        setTimeout(()=>{
          this.setData({
            nameFocus: true
          })
        },300)
      })
      return false
    } else if (!reg.test(phone)) {
      $.prompt('请填写正确的手机号码')
      this.setData({
        location:'phone'
      },()=>{
        setTimeout(()=>{
          this.setData({
            phoneFocus: true
          })
        },300)
      })
      return false
    } else if (locationName == "") {
      $.prompt('请选择地区信息')
      this.setData({
        // companyFocus: true,
        location:'area'
      })
      return false
    } else if (tradeTypeName == "") {
      $.prompt('请选择交易类型')
      this.setData({
        // companyFocus: true,
        location:'deal_type'
      })
      return false
    } 
    // else if (typeName == "") {
    //   $.prompt('请选择分类类型')
    //   this.setData({
    //     // companyFocus: true
    //   })
    //   return false
    // } 
    else if (information == "") {
      $.prompt('请填写商品详情描述信息')
      this.setData({
        location:'detail_info'
      },()=>{
        setTimeout(()=>{
          this.setData({
            infomationFocus: true
          })
        },300)
      })
      return false
    } 
    else if (imgList == "") {
      $.prompt('请上传商品轮播图')
      this.setData({
        // companyFocus: true,
        location:'slider_img'
      })
      return false
    }
  }
})