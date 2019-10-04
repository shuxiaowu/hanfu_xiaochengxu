var app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isshow:false,
    url: app.base.pub_url,
    navShow: false,
    isphoneshow:false,
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
    var phone = wx.getStorageSync("hanfu_phone");
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
            console.log(res);
            that.setData({
              islogin: true,
              isphoneshow: true,
              phonenumber:data.phone,
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
  },
  getPhoneNumber(e) {
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res);
        var code = res.code;
        wx.checkSession({
          success: function () {
            var ency = e.detail.encryptedData;
            var iv = e.detail.iv;
            // var sessionk = that.data.sessionKey;
            let url = that.data.url;
            if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
              that.setData({
                modalstatus: true
              });
            } else { //同意授权
              wx.request({
                method: "GET",
                url: url + 'getphonenumber',
                data: {
                  code:code,
                  encrypdata: ency,
                  ivdata: iv,
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: (res) => {
                  console.log('ency:' + ency);
                  console.log('iv:' + iv);
                  console.log(res);
                  var phone = '';
                  if (res.dat !=''){
                     phone = res.data.substring(0, 3) + '****' + res.data.substring(7, 11);
                  }
                 
                  that.setData({
                    phonenumber: phone,
                    isphoneshow:false,
                    isshow: true
                  })
                },
                fail: function (res) {
                  console.log("解密失败~~~~~~~~~~~~~");
                  console.log(res);
                }
              });
            }
          },
          fail: function () {
            console.log("session_key 已经失效，需要重新执行登录流程");
            that.wxlogin(); //重新登录
          }
        });
      }
    })

  },
  maskclose: function () {
    var that = this;
    that.setData({
      isshow: false,
    })
  },
  onGotUserInfo: function(e) {
    let that = this;
    let url = that.data.url;
    wx.login({
      success: function(res) {
        if (res.code) {
          var code = res.code;
          wx.getUserInfo({
            success: function(res2) {
              var userInfo = res2.userInfo
              var encryptedData = encodeURIComponent(res2.encryptedData); //一定要把加密串转成URI编码
              var iv = res2.iv;
              console.log(res2);
              wx.request({
                url: url + "wxLogin",
                method: "POST",
                data: {
                  code: code,
                  encryptedData: encryptedData,
                  iv: iv,
                  nickName: userInfo.nickName,
                  avatarUrl: userInfo.avatarUrl,
                },
                success: function(res3) {
                  console.log(res3.data);
                  if (res3.data.code == 0) {
                    var logins = res3.data.memberinfo;
                    wx.setStorageSync("xinli_logins", logins);
                    that.setData({
                      isshow:false,
                      islogin: true,
                      isphoneshow: true,
                      head_img: logins.user_img,
                      user_name: logins.user_name,
                      fans: logins.integral,
                      level: logins.level,
                      sessionKey: res3.data.arr.session_key
                    });
                    wx.showToast({
                      title: '登录成功!',
                      icon: "success",
                      duration: 1000,
                      success: function() {
                        setTimeout(function() {
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
          })
        }
      }
    })
  },
  exitpage:function(e){
    console.log('rgfg');
    wx.removeStorageSync('xinli_logins');
    wx.navigateTo({
      url: 'exitlogin/exitlogin',
    })
  },
  wxlogin:function(){
    let that = this;
    let url = that.data.url;
    wx.login({
      success: function (res) {
        if (res.code) {
          var code = res.code;
              wx.request({
                url: url + "wxLogin",
                method: "POST",
                data: {
                  code: code,
                  encryptedData: encryptedData,
                  iv: iv,
                  nickName: userInfo.nickName,
                  avatarUrl: userInfo.avatarUrl,
                },
                success: function (res3) {
                  console.log(res3.data);
                  if (res3.data.code == 0) {
                    var logins = res3.data.memberinfo;
                    wx.setStorageSync("xinli_logins", logins);
                    that.setData({
                      islogin: true,
                      head_img: logins.user_img,
                      user_name: logins.user_name,
                      fans: logins.integral,
                      level: logins.level,
                      sessionKey: res3.data.arr.session_key
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
          })
        }
      }
    })
  },
  activepage: function(e) {
    wx.switchTab({
      url: '../active/active'
    })
  }
})