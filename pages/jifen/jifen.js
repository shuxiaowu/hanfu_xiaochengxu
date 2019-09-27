// pages/jifen/jifen.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // list: [
    //   '../../images/jinfen1.jpg',
    //   '../../images/jinfen1.jpg',
    //   '../../images/jinfen1.jpg',
    //   '../../images/jinfen1.jpg'
    // ],
    url: app.base.pub_url,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success(res) {
        var height = res.windowHeight;
        that.setData({
          height: height + "px"
        });
      }
    });
    var url = that.data.url;
    wx.request({
      url: url + "getGoodlist",
      method: "POST",
      data: {},
      success: function(res) {
        if (res.data.code == 0) {
          console.log(res.data);
          that.setData({
            top: res.data.top,
            list: res.data.list,
            more: res.data.havenext
          })
        }
      }
    });
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