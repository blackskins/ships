import { Base } from './base.js';

class Common extends Base {

  //获取用户信息
  getUserData(callback){
    let params = {
      url:'/wx/minProgram/login',
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
  //获取平台的交易类型sys/typeList
  getDealType(callback){
    let params = {
      url: '/sys/tradeType',
      sCallback:(res)=>{
        callback && callback(res)
      }
    }
    this.request(params)
  }
  //获取平台的类型
  getType(classifyCode,callback) {
    let params = {
      url: '/sys/typeList',
      data:{
        classifyCode:classifyCode
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  //获取商家的类型
  getType(classifyCode, callback) {
    let params = {
      url: '/shop/typeList',
      data: {
        classifyCode: classifyCode
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

}

export { Common }