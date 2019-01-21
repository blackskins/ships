import { Base } from '../../../utils/base.js'
class Edit_goods_model extends Base{
  //获取平台发布信息详情
  getInfoDetail(_id, callback) {
    let params = {
      url: '/sys/message-detail',
      data: {
        _id: _id,
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  //编辑发布信息
  editInfo(data, callback) {
    let params = {
      url: ' /sys/message-update',
      data: data,
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  //获取平台发布信息 基本信息的字段
  getBaseInfo(classifyCode, callback) {
    let params = {
      url: '/sys/message-basicInfo',
      data: {
        classifyCode: classifyCode
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 获取交易类型
  getDealType(callback) {
    let params = {
      url: '/sys/tradeType',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 获取类型
  getType(classifyCode, callback) {
    let params = {
      url: '/sys/typeList',
      data: {
        classifyCode: classifyCode
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  // 平台添加发布信息
  pushInfo(data, callback) {
    let params = {
      url: '/sys/message-create',
      data: data,
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export{
  Edit_goods_model
}