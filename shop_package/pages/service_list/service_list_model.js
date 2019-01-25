import { Base } from '../../../utils/base.js'
class Service_list_model extends Base{
  //获取店铺分类详情列表
  getShopCategoryDetailList(data,callback){
    let params = {
      url:'/shop/message',
      data:data,
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export{
  Service_list_model
}