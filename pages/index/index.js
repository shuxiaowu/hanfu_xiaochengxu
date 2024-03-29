var app = getApp();
Page({
  data: {
    isshow: false,
    markshow:true,
    issignin:false,
    signinurl:'qiandao/index',
    markers:[],
    integral:0
  },
  bindmarkertap: function (e) {
    var id = e.markerId;
    wx.navigateTo({
      url: 'praisepage/praisepage?id='+id,
    })
  },
  onLoad: function (option) {
    wx.showLoading({
      title: '加载中',
      duration: 1000
    })
    var that = this;
    if (option.id) {
      that.setData({
        isshow:true,
        integral: option.integral
      })
    }
    var logins = wx.getStorageSync("hanfu_logins");
    var url = app.base.pub_url;
    if (logins){
      wx.request({
        url: url + 'getsignin',
        method: "POST",
        data: {
          user_id: logins.user_id
        },
        success: function (reg) {
          var data = reg.data.signdata;
          var self_markdatas = reg.data.self_markdatas;

          if (reg.data.status == 0) {
            if (self_markdatas != '') {
              data.push(self_markdatas);
            }
            that.data.signinurl = '';
            that.setData({
              issignin: true,
              markers: data
            })
          }
          that.setData({
            markers: data
          })
        }
      })
    }else{
      wx.request({
        url: url + 'getsignin',
        method: "POST",
        data: {
          user_id: 0
        },
        success: function (reg) {
          var data = reg.data.signdata;
          var self_markdatas = reg.data.self_markdatas;

          if (reg.data.status == 0) {
            if (self_markdatas != '') {
              data.push(self_markdatas);
            }
            that.data.signinurl = '';
            that.setData({
              issignin: false,
              markers: data
            })
          }
          that.setData({
            markers: data
          })
        }
      })
    }

    wx.getLocation({
      type: 'gcj02',
      altitude: true,//高精度定位
      //定位成功，更新定位结果
      success: function (res) {
        // console.log(res);
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        // console.log(latitude, longitude)
        that.setData({
          latitude: latitude,
          longitude: longitude,
          speed: speed,
          accuracy: accuracy,
        })
      },
    })
  },
  onShow: function (option) {
    // var that = this;
    // var url = app.base.pub_url;
    // var logins = wx.getStorageSync("hanfu_logins");
    // if(!logins){
    //   that.setData({
    //     issignin: false,
    //     markers: []
    //   })
    // }else{
    //   wx.request({
    //     url: url + 'getsignin',
    //     method: "POST",
    //     data: {
    //       user_id: logins.user_id
    //     },
    //     success: function (reg) {
    //       var data = reg.data.signdata;
    //       var self_markdatas = reg.data.self_markdatas;

    //       if (reg.data.status == 0) {
    //         if (self_markdatas != '') {
    //           data.push(self_markdatas);
    //         }
    //         that.data.signinurl = '';
    //         that.setData({
    //           issignin: true
    //         })
    //       }
    //       that.setData({
    //         markers: data
    //       })
    //     }
    //   })
    // }
    this.onLoad();
  },
  playticket: function(e) {
    var logins = wx.getStorageSync("hanfu_logins");
    var that = this;

    if (logins){
      wx.navigateTo({
        url: 'qiandao/index',
      })
    }else{
      wx.showToast({
        icon:'none',
        title: '请先登入',
      })

    }
    
  },
  maskbtn: function() {
    var that = this;
    that.setData({
      isshow: false,
    })
  },

  maskclose: function() {
    var that = this;
    that.setData({
      isshow: false,
    })
  },

})