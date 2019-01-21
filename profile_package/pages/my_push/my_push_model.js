import { Base } from '../../../utils/base.js'
class My_push_model extends Base{
  //获取平台发布信息列表
  getCategoryList(data, callback) {
    let params = {
      url: '/sys/message',
      data: data,
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  //删除发布信息
  delInfo(_id,callback){
    let params = {
      url:'/sys/message-delete',
      data:{
        _id:_id
      },
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export{
  My_push_model
}