// scoreboard.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    myName: "",
    mySeq: "",
    date: "",
    scores: [],
    /*
    scores: [{
      seq: 1,
      name: "大叔",
      step_number: 10001
    },{
      seq: 2,
      name: "妹纸",
      step_number: 11234
    }]
    */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var myName
    try {
      myName = wx.getStorageSync('name')
      this.setData({
        myName: myName
      })
    } catch (err) {
      infoMess: err
    }
    var that = this;
    wx.request({
      url: 'https://iloveanna.wang/list',
      // url: 'https://101.89.63.44/list',
      // url: 'https://71006307.qcloud.la/list',
      method: 'GET',
      success: function (res) {
        that.setData({
          date: res.data.date,
          scores: res.data.scores
        })
        for (var i = 0; i < that.data.scores.length; i++) {
          if (that.data.myName == that.data.scores[i].name) {
            that.setData({
              mySeq: that.data.scores[i].seq
            })
            break
          }
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var titleMessage = ' '
    if ( this.data.myName.length > 0 ) {
      titleMessage = '我 ' + this.data.myName + ' 现在排第 ' + this.data.mySeq
    }
    return {
      title: titleMessage
    }
  }
})

/**
 * 缺少本人当前的排行
 * 这个比较麻烦：
 * 首先要当前登陆者的信息，
 * 然后要把登陆者的信息发送到服务器，并和记录做关联
 */