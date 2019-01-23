import { Base } from '../../../utils/base.js'
class Slider_img_model extends Base {
  //上传店铺图/shop/slideshow-update
  updateShopAvatar(_id, shopLogo, callback) {
    let params = {
      url: '/shop/shopLogo-update',
      data: {
        _id: _id,
        shopLogo: shopLogo
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
  //上传店铺轮播图
  updateSliderImg(_id, imgList, callback) {
    let params = {
      url: '/shop/slideshow-update',
      data: {
        _id: _id,
        imgList: imgList
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}
export {
  Slider_img_model
}