import { Base } from '../../../utils/base.js'
class My_collection_model extends Base{
  // 获取收藏列表
  getCollectionList(page,pageSize,callback){
    let params = {
      url:'/user/favorite',
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
  //取消收藏
  cancelCollection(_id,callback){
    let params = {
      url:'/user/favorite-off',
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
  My_collection_model
}