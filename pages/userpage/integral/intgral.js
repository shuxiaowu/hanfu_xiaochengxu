// pages/userpage/integral/intgral.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    head_img:'',
    integral:'',
    logins:'',
    integral_list:''
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
        url: url + "getMyInteragal",
        method: "POST",
        data: {
          user_id: logins.user_id
        },
        success: function (res) {
          console.log(res.data.datalist);
          that.setData({
            integral_list: res.data.datalist,
            integral: res.data.integral
          });
        }
      });
      that.setData({
        islogin: true,
        isphoneshow: true,
        phonenumber: logins.phone,
        head_img: logins.user_img,
        user_name: logins.user_name,
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