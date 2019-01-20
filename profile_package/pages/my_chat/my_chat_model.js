import { Base } from '../../../utils/base.js'
class My_chat_model extends Base{
  // 获取我的联系列表
  getMyChatList(page,pageSize,callback){
    let params = {
      url:'/user/contact',
      data:{
        page:page,
        pageSize:pageSize
      },
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export{
  My_chat_model
}