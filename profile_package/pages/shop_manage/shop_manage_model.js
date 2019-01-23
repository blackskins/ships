import { Base } from '../../../utils/base.js'
class Shop_manage_model extends Base{
  //获取店铺基本信息
  getShopBasicInfo(callback) {
    let params = {
      url: '/shop/shopBasicInfo',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  //上传店铺图
  updateShopAvatar(_id,shopLogo,callback){
    let params = {
      url:'/shop/shopLogo-update',
      data:{
        _id:_id,
        shopLogo:shopLogo
      },
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export{
  Shop_manage_model
}