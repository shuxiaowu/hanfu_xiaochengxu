// pages/active/active.js
var app = getApp();
/**
 * 旋转刷新图标
 */
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
    url: app.base.addressurl,
      isprince:'',
      listdata:'',
      status:1,
      page:2,
      loading: false
  },
  hdarticle:function(e){
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    var url = 'hdarticle/index?id='+id+'&title='+title;
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
        console.log(reg.data.data.apply_count);
        console.log(reg.data.data.apply_headpic);
        if(reg.data.status==0){
          that.setData({
            listdata: reg.data.data,
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
    var that = this;
    var url = app.base.pub_url;
    wx.request({
      url: url +'getactive',
      data:{
        page:1
      },
      method:'post',
      success:function(reg){
        var data = reg.data.data;
        // var listdata = that.data.listdata.concat(data);
        console.log(data);
        that.setData({
          listdata: data,
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
      url: url + 'getactive',
      data: {
        page: page
      },
      method: 'post',
      success: function (reg) {
        var data = reg.data.data;
        if(data.length >0){
          that.setData({ loading: true, page: page+1 });
          var listdata = that.data.listdata.concat(data);
          setTimeout(() => {
            that.setData({
              listdata: listdata,
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