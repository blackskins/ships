// category_package/pages/category_list/category_list.js
import { Category_list_model } from './category_list_model.js'
var category_list_model = new Category_list_model()
var $ = require('../../../utils/common.js')
import { Common } from '../../../utils/common_model.js'
var common = new Common()
// 引入SDK核心类
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemHeight:0,//列表项高度
    categoryId: '',
    keyWord: '',//输入框的关键字
    clearIcon: false,
    scrollHeight: '',
    page:1,
    pageSize:10,
    loading_state: false,
    loading: false,
    nodata: false,
    isMore: true,
    classifyCode: '',//分类码
    classifyName:'',//分类名
    title:'',
    id: null,//筛选种类的下标
    currentItem: '',
    type: 0,//选中类型 当前项的下标
    area: 0,//选中地区 当前项的下标
    deal: 0,//选中交易类型 当前项的下标
    typeCode:'',
    locationCode:'',
    tradeTypeCode:'',
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
            typeCode:'huoyuan1'
          },
          {
            title: '散货船',
            typeCode:'huoyuan2'
          },
          {
            title: '游船',
            typeCode:'huoyuan3'
          },
          {
            title: '拖轮',
            typeCode:'huoyuan4'
          },
          {
            title: '驳船',
            typeCode:'huoyuan5'
          },
          {
            title: '客轮',
            typeCode:'huoyuan6'
          }
        ]
      },
      {
        id: 1,
        list: [{
            title: '不限',
            locationCode:'10001'
          },
          {
            title: '北京',
            locationCode:'10002'
          },
          {
            title: '上海',
            locationCode:'10003'
          },
          {
            title: '天津',
            locationCode:'10004'
          },
          {
            title: '广东',
            locationCode:'10005'
          },
          {
            title: '河北',
            locationCode:'10006'
          }
        ]
      },
      {
        id: 2,
        list: [{
            title: '不限',
            tradeTypeCode:'chuzhu1'
          },
          {
            title: '出售',
            tradeTypeCode:'chuzhu2'
          },
          {
            title: '收购',
            tradeTypeCode:'chuzhu3'
          },
          {
            title: '出租',
            tradeTypeCode:'chuzhu4'
          },
          {
            title: '求购',
            tradeTypeCode:'chuzhu5'
          },
          {
            title: '求租',
            tradeTypeCode:'chuzhu6'
          }
        ]
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
    this._getCategoryList()//获取平台发布信息
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
  //处理筛选选项
  _getType(classifyCode){
    common.getType(classifyCode,(res)=>{
      console.log(res)

    })
  },
  //获取平台发布信息查询列表
  _getCategoryList(){
    var data = {
      page:this.data.page,
      pageSize:this.data.pageSize,
      classifyCode:this.data.classifyCode,
      title:this.data.keyWord,
      locationCode:this.data.locationCode,
      tradeTypeCode: this.data.tradeTypeCode,
      typeCode:this.data.typeCode,
      userId:this.data.userId
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
      if(res.code != 0 ){
        $.prompt(res.msg,2500)
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
            itemHeight:220
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
      isMore: true,
      locationCode: '',
      tradeTypeCode: '',
      typeCode: '',
    },(res)=>{
      this._getCategoryList() //搜索
    })
  },
  // 返回主页
  toShopIndex() {
    wx.navigateBack({
      delta: 1
    })
  },
  // 联系我们
  phoneCall(){
    wx.makePhoneCall({
      phoneNumber: '13318569456',
    })
  },
  // 选择类型
  chooseType(e) {
    var id = e.currentTarget.id
    console.log(id)
    this.setData({
      currentType: id
    })
    if (this.data.id == id && this.data.id != null) {
      this.setData({
        id: null
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
      id: null
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
        typeCode:list[0].list[id].typeCode
      })
    } else if (this.data.currentType == 1) {
      this.setData({
        area: id,
        locationCode:list[1].list[id].locationCode
      })
    } else if (this.data.currentType == 2) {
      this.setData({
        deal: id,
        tradeTypeCode:list[2].list[id].tradeTypeCode
      })
    }
  },
  // 跳转列表详情
  toCategoryDetail(e) {
    var id = e.currentTarget.id
    if (this.data.categoryId == 4) {
      wx.navigateTo({
        url: '/index_package/pages/shop_index/shop_index?id=' + id,
      })
    } else {
      wx.navigateTo({
        url: '../goods_detail/goods_detail?id=' + id+'&type=0',
      })
    }
  },
  // 发布消息
  toPush() {
    var classify = this.data.classifyCode
    var classifyName = this.data.classifyName
    wx.navigateTo({
      url: '../push_info/push_info?classify=' + classify+'&classifyName='+classifyName,
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