// profile_package/pages/my_chat/my_chat.js
var $ = require('../../../utils/common.js')
const app = getApp()
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
    collectList: [{//收藏列表
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
})