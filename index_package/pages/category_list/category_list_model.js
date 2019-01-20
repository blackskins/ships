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
}
export{
  Category_list_model
}