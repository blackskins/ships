import { Base } from '../../../utils/base.js'
class Category_list_model extends Base{
  //获取平台分类查询列表
  getCategoryList(data,callback){
    let params ={
      url:'/sys/message',
      data:data,
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
  //获取平台下所有商家店铺信息列表
  getShopList(page,pageSize,shopName, callback) {
    let params = {
      url: '/shop/shopList',
      data: {
        page:page,
        pageSize:pageSize,
        shopName:shopName
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export{
  Category_list_model
}