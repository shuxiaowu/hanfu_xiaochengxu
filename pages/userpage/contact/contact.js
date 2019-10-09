// pages/userpage/contact/contact.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imghead:'',
    hottel:'',
    businesstel:'',
    faxtel:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = app.base.pub_url;
    var that = this;
    wx.setNavigationBarTitle({
      title: '联系我们',
    })
    wx.request({
      url: url+'getcontact',
      method:'post',
      data:{},
      success:function(reg){
        var addressurl = app.base.addressurl + reg.data.data.thumb
        that.setData({
          imghead: addressurl,
          hottel: reg.data.data.hottel,
          businesstel: reg.data.data.businesstel,
          faxtel: reg.data.data.faxtel,
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