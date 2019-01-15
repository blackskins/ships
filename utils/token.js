import { Config } from 'config.js';

class Token {
  constructor() {
    //this.verifyUrl = Config.restUrl + '/user/Token/verifyToken';//验证token
    this.tokenUrl = Config.restUrl + '/user/Token/getToken';//获取token
  }

  //获取token
  getTokenFromService(scene, callback) {
    var that = this;
    // 登录
    wx.login({
      success: function (res) {
        var code = res.code;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.request({
          url: that.tokenUrl,
          data: {
            'code': code,
            'scene': scene,
          },
          method: 'POST',
          success: function (res) {
            // console.log(res.data);
            if (res.data.token) {
              wx.setStorageSync('token', res.data.token);
            }
            callback && callback(res.data);
          },
          fail: function (res) {
            console.log(res);
          }
        })
      }
    })
  }

}

export { Token }