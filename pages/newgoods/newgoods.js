// pages/newgoods/newgoods.js
const app = getApp()
function updateRefreshIcon() {
  var deg = 0;
  console.log('旋转开始了.....')
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
    url:app.base.addressurl,
    count1:1,
    count2:2,
    count3:3,
    img1:[],
    img2:[],
    img3:[],
    newlist:'',
    page:2,
    painting: {},
    shareImage: ''
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
    var that = this;
    var url = app.base.pub_url;
    var page = that.data.page + 1;
    wx.request({
      url: url + 'getNewlist',
      data: {
        page: 1
      },
      method: 'post',
      success: function (reg) {
        var data = reg.data.newslist;
        // var listdata = that.data.listdata.concat(data);
        console.log(data);
        that.setData({
          newlist: data,
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var url = app.base.pub_url;
    var page = that.data.page;
    wx.request({
      url: url + 'getNewlist',
      data: {
        page: page
      },
      method: 'post',
      success: function (reg) {
        var data = reg.data.newslist;
        if (data.length >  0){
          that.setData({ loading: true, page: page+1 });
          var listdata = that.data.newlist.concat(data);
          console.log(page)
          console.log(data)
          setTimeout(() => {
            that.setData({
              newlist: listdata,
              loading: false,
            })
          }, 2000)
        }else{
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