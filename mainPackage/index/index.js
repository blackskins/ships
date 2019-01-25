// indexPages/index/index.js
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
import { Index_model } from './index_model.js'
var index_model = new Index_model()
var $ = require('../../utils/common.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollList: [],//轮播图
    scrollTips:[],//通知轮播
    cateList: [],//广告图
    navHeight:0,//导航栏高度
    adList: [], //广告banner图
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
    page: 1,
    pageSize:10,
    loading_state: false,
    loading: false,
    nodata: false,
    isMore: true,
    city: '',
    latitude: '',
    longitude: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    qqmapsdk = new QQMapWX({
      key: '7Z2BZ-EYW6W-KQYRN-OVYVU-WAY7E-O3FC4'
    });
    this._getIndexSlide() //获取首页轮播图
    this._getIndexInfoSlide() //获取首页公告轮播
    this._getIndexCategory() //获取首页分类导航
    this._getRecommendList() //平台首页推荐列表信息查询
    this._getBannerInfo() //获取首页广告banner图
  },
  onShow() {
    // 地理位置信息授权
    if (!wx.getStorageSync("isHand")) { //地理位置
      this.getUserLocation();
    }
    if (wx.getStorageSync("isHand") && wx.getStorageSync("isHand") == 'alt') {
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
  // 获取首页轮播图
  _getIndexSlide(){
    index_model.getIndexSlide((res)=>{
      if(res.code != 0){
        $.prompt(res.msg,2500)
        return false
      }
      console.log(res)
      this.setData({
        scrollList:res.data
      })
    })
  },
  // 获取首页公告轮播
  _getIndexInfoSlide() {
    index_model.getIndexInfoSlide((res) => {
      console.log(res)
      if(res.code != 0){
        $.prompt(res.msg,2500)
        return false
      }
      this.setData({
        scrollTips:res.data
      })
    })
  },
  //获取首页分类导航
  _getIndexCategory() {
    $.openLoad()
    index_model.getIndexCategory((res) => {
      console.log(res)
      this.setData({
        cateList: res.data
      },()=>{
        $.closeLoad()
        this.setData({
          navHeight:'360'
        })
      })
    })
  },
  //获取平台首页推荐列表
  _getRecommendList() {
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
    index_model.getRecommendList(page, pageSize, (res) => {
      console.log(res)
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
        return false
      }
      if (res.data.list.length < 10) {
        isMore = false
        nodata = true,
          loading = false
      }
      if (page == 1) {
        list = res.data.list
      } else {
        list = res.data.list ? list.concat(res.data.list) : list
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
  onReachBottom: function () {
    console.log('djlksalksdskd')
    this._getRecommendList()
  },
  // 禁止滑动
  stopMove() {
    return false
  },
  // ../../index_package/pages/ship_service/ship_service
  toCategory(e) {
    var id = e.currentTarget.id
    var title = e.currentTarget.dataset.title
    var classify = e.currentTarget.dataset.classify
    // console.log(id, title)
    if (id == 6) {
      wx.switchTab({
        url: '../category/category',
      })
    }else if(id == 0){
      wx.navigateTo({
        url: '../../index_package/pages/category_list/category_list?id=' + id + '&title=' + title+'&classify=',
      })
    }else{
      wx.navigateTo({
        url: '../../index_package/pages/category_list/category_list?id=' + id + '&title=' + title + '&classify=' + classify,
      })
    }

  },
  //获取首页广告banner信息
  _getBannerInfo(){
    index_model.getBannerInfo((res)=>{
      console.log(res)
      if(res.code != 0){
        $.prompt(res.msg,2500)
        return false
      }
      this.setData({
        adList:res.data
      })
    })
  },
  // 跳转商品详情
  toGoodsDetail(e){
    var id = e.currentTarget.id
    var title = e.currentTarget.title
    wx.navigateTo({
      url: '/index_package/pages/goods_detail/goods_detail?id='+id+'&type=0'+'&title='+title,
    })
  },
  //跳转广告链接的地址
  toImgUrl(e){
    var imgUrl = e.currentTarget.dataset.url
    wx.navigateTo({
      url: '../../index_package/pages/ad_page/ad_page?imgUrl='+imgUrl,
    })
  },
  // 联系我们
  phoneCall() {
    wx.makePhoneCall({
      phoneNumber: '158130155452',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})