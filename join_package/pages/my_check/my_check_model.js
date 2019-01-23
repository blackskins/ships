import {
  Base
} from '../../../utils/base.js'
class My_check_model extends Base {
  //获取审核记录
  getCheckHistory(callback) {
    let params = {
      url: '/shop/auditLogging',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export {
  My_check_model
}