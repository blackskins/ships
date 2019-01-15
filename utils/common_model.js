import { Base } from './base.js';

class Common extends Base {

  // 添加普通form_id
  addUserFormid(form_id, callback) {
    let params = {
      url: '/formid/form_id/add_user_form_id',
      type: 'post',
      data: {
        form_id: form_id
      },
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  // 添加特定form_id
  specialFormId(form_id, form_type, callback) {
    let params = {
      url: '/form_id/special_form_id',
      type: 'post',
      data: {
        form_id: form_id,
        form_type: form_type
      },
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  // 用户权限
  userPower(type, callback) {
    let params = {
      url: '/power/power/user_power_v',
      data: {
        type: type
      },
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  // 用户数据
  userData(callback) {
    let params = {
      url: '/user/data/user_data',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  // 用户转发-转发记录和增加权限接口
  userShare(callback) {
    let params = {
      url: '/share/share/user_share',
      type: 'post',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  // 首次转发领红包
  createOneReward(callback) {
    let params = {
      url: '/agent/User_Reward/createOneReward',
      type: 'post',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  // 开首次转发红包
  openOneReward(callback) {
    let params = {
      url: '/agent/User_Reward/openOneReward',
      type: 'post',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  // 记录点击打电话
  clickPhone(data_id, phone, callback) {
    let params = {
      url: '/data/Collection_And_Analysis/_clickPhone',
      data: {
        data_id: data_id,
        phone: phone
      },
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  //页面计时点击按钮计数
  behaviorLog(path, stay_time, click, callback) {
    let params = {
      url: '/data/Collection_And_Analysis/behaviorLog',
      type: 'post',
      data: {
        path: path,
        stay_time: stay_time,
        click: click
      },
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  //小程序计时
  loginLog(stay_time, callback) {
    let params = {
      url: '/data/Collection_And_Analysis/loginLog',
      type: 'post',
      data: {
        stay_time: stay_time
      },
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  // 记录打用户的电话
  recodeKeepNum(call_user_id, phone, callback) {
    let params = {
      url: '/agent_call_num/recode_keep_num',
      type: 'post',
      data: {
        call_user_id: call_user_id,
        phone: phone
      },
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }
  // 更新用户数据
  updateUserInfo(iv, encryptedData, callback) {
    let params = {
      url: '/User/updateUserInfo',
      type: 'post',
      data: {
        iv: iv,
        encryptedData: encryptedData
      },
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  // 转发数据
  share(callback) {
    let params = {
      url: '/data/Collection_And_Analysis/share',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  // 浏览记录总接口
  keepLookCard(id, type, remain_time, callback){
    let params={
      url: '/radar/people/keepLookCard',
      type: 'post',
      data: {
        id: id,
        type: type,
        remain_time: remain_time
      },
      sCallback: function(res){
        callback && callback(res)
      }
    }
    this.request(params);
  }

  // 清楚后台搜索数据
  delGdRedis(url,callback) {
    let params = {
      url: url,
      sCallback: function (res) {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  // 记录搜索记录
  searchRecord(search_industry, resource, callback) {
    let params = {
      url: '/industry/industry/user_industry_search_record',
      data: {
        search_industry: search_industry,
        resource: resource,
      },
      type: "POST",
      sCallback: function (res) {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  //显示历史搜索记录
  searchShow(resource, callback) {
    let params = {
      url: '/industry/industry/user_industry_search_show',
      data:{
        resource: resource,
      },
      sCallback: function (res) {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  // 获取行业关键词
  industryList(callback) {
    let params = {
      url: '/industry/industry/industry_list',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  // 记录搜索信息
  userSearchInfo(data, callback) {
    let params = {
      url: '/user/Data/userSearchInfo',
      data: data,
      type: 'post',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  // 是否引导过
  getUserIsGuide(callback) {
    let params = {
      url: '/user/data/getUserIsGuide',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  // 引导过
  updateUserIsGuide(callback) {
    let params = {
      url: '/user/data/updateUserIsGuide',
      type: 'post',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  // 新的获取红包
  getUserLogoAndReward(callback) {
    let params = {
      url: '/agent/User_Reward/getUserLogoAndReward',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  // 新的开起红包
  createNewRewardWalletBills(id, callback) {
    let params = {
      url: '/agent/User_Reward/createNewRewardWalletBills',
      type: 'POST',
      data:{
        id: id
      },
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  // 聊天未读数
  getUnreadTotal(callback) {
    let params = {
      url: '/chat/System/getUnreadTotal',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

  // 增加浏览量
  saveDemandData(callback) {
    let params = {
      url: '/analog/Analog_Data/saveDemandData',
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

}

export { Common }