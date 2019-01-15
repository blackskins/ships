// shop_package/pages/more_list/more_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight:'',
    list:[
      {
        title: '服务',
        id:1
      },
      {
        title: '用品',
        id:2
      },
      {
        title: '维修',
        id:3
      },
      {
        title: '助航',
        id:4
      },
      {
        title: '加油',
        id:5
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const info = wx.getSystemInfoSync()
    var height1 = info.windowHeight - (88 * info.windowWidth / 750)
    this.setData({
      scrollHeight: height1,
    })
  },
  // 返回主页
  toShopIndex() {
    wx.navigateBack({
      delta: 1
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
  // 跳转到列表详情页
  toListDetail(e){
    var id = e.currentTarget.id
    var title = e.currentTarget.dataset.title
    var port = e.currentTarget.dataset.port
    wx.navigateTo({
      url: '../service_list/service_list?id='+id+'&title='+title+'&port='+port,
    })
  }
})