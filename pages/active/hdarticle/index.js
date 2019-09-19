// pages/active/hdarticle/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../../images/hd_article.jpg',
      '../../../images/hd_article.jpg',
      '../../../images/hd_article.jpg'
    ],
    images: [
      '../../../images/headpic.jpg',
      '../../../images/headpic.jpg',
      '../../../images/headpic.jpg',
      '../../../images/headpic.jpg',
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    indicatorcolor:'#c44845',
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '详情',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    if (res.from == 'button') {
      console.log(res.target, res)
    }
    return {
      title: '这里是发送时候的标题',
      path: '/pages/home/index',//这里是被分享的人点击进来之后的页面
      imageUrl: '../../images/icon-logo.png'//这里是图片的路径
    }
  }
})