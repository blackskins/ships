import { Base } from '../../../utils/base.js'
class More_list_model extends Base{
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
}
export {
  More_list_model
}