import { Base } from '../../../utils/base.js'
class Shop_index_model extends Base{
  //获取店铺轮播图
  getShopSliderImg(_id,callback){
    let params = {
      url:'/shop/slideshow',
      data:{
        _id:_id
      },
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
  //获取店铺所有分类shop/recommendList
  getBusinessCategory(callback) {
    let params = {
      url: '/shop/classify',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  //获取店铺首页推荐列表
  getBusinessRecommend(page,pageSize,shopUserId,callback) {
    let params = {
      url: '/shop/recommendList',
      data:{
        page:page,
        pageSize:pageSize,
        shopUserId:shopUserId
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

}
export{
  Shop_index_model
}