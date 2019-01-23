import { Base } from '../../../utils/base.js'
class Business_join_model extends Base{
  //提交店铺审核信息
  uploadShopInfo(data,callback){
    let params = {
      url:'/shop/submitAudit',
      data:data,
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export{
  Business_join_model
}