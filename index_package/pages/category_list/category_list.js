// category_package/pages/category_list/category_list.js
// 引入SDK核心类
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryId: '',
    keyWord: '',
    clearIcon: false,
    scrollHeight: '',
    id: null,
    currentItem: '',
    type: 0,
    area: 0,
    deal: 0,
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
            title: '不限'
          },
          {
            title: '散货船'
          },
          {
            title: '游船'
          },
          {
            title: '拖轮'
          },
          {
            title: '驳船'
          },
          {
            title: '客轮'
          }
        ]
      },
      {
        id: 1,
        list: [{
            title: '不限'
          },
          {
            title: '北京'
          },
          {
            title: '上海'
          },
          {
            title: '天津'
          },
          {
            title: '广东'
          },
          {
            title: '河北'
          }
        ]
      },
      {
        id: 2,
        list: [{
            title: '不限'
          },
          {
            title: '出售'
          },
          {
            title: '收购'
          },
          {
            title: '出租'
          },
          {
            title: '求购'
          },
          {
            title: '求租'
          }
        ]
      }
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
      },
      {
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
    ]
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
      categoryId: options.id
    })
    wx.setNavigationBarTitle({
      title: options.title,
    })
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
  // 返回主页
  toShopIndex() {
    wx.navigateBack({
      delta: 1
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
    console.log(id)
    if (this.data.currentType == 0) {
      this.setData({
        type: id
      })
    } else if (this.data.currentType == 1) {
      this.setData({
        area: id
      })
    } else if (this.data.currentType == 2) {
      this.setData({
        deal: id
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
        url: '../goods_detail/goods_detail?id=' + id,
      })
    }
  },
  // 发布消息
  toPush() {
    wx.navigateTo({
      url: '../push_info/push_info',
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