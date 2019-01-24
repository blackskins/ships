import { Base } from '../../../utils/base.js'
class My_goods_model extends Base {
  //获取商家发布信息列表
  getCategoryList(data, callback) {
    let params = {
      url: '/shop/message',
      data: data,
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  //删除发布信息
  delInfo(_id, callback) {
    let params = {
      url: '/shop/message-delete',
      data: {
        _id: _id
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  //是否推荐产品到店铺首页
  pushListRecommend(_id, status,callback) {
    let params = {
      url: '/shop/setRecommend',
      data: {
        _id: _id,
        status:status
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export {
  My_goods_model
}