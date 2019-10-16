// pages/jifen/jfarticle/jfarticle.js
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow: false,
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    indicatorcolor: '#c44845',
    duration: 1000,
    // 
    navShow: false,
    height: "",
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    url: app.base.pub_url,
    content: "",
    goods: "",
    goodsintegral: 0,
    goods_id: 0,
    goodsaddress:'',
    goodstitle:'',
    model_title:'',
    model_content:'',
    phonetype: app.base.mySystemInfo()
  },
  maskclose: function() {
    var that = this;
    that.setData({
      isshow: false,
    })
  },
  // 预览图片
  previewImg: function(e) {
    let that = this;
    wx.previewImage({
      current: that.data.goods.thumb_arr[e.currentTarget.dataset.id],
      urls: that.data.goods.thumb_arr,
    })
  },
  dhbtn: function(e) {
    var formId = e.detail.formId;
    var logins = wx.getStorageSync('hanfu_logins');
    var that = this;
    var url = that.data.url;
    var isshow = that.data.isshow;
    var goodsintegral = that.data.goodsintegral;
    var good_id = that.data.goods_id;
    var goodsaddress = that.data.goodsaddress;
    console.log(logins);
    if (logins) {
      if (good_id) {
        wx.showModal({
          title: '是否确定兑换',
          content: that.data.goodstitle + '消耗' + goodsintegral + '积分',
          success(res) {
            if (res.confirm) {
              wx.request({
                url: url + "addOrder",
                method: "POST",
                data: {
                  goods_integral: goodsintegral,
                  user_id: logins.user_id,
                  goods_id: good_id,
                  address: goodsaddress,
                  telphone: logins.phone,
                  username: logins.user_name,
                  formId: formId
                },
                success: function (res) {
                  console.log(res);
                 
                  that.setData({
                    model_title:res.data.msg,
                    model_content:res.data.backcontent
                  })

                }
              });
              that.setData({
                isshow: !isshow,
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
       
      }
    } else {
      wx.switchTab({
        url: '../../userpage/userpage',
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
      duration: 1000
    })
    var WxParse = require('../../../wxParse/wxParse.js');
    var that = this;
    wx.getSystemInfo({
      success(res) {
        var height = res.windowHeight;
        that.setData({
          height: height + "px"
        });
      }
    });
    var goods_id = options.id;
    var title = options.title;
    var url = that.data.url;
    if (goods_id) {
      wx.request({
        url: url + "getGoodsDetail",
        method: "POST",
        data: {
          goods_id: goods_id
        },
        success: function(res) {
          var content = res.data.goods_info.content;
          WxParse.wxParse('article', 'html', content, that, 5)
          if (res.data.code == 0) {
            console.log(res.data.goods_info);
            var data = res.data.goods_info;
            that.setData({
              goods: data,
              goodstitle:title,
              goods_id: goods_id,
              goodsintegral: data.integral,
              goodsaddress: data.address
            });
          }
        }
      });
    } else {
      wx.showToast({
        icon: 'none',
        title: '该礼品被管理员下架，请重新挑选兑换',
      })
      wx.switchTab({
        url: '../jifen',
      })
    }

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