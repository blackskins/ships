// shopManage_package/pages/category_detail/category_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '',
    id: null,
    currentType: '',
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
    ],
    listId: '',//进来时携带的类id
    keyWord: '',
    clearIcon: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const info = wx.getSystemInfoSync()
    var height1 = info.windowHeight - (176 * info.windowWidth / 750)
    this.setData({
      scrollHeight: height1,
      listId: options.id
    })
    wx.setNavigationBarTitle({
      title: options.title,
    })
  },
  // 返回主页
  toShopIndex() {
    wx.navigateBack({
      delta:2
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})