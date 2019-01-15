// index_package/pages/shop_index/shop_index.js
// 引入SDK核心类
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollList: [{
        imgUrl: '/images/banner.png'
      },
      {
        imgUrl: '/images/banner.png'
      },
      {
        imgUrl: '/images/banner.png'
      },
      {
        imgUrl: '/images/banner.png'
      },
      {
        imgUrl: '/images/banner.png'
      },
    ],
    cateList: [{
        iconUrl: '../../images/shop1.png',
        title: '服务',
        id: 1
      },
      {
        iconUrl: '../../images/shop2.png',
        title: '用品',
        id: 2
      },
      {
        iconUrl: '../../images/shop3.png',
        title: '维修',
        id: 3
      },
      {
        iconUrl: '../../images/shop4.png',
        title: '更多服务',
        id: 4
      }
    ],
    adList: [{
        imgUrl: '/images/ad1.png',
      },
      {
        imgUrl: '/images/ad2.png',
      },
    ],
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
  },
  // 禁止滑动
  stopMove() {
    return false
  },
  // 跳转相应的列表详情页
  toListDetail(e) {
    var id = e.currentTarget.id
    var title = e.currentTarget.dataset.title
    var port = e.currentTarget.dataset.port
    if (id == 4) {
      wx.navigateTo({
        url: '../../../shop_package/pages/more_list/more_list'
      })
    } else {
      wx.navigateTo({
        url: '../../../shop_package/pages/service_list/service_list?id=' + id + '&title=' + title+'&port='+port,
      })
    }
  },
  // 跳转商品详情
  toGoodsDetail(e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/index_package/pages/goods_detail/goods_detail?id=' + id,
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})