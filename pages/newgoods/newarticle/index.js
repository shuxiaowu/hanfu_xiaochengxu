// pages/newgoods/newarticle/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://pic25.nipic.com/20121112/9252150_150552938000_2.jpg',
      'http://pic25.nipic.com/20121112/9252150_150552938000_2.jpg',
      'http://pic25.nipic.com/20121112/9252150_150552938000_2.jpg'
    ],
    images: [
      '../../../images/headpic.jpg',
      '../../../images/headpic.jpg',
      '../../../images/headpic.jpg',
      '../../../images/headpic.jpg',
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    indicatorcolor: '#c44845',
    duration: 1000
  },
  preview:function(e){
    let that = this;
    console.log(that.data.imgUrls[e.currentTarget.dataset.id]);
    wx.previewImage({
      current:'http://pic25.nipic.com/20121112/9252150_150552938000_2.jpg',
      urls:that.data.imgUrls,
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