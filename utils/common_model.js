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

}

export { Common }