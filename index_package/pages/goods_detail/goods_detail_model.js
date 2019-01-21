import { Base } from '../../../utils/base.js'
class Goods_detail_model extends Base{
  //获取平台发布信息详情
  getInfoDetail(_id,callback){
    let params = {
      url:'/sys/message-detail',
      data:{
        _id:_id,
      },
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
  //添加收藏
  addCollection(postId,callback){
    let params = {
      url:'/user/favorite-create',
      data:{
        postId:postId
      },
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
  //添加联系
  addChat(postId, callback) {
    let params = {
      url: '/user/contact-create',
      data: {
        postId: postId
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export{
  Goods_detail_model
}