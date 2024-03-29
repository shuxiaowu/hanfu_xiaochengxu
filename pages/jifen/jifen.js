// pages/jifen/jifen.js
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
    animation.rotateZ(deg).step(); //在Z轴旋转一个deg角度
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
    url: app.base.pub_url,
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '积分商城',
    })
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
        wx.showLoading({
          title: '加载中',
          duration: 1000
        })
        wx.stopPullDownRefresh();
        if (res.data.code == 0) {
          that.setData({
            top: res.data.top,
            list: res.data.list,
            more: res.data.havenext,
            page:1
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
    this.onLoad();
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
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    
    var that = this;
    var url = app.base.pub_url;
    var page = that.data.page+1;
    
    wx.request({
      url: url + 'getGoodlist',
      data: {
        page: page
      },
      method: 'post',
      success: function(reg) {
        var data = reg.data.list;
        var havenext = reg.data.havenext;
        console.log('page:'+page);
        console.log(reg.data);
        if (havenext) {
          that.setData({
            loading: true,
            page: page
          });
          var listdata = that.data.list.concat(data);
          setTimeout(() => {
            that.setData({
              list: listdata,
              loading: false,
            })
          }, 2000)
        } else {
          that.setData({
            loading: false,
            page: page
          });
        }

      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})