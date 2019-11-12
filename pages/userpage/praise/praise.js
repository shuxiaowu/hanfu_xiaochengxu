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
    wx.showLoading({
      title: '加载中',
      duration: 1000
    })
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
          var data = res.data.data;
          console.log(data);
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
    this.onLoad();
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
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var url = app.base.pub_url;
    var page = that.data.page + 1;
    var logins = wx.getStorageSync('hanfu_logins');
    if (logins) {
      wx.request({
        url: url + "getMyPraise",
        method: "POST",
        data: {
          user_id: logins.user_id,
          page:page
        },
        success: function (res) {
          var data = res.data.data;
          console.log(data);
          if (data) {
            that.setData({ loading: true, page: page });
            var praise_list = that.data.praise_list.concat(data);
            setTimeout(() => {
              that.setData({
                praise_list: praise_list,
                loading: false,
              })
            }, 2000)
          } else {
            that.setData({ loading: false, page: page });
          }
        }
      });
    } 

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})