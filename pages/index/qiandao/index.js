// pages/index/qiandao/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: [],
    urls: '',
    positionname: '',
    signlatitude: '',
    signlongitude: '',
    self_latitude: '',
    self_longitude: '',


  },
  bindFormSubmit: function(e) {

    let that = this;
    var url = app.base.pub_url;
    var img = that.data.urls;
    var signlatitude = that.data.signlatitude;
    var signlongitude = that.data.signlongitude;
    // if (signlatitude == '' || signlongitude == '') {
    //   signlatitude = that.data.self_latitude;
    //   signlongitude = that.data.self_longitude;
    // }
    var content = e.detail.value.textarea;
    var logins = wx.getStorageSync("hanfu_logins");
    // 图片上传
    if (img != '') {
      if (signlatitude != '' && signlongitude != '') {
        wx.showToast({
          title: '提交中',
          icon: 'loading',
          duration: 2000
        })
        wx.uploadFile({
          url: url + 'uploadImage',
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
                url: url + 'submitSignin',
                method: "POST",
                data: {
                  img: upimgname,
                  content: e.detail.value.textarea,
                  signlatitude: signlatitude,
                  signlongitude: signlongitude,
                  user_id: logins.user_id,
                  addname: that.data.positionname
                },
                success: function(reg) {
                  if (reg.data.status == 0) {
                    var that = this;
                    var url = app.base.pub_url;
                    var logins = wx.getStorageSync('hanfu_logins');
                    wx.request({
                      url: url + 'addDaka',
                      data: {
                        user_id: logins.user_id
                      },
                      method: 'post',
                      success: function(reg2) {
                        wx.showLoading({
                          title: '加载中11',
                          duration: 1000
                        })
                        if (reg2.data.code==0){
                          wx.hideToast();
                          var daka_int = reg2.data.daka;
                          wx.reLaunch({
                            url: '../index?id=' + logins.user_id + '&integral=' + daka_int,
                          })
                        } else if(reg2.data.code ==1){
                          wx.showLoading({
                            title: '授权失效，请重新授权登录',
                            duration: 1000
                          })
                        }
           
                      }

                    })

                  }else{
                    wx.showToast({
                      icon:'none',
                      title: '未知错误',
                    })
                  }
                }
              })
            }
          }
        })
      }else{
        wx.showToast({
          title: '请选择坐标位置',
          icon: 'none',
          duration: 2000
        })
      }

    } else {
      wx.showToast({
        title: '请上传图片',
        icon: 'none',
        duration: 2000
      })
    }
    // 


  },
  // 上传图片
  chooseImg: function() {
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {

        var tempFilePaths = res.tempFilePaths
        that.data.images = tempFilePaths

        // 多图片
        // that.data.imgurl = that.data.imgurl.concat(tempFilePaths)
        // console.log(that.data.imgurl);
        // 单图片
        that.data.urls = tempFilePaths[0]
        var arr = new Array();
        arr[0] = tempFilePaths[0];
        that.setData({
          images: tempFilePaths[0],
          urls: tempFilePaths[0],
          imgurl: arr
        })

      }
    })
  },
  // 预览图片
  previewImg: function(e) {
    let that = this;
    wx.previewImage({
      current: that.data.imgurl[e.currentTarget.dataset.id],
      urls: that.data.imgurl,
    })
  },
  // 删除图片
  delimg: function(e) {
    let that = this;
    var index = e.currentTarget.dataset.id;
    var imgurl = this.data.images;


    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('点击确定了');
          // imgurl.splice(index, 1);
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
          signlatitude: res.latitude,
          signlongitude: res.longitude

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
    wx.showLoading({
      title: '加载中',
      duration: 1000
    })
    let that = this;

    wx.setNavigationBarTitle({
      title: '签到',
    })
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy;
        that.setData({
          self_latitude: latitude,
          self_longitude: longitude
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})