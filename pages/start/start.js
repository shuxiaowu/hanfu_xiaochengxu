// pages/start/start.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.base.addressurl,
    markshow:true,
    imgstart:''
  },
  startindex:function(e){
    wx.switchTab({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = app.base.pub_url;
    wx.request({
      url: url+'startpage',
      data:{},
      method:'post',
      success:function(reg){
        var data = reg.data;
        if (data.status == 0){
          that.setData({
            imgstart: data.data.thumb
          })
          
        }
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
    setTimeout(function(){
        wx.switchTab({
          url: '../index/index',
        })
    },3000)
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