/**
 * 本地字典翻译
 */
'use strict';

/*
state	快递单当前的状态 ：　 
0：在途，即货物处于运输过程中；
1：揽件，货物已由快递公司揽收并且产生了第一条跟踪信息；
2：疑难，货物寄送过程出了问题；
3：签收，收件人已签收；
4：退签，即货物由于用户拒签、超区等原因退回，而且发件人已经签收；
5：派件，即快递正在进行同城派件；
6：退回，货物正处于退回发件人的途中；
该状态还在不断完善中，若您有更多的参数需求，欢迎发邮件至 kuaidi@kingdee.com 提出。
*/
const STATE = [ '在途', '揽件', '疑难', '签收', '退签', '派件', '退回' ];

/*
com	String	是	要查询的快递公司代码，不支持中文，对应的公司代码见 
《API URL 所支持的快递公司及参数说明》和《支持的国际类快递及参数说明》。 
如果找不到您所需的公司，请发邮件至 kuaidi@kingdee.com 咨询（大小写不敏感）
*/
const COMANY = {
    'huitongkuaidi': '百世汇通'
};

var com = code => COMANY[ code ] || '未知快递公司';
var state = state => STATE[ state ] || '未知';

//公开
module.exports = {
    com: com,
    state: state
}