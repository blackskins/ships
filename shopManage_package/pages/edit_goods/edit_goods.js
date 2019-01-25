// shopManage_package/pages/edit_goods/edit_goods.js
import {
  Edit_goods_model
} from './edit_goods_model.js'
var edit_goods_model = new Edit_goods_model()
var $ = require('../../../utils/common.js')
import {
  Common
} from '../../../utils/common_model.js'
var common = new Common()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opacity: 0, //背景蒙层的透明度
    animate: '', //删除图片 动画弹窗
    submitStatus: true, //防止表单重复提交
    classifyCode: '', //分类编码
    classifyName: '', //分类名
    showMask: false,
    shopType: false,
    areaType: false,
    dealType: false,
    type: false,
    categoryList: '', //平台所有分类（包括类名，类码）
    categoryName: [],
    dealArray: [], //交易类型数组
    typeList: [], //类型列表
    typeArray: [], //类型中名称数组
    categoryIndex: 0, //分类当前索引下标
    dealIndex: 0, //交易类型当前索引下标
    typeIndex: 0, //类型当前索引下标
    areaIndex: 0, //地区当前索引下标
    region: [],
    areaName: ['北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区', '台湾省', '香港特别行政区', '澳门特别行政区'],
    areaCode: ['110000', '120000', '130000', '140000', '150000', '210000', '220000', '230000', '310000', '320000', '330000', '340000', '350000', '360000', '370000', '410000', '420000', '430000', '440000', '450000', '460000', '500000', '510000', '520000', '530000', '540000', '610000', '620000', '630000', '640000', '650000', '710000', '810000', '820000'],
    locationName: '', //当前地区
    locationCode: '', //当前地区码
    tradeTypeName: '', //当前交易类型
    tradeTypeCode: '', //当前交易类型码
    typeName: '', //当前类型
    typeCode: '', //当前类型码
    imgs: [], //轮播图数组
    delId: '', //删除当前轮播图的索引下标
    type: '', //判断是轮播图还是底部的详情图
    infoImgs: [], //详情图数组
    port: '', //判断入口  0：代表平台  1：代表商家
    isRecommend: false, //商家发布商品时可选择是否在店铺首页推荐列表中显示
    editStatus: '',
    _id: '', //当前专属信息id
    userId: '', //用户的userId
    detailList: '', //获取基本信息列表
    titleFocus: false, //标题输入框聚焦情况
    companyFocus: false, //公司输入框聚焦情况
    nameFocus: false, //姓名输入框聚焦情况
    phoneFocus: false, //电话输入框聚焦情况
    infomationFocus: false, //详细信息文本域聚焦情况
    location: '', //scroll-view的锚点
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
      editStatus: options.id,
      port: options.port,
      userId:options.userId
    })
    if (options._id) {
      this.setData({
        _id: options._id,
      })
    }
    if (options.classifyCode) {
      this.setData({
        classifyCode: options.classifyCode
      })
    }
    if (options.classifyName) {
      this.setData({
        classifyName: options.classifyName
      })
    }
    if (options.id == 1) {
      this._getType() //获取类型信息
    }
    console.log(options.classifyCode)
    console.log(options.id)
    this._getDealType() //获取交易类型信息
    if (options.id == 0) {
      $.openLoad()
      wx.setNavigationBarTitle({
        title: '发布消息',
      })
      this._getBaseInfo() //获取平台基本信息字段
      if(options.port == 0){
        this._getAllCategory() //获取平台所有分类
      }else if( options.port == 1 ){
        this._getBusinessAllCategory()//获取商家店铺所有分类
      }
    } else if (options.id == 1) {
      $.openLoad('正在读取数据...')
      wx.setNavigationBarTitle({
        title: '编辑',
      })
      this._getInfoDetail() //获取并填充要修改的表单信息
    }

  },
  bindPickerChange: function(e) {
    var categoryList = this.data.categoryList
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      shopType: true,
      categoryIndex: e.detail.value,
      classifyCode: categoryList[e.detail.value].classifyCode,
      classifyName: categoryList[e.detail.value].classifyName
    }, () => {
      var classifyCode = categoryList[e.detail.value].classifyCode
      this._getBaseInfo(classifyCode)
      this._getType(classifyCode) //获取类型信息
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
  chooseType() { //点击类型蒙版
    $.prompt('请先选择分类')
    this.setData({
      location: 'category'
    })
  },
  //获取平台所有分类
  _getAllCategory() {
    edit_goods_model.getAllCategory((res) => {
      console.log(res)
      var categoryName = new Array();
      for (let i = 0; i < res.data.length; i++) {
        categoryName.push(res.data[i].classifyName)
      }
      this.setData({
        categoryList: res.data,
        categoryName: categoryName
      }, () => {
        $.closeLoad()
      })
    })
  },
  //获取商家店铺所有分类
  _getBusinessAllCategory() {
    edit_goods_model.getBusinessAllCategory((res) => {
      console.log(res)
      var categoryName = new Array();
      for (let i = 0; i < res.data.length; i++) {
        categoryName.push(res.data[i].classifyName)
      }
      this.setData({
        categoryList: res.data,
        categoryName: categoryName
      }, () => {
        $.closeLoad()
      })
    })
  },
  //平台编辑商品的时候不能修改分类
  tips() {
    $.prompt('暂不支持修改分类', 2500)
  },
  //封装进入编辑状态下的获取详情信息
  fillDetailInfo(data) {
    var locationName = data.locationName
    var tradeTypeName = data.tradeTypeName
    var typeName = data.typeName
    for (var i = 0; i < this.data.areaName.length; i++) { //拿到地区相对应值的索引下标，并更新数据
      if (locationName == this.data.areaName[i]) {
        this.setData({
          areaIndex: i,
          areaType: true,
          locationName: locationName
        }, () => {
          this.setData({
            locationCode: this.data.areaCode[i]
          })
          return
        })
      }
    }
    for (var i = 0; i < this.data.dealArray.length; i++) { //拿到交易类型相对应值的索引下标，并更新数据
      if (tradeTypeName == this.data.dealArray[i]) {
        this.setData({
          dealIndex: i,
          dealType: true,
          tradeTypeName: tradeTypeName,
          tradeTypeCode: data.tradeTypeCode
        }, () => {
          return
        })
      }
    }
    for (var i = 0; i < this.data.typeArray.length; i++) { //拿到类型相对应值的索引下标，并更新数据
      if (typeName == this.data.typeArray[i]) {
        this.setData({
          typeIndex: i,
          type: true,
          typeName: typeName,
          typeCode: data.typeCode
        }, () => {
          return
        })
      }
    }
    this.setData({
      detailList: data,
      imgs: data.imgList,
      infoImgs: data.infoList,
      isRecommend: data.recommend
    }, () => {
      $.closeLoad()
      this._getType() //获取类型信息
      this._getDealType() //获取交易类型信息
    })
  },
  //获取平台基本信息
  _getInfoDetail() {
    var _id = this.data._id
    edit_goods_model.getInfoDetail(_id, (res) => {
      console.log(res)
      this.fillDetailInfo(res.data)
    })
  },
  //获取商家基本信息
  _getInfoDetail() {
    var _id = this.data._id
    edit_goods_model.getBusinessInfoDetail(_id, (res) => {
      console.log(res)
      this.fillDetailInfo(res.data)
    })
  },
  //获取平台发布信息 基本信息配置字段
  _getBaseInfo(classifyCode) {
    // var classifyCode = this.data.classifyCode
    edit_goods_model.getBaseInfo(classifyCode, (res) => {
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
    edit_goods_model.getDealType((res) => {
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
  _getType(classifyCode) {
    if (this.data.editStatus == 1) {
      var classifyCode = this.data.classifyCode
    }
    console.log('nishi' + classifyCode)
    if(this.data.port == 0){//获取平台类型信息
      edit_goods_model.getType(classifyCode, (res) => {
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
    }else{//获取商家店铺下某个分类的所有类型
      edit_goods_model.getShopType(classifyCode, (res) => {
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
    }
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
  // 禁止弹窗蒙层下可滑动
  stopMove() {
    return false
  },
  //是否加为推荐
  bindChange(e) {
    console.log(e)
    // if(e.detail.value)
    this.setData({
      isRecommend: e.detail.value
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
      type: type,
      opacity: 1,
      animate: 'animate .3s'
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
        opacity: 0,
        animate: 'back .5s'
      }, () => {
        setTimeout(() => {
          this.setData({
            showMask: false,
            imgs: list
          }, () => {
            $.prompt('移除成功')
          })
        }, 500)
      })
    } else if (type == 'info') {
      this.setData({
        opacity: 0,
        animate: 'back .5s'
      }, () => {
        setTimeout(() => {
          this.setData({
            showMask: false,
            infoImgs: list
          }, () => {
            $.prompt('移除成功')
          })
        }, 500)
      })

    }
  },
  // 取消删除图片
  cancelDel() {
    this.setData({
      opacity: 0,
      animate: 'back .5s'
    }, () => {
      setTimeout(() => {
        this.setData({
          showMask: false
        })
      }, 500)
    })
  },
  // 提交表单
  formSubmit(e) {
    var that = this
    // console.log('sfsasfsdfsafdsdfsdfsadfsa')
    // var list;
    // if (this.data.editStatus == 0) {
    //   list = that.data.baseInfoList // 发布状态
    // } else {
    //   list = that.data.detailList.basicInfo // 编辑状态
    // }
    console.log(e)
    if (this.data.editStatus == 1) {
      var data = {
        classifyCode: that.data.classifyCode,
        classifyName: that.data.classifyName,
        title: e.detail.value.title,
        company: e.detail.value.company,
        name: e.detail.value.name,
        phone: e.detail.value.phone,
        information: e.detail.value.information,
        // remark: e.detail.value.projectFunction,
        locationCode: that.data.locationCode,
        locationName: that.data.locationName,
        tradeTypeCode: that.data.tradeTypeCode,
        tradeTypeName: that.data.tradeTypeName,
        typeName: that.data.typeName,
        typeCode: that.data.typeCode,
        imgList: that.data.imgs,
        _id: this.data._id,
        userId: this.data.userId,
        infoList: that.data.infoImgs,
        // basicInfo: []
      }
    } else {
      var data = {
        classifyCode: that.data.classifyCode,
        classifyName: that.data.classifyName,
        title: e.detail.value.title,
        company: e.detail.value.company,
        name: e.detail.value.name,
        phone: e.detail.value.phone,
        information: e.detail.value.information,
        // remark: e.detail.value.projectFunction,
        locationCode: that.data.locationCode,
        locationName: that.data.locationName,
        tradeTypeCode: that.data.tradeTypeCode,
        tradeTypeName: that.data.tradeTypeName,
        typeName: that.data.typeName,
        typeCode: that.data.typeCode,
        imgList: that.data.imgs,
        infoList: that.data.infoImgs,
        // basicInfo: []
      }
    }
    var reg = /^1(3|4|5|7|8)\d{9}$/;
    if (this.data.port == 1) { //商家要显示这个推荐开关
      data.isRecommend = this.data.isRecommend
    }
    /*--------------------基本信息字段的渲染问题--------------------*/
    if (this.data.port == 0) {
      var list;
      if (this.data.editStatus == 0) {
        list = this.data.baseInfoList

      } else {
        list = this.data.detailList.basicInfo
      }
      var basicInfo = []
      for (let i = 0; i < list.length; i++) {
        var arr = {
          field: list[i].field,
          value: e.detail.value['baseInfoStr' + i],
          sort: list[i].sort
        }
        basicInfo.push(arr)
      }
      if (this.data.port == 0) {
        data.basicInfo = basicInfo
      }
      console.log(data.basicInfo)
      console.log(data)
    }

    if (this.data.editStatus == 0 && data.classifyName == '') { //在个人中心的入口发布信息要选择分类
      $.prompt('请选择分类')
      this.setData({
        location: 'category'
      })
      return false
    } else if (data.title == "") {
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

    //这是编辑基本信息字段信息的判断
    else if (this.data.port == 0) {
      if (list.length != 0) {
        for (let i = 0; i < list.length; i++) {
          if (e.detail.value['baseInfoStr' + i] == '') {
            $.prompt('请填写' + list[i].field + '信息')
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
      }
    }
    if (!this.data.submitStatus) {
      $.prompt('表单信息正在提交，请勿重复提交！', 2500)
      return false
    }
    if (this.data.editStatus == 0) {
      $.openLoad('正在发布...')
    } else {
      $.openLoad('修改中...')
    }
    this.setData({
      submitStatus: false
    })

    /*------------------------------------以下是准备请求接口上传数据------------------------------------------------*/

    if (this.data.port == 0) { //平台发布信息/编辑信息的入口
      if (this.data.editStatus == 0) {
        edit_goods_model.pushInfo(data, (res) => {
          console.log(res)
          this.setData({
            submitStatus: true
          })
          $.closeLoad()
          if (res.code != 0) {
            $.prompt(res.msg, 2500)
            return false
          }
          $.prompt('发布成功', 2500, 'success')
          // $.prompt('修改成功', 2500, 'success')
        })
      } else { //编辑信息入口
        edit_goods_model.editInfo(data, (res) => {
          console.log(res)
          this.setData({
            submitStatus: true
          })
          $.closeLoad()
          if (res.code != 0) {
            $.prompt(res.msg, 2500)
            return false
          }
          // $.prompt('发布成功', 2500, 'success')
          $.prompt('修改成功', 2500, 'success')
        })
      }
    } else if (this.data.port == 1) { //商家发布/或者编辑信息入口
      if (this.data.editStatus == 0) { //发布信息入口
        edit_goods_model.businessPushInfo(data, (res) => {
          console.log(res)
          this.setData({
            submitStatus: true
          })
          $.closeLoad()
          if (res.code != 0) {
            $.prompt(res.msg, 2500)
            return false
          }
          $.prompt('发布成功', 2500, 'success')
          // $.prompt('修改成功', 2500, 'success')
        })
      } else { //编辑信息入口
        edit_goods_model.businessEditInfo(data, (res) => {
          console.log(res)
          this.setData({
            submitStatus: true
          })
          $.closeLoad()
          if (res.code != 0) {
            $.prompt(res.msg, 2500)
            return false
          }
          // $.prompt('发布成功', 2500, 'success')
          $.prompt('修改成功', 2500, 'success')
        })
      }
    }
  }
})