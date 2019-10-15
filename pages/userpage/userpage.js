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
    islogin: false,
    head_img: "",
    user_name: "",
    fans: 0,
    level: 1,
    user_id: "",
    day: 1,
    get_fans: 1,
    allohone:''
  },
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '我的',
    })
    var that = this
    var that = this;
   
    var url = that.data.url;
    var logins = wx.getStorageSync('hanfu_logins');
    // console.log(logins)
    wx.getSystemInfo({
      success(res) {
        var height = res.windowHeight;
        that.setData({
          height: height + "px"
        });
      }
    });
    if (logins) {
      var phone = '';
      if (logins.phone) {
        phone = logins.phone.substring(0, 3) + '****' + logins.phone.substring(7, 11);
      }
      wx.request({
        url: url + "getMyInteragal",
        method: "POST",
        data: {
          user_id: logins.user_id
        },
        success: function (res) {
          console.log(res.data.datalist);
          that.setData({
            fans: res.data.integral
          });
        }
      });
      that.setData({
        islogin: true,
        isphoneshow: true,
        phonenumber: phone,
        head_img: logins.user_img,
        user_name: logins.user_name,
        level: logins.level,
        user_id: logins.user_id
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
        // console.log(res);
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
                  var phone = '';
                  if (res.data){
                     phone = res.data.substring(0, 3) + '****' + res.data.substring(7, 11);
                  }
                 
                  that.setData({
                    phonenumber: phone,
                    allohone: res.data,
                    isphoneshow:false,
                    isshow: true
                  })
                }
              });
            }
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
    let phone = that.data.allohone;
    let url = that.data.url;
    console.log(phone)
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
                  phone: phone,
                  iv: iv,
                  nickName: userInfo.nickName,
                  avatarUrl: userInfo.avatarUrl,
                },
                success: function(res3) {
                  
                  if (res3.data.code == 0) {
                    var logins = res3.data.memberinfo;
                    wx.setStorageSync("hanfu_logins", logins);
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
    var that = this;
   var exitlogins = wx.removeStorageSync('hanfu_logins');
    var logins = wx.getStorageSync('hanfu_logins');
    if (logins ==''){
      wx.showToast({
        title: '成功退出登录',
      })
      console.log('dsds');
    }
    that.setData({
      head_img: "",
      user_name: "",
      phonenumber:'',
      islogin:false
    })
  },

  // 我的积分
  mypraise:function(e){
    var logins = wx.getStorageSync('hanfu_logins');
    if (logins){
      wx.navigateTo({
        url: 'integral/intgral',
      })
    }else{
      wx.showLoading({
        title: '请登录',
        duration:1000
      })
    }
  },
  // 发起活动
  mysendactive: function (e) {
    var logins = wx.getStorageSync('hanfu_logins');
    if (logins) {
      wx.navigateTo({
        url: 'sendactive/sendactive',
      })
    } else {
      wx.showLoading({
        title: '请登录',
        duration: 1000
      })
    }
  },
  // 我的点赞
  praisebtn: function (e) {
    var logins = wx.getStorageSync('hanfu_logins');
    if (logins) {
      wx.navigateTo({
        url: 'praise/praise',
      })
    } else {
      wx.showLoading({
        title: '请登录',
        duration: 1000
      })
    }
  },
  // 联系我们
  contactbtn: function (e) {
    var logins = wx.getStorageSync('hanfu_logins');
    if (logins) {
      wx.navigateTo({
        url: 'contact/contact',
      })
    } else {
      wx.showLoading({
        title: '请登录',
        duration: 1000
      })
    }
  },
  // 问题反馈
  problembtn: function (e) {
    var logins = wx.getStorageSync('hanfu_logins');
    if (logins) {
      wx.navigateTo({
        url: 'backproblem/backproblem',
      })
    } else {
      wx.showLoading({
        title: '请登录',
        duration: 1000
      })
    }
  },
  activepage: function(e) {
    wx.switchTab({
      url: '../active/active'
    })
  }
})