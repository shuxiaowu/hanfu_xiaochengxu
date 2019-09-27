var app = getApp();
var login = function(code, encrypteData, iv) {
  var that = this
  //创建一个dialog提示
  wx.showToast({
    title: '正在登录...',
    icon: 'loading',
    duration: 5000
  });
  wx.request({
    url: url,
    method: 'get',
    data: {
      code: code,
      encrypteData: encrypteData,
      iv: iv
    },
    header: {
      'Content-Type': 'application/json'
    },
    success: function(res) {
      wx.hideToast()
      //console.log('服务器返回' + res.data)
      app.globalData.userInfo = res.data
    },
    fail: function() {
      wx.showToast({
        title: '网络错误！',
        duration: 2000
      })
    },
    complete: function() {

    }
  })
}
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    url: app.base.pub_url,
    navShow: false,
    signShow: false,
    height: "",
    islogin: true,
    head_img: "",
    user_name: "",
    fans: 0,
    level: 1,
    user_id: "",
    day: 1,
    get_fans: 1
  },
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '我的',
    })
    var that = this
    var that = this;
    var logins = wx.getStorageSync("xinli_logins");
    var url = that.data.url;
    wx.getSystemInfo({
      success(res) {
        var height = res.windowHeight;
        that.setData({
          height: height + "px"
        });
      }
    });
    if (logins) {
      wx.request({
        url: url + "getUser",
        method: "POST",
        data: {
          user_id: logins.user_id
        },
        success: function(res) {
          if (res.data.code == 0) {
            var data = res.data.memberinfo;
            that.setData({
              islogin: true,
              head_img: data.user_img,
              user_name: data.user_name,
              level: data.level,
              fans: data.integral,
              user_id: logins.user_id
            });
          }
        }
      });
    } else {
      that.setData({
        islogin: false
      });
    }
    // wx.login({
    //   success: function (res) { //登录成功
    //     //console.log(res)
    //     if (res.code) {
    //       var code = res.code
    //       wx.getUserInfo({ //getUserInfo流程
    //         success: function (data) { //getUserInfo获取用户信息成功
    //           // console.log(data)
    //           //encrypteData加密密文，iv偏移向量，encodeURIComponent把加密字符串解密成URI字符串
    //           var encryptedData = encodeURIComponent(data.encryptedData);
    //           var iv = data.iv;
    //           //请求自己的服务器
    //           // login(code, encryptedData, iv);
    //           //已经授权的用户
    //           // wx.switchTab({
    //           //   url: '',
    //           // })
    //           that.setData({
    //             headimg:data.userInfo.avatarUrl,
    //             username: data.userInfo.nickName
    //           })
    //         }
    //       });
    //       wx.getSetting({
    //         success(res) {
    //           console.log(res.authSetting)
    //           // res.authSetting = {
    //           //   "scope.userInfo": true,
    //           //   "scope.userLocation": true
    //           // }
    //         }
    //       });

    //     } else {
    //       console.log('用户没有进行授权！' + res.errMsg)
    //     }
    //   }
    // });
  },
  onGotUserInfo: function (e) {
    let that = this;
    let url = that.data.url;
    var my = e.detail;
    // console.log(my);
    wx.login({
      success: function (res) {
        if (res.code) {
          var code = res.code;
          wx.request({
            url: url + "wxLogin",
            method: "POST",
            data: {
              code: code,
              nickName: my.userInfo.nickName,
              avatarUrl: my.userInfo.avatarUrl,
            },
            success: function (res) {
              console.log(res.data.arr);

              if (res.data.code == 0) {
                var logins = res.data.memberinfo;
                wx.setStorageSync("xinli_logins", logins);
                that.setData({
                  islogin: true,
                  head_img: logins.user_img,
                  user_name: logins.user_name,
                  fans: logins.integral,
                  level: logins.level,
                });
                wx.showToast({
                  title: '登录成功!',
                  icon: "success",
                  duration: 1000,
                  success: function () {
                    setTimeout(function () {
                      wx.redirectTo({
                        url: '/pages/index/index',
                      });
                    }, 1000);
                  }
                });
              }
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权的按钮
      var that = this
      wx.login({
        success: function(res) {
          if (res.code) {
            var code = res.code
            wx.getUserInfo({
              success: function(data) {
                var encryptedData = encodeURIComponent(data.encryptedData);
                var iv = data.iv;
                //请求自己的服务器
                login(code, encryptedData, iv);
              }
            })
          }
        }
      })
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '../rec/rec'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            // console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  activepage: function(e) {
    wx.switchTab({
      url: '../active/active'
    })
  }
})