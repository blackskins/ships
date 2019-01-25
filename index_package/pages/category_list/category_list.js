// category_package/pages/category_list/category_list.js
import {
  Category_list_model
} from './category_list_model.js'
var category_list_model = new Category_list_model()
var $ = require('../../../utils/common.js')
import {
  Common
} from '../../../utils/common_model.js'
var common = new Common()
// 引入SDK核心类
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemHeight: 0, //列表项高度
    categoryId: '',//这个是首页分类的第四个图标
    keyWord: '', //输入框的关键字
    clearIcon: false,
    scrollHeight: '',
    page: 1,
    pageSize: 10,
    loading_state: false,
    loading: false,
    nodata: false,
    isMore: true,
    areaName: ['北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆自治区', '台湾省', '香港特别行政区', '澳门特别行政区'],
    areaCode: ['110000', '120000', '130000', '140000', '150000', '210000', '220000', '230000', '310000', '320000', '330000', '340000', '350000', '360000', '370000', '410000', '420000', '430000', '440000', '450000', '460000', '500000', '510000', '520000', '530000', '540000', '610000', '620000', '630000', '640000', '650000', '710000', '810000', '820000'],
    classifyCode: '', //分类码
    classifyName: '', //分类名
    title: '',
    id: null, //筛选种类的下标
    currentItem: '',
    currentType:'',
    type: 0, //选中类型 当前项的下标
    area: 0, //选中地区 当前项的下标
    deal: 0, //选中交易类型 当前项的下标
    typeCode: '',
    locationCode: '',
    tradeTypeCode: '',
    shopName:'',//店铺名
    chooseList: [ //筛选种类
      {
        title: '类型'
      },
      {
        title: '地区'
      },
      {
        title: '交易类型'
      }
    ],
    itemList: [{
        id: 0,
        list: [{
          title: '不限',
          typeCode: ''
        }]
      },
      {
        id: 1,
        list: [{
          title: '不限',
          locationCode: ''
        }]
      },
      {
        id: 2,
        list: [{
          title: '不限',
          tradeTypeCode: ''
        }]
      }
    ],
    hotList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const info = wx.getSystemInfoSync()
    var height1 = info.windowHeight - (274 * info.windowWidth / 750)
    var height2 = info.windowHeight - (176 * info.windowWidth / 750)
    var height3 = info.windowHeight - (88 * info.windowWidth / 750)
    // console.log(options.id)
    this.setData({
      scrollHeight: height1,
      scrollHeight1: height2,
      scrollHeight3: height3,
      categoryId: options.id,
      classifyCode: options.classify,
      classifyName: options.title
    })
    wx.setNavigationBarTitle({
      title: options.title,
    })
    qqmapsdk = new QQMapWX({
      key: '7Z2BZ-EYW6W-KQYRN-OVYVU-WAY7E-O3FC4'
    });
    this._getType(options.classify) //获取xxx分类下的所有类型项
    this._dealAreaInfo() //获取筛选栏的 地区信息
    this._getDealType() //获取平台交易类型项
  },
  onShow() {
    // 地理位置信息授权
    if (!wx.getStorageSync("isHand")) { //地理位置
      this.getUserLocation();
    }
    if (wx.getStorageSync("isHand") && wx.getStorageSync("isHand") == 'alt') {
      console.log('adffa')
      this.getLocation()
    }
    if( this.data.categoryId != 4 ){
      this._getCategoryList() //获取平台发布信息
    }else{
      this._getShopList()//获取平台下所有店铺商家列表
    }
  },
  // 获取用户所在位置信息
  getUserLocation: function() {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function() {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function(res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function(latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        // console.log(JSON.stringify(res));
        // let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          city: city,
          latitude: latitude,
          longitude: longitude
        })
        wx.setStorageSync("isHand", "alt");
      },
      fail: function(res) {
        console.log(res);
        wx.setStorageSync("isHand", "no");
      },
      complete: function(res) {
        // console.log(res);
      }
    });
  },
  // 重新获取用户地理位置权限
  getGps() {
    if (this.data.city != '') {
      return false
    }
    this.getUserLocation();
  },
  //处理筛选类型选项
  _getType(classifyCode) {
    var list = this.data.itemList[0].list
    common.getType(classifyCode, (res) => {
      console.log(res)
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
        return false
      }
      for (let i = 0; i < res.data.length; i++) {
        var type = {
          title: res.data[i].typeName,
          typeCode: res.data[i].typeCode
        }
        list.push(type)
      }
      this.setData({
        "itemList[0].list": list
      })
    })
  },
  //处理地区信息
  _dealAreaInfo() {
    var list = this.data.itemList[1].list
    var areaArray = this.data.areaName
    var areaCodeArray = this.data.areaCode
    for (let i = 0; i < areaArray.length; i++) {
      var area = {
        title: areaArray[i],
        locationCode: areaCodeArray[i]
      }
      list.push(area)
    }
    this.setData({
      "itemList[1].list": list
    })
  },
  //处理交易类型
  _getDealType() {
    var list = this.data.itemList[2].list
    common.getDealType((res) => {
      console.log(res)
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
        return false
      }
      for (let i = 0; i < res.data.length; i++) {
        var dealType = {
          title: res.data[i].typeName,
          tradeTypeCode: res.data[i].typeCode
        }
        list.push(dealType)
      }
      this.setData({
        "itemList[2].list": list
      })
    })
  },
  //获取平台发布信息查询列表
  _getCategoryList() {
    var data = {
      page: this.data.page,
      pageSize: this.data.pageSize,
      classifyCode: this.data.classifyCode,
      title: this.data.keyWord,
      locationCode: this.data.locationCode,
      tradeTypeCode: this.data.tradeTypeCode,
      typeCode: this.data.typeCode,
      userId: this.data.userId
    }
    var list = this.data.hotList
    var loading = true
    var isMore = true
    var time = 0
    var nodata = false
    if (data.page == 1) {
      $.openLoad();
    }
    category_list_model.getCategoryList(data, (res) => {
      console.log(res)
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
        return false
      }
      if (res.data.length < 10) {
        isMore = false
        nodata = true,
          loading = false
      }
      if (data.page == 1) {
        list = res.data
      } else {
        list = res.data ? list.concat(res.data) : list
        time = 500
      }
      setTimeout(() => {
          this.setData({
            hotList: list,
            page: parseInt(data.page) + 1,
            isMore: isMore,
            loading: loading,
            loading_state: false,
            nodata: nodata
          }, () => {
            if (data.page == 1) {
              $.closeLoad()
            }
            this.setData({
              itemHeight: 212
            })
          })
        },
        time
      )
    })
  },
  //获取平台下所有店铺商家列表
  _getShopList() {
    var page= this.data.page
    var pageSize= this.data.pageSize
    var shopName= this.data.keyWord
    var list = this.data.hotList
    var loading = true
    var isMore = true
    var time = 0
    var nodata = false
    if (page == 1) {
      $.openLoad();
    }
    category_list_model.getShopList(page,pageSize,shopName, (res) => {
      console.log(res)
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
        return false
      }
      if (res.data.length < 10) {
        isMore = false
        nodata = true,
          loading = false
      }
      if (page == 1) {
        list = res.data
      } else {
        list = res.data ? list.concat(res.data) : list
        time = 500
      }
      setTimeout(() => {
        this.setData({
          hotList: list,
          page: parseInt(page) + 1,
          isMore: isMore,
          loading: loading,
          loading_state: false,
          nodata: nodata
        }, () => {
          if (page == 1) {
            $.closeLoad()
          }
          this.setData({
            itemHeight: 212
          })
        })
      },
        time
      )
    })
  },
  // 输入关键词搜索 
  inputKeyWord(e) {
    var keyWord = e.detail.value
    this.setData({
      keyWord: keyWord
    })
    if (this.data.keyWord != '') {
      this.setData({
        clearIcon: true
      })
    } else {
      this.setData({
        clearIcon: false
      })
    }
  },
  // 清空输入框
  clearInput() {
    this.setData({
      keyWord: ''
    }, () => {
      this.setData({
        clearIcon: false
      })
    })
  },
  // 点击键盘右下角的搜索按钮
  searchKeyWord() {
    console.log('正在搜索...')
    this.setData({
      page: 1,
      pageSize: 10,
      loading_state: false,
      loading: false,
      nodata: false,
      isMore: true
    })
    if(this.data.categoryId !=4){
      this.setData({
        id: null,
        type: 0,
        area: 0,
        deal: 0,
        typeCode: '',
        locationCode: '',
        tradeTypeCode: ''
      }, (res) => {
        this._getCategoryList() //平台商品信息搜索
      })
    }else{
      this._getShopList() //店铺商家搜索
    }
  },
  // 返回主页
  toShopIndex() {
    wx.navigateBack({
      delta: 1
    })
  },
  // 联系我们
  phoneCall() {
    wx.makePhoneCall({
      phoneNumber: '13318569456',
    })
  },
  // 选择类型
  chooseType(e) {
    var id = e.currentTarget.id
    console.log(id)
    this.setData({
      currentType: id,
      page: 1,
      pageSize: 10,
      loading_state: false,
      loading: false,
      nodata: false,
      isMore: true,
    })
    if (this.data.id == id && this.data.id != null) {
      this.setData({
        id: null
      },()=>{
        this._getCategoryList()//进行筛选信息
      })
    } else {
      this.setData({
        id: id
      })
    }
  },
  // 隐藏选项 和 蒙层
  hideChoose() {
    this.setData({
      id: null,
      page: 1,
      pageSize: 10,
      loading_state: false,
      loading: false,
      nodata: false,
      isMore: true
    },()=>{
      this._getCategoryList() //进行筛选
    })
  },
  // 改变状态
  changeStatus(e) {
    var id = e.currentTarget.id
    var list = this.data.itemList
    console.log(id)
    if (this.data.currentType == 0) {
      this.setData({
        type: id,
        typeCode: list[0].list[id].typeCode
      })
    } else if (this.data.currentType == 1) {
      this.setData({
        area: id,
        locationCode: list[1].list[id].locationCode
      })
    } else if (this.data.currentType == 2) {
      this.setData({
        deal: id,
        tradeTypeCode: list[2].list[id].tradeTypeCode
      })
    }
  },
  // 跳转列表详情
  toCategoryDetail(e) {
    var id = e.currentTarget.id
    var _id = e.currentTarget.dataset._id
    if (this.data.categoryId == 4) {
      wx.navigateTo({
        url: '/index_package/pages/shop_index/shop_index?userId=' + id+'&_id='+_id,
      })
    } else {
      wx.navigateTo({
        url: '../goods_detail/goods_detail?id='+ id + '&type=0',
      })
    }
  },
  // 发布消息
  toPush() {
    var classify = this.data.classifyCode
    var classifyName = this.data.classifyName
    wx.navigateTo({
      url: '../push_info/push_info?classify=' + classify + '&classifyName=' + classifyName,
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  reachBottom() {
    // console.log('已经到底了，不要再拉了')
    this._getCategoryList() //加载数据
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})