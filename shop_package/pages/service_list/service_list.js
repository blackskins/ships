// shop_package/pages/service_list/service_list.js
import { Service_list_model } from './service_list_model.js'
var service_list_model = new Service_list_model()
var $ =require('../../../utils/common.js')
import { Common } from '../../../utils/common_model.js'
var common = new Common()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemHeight: 0, //列表项高度
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
    type: 0, //选中类型 当前项的下标
    area: 0, //选中地区 当前项的下标
    deal: 0, //选中交易类型 当前项的下标
    typeCode: '',
    locationCode: '',
    tradeTypeCode: '',
    currentType: '',
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
        list: [
          {
            title: '不限'
          }
        ]
      },
      {
        id: 1,
        list: [
          {
            title: '不限'
          }
        ]
      },
      {
        id: 2,
        list: [
          {
            title: '不限'
          }
        ]
      }
    ],
    hotList: [],
    listId: '', //进来时携带的类id
    keyWord: '',
    clearIcon: false,
    port: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const info = wx.getSystemInfoSync()
    var height1 = info.windowHeight - (176 * info.windowWidth / 750)
    this.setData({
      scrollHeight: height1,
    })
    if(options.id){
      this.setData({
        listId: options.id,
      })
    }
    if (options.port) {
      this.setData({
        port: options.port,
      })
    }
    if(options.classifyCode){
      this.setData({
        classifyCode: options.classifyCode
      })
    }
    if (options.keyWord) {//从店铺首页顶部搜索进来
      this.setData({
        keyWord: options.keyWord
      },()=>{
        if(options.keyWord != ''){
          this.setData({
            clearIcon:true
          })
        }
      })
    }
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this._getShopCategoryDetailList() //获取店铺分类下的信息列表
    this._getShopType(options.classifyCode) //获取xxx分类下的所有类型项
    this._dealAreaInfo() //获取筛选栏的 地区信息
    this._getDealType() //获取平台交易类型项
  },
  // 返回主页
  toShopIndex() {
    if (this.data.port == 'item') {
      wx.navigateBack({
        delta: 1,
      })
    }else if(this.data.port == 'list'){
      wx.navigateBack({
        delta:2,
      })
    }
  },
  //处理筛选类型选项
  _getShopType(classifyCode) {
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
  //获取商家店铺下发布商品信息查询列表
  _getShopCategoryDetailList() {
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
    service_list_model.getShopCategoryDetailList(data, (res) => {
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
  /**
  * 页面上拉触底事件的处理函数
  */
  reachBottom() {
    // console.log('已经到底了，不要再拉了')
    this._getShopCategoryDetailList() //加载数据
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
    if (this.data.categoryId != 4) {
      this.setData({
        id: null,
        type: 0,
        area: 0,
        deal: 0,
        typeCode: '',
        locationCode: '',
        tradeTypeCode: ''
      }, (res) => {
        this._getShopCategoryDetailList() //平台商品信息搜索
      })
    } else {
      this._getShopList() //店铺商家搜索
    }
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
      }, () => {
        this._getShopCategoryDetailList()//进行筛选信息
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
    }, () => {
      this._getShopCategoryDetailList() //进行筛选
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
  // 跳转商品详情
  toGoodsDetail(e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/index_package/pages/goods_detail/goods_detail?id=' + id+'&type=1',
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