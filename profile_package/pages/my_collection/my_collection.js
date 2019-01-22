// profile_package/pages/my_collection/my_collection.js
import { My_collection_model } from './my_collection_model.js'
var my_collection_model = new My_collection_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemHeight:0,//正常的列表项的高度
    keyWord: '',
    inputFocus: false,
    inputMask: true,
    left: '50%',
    translate: 'translate(-50%,-50%)',
    inputWidth: 'auto',
    clearIcon: false,
    collectList: [],//收藏列表
    page: 1,
    pageSize: 10,
    loading_state: false,
    loading: false,
    nodata: false,
    isMore: true,
    scrollHeight: '',
    showMask: false,
    currentId: '',
    postId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    $.openLoad()
    const info = wx.getSystemInfoSync()
    var height1 = info.windowHeight - (88 * info.windowWidth / 750)
    this.setData({
      scrollHeight: height1,
    })
    this._getCollectionList()
  },
  //获取收藏列表
  _getCollectionList() {
    var page = this.data.page
    var pageSize = this.data.pageSize
    var list = this.data.collectList
    var loading = true
    var isMore = true
    var time = 0
    var nodata = false
    if (page == 1) {
      $.openLoad();
    }
    my_collection_model.getCollectionList(page,pageSize,(res)=>{
      console.log(res)
      if(res.code != 0){
        $.prompt(res.msg,2500)
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
        time = 1000
      }
      setTimeout(() => {
        this.setData({
          collectList: list,
          page: parseInt(page) + 1,
          isMore: isMore,
          loading: loading,
          loading_state: false,
          nodata: nodata
        }, () => {
          this.setData({
            itemHeight: 220
          })
          if (page == 1) {
            $.closeLoad()
          }
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
  // 聚焦
  bindSearch() {
    // if (this.data.left == '0%') {
    //   return false
    // }
    this.setData({
      left: '0%',
      translate: 'translate(0%,-50%)',
      inputWidth: '550rpx'
    }, () => {
      this.setData({
        inputFocus: true,
        inputMask: false
      })
    })
    // setTimeout(() => {
    //   this.setData({
    //     inputFocus: true,
    //     inputMask: false
    //   })
    // }, 300)
  },
  // 失去焦点
  // getBack() {
  //   if (this.data.keyWord == '' || this.data.keyWord == null) {
  //     this.setData({
  //       left: '50%',
  //       translate: 'translate(-50%,-50%)',
  //       inputWidth:'auto'
  //     })
  //   }
  // }
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
    }, (res) => {
      this._getCollectionList() //搜索
    })
  },
  //取消收藏接口
  _cancelCollection(_id){
    my_collection_model.cancelCollection(_id,(res)=>{
      console.log(res)
      if(res.code != 0){
        $.prompt(res.msg)
        return false
      }
      console.log('取消收藏成功')
    })
  },
  // 取消收藏事件
  cancelCollect(e) {
    var index = e.currentTarget.dataset.index
    var postId= e.currentTarget.id
    console.log(postId)
    this.setData({
      showMask: true,
      currentId:index,
      postId: postId
    })
  },
  // 禁止弹窗蒙层下可滑动
  stopMove() {
    return false
  },
  // 确认取消收藏
  confirm() {
    var list = this.data.collectList
    var index = this.data.currentId
    var _id = this.data.postId
    list.splice(index, 1)
    // this._cancelCollection(id) //取消收藏
    this.setData({
      showMask: false,
      collectList: list
    }, () => {
      my_collection_model.cancelCollection(_id,(res)=>{
        console.log(res)
        if(res.code != 0){
          $.prompt(res.msg,2500)
          return false
        }
        $.prompt('取消成功')
      })
    })
  },
  // 取消
  cancelDel() {
    this.setData({
      showMask: false
    })
  },
  // 跳转商品详情
  toGoodsDetail(e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/index_package/pages/goods_detail/goods_detail?id=' + id,
    })
  },
  // 页面触底加载更多
  reachBottom() {
    console.log('不要再拉了，我也是有底线的')
    this._getCollectionList()
  }
})