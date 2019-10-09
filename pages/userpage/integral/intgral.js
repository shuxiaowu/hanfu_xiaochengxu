// pages/userpage/integral/intgral.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head_img:'',
    integral:'',
    logins:''
  },
 pagebtn:function(e){
   wx.switchTab({
     url: '../../jifen/jifen'
   })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的积分',
    })
    var logins = wx.getStorageSync("hanfu_logins");
    let that = this; 
    var url = app.base.pub_url;
    if (logins) {
      wx.request({
        url: url + "getUser",
        method: "POST",
        data: {
          user_id: logins.user_id
        },
        success: function (res) {
          if (res.data.code == 0) {
            var data = res.data.memberinfo;
            that.setData({
              islogin: true,
              isphoneshow: true,
              phonenumber: data.phone,
              head_img: data.user_img,
              user_name: data.user_name,
              level: data.level,
              integral: data.integral,
              user_id: logins.user_id
            });
          }
        }
      });
    } else {
      that.setData({
        islogin: false
      });
    }
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