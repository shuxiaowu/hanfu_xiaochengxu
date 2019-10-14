// pages/newgoods/newarticle/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    url: app.base.addressurl,
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    indicatorcolor: '#c44845',
    duration: 1000,
    artdata:'',
    mask:false
  },
  preview:function(e){
    let that = this;
    var arr = new Array();
    var url = that.data.url;
    var img = that.data.artdata.thumbs;
    for(let i=0;i<img.length;i++){
      arr[i] = url+img[i];
    }
    wx.previewImage({
      current: arr[e.currentTarget.dataset.id],
      urls: arr,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    var that = this;
    var id = options.id;
    var title = options.title;
    var url = app.base.pub_url;
    var logins = wx.getStorageSync('hanfu_logins');
    wx.setNavigationBarTitle({
      title: title,
    })
    wx.request({
      url: url + 'getNewArticle',
      data: {
        user_id: logins.user_id,
        id:id
      },
      method: 'post',
      success: function (reg) {
        that.setData({
          artdata: reg.data.data
        })
      }
    })
  },

  eventDraw() {
    var that = this;
    var logins = wx.getStorageSync('hanfu_logins');
    var url = app.base.pub_url;
    wx.showLoading({
      title: '绘制分享图片中',
      mask: true
    })
    if(logins){
      wx.request({
        url: url+'getWxCode',
        data:{
          user_id:logins.user_id
        },
        method:'post',
        success:function(reg){
          var data = reg.data.data;
          var img = 'data:image/png;base64,'+ data;
          console.log(wx.arrayBufferToBase64(data));
          that.setData({
            mask: true,
            painting: {
              width: 375,
              height: 555,
              clear: true,
              views: [
                {
                  type: 'image',
                  url: '../../images/background.jpg',
                  top: 0,
                  left: 0,
                  width: 375,
                  height: 555
                },
                {
                  type: 'image',
                  url: '../../images/avatar.jpeg',
                  top: 10,
                  left: 100,
                  borderRadius: 0.1,
                  width: 60,
                  height: 60
                },
                {
                  type: 'text',
                  content: '汉服之星',
                  fontSize: 25,
                  color: '#fff',
                  textAlign: 'left',
                  top: 33,
                  left: 170,
                  bolder: false
                },
                {
                  type: 'image',
                  url: '../../images/pic.jpg',
                  top: 110,
                  left: 32.5,
                  width: 310,
                  height: 186
                },
                {
                  type: 'text',
                  content: '七夕同袍面基约饭活动',
                  fontSize: 22,
                  lineHeight: 21,
                  color: '#000',
                  textAlign: 'left',
                  top: 310,
                  left: 30,
                  width: 287,
                  MaxLineNumber: 2,
                  breakWord: true,
                  bolder: true
                },
                {
                  type: 'text',
                  content: '￥80',
                  fontSize: 19,
                  color: '#E62004',
                  textAlign: 'left',
                  top: 387,
                  left: 90,
                  bolder: true
                },
                {
                  type: 'text',
                  content: '活动经费：',
                  fontSize: 13,
                  color: '#7E7E8B',
                  textAlign: 'left',
                  top: 391,
                  left: 30,
                  // textDecoration: 'line-through'
                },
                {
                  type: 'image',
                  url: logins.user_img,
                  top: 485,
                  left: 20,
                  borderRadius: 0.1,
                  width: 60,
                  height: 60
                },
                {
                  type: 'image',
                  url: img,
                  top: 485,
                  left: 300,
                  borderRadius: 0.1,
                  width: 60,
                  height: 60
                }
              ]
            }
          })
        }
      })
    }

  },
  eventSave() {
    console.log(this.data.shareImage)
    wx.saveImageToPhotosAlbum({
      filePath: "http://pic39.nipic.com/20140307/13928177_195158772185_2.jpg",
      success(res) {
        wx.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  eventGetImage(event) {
    console.log(event)
    wx.hideLoading()
    const { tempFilePath, errMsg } = event.detail
    if (errMsg === 'canvasdrawer:ok') {
      this.setData({
        shareImage: tempFilePath
      })
    }
  }
})