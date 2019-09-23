// pages/jifen/jfarticle/jfarticle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../../images/hd_article.jpg',
      '../../../images/hd_article.jpg',
      '../../../images/hd_article.jpg'
    ],
    images: [
      '../../../images/headpic.jpg',
      '../../../images/headpic.jpg',
      '../../../images/headpic.jpg',
      '../../../images/headpic.jpg',
    ],
    isshow: false,
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    indicatorcolor: '#c44845',
    duration: 1000
  },
  maskclose: function () {
    var that = this;
    that.setData({
      isshow: false,
    })
  },
  // 预览图片
  previewImg: function (e) {
    let that = this;
    wx.previewImage({
      current: that.data.imgUrls[e.currentTarget.dataset.id],
      urls: that.data.imgUrls,
    })
  },
  dhbtn:function(e){
     var that = this;

    var isshow = that.data.isshow;
    console.log(isshow);
    that.setData({
      isshow: !isshow,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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