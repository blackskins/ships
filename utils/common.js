//封装方法
module.exports = {
  trim: trim,   // 去除首尾空格
  prompt: prompt,  // 普通提示
  openLoad: openLoad,  // 开启加载提示
  closeLoad: closeLoad,  // 关闭加载提示
  back: back, // 后退
  uploadImage: uploadImage, // 上传图片
  previewImage: previewImage, // 预览图片
  stringSplit: stringSplit, // 字符串分割
  importPhone: importPhone, // 导入手机
  temporaryFileUpload: temporaryFileUpload,  // 临时文件上传
  faceReg: faceReg, //检测字符串是否含有表情
}

// 去除首尾空格
function trim(str) {
  if (!str) return '';
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 提示
function prompt(msg, duration = 1500, icon = 'none') {
  wx.showToast({
    title: msg,
    icon: icon,
    duration: duration
  })
}

// 加载中
function openLoad(title = '加载中') {
  wx.showLoading({
    title: title,
  })
}

// 关闭加载
function closeLoad() {
  wx.hideLoading()
}

// 后退
function back(page = 1) {
  wx.navigateBack({
    delta: page
  })
}

// 微信上传图片api封装
function uploadImage(upload_url, imgArr, count, fn) {
  wx.chooseImage({
    count: count, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      var imgs = imgArr;
      for (var i = 0; i < tempFilePaths.length; i++) {
        // if (imgArr.length + i > parseInt(count) - 1) {
        //   break
        // }
        console.log(tempFilePaths[i])
        wx.uploadFile({
          url: upload_url,
          filePath: tempFilePaths[i], //图片路径
          name: 'file',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': wx.getStorageSync('token')
          },
          success: function (res) {
            if (res.statusCode == 200) {
              let data = JSON.parse(res.data);
              (typeof fn === "function") ? fn(data) : false;
            }
          }
        })
      }
    }
  })
}

// 预览图片
function previewImage(url) {
  wx.previewImage({
    urls: [url],
  })
}

// 字符串分割
function stringSplit(str, separator) {
  if (str) {
    return str.split(separator)
  } else {
    return []
  }
}

// 导入手机
function importPhone(data, fn) {
  wx.addPhoneContact({
    firstName: data.firstName ? data.firstName : data.organization,    //名字
    mobilePhoneNumber: data.mobilePhoneNumber ? data.mobilePhoneNumber : '',    //手机号
    addressState: data.addressState ? data.addressState : '',    //联系地址省份
    addressCity: data.addressCity ? data.addressCity : '',    //联系地址城市
    addressStreet: data.addressStreet ? data.addressStreet : '',    //联系地址街道
    organization: (data.organization ? data.organization : '') + '(' + data.addressState + data.addressCity + ')',    //公司
    title: data.title ? data.title : '',    //职位
    workPhoneNumber: data.workPhoneNumber ? data.workPhoneNumber : '',   //工作电话
    email: data.email ? data.email : '',   //电子邮箱
    success: function (res) {
      return typeof (fn) === 'function' ? fn(res) : '';
    }
  })
}

// 临时文件上传
function temporaryFileUpload(file_url, upload_url, fn){
  wx.uploadFile({
    url: upload_url,
    filePath: file_url, //图片路径
    name: 'file',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': wx.getStorageSync('token')
    },
    success: function (res) {
      if (res.statusCode == 200) {
        let data = JSON.parse(res.data);
        (typeof fn === "function") ? fn(data) : false;
      }
    }
  })
}

function faceReg(str){
  let faceReg = /([^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n])|(\s)/g
  return faceReg.test(str)
}