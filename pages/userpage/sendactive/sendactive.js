// pages/userpage/sendactive/sendactive.js
const app = getApp();
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09-01',
    imgurl: [],
    urls: [],
    activelatitude: '',
    activelongitude: '',
    isshow: true,
    positionname: '点击获取当前位置',
    phonetype: app.base.mySystemInfo()
  },
  bindDateChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bossbtn: function(e) {
    let that = this;
    that.setData({
      isshow: true
    })
  },
  nobossbtn: function(e) {
    let that = this;
    that.setData({
      isshow: false
    })
  },
  avtiveFormSubmit: function(e) {
    var url = app.base.pub_url;
    let that = this;
    var title = e.detail.value.title;
    var date = e.detail.value.date;
    var content = e.detail.value.textarea;
    var logins = wx.getStorageSync("hanfu_logins");
    var img = that.data.urls[0];
    // 图片上传
    if (img) {
      if (content && date && title){
        wx.showToast({
          title: '提交中...',
          icon: 'loading',
          duration: 2000
        })
        wx.uploadFile({
          url: url + 'uploadImage', //仅为示例，非真实的接口地址
          filePath: img,
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
            var data = JSON.parse(res.data)
            var upimgname = data.saveName;
            if (data.status == 0) {
              wx.request({
                url: url + 'sendActive',
                method: "POST",
                data: {
                  img: upimgname,
                  title: title,
                  date: date,
                  content: content,
                  activelatitude: that.data.activelatitude,
                  activelongitude: that.data.activelongitude,
                  user_id: logins.user_id,
                  addname: that.data.positionname
                },
                success: function (reg) {
                  wx.hideToast();
                  if (reg.data.status == 0) {
                    wx.reLaunch({
                      url: '../userpage',
                    })
                    wx.showToast({
                      icon: 'none',
                      title: '活动发起成功',
                      duration:3000
                    })
                  }
                }
              })
            }
          }
        })
      }else{
        wx.showToast({
          title: '请完善信息',
          icon: 'none',
          duration: 2000
        })
      }

    } else {
      wx.showToast({
        title: '请上传图片',
        icon: 'loading',
        duration: 2000
      })
    }
    // 

  },
  // 预览图片
  previewImg: function(e) {
    let that = this;
    wx.previewImage({
      current: that.data.imgurl[e.currentTarget.dataset.id],
      urls: that.data.imgurl,
    })
  },
  // 上传图片
  chooseImg: function() {
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        that.data.images = tempFilePaths
        // 多图片
        // that.data.imgurl = that.data.imgurl.concat(tempFilePaths)
        // console.log(that.data.imgurl);
        // 单图片
        that.data.imgurl = tempFilePaths
        that.setData({
          images: that.data.imgurl,
          urls: that.data.imgurl
        })

      }
    })
  },
  // 删除图片
  delimg: function(e) {
    let that = this;
    // 多图
    // var index = e.currentTarget.dataset.id;
    //单图
    var index = 0;
    var imgurl = this.data.imgurl;
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('点击确定了');
          imgurl = '';
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          urls: imgurl
        });
      }
    })
  },
  // 定位
  positionbtns: function(e) {
    let that = this;
    wx.chooseLocation({
      success: function(res) {
        // success
        that.setData({
          positionname: res.name,
          activelatitude: res.latitude,
          activelongitude: res.longitude
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var time = util.formatTime(new Date());
    var myDate = new Date();
    var that = this;
    var url = app.base.pub_url;
    myDate.getFullYear();
    myDate.getMonth();
    myDate.getDate();
    wx.getSystemInfo({
      success: function(res) {
        if (res.windowWidth < 375) {
          that.setData({
            isiphone5: true
          })
        }

      },
    })
    wx.request({
      url: url + 'getcontact',
      method: 'post',
      data: {},
      success: function (reg) {
        var addressurl = app.base.addressurl + reg.data.data.thumb
        that.setData({
          weixin: reg.data.data.weixin,
        })
      }
    })
    that.setData({
      currenttime: myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()
    })
    wx.setNavigationBarTitle({
      title: '发起活动',
    })
  }
})