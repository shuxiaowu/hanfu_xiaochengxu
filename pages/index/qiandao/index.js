// pages/index/qiandao/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: '',
    urls: '',
    positionname: '',
    signlatitude: '',
    signlongitude: ''
  },
  bindFormSubmit: function(e) {
    let that = this;
    var url = app.base.pub_url;
    var img = that.data.urls;
    var signlatitude = that.data.signlatitude;
    var signlongitude = that.data.signlongitude;
    var content = e.detail.value.textarea;
    var logins = wx.getStorageSync("xinli_logins");
    // 图片上传
    if (img != '') {
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
          console.log(upimgname);
          console.log(data.status);
          if (data.status == 0) {
            wx.request({
              url: url + 'submitSignin',
              method: "POST",
              data: {
                img: upimgname,
                content: e.detail.value.textarea,
                signlatitude: that.data.signlatitude,
                signlongitude: that.data.signlongitude,
                user_id: logins.user_id,
                addname: that.data.positionname
              },
              success: function(reg) {
                if (reg.data.status==0){
                  wx.reLaunch({
                      url: '../index?id=' + logins.user_id,
                    })
                }
              }
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '请上传图片',
        icon: 'loading',
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
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {

        var tempFilePaths = res.tempFilePaths
        that.data.images = tempFilePaths

        // 多图片
        // that.data.imgurl = that.data.imgurl.concat(tempFilePaths)
        // console.log(that.data.imgurl);
        // 单图片
        that.data.urls = tempFilePaths[0]
        that.setData({
          images: tempFilePaths[0],
          urls: tempFilePaths[0]
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
    // wx.getLocation({
    //   type: 'gcj02',
    //   success(res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     var speed = res.speed
    //     var accuracy = res.accuracy
    //     console.log(res);
    //   }
    // })
    wx.setNavigationBarTitle({
      title: '签到',
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