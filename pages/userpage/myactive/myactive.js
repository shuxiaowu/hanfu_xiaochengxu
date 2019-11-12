// pages/active/active.js
var app = getApp();
/**
 * 旋转刷新图标
 */
function updateRefreshIcon() {
  var deg = 0;
  var animation = wx.createAnimation({
    duration: 1000
  });
  var timer = setInterval(() => {
    if (!this.data.loading)
      clearInterval(timer);
    animation.rotateZ(deg).step();//在Z轴旋转一个deg角度
    deg += 360;
    this.setData({
      refreshAnimation: animation.export()
    })
  }, 2000);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.base.addressurl,
    isprince: '',
    listdata: '',
    status: 1,
    page: 2,
    loading: false,
    iphone: false
  },
  hdarticle: function (e) {
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    var url = '../../active/hdarticle/index?id=' + id + '&title=' + title;
    wx.navigateTo({
      url: url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var url = app.base.pub_url;
    var that = this;
    var logins = wx.getStorageSync('hanfu_logins');
    wx.setNavigationBarTitle({
      title: '活动',
    })
    wx.request({
      url: url + 'getmyactive',
      data:{
        user_id:logins.user_id
      },
      method: 'post',
      success: function (reg) {
        wx.showLoading({
          title: '加载中',
          duration: 1000
        })
        if (reg.data.status == 0) {
          that.setData({
            listdata: reg.data.data,
            page: 2,
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
    var page = that.data.page;
    var logins = wx.getStorageSync('hanfu_logins');
    wx.request({
      url: url + 'getmyactive',
      data: {
        page: page,
        user_id:logins.user_id
      },
      method: 'post',
      success: function (reg) {
        var data = reg.data.data;
        if (data) {
          that.setData({ loading: true, page: page + 1 });
          var listdata = that.data.listdata.concat(data);
          setTimeout(() => {
            that.setData({
              listdata: listdata,
              loading: false,
            })
          }, 2000)
        } else {
          that.setData({ loading: false, page: page });
        }

      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})