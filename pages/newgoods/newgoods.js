// pages/newgoods/newgoods.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count1:1,
    count2:2,
    count3:3,
    img1:[],
    img2:[],
    img3:[],
    newlist:''
  },
  newarticle:function(e){
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: 'newarticle/index?id='+id+'&title='+title,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = app.base.pub_url;
    wx.setNavigationBarTitle({
      title: '新品',
    })
    console.log(url);
    wx.request({
      
      url: url +'getNewlist',
      data:{},
      method:'post',
      success:function(reg){
          console.log(reg);
          that.setData({
            newlist:reg.data.newslist
          })
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