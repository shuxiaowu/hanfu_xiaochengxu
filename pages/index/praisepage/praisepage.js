// pages/index/praisepage/praisepage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:0,
      listdata:'',
      url: app.base.addressurl,
      imgurl:[],
      enabled:false,
      praise:'',
      comment:'',
      author_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id =  options.id;
    var that = this;
    var url = app.base.pub_url;
    var logins = wx.getStorageSync('hanfu_logins');
    wx.request({
      url: url +'getuserpraise',
      method:'post',
      data:{
        id:id,
        user_id:logins.user_id
      },
      success:function(reg){
        var data = reg.data.data;
        var arr = new Array();
        arr[0] = data.uploadimg;
        console.log(reg)
        if(reg.data.status==0){
            that.setData({
              listdata: data,
              imgurl: arr,
              id:id,
              enabled: data.ispraise,
              praise: data.praise,
              comment:data.comment
            })
        }
      }
    })
  },
  //点赞
  zanbtn:function(e){
    var logins = wx.getStorageSync('hanfu_logins');
    var url = app.base.pub_url;
    var that =this;
    var author_id = that.data.listdata.user_id;
    var enabled = that.data.enabled ? false : true;
    var id = that.data.id;
    if (logins){
      wx.request({
        url: url + 'changezan',
        data: {
          iszan: enabled,
          id: id,
          user_id:logins.user_id,
          author_id: author_id
        },
        method: 'post',
        success: function (reg) {
          console.log(reg.data.enabled);
          // console.log(reg.data);
          var priseid = that.data.praise;
          var enabled = reg.data.enabled;
          that.setData({
            enabled: enabled==0 ? false : true,
            praise: enabled == 0 ? priseid - 1 : priseid+1
          })
        }
      })
    }else{
       wx.switchTab({
         url: '../../userpage/userpage',
       })
       wx.showToast({
         icon:'loading',
         title: '请登入',
         duration:2000
       })
    }
  },
  // 预览图片
  previewImg: function (e) {
    let that = this;
    var imgurl = that.data.url + that.data.imgurl[0];
    var arr = new Array();
    arr[0] = imgurl;
    wx.previewImage({
      current: arr[0],
      urls: arr,
    })
  },
  bindFormSubmit:function(e){
    console.log(e.detail.value);
    var that = this;
    var url = app.base.pub_url;
    var id = that.data.id;
    var comment = e.detail.value.comment;
    var logins = wx.getStorageSync('hanfu_logins');
    if (logins){
      wx.request({
        url: url +'addComment',
        method:'post',
        data:{
          user_id:logins.user_id,
          news_id:id,
          content: comment
        },
        success:function(reg){
          console.log(reg);
          if(reg.data.code==0){
            that.setData({
              comment: reg.data.comment
            })

          }
          wx.showToast({
            title:reg.data.msg,
            duration:2000
          })
        }
      })
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