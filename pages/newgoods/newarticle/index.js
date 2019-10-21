// pages/newgoods/newarticle/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
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

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model);
        that.setData({
          isiphone5: true
        })
      },
    })
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
        wx.showLoading({
          title: '加载中',
          duration: 1000
        })
        that.setData({
          artdata: reg.data.data,
          id:id
        })
      }
    })
  },

  eventDraw() {
    var that = this;
    var logins = wx.getStorageSync('hanfu_logins');
    var url = app.base.pub_url;
    var avatar = app.base.addressurl + that.data.artdata.thumbs[0];
    var newsdata = that.data.artdata;
    console.log(newsdata);
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
                  top: 15,
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
                  url: avatar,
                  top: 90,
                  left:11,
                  width: 354,
                  height: 186
                },
                {
                  type: 'text',
                  content: newsdata.title.substring(0,10)+'...',
                  fontSize: 22,
                  lineHeight: 21,
                  color: '#000',
                  textAlign: 'left',
                  top: 295,
                  left: 30,
                  width: 287,
                  MaxLineNumber: 2,
                  breakWord: true,
                  bolder: true
                },
               
 
                {
                  type: 'image',
                  url: '../../images/icon_sh.png',
                  top: 330,
                  left: 30,
                  width: 15,
                  height: 15
                },
                {
                  type: 'text',
                  content: newsdata.shopstore,
                  fontSize: 13,
                  color: '#7E7E8B',
                  textAlign: 'left',
                  top: 335,
                  left: 55,
                  // textDecoration: 'line-through'
                },
                // 
                {
                  type: 'image',
                  url: '../../images/icon_tel.png',
                  top: 360,
                  left: 30,
                  width: 15,
                  height: 17
                },
                {
                  type: 'text',
                  content: newsdata.phone,
                  fontSize: 13,
                  color: '#7E7E8B',
                  textAlign: 'left',
                  top: 365,
                  left: 55,
                  // textDecoration: 'line-through'
                },
                // 
                // 
                {
                  type: 'image',
                  url: '../../images/position.png',
                  top: 390,
                  left: 30,
                  width: 20,
                  height: 20
                },
                {
                  type: 'text',
                  content: newsdata.address.substring(0,23)+'...',
                  fontSize: 13,
                  color: '#7E7E8B',
                  textAlign: 'left',
                  top: 395,
                  left: 55
                  // textDecoration: 'line-through'
                },
                // 
                {
                  type: 'text',
                  content: '活动经费：',
                  fontSize: 13,
                  color: '#7E7E8B',
                  textAlign: 'left',
                  top: 424,
                  left: 30,
                  // textDecoration: 'line-through'
                },
                {
                  type: 'text',
                  content: '￥' + newsdata.saleprice,
                  fontSize: 19,
                  color: '#E62004',
                  textAlign: 'left',
                  top: 420,
                  left: 90,
                  bolder: true
                },
                {
                  type: 'text',
                  content: '原价：',
                  fontSize: 13,
                  color: '#7E7E8B',
                  textAlign: 'left',
                  top: 424,
                  left: 185,
                  // textDecoration: 'line-through'
                },
                {
                  type: 'text',
                  content: '￥' + newsdata.price,
                  fontSize: 16,
                  color: '#7E7E8B',
                  textAlign: 'left',
                  top: 424,
                  left: 220,
                  // bolder: true,
                  textDecoration: 'line-through'
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
                  type: 'text',
                  content: logins.user_name ,
                  fontSize: 18,
                  color: '#000',
                  textAlign: 'left',
                  top: 495,
                  left: 85,
                  // textDecoration: 'line-through'
                },
                {
                  type: 'text',
                  content:'长按立即添加>>',
                  fontSize: 13,
                  color: '#c44845',
                  textAlign: 'left',
                  top: 520,
                  left: 85,
                  // textDecoration: 'line-through'
                },
                {
                  type: 'image',
                  url: img,
                  top: 485,
                  left: 295,
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
  //保存相册
  eventSave: function () {
    var that = this;
    // that.buried('SaveAndShareToMoments');
    //查看授权状态；
    if (wx.getSetting) {//判断是否存在函数wx.getSetting在版本库1.2以上才能用
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success(res) {
                wx.saveImageToPhotosAlbum({
                  filePath: that.data.shareImage,
                  success: function (res) {
                    wx.showToast({
                      title: '图片保存成功',
                    });
                  },
                  fail: function (res) {
                    wx.showToast({
                      title: '图片保存失败',
                      icon: 'none',
                    });
                  }
                })
              },
              fail: function (res) {
                //拒绝授权时会弹出提示框，提醒用户需要授权
                wx.showModal({
                  title: '提示',
                  content: '保存图片需要授权，是否去授权',
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: function (res) {

                        }
                      })
                    }
                  }
                })
              }
            })
          } else {//已经授权
            wx.saveImageToPhotosAlbum({
              filePath: that.data.shareImage,
              success: function (res) {
                wx.showToast({
                  title: '图片保存成功',
                });
              },
              fail: function (res) {
                wx.showToast({
                  title: '图片保存失败',
                  icon: 'none',
                });
              }
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '因当前微信版本过低导致无法下载，请更新至最新版本',
        showCancel: false,
        complete: function () {

        }
      })
    }
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
  },
  maskbtn: function () {
    var that = this;
    that.setData({
      mask: false,
    })
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
    var that = this;
    var url = app.base.pub_url;
    var logins = wx.getStorageSync('hanfu_logins');
    if(logins){
      wx.request({
        url: url + 'addRepeat',
        data: {
          user_id: logins.user_id,
          news_id: that.data.id
        },
        method: 'post',
        success: function (reg) {
          wx.showToast({
            icon: 'none',
            title: reg.data.msg,
            duration: 3000
          })
        }

      })
    }else{
      wx.switchTab({
        url: '../../userpage/userpage',
      })
      wx.showToast({
        icon:'none',
        title: '请登录',
      })
    }

  }
})