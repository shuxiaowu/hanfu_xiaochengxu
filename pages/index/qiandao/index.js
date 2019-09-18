// pages/index/qiandao/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: [],
    urls: [],
    positionname:'获取当前位置',
  },
  bindFormSubmit: function(e) {
    console.log(e.detail.value)
  },
  // 上传图片
  chooseImg: function() {
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        that.data.images = tempFilePaths
        // 多图片
        that.data.imgurl = that.data.imgurl.concat(tempFilePaths)
        console.log(that.data.imgurl);
        // 单图片
        // that.data.urls = tempFilePaths[0]
        that.setData({
          images: tempFilePaths[0],
          urls: that.data.imgurl
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
    var imgurl = this.data.imgurl;


    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('点击确定了');
          imgurl.splice(index, 1);
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
        console.log(res, "location")
        console.log(res.name)
        console.log(res.latitude)
        console.log(res.longitude)
        that.setData({
          positionname: res.name
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