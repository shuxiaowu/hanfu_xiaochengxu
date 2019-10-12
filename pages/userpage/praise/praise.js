// pages/userpage/praise/praise.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addurl: app.base.addressurl,
    praise_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var logins = wx.getStorageSync('hanfu_logins');
    wx.setNavigationBarTitle({
      title: '我的点赞',
    })
    let that = this;
    var url = app.base.pub_url;
    if (logins) {
      wx.request({
        url: url + "getMyPraise",
        method: "POST",
        data: {
          user_id: logins.user_id
        },
        success: function (res) {
          console.log(logins.user_id)
          console.log(res.data);
          var data = res.data.data;
          that.setData({
            praise_list: data
          });
        }
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