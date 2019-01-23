// profile_package/pages/business_join/business_join.js
import { Business_join_model } from './business_join_model.js'
var business_join_model = new Business_join_model()
var $ =require('../../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img1: [],
    img2: [],
    img3: [],
    showMask: false,
    currentId: '',
    submitStatus:true,//表单提交的状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // // 选择图片
  // chooseImg(e) {
  //   var that = this
  //   var id = e.currentTarget.id
  //   wx.chooseImage({
  //     // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
  //     count: 1,
  //     sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
  //     success: function(res) {
  //       // 获取成功,将获取到的地址赋值给临时变量
  //       var tempFilePaths = res.tempFilePaths;
  //       if (id == 0) {
  //         that.setData({
  //           //将临时变量赋值给已经在data中定义好的变量
  //           img1: tempFilePaths
  //         })
  //       } else if (id == 1) {
  //         that.setData({
  //           //将临时变量赋值给已经在data中定义好的变量
  //           img2: tempFilePaths
  //         })
  //       } else if (id == 2) {
  //         that.setData({
  //           //将临时变量赋值给已经在data中定义好的变量
  //           img3: tempFilePaths
  //         })
  //       }

  //     },
  //     fail: function(res) {
  //       // fail
  //     },
  //     complete: function(res) {
  //       // complete
  //     }
  //   })
  // },
  // //上传图片
  // _uploadFile(img){
  //   for(var i = 0;i<this.data.img[i+1].length;i++){
  //     wx.uploadFile({
  //       url: upload_url,
  //       filePath: img[i], //图片路径
  //       name: 'file',
  //       header: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         // 'token': wx.getStorageSync('token')
  //       },
  //       success: function (res) {
  //         if (res.statusCode == 200) {
  //           let data = JSON.parse(res.data);
  //           (typeof fn === "function") ? fn(data) : false;
  //         }
  //       }
  //     })
  //   }
  // },
  // 选择图片
  upload(e) {
    var upload_url = 'https://dz1api.weishangshouji.cn/resource/imgUpload'
    var id = e.currentTarget.id
    console.log(id)
    if (id == 0) {
      var imgs = this.data.img1
    } else if (id == 1) {
      var imgs = this.data.img2
    }else if(id = 2){
      var imgs = this.data.img3
    }
    var count = 1
    console.log(count)
    $.uploadImage(upload_url, imgs, count, (res) => {
      imgs.push(res.data.url)
      if (id == 0) {
        this.setData({
          img1: imgs
        })
      } else if (id == 1) {
        this.setData({
          img2: imgs
        })
      }else if(id == 2){
        this.setData({
          img3:imgs
        })
      }
    })
  },
  // 预览图片
  previewImg(e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.id;
    //所有图片
    if (id == 0) {
      var imgs = this.data.imgs;
    } else if (id == 1) {
      var imgs = this.data.infoImgs;
    }
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  // 删除相关证件
  delImg(e) {
    var id = e.currentTarget.id
    this.setData({
      currentId: id,
      showMask: true
    })
  },
  // 确认删除
  confirm() {
    if (this.data.currentId == 0) {
      this.setData({
        showMask: false,
        img1:''
      }, () => {
        $.prompt('移除成功')
      })
    }else if(this.data.currentId == 1){
      this.setData({
        showMask: false,
        img2:''
      }, () => {
        $.prompt('移除成功')
      })
    }else if(this.data.currentId == 2){
      this.setData({
        showMask: false,
        img3:''
      }, () => {
        $.prompt('移除成功')
      })
    }
  },
  // 取消删除图片
  cancelDel() {
    this.setData({
      showMask: false
    })
  },
  //提交审核
  formSubmit(e){
    // this._uploadFile()
    var data ={
      userName:e.detail.value.userName,
      shopName:e.detail.value.shopName,
      phone:e.detail.value.phone,
      idCardFront:this.data.img1[0],
      idCardReverse:this.data.img2[0],
      busLicense:this.data.img3[0]
    }
    var reg = /^1(3|4|5|7|8)\d{9}$/;
    if (data.userName == "") {
      $.prompt('姓名不能为空')
        setTimeout(() => {
          this.setData({
            userNameFocus: true,
          })
        }, 300)
      return false
    } else if (data.shopName == "") {
      $.prompt('店铺名不能为空')
      setTimeout(()=>{
        this.setData({
          shopNameFocus: true,
        })
      },300)
      return false
    } else if (!reg.test(data.phone)) {
      $.prompt('请填写正确的手机号码')
      setTimeout(() => {
        this.setData({
          phoneFocus: true
        })
      }, 300)
      return false
    } else if (data.idCardFront == '') {
      $.prompt('请上传您本人的身份证正面照')
      return false
    } else if (data.idCardReverse == "") {
      $.prompt('请上传您本人的身份证反面照')
      return false
    } else if (data.busLicense == "") {
      $.prompt('请上传您的营业执照')
      return false
    }

    if (!this.data.submitStatus) {
      $.prompt('表单信息正在提交，请勿重复提交！', 2500)
      return false
    }
    $.openLoad('正在提交...')
    this.setData({
      submitStatus: false
    })
    business_join_model.uploadShopInfo(data,(res)=>{
      this.setData({
        submitStatus:true
      })
      console.log(res)
      if(res.code != 0){
        $.prompt(res.msg,2500)
        return false
      }
      $.closeLoad()
      $.prompt('提交成功',2000,'success')
      setTimeout(()=>{
        this.toMyCheck()
      },2000)
    })
  },
  // 跳转到我的审核
  toMyCheck() {
    wx.navigateTo({
      url: '../../../join_package/pages/my_check/my_check',
    })
  }
})