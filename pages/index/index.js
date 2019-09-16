Page({
  data: {
    isshow:false,
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: ''
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: ''
    }]
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap');
    this.mapCtx.moveToLocation();
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy;

        console.log(latitude);
      }

    })
  }, 
  daka_btn:function(){
    var that = this;
    
    var isshow = that.data.isshow;
    console.log(isshow);
    that.setData({
      isshow:!isshow,
    })
    // wx.showModal({
    //   title: '打卡成功',
    //   content: '小主打卡成功+5积分',
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  },
  maskbtn:function(){
    var that = this;
    that.setData({
      isshow:false,
    })
  },
 
  maskclose: function() {
    var that = this;
    that.setData({
      isshow: false,
    })
  }
})
