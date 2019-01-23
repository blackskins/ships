import { Base } from '../../../utils/base.js'
class Shop_category_model extends Base{
  //获取商家分类下的数量
  getCategoryNum(callback){
    let params = {
      url:'/shop/messageCountByClassify',
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export{
  Shop_category_model
}