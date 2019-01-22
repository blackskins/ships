// profile_package/pages/my_push/my_push.js
import { My_push_model } from './my_push_model.js'
var my_push_model = new My_push_model()
var $ = require('../../../utils/common.js')
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opacity: 0,//背景蒙层的透明度
    animate: '',//删除图片 动画弹窗
    currentIndex:'fly',//删除 当前项的索引下标
    itemHeight: 220,//商品项高度
    defaultHeight:0,//商品项默认高度
    translateX:'none',//商品项向左飞出
    port:'',
    keyWord:'',
    clearIcon:false,
    scrollHeight: '',
    hotList: [],//平台发布信息列表
    page: 1,
    pageSize: 10,
    loading_state: false,
    loading: false,
    nodata: false,
    isMore: true,
    classifyCode: '',//分类码
    classifyName: '',//分类名
    title: '',
    id: null,
    _id: '',
    currentType: '',
    currentItem: '',
    type: '',
    area: '',
    deal: '',
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
    itemList: [
      {
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
    showMask: false, //删除的蒙层
    currentId: '', // 商品当前索引id
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: '7Z2BZ-EYW6W-KQYRN-OVYVU-WAY7E-O3FC4'
    });
    const info = wx.getSystemInfoSync()
    var height = info.windowHeight - (274 * info.windowWidth / 750)
    var height1 = info.windowHeight - (88 * info.windowWidth / 750)
    this.setData({
      scrollHeight: height,
      scrollHeight1: height1,
      port:options.port
    })
    this._getCategoryList()
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
  getUserLocation: function () {
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
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
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
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
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
      fail: function (res) {
        console.log(res);
        wx.setStorageSync("isHand", "no");
      },
      complete: function (res) {
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
    my_push_model.getCategoryList(data, (res) => {
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
        time = 300
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
            defaultHeight: 220,
          })
        })
      },
        time
      )
    })
  },
  //触底加载
  reachBottom(){
    this._getCategoryList()
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
  // 禁止弹窗蒙层下可滑动
  stopMove() {
    return false
  },
  // 删除商品
  delGoods(e) {
    var id = e.currentTarget.id
    var _id = e.currentTarget.dataset._id
    console.log(id)
    this.setData({
      showMask: true,
      opacity:1,
      animate:'animate .3s',
      currentId: id,
      _id:_id
    })
  },
  // 确认删除
  confirm() {
    var id = this.data.currentId
    this.setData({
      currentIndex:id
    })
    var _id = this.data._id
    var list = this.data.hotList
    list.splice(id, 1)
    my_push_model.delInfo(_id, (res) => {
      console.log(res)
      if (res.code != 0) {
        $.prompt(res.msg, 2500)
        return false
      }
      this.setData({
        opacity:0,
        animate:'back .5s'
      },()=>{
        setTimeout(()=>{
          this.setData({
            showMask: false,
            translateX:'translateX(-120%)',
            itemHeight:0,
          }, () => {
            setTimeout(()=>{
              this.setData({
                hotList: list,
                currentIndex:'fly',
                translateX:'none'
              },()=>{
                $.prompt('删除成功')
              })
            },500)
          })
        },500)
      })
    })
  },
  // 取消删除商品
  cancelDel() {
    this.setData({
      opacity:0,
      animate:'back .5s'
    },()=>{
      setTimeout(()=>{
        this.setData({
          showMask: false
        })
      },500)
    })
  },
  // 发布或编辑商品
  toEdit(e) {
    var id = e.currentTarget.id
    var _id = e.currentTarget.dataset._id
    var classifyCode = e.currentTarget.dataset.classify_code
    var port = this.data.port
    wx.navigateTo({
      url: '../../../shopManage_package/pages/edit_goods/edit_goods?id=' + id+'&port='+port+'&_id='+_id+'&classifyCode='+classifyCode,
    })
  },
  // 跳转商品详情
  toGoodsDetail(e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/index_package/pages/goods_detail/goods_detail?id=' + id,
    })
  },
})