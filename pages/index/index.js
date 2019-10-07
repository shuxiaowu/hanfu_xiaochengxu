var app = getApp();
Page({
  data: {
    isshow: false,
    markshow:true,
    issignin:false,
    signinurl:'qiandao/index',
    markers: [{
      id: 1,
      latitude: 28.674680,
      longitude: 115.993401,
      iconPath: '../../images/headpic.jpg',
      callout: {
        content: '汉服1',
        color: '#fff',
        fontSize: 12,
        borderRadius: 25,
        borderWidth: 5,
        borderColor: '#666',
        bgColor: '#666',
        display: 'ALWAYS',
      },
      width: 30,
      height: 30,
    },
    {
      id: 2,
      latitude: 28.674880,
      longitude: 115.993601,
      iconPath: '../../images/headpic.jpg',
      callout: {
        content: '汉服2',
        color: '#fff',
        fontSize: 12,
        borderRadius: 25,
        borderWidth: 5,
        borderColor: '#666',
        bgColor: '#666',
        display: 'ALWAYS',
      },
      width: 30,
      height: 30,
    }
    ],
  },
  bindmarkertap: function (e) {
    console.log(e.markerId);
    wx.navigateTo({
      url: 'praisepage/praisepage',
    })
  },
  onLoad: function (option) {
    console.log(option.id)
    
    var that = this;
    if (option.id) {
      that.setData({
        isshow:true
      })
    }
    var logins = wx.getStorageSync("hanfu_logins");
    var url = app.base.pub_url;
    if(logins){
      wx.request({
        url: url + 'getsignin',
        method: "POST",
        data: {
          user_id: logins.user_id
        },
        success: function (reg) {
          if(reg.data.status==0){
            that.data.signinurl = '';
            that.setData({
              issignin:true
            })
          }
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
          latitude: 28.674880,
          longitude: 115.993601,
          speed: speed,
          accuracy: accuracy,

         
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

  playticket: function(e) {
    var logins = wx.getStorageSync("hanfu_logins");
    var that = this;
    if (logins){
      wx.navigateTo({
        url: 'qiandao/index',
      })
    }else{
      wx.showToast({
        title: '请先登入',
      })
      wx.switchTab({
        url: '../userpage/userpage',
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