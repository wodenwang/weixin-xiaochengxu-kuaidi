//index.js
//获取应用实例
var app = getApp();
var config = require( '../../config' );
var db = require( '../../lib/db' );
var common = require( '../../lib/common' );

Page( {
  data: {
    //loading区域控制
    loading: {
      show: false
    },

    //结果明细展示区域控制
    detail: {
      show: false
    },

    //错误提示区域控制
    error: {
      show: false
    },

    //默认demo单号
    code: '280562382866'

  },

  //事件处理函数
  submitForm: function( e ) {
    var that = this;

    //获取快递单号
    let code = e.detail.value.code;
    that.setData( { code: code });

    //必填判断
    if( !code ) {
      return;
    }

    //打开loading
    that.setData( { loading: { show: true } });

    wx.request( {
      url: config.comUrl,
      data: {
        text: code
      },
      success: function( comRes ) {
        let coms = comRes.data.auto;
        if( coms && coms.length > 0 ) {//找得到对应的快递公司

          let com = coms[ 0 ].comCode;//获取第一个快递公司,多个的情况后续再处理,TODO
          console.log( "使用的com:", com );
          wx.request( {
            url: config.apiUrl,
            data: {
              id: config.apiCode,
              com: com,
              nu: code,
              order: 'asc'
            },

            success: function( res ) {
              let result = res.data;
              console.log( '这是成功返回的数据：', result.data );

              //重定义result
              let arr = [];
              for( let v of result.data ) {
                let obj = {};
                obj.date = common.formatTime( v.time )[ 0 ];
                obj.time = common.formatTime( v.time )[ 1 ];
                obj.context = v.context;
                console.log( common.formatTime( v.time ) );
                arr.push( obj );
              }
              result.data = arr;

              if( result.status == 1 ) {//成功
                that.setData( {
                  detail: {
                    show: true,
                    result: result,
                    comName: db.com( result.com ),
                    stateName: db.state( result.state )
                  },
                  error: {
                    show: false,
                    msg: result.message
                  }
                });

                //TODO 推送结果到服务器保存,异步

              } else {//失败
                that.setData( {
                  detail: {
                    show: false
                  },
                  error: {
                    show: true,
                    msg: result.message
                  }
                });
              }
            },

            fail: function() {
              that.setData( {
                detail: {
                  show: false,
                  result: null
                },
                error: {
                  show: true,
                  msg: '服务器查询失败,请稍后再试'
                }
              });
            },

            complete: function( res ) {
              //关闭loading
              that.setData( {
                loading: {
                  show: false
                }
              });
            }

          });
        } else {
          //关闭loading
          that.setData( { loading: { show: false } });

          //提示找不到订单号对应的快递公司
          that.setData( {
            detail: {
              show: false,
              result: null
            },
            error: {
              show: true,
              msg: '暂不支持该快递公司的订单查询'
            }
          });
        }
      },
      fail: function() {
        //关闭loading
        that.setData( { loading: { show: false } });
      }
    });
  }

});
