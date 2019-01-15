import { Config } from './config.js';
import { Token } from './token.js';
var token = new Token();

// var config = new Config;
class Base {
  constructor() {
    this.BaseRequestUrl = Config.restUrl;
  }

  // 当noRefech为true时，不做未授权重试机制
  request(params, noRefetch = false) {
    var token = wx.getStorageSync('token');
    if (!token) {
      setTimeout(() => {
        this.request(params, noRefetch);
      }, 100)
      return false;
    }
    var that = this;
    var url = this.BaseRequestUrl + params.url+'?token='+token;
    if (!params.type) {
      params.type = 'POST';
    }
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var code = res.statusCode.toString();
        //console.log(code);
        var startChar = code.charAt(0);
        if (startChar == '2') {
          params.sCallback && params.sCallback(res.data);
        }
        else {
          //AOP
          if (code == '401') {
            if (!noRefetch) {
              that._refetch(params);
            }
          }
          if (noRefetch) {
            params.eCallback && params.eCallback(res.data);
          }
        }
      },
      fail: function (err) {
        console.log(err);
      }
    })
  }
  // 重新请求token
  _refetch(params) {
    var scene = wx.getStorageSync('scene')
    token.getTokenFromService(scene, (token) => {
      this.request(params, true);
    });
  }

}

export { Base }