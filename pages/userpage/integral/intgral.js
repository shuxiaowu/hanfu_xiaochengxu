// pages/userpage/integral/intgral.js
var app = getApp();
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
    head_img:'',
    integral:'',
    logins:'',
    integral_list:'',
    loading:false,
    page:2
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
    wx.showLoading({
      title: '加载中',
      duration: 1000
    })
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
          user_id: logins.user_id,
          page:1
        },
        success: function (res) {
          wx.stopPullDownRefresh();
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
    wx.showLoading({
      title: '加载中',
      duration:1000
    })
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
    var logins = wx.getStorageSync("hanfu_logins");
    wx.request({
      url: url + 'getMyInteragal',
      data: {
        user_id: logins.user_id,
        page: page
      },
      method: 'post',
      success: function (reg) {
        var data = reg.data.datalist;
        if (data.length > 0) {
          that.setData({ loading: true, page: page + 1 });
          var integral_list = that.data.integral_list.concat(data);
          setTimeout(() => {
            that.setData({
              integral_list: integral_list,
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