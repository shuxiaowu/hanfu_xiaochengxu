// pages/userpage/backproblem/backproblem.js
const app = getApp();
var ids =1;


function postrequest(protype,imgsss,describ,user_id) {
  //
  return new Promise(function (resolve, reject) {
    var url = app.base.pub_url;
    wx.request({
      url: url + 'problemup',
      method: "POST",
      data: {
        protype: protype,
        img: imgsss,
        describ: describ,
        user_id: user_id
      },
      success: function (reg) {
        if (reg.data.status == 0) {
          wx.switchTab({
            url: '../userpage',
          })
          wx.showToast({
            title: '问题反馈成功',
            duration: 2000

          })
          wx.removeStorageSync('upimgs')
        } else if (reg.data.status == 1) {
          wx.showToast({
            icon:'none',
            title: '问题反馈失败',
            duration: 3000
          })
        } else if (reg.data.status == 2) {
          wx.navigateTo({
            url: '../userpage',
          })
          wx.showToast({
            icon: 'none',
            title: '请登录',
            duration:3000
          })
        }
      }
    })
  });

}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prolist: [
      '账号问题',
      '界面卡顿',
      '功能问题',
      '文字乱码',
      '其他'
    ],
    num: 0,
    imgurl: [],
    urls: [],
    upimgname: []
  },
  // 
  fixnum: function(e) {
    let that = this;
    that.setData({
      num: e.currentTarget.dataset.id
    })
  },
  bindFormSubmit: function(e) {
    let that = this;
    var describ = e.detail.value.describ;

    var url = app.base.pub_url;
    var protype = that.data.prolist[that.data.num];
    var img = that.data.urls;
    var logins = wx.getStorageSync("hanfu_logins");
    var user_id = logins.user_id;
    if (describ==''){
      wx.showToast({
        icon:'none',
        title: '请填写描述',
      })
      return false;
    }
    var upimgss = [];
    if(img.length>0){
      wx.showToast({
        title: '提交中',
        icon: 'loading',
        duration: 5000
      })
      var url = app.base.pub_url;
      for (let i = 0; i < img.length; i++) {
        var j =i;
        wx.uploadFile({
          url: url + 'uploadImageProblem',
          filePath: img[i],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
           
            wx.hideToast();
            var data = JSON.parse(res.data);
            var upimgname = data.saveName;
            upimgss = upimgss.concat(upimgname);
           
            if (data.status == 0) {
              if (j == img.length-1){
                // console.log(img);
                // console.log(j);
                // console.log(upimgss);
                postrequest(protype, upimgss, describ, user_id);
              }
             
            }
          }
        })
      }
    }else{
      postrequest(protype, [], describ, user_id);
    }
    
    // var imgsss = wx.getStorageSync('upimgs');

  },
  // 上传图片
  chooseImg: function() {
    let that = this;
    var countimg = that.data.imgurl.length
    if (countimg < 3) {
      wx.chooseImage({
        count: 3, // 默认9
        sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var tempFilePaths = res.tempFilePaths
          that.data.images = tempFilePaths
          // 多图片
          that.data.imgurl = that.data.imgurl.concat(tempFilePaths)
          // 单图片
          // that.data.urls = tempFilePaths[0]
          that.setData({
            images: tempFilePaths[0],
            urls: that.data.imgurl
          })

        }
      })
    } else {
      wx.showToast({
        icon: "none",
        title: '最多上传三张',
      })
    }

  },
  // 预览图片
  previewImg: function(e) {
    let that = this;
    wx.previewImage({
      current: that.data.imgurl[e.currentTarget.dataset.id],
      urls: that.data.imgurl,
    })
  },
  // 删除图片
  delimg: function(e) {
    let that = this;
    var index = e.currentTarget.dataset.id;
    var imgurl = this.data.imgurl;

    console.log(index);
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('点击确定了');
          if(index==0){
            imgurl.splice(index, 1);
          }else{
            imgurl.splice(index, index);
          }
          
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          urls: imgurl
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.removeStorageSync('upimgs')
    wx.setNavigationBarTitle({
      title: '问题反馈',
    })
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