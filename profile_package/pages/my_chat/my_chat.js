// profile_package/pages/my_chat/my_chat.js
import { My_chat_model } from './my_chat_model.js'
var my_chat_model = new My_chat_model()
var $ = require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord: '',
    inputFocus: false,
    inputMask: true,
    left: '50%',
    translate: 'translate(-50%,-50%)',
    inputWidth: 'auto',
    clearIcon: false,
    chatList: [],
    page: 1,
    pageSize: 10,
    loading_state: false,
    loading: false,
    nodata: false,
    isMore: true,
    scrollHeight: '',
    showMask: false,
    currentId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const info = wx.getSystemInfoSync()
    console.log(info)
    var height1 = info.windowHeight - (88 * info.windowWidth / 750)
    console.log(height1)
    this.setData({
      scrollHeight: height1,
    })
    this._getMyChatList()
  },
  //获取我的联系列表
  _getMyChatList(){
    var page = this.data.page
    var pageSize = this.data.pageSize
    var list = this.data.chatList
    var loading = true
    var isMore = true
    var time = 0
    var nodata = false
    if (page == 1) {
      $.openLoad();
    }
    my_chat_model.getMyChatList(page,pageSize,(res)=>{
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
          chatList: list,
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
    if (this.data.left == '0%') {
      return false
    }
    this.setData({
      left: '0%',
      translate: 'translate(0%,-50%)',
      inputWidth: '550rpx'
    })
    setTimeout(() => {
      this.setData({
        inputFocus: true,
        inputMask: false
      })
    }, 300)
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
  },
  // 跳转商品详情
  toGoodsDetail(e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/index_package/pages/goods_detail/goods_detail?id=' + id,
    })
  },
  // 页面触底加载更多
  reachBottom(){
    console.log('不要再拉了，我也是有底线的')
    this._getMyChatList()
  }
})