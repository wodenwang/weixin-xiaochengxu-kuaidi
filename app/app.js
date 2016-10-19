App( {

  onLaunch: function() {
    console.log( 'ok' )
  },

  getUserInfo: function( cb ) {
    var that = this
    if( this.globalData.userInfo ) {
      typeof cb == "function" && cb( this.globalData.userInfo )
    } else {
      //调用登录接口
      wx.login( {
        success: function( res ) {
          console.log( res );
          wx.getUserInfo( {
            success: function( r ) {
              console.log( r );
              that.globalData.userInfo = r.userInfo
              typeof cb == "function" && cb( that.globalData.userInfo )
            }
          })
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})