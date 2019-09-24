// pages/userpage/sendactive/sendactive.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09-01',
    imgurl: [],
    urls: [],
    isshow:true,
    positionname: '点击获取当前位置'
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bossbtn:function(e){
    let that = this;
    that.setData({
      isshow:true
    })
  },
  nobossbtn: function (e) {
    let that = this;
    that.setData({
      isshow: false
    })
  },
  // 预览图片
  previewImg: function (e) {
    let that = this;
    console.log(that.data.imgurl);
    wx.previewImage({
      current: that.data.imgurl[e.currentTarget.dataset.id],
      urls: that.data.imgurl,
    })
  },
  // 上传图片
  chooseImg: function () {
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        that.data.images = tempFilePaths
        // 多图片
        // that.data.imgurl = that.data.imgurl.concat(tempFilePaths)
        // console.log(that.data.imgurl);
        // 单图片
        that.data.imgurl = tempFilePaths
         console.log(that.data.imgurl);
        that.setData({
          images: that.data.imgurl,
          urls: that.data.imgurl
        })

      }
    })
  },
  // 删除图片
  delimg: function (e) {
    let that = this;
    // 多图
    // var index = e.currentTarget.dataset.id;
    //单图
    var index = 0;
    var imgurl = this.data.imgurl;


    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          imgurl='';
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
  positionbtns: function (e) {
    let that = this;
    wx.chooseLocation({
      success: function (res) {
        // success
        console.log(res, "location")
        console.log(res.name)
        console.log(res.latitude)
        console.log(res.longitude)
        that.setData({
          positionname: res.name
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发布活动',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})