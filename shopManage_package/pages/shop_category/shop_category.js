// shopManage_package/pages/shop_category/shop_category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        title: '服务',
        id:1,
        num:'9'
      },
      {
        title: '用品',
        id:2,
        num:'15'
      },
      {
        title: '维修',
        id:3,
        num:'124'
      },
      {
        title: '助航',
        id:4,
        num:'0'
      },
      {
        title: '加油',
        id:5,
        num:'1248'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 跳转到相应的列表详情
  toListDetail(e){
    var id = e.currentTarget.id
    var title = e.currentTarget.dataset.title
    console.log(title)
    wx.navigateTo({
      url: '../category_detail/category_detail?id='+id+'&title='+title,
    })
  }
})