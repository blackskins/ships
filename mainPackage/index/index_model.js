import { Base } from '../../utils/base.js'
class Index_model extends Base{
  // 获得首页轮播图
  getIndexSlide(callback){
    let params ={
      url:'/sys/slideShow',
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 获得首页公告轮播信息
  getIndexInfoSlide(callback) {
    let params = {
      url: '/sys/notice',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 获取首页分类导航
  getIndexCategory(callback){
    let params = {
      url:'/sys/classify',
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
  //获取平台推荐信息列表
  getRecommendList(page,pageSize,callback){
    let params = {
      url:'/sys/recommendList',
      data:{
        page:page,
        pageSize:pageSize
      },
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
  //获取首页广告信息
  getBannerInfo(callback) {
    let params = {
      url: '/sys/advertisingList',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export{
  Index_model
}