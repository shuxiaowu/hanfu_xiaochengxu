// pages/active/hdarticle/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.base.addressurl,
    id:0,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    indicatorcolor:'#c44845',
    duration: 1000,
    artdata:'',
    newgood:'',
    applyheadimg:'',
    num:'',
    phonetype:app.base.mySystemInfo()
    
  },
  applybtn:function(e){
    var that = this;
    var url = app.base.pub_url;
    var id = that.data.id;
    var logins = wx.getStorageSync('hanfu_logins');
    if(logins){
      wx.showModal({
        title: '提示',
        content: '确定报名吗？',
        success(res) {
          if (res.confirm) {
            wx.request({
              url: url + 'applyActive',
              data:{
                news_id:id,
                user_id:logins.user_id
              },
              method: 'post',
              success: function (reg) {
                wx.showToast({
                  icon:'none',
                  title: reg.data.msg,
                })
                if(reg.data.code==0){
                  that.setData({
                    isapply: reg.data.istrue,
                    applyheadimg: reg.data.apply_img,
                    num: reg.data.apply_count
                  })
                }
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    }else{
      wx.showLoading({
        title: '请登录',
        duration: 1000
      })
      wx.switchTab({
        url: '../../userpage/userpage',
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      duration: 1000
    })
    // console.log(app.base.mySystemInfo())
    var id = options.id;
    var that = this;
    var url = app.base.pub_url;
    var title = options.title;
    var logins = wx.getStorageSync('hanfu_logins');
    // wx.getSystemInfo({
      
    //   success: function (res) {
    //     var phonetype = false;
    //     var modelce = 'wwiPhone XS';
    //     if (res.model.indexOf('iPhone X')==0) {
    //       phonetype = true;
    //     } else {
    //       phonetype = false;
    //     }
    //     console.log(phonetype);
    //     that.setData({
    //       phonetype:phonetype
    //     })
    //   }
    // })
    wx.setNavigationBarTitle({
      title: title,
    })
    if(id){
      wx.request({
        url: url + 'getActiveArt',
        data:{
          id:id,
          user_id:logins.user_id
        },
        method: 'post',
        success: function (reg) {
         that.setData({
           artdata:reg.data.data,
           newgood: reg.data.newgood,
           id:id,
           isapply: reg.data.istrue,
           applyheadimg:reg.data.apply_img,
           num: reg.data.apply_count,
           isapply: reg.data.isapply
         })
        }
      })
    }else{
      wx.showToast({
        icon:'loading',
        title: '数据出错',
      })
      wx.switchTab({
        url: '../active'
      })
    }

  },
  // 预览图片
  previewImg: function (e) {
    let that = this;
    var imgurl = that.data.url +that.data.artdata.uploadimg;
    var arr = new Array();
    arr[0] = imgurl;
    wx.previewImage({
      current: arr[0],
      urls: arr,
    })
  },
  newbtn:function(e){
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: '../../newgoods/newarticle/index?id='+id+'&title='+title,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that = this;
    var url = app.base.pub_url;
    var logins = wx.getStorageSync('hanfu_logins');
    if (logins) {
      wx.request({
        url: url + 'addFxSshare',
        data: {
          user_id: logins.user_id,
          news_id: that.data.id
        },
        method: 'post',
        success: function (reg) {
          setTimeout(() => {
            wx.showToast({
              icon: 'none',
              title: reg.data.msg,
              duration: 3000
            })
          }, 2000)

        }
      })
    }else{
      wx.switchTab({
        url: '../../userpage/userpage',
      })
      wx.showToast({
        icon: 'none',
        title: '请登录',
        duration: 2000
      })
    }

  }
})