// pages/newgoods/newarticle/index.js
const app = getApp();
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
    url: app.base.addressurl,
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    indicatorcolor: '#c44845',
    duration: 1000,
    artdata:''
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