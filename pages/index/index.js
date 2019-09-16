Page({
  data: {
    isshow: false,
    latitude: 28.68194,
    longitude: 115.96191,
    
  },
  onShow: function(e) {
    
  },
  onLoad: function () {
    var that = this
    wx.showLoading({
      title: "定位中",
      mask: true
    })
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
        
        that.setData({
          longitude: longitude,
          latitude: latitude,
          speed: speed,
          accuracy: accuracy
        })
      },
      //定位失败回调
      fail: function () {
        wx.showToast({
          title: "定位失败",
          icon: "none"
        })
      },

      complete: function () {
        //隐藏定位中信息进度
        wx.hideLoading()
      }

    })
  },
  onReady: function(e) {

  },
  daka_btn: function() {

    // var that = this;

    // var isshow = that.data.isshow;
    // console.log(isshow);
    // that.setData({
    //   isshow: !isshow,
    // })
    // 地图选择
    wx.chooseLocation({
      success: function (res) {
        // success
        console.log(res, "location")
        console.log(res.name)
        console.log(res.latitude)
        console.log(res.longitude)
        that.setData({
          roomname: res.name
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
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
  getLocation: function () {
    var _this = this;
    // wx.chooseLocation({
    //   success: function (res) {
    //     var name = res.name
    //     var address = res.address
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     console.log(address);
    //     _this.setData({
    //       name: name,
    //       address: address,
    //       latitude: latitude,
    //       longitude: longitude
    //     })
    //   },
    //   fail:function(){
    //     console.log('12312');
    //   }
    // })
  }
})