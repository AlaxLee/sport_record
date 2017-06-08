// record.js
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: 'lala',
    step: '',
    date: '',
    infoMess: ''
  },

  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
    try {
      wx.setStorageSync('name', e.detail.value)
    } catch (err) {
      infoMess: err
    }
  },
  stepInput: function (e) {
    this.setData({
      step: e.detail.value
    })
  },
  dateInput: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  pushBtnClick:function() {
    if (this.data.name.length == 0 || this.data.step.length == 0 || this.data.date.length == 0) {
      this.setData({
        infoMess: '温馨提示：名字、步数和时间不能为空！'
      })
    } else if (! util.isUint(this.data.step)) {
      this.setData({
        infoMess: '温馨提示：步数必须是数字！'
      })
    } else {
      this.setData({
        infoMess: ''
      })
      var that = this;
      wx.request({
        url: 'https://iloveanna.wang/record',
        method: 'POST',
        data: {
          name: that.data.name,
          step: parseInt(that.data.step),
          date: that.data.date
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          that.setData({
            infoMess: res.data
          });
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    try {
      var n = wx.getStorageSync('name')
      this.setData({
        name: n
      })
    } catch (err) {
      infoMess: err
    }
    this.setData({
        date: util.simpleDate(new Date())
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
  /*
  onShareAppMessage: function () {
  
  }
  */
})