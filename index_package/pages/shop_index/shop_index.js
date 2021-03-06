// index_package/pages/shop_index/shop_index.js
// 引入SDK核心类
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
const app = getApp()
import { Shop_index_model } from './shop_index_model.js'
var shop_index_model = new Shop_index_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopSlider:[],
    cateHeight:0,
    businessCategory: [],
    adList: [{
        imgUrl: '/images/ad1.png',
      },
      {
        imgUrl: '/images/ad2.png',
      },
    ],
    shopUserId:'',
    page: 1,
    pageSize: 10,
    loading_state: false,
    loading: false,
    nodata: false,
    isMore: true,
    hotList: [{
        imgUrl: '/images/goods_img1.png',
        title: '北京盈客通天下科技有限公司',
        ship_type: '轮船',
        deal_type: '出租',
        create_time: '2019.01.11 16:43'
      },
      {
        imgUrl: '/images/goods_img2.png',
        title: '北京盈客通天下科技有限公司',
        ship_type: '轮船',
        deal_type: '出租',
        create_time: '2019.01.11 16:43'
      },
      {
        imgUrl: '/images/goods_img3.png',
        title: '北京盈客通天下科技有限公司',
        ship_type: '轮船',
        deal_type: '出租',
        create_time: '2019.01.11 16:43'
      },
      {
        imgUrl: '/images/goods_img4.png',
        title: '北京盈客通天下科技有限公司',
        ship_type: '轮船',
        deal_type: '出租',
        create_time: '2019.01.11 16:43'
      }
    ],
    city: '',
    latitude: '',
    longitude: '',
    keyWord:'',
    clearIcon:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    qqmapsdk = new QQMapWX({
      key: '7Z2BZ-EYW6W-KQYRN-OVYVU-WAY7E-O3FC4'
    });
    this.setData({
      shopUserId:options.userId
    })
    this._getShopSliderImg(options._id) //获取店铺首页轮播
    this._getBusinessCategory() // 获取店铺分类
    this._getBusinessRecommend(options.userId) //获取店铺首页推荐列表
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
  },
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
    var keyWord = this.data.keyWord
    wx.navigateTo({
      url: '../../../shop_package/pages/service_list/service_list?title=全部分类'+'&keyWord='+keyWord,
    })
    
  },
  //获取店铺首页轮播图
  _getShopSliderImg(_id){
    shop_index_model.getShopSliderImg(_id,(res)=>{
      console.log(res)
      if(res.code != 0){
        $.prompt(res.msg,2500)
        return false
      }
      this.setData({
        shopSlider:res.data.imgList
      })
    })
  },
  //获取商家所有分类信息
  _getBusinessCategory(){
    $.openLoad()
    shop_index_model.getBusinessCategory((res)=>{
      console.log(res)
      if(res.code != 0){
        $.prompt(res.msg,2500)
        return false
      }
      this.setData({
        businessCategory:res.data
      },()=>{
        $.closeLoad()
        this.setData({
          cateHeight:180
        })
      })
    })
  },
  // 跳转相应的列表详情页
  toListDetail(e) {
    var title = e.currentTarget.dataset.title
    var classifyCode = e.currentTarget.dataset.classify
    var port = e.currentTarget.dataset.port
    if (port == 'list') {
      wx.navigateTo({
        url: '../../../shopManage_package/pages/shop_category/shop_category'
      })
    } else {
      wx.navigateTo({
        url: '../../../shop_package/pages/service_list/service_list?id=' + id + '&title=' + title+'&port='+port+'&classifyCode='+classifyCode,
      })
    }
  },
  //获取店铺首页推荐商品列表
  _getBusinessRecommend(shopUserId) {
    var page = this.data.page
    var pageSize = this.data.pageSize
    var list = this.data.hotList
    var loading = true
    var isMore = true
    var time = 0
    var nodata = false
    if (page == 1) {
      $.openLoad();
    }
    shop_index_model.getBusinessRecommend(page,pageSize,shopUserId, (res) => {
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
        })
      },
        time
      )
    })
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var shopUserId = this.data.shopUserId
    this._getBusinessRecommend(shopUserId)
  },
  // 跳转商品详情
  toGoodsDetail(e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/index_package/pages/goods_detail/goods_detail?id=' + id+'&type=1',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})