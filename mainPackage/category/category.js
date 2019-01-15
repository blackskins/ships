// indexPages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList:[
      {
        imgUrl:'/images/icon1.png',
        title:'货源',
        title1:'Supply of goods',
        id:0
      },
      {
        imgUrl: '/images/icon2.png',
        title: '船源',
        title1: 'Shipping source',
        id: 1
      },
      {
        imgUrl: '/images/icon3.png',
        title: '船舶交易',
        title1: 'Shipping trading',
        id: 2
      },
      {
        imgUrl: '/images/icon4.png',
        title: '船舶服务',
        title1: 'Shipping services',
        id: 3
      },
      {
        imgUrl: '/images/icon5.png',
        title: '船员服务',
        title1: 'Crew service',
        id: 4
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 跳转分类列表
  toCategoryList(e){
    var id = e.currentTarget.dataset.id
    var title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: '../../category_package/pages/category_list/category_list?id='+id +'&title='+title,
    })
  }
})