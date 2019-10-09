// pages/active/active.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.base.addressurl,
    images:[
      '../../images/headpic.jpg',
      '../../images/headpic.jpg',
      '../../images/headpic.jpg',
      '../../images/headpic.jpg',
      ],
      isprince:'',
      listdata:''
  },
  hdarticle:function(e){
    var id = e.currentTarget.dataset.id;
    var url = 'hdarticle/index?id='+id;
    wx.navigateTo({
      url:url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = app.base.pub_url;
    var that = this;
    wx.setNavigationBarTitle({
      title: '活动',
    })
    wx.request({
      url: url+'getactive',
      method:'post',
      success:function(reg){
        console.log(reg.data.data);
        if(reg.data.status==0){
          that.setData({
            listdata: reg.data.data
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