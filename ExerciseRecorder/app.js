//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        },
        fail: function(r) {
          console.log("log failed: " + r.errMsg)
        }
      })
    }
  },
  getSessionKey: function (cb) {
    var that = this
    if (this.globalData.sessionKey) {
      typeof cb == "function" && cb(this.globalData.sessionKey)
    } else {
      //调用登录接口
      wx.login({
        success: function (r) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session',
              data: {
                appid: that.globalData.appid,
                secret: that.globalData.secret,
                js_code: res.code,
                grant_type: "authorization_code"
              },
              success: function (res) {
                // 今天写到这，明天继续
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        },
        fail: function (r) {
          console.log("log failed: " + r.errMsg)
        }
      })
    }
  },
  globalData:{
    appid: "wx8b649882ad5ca3ee",
    secret: "",
    userInfo:null,
    sessionKey: null,
    openid: null
  }
})
