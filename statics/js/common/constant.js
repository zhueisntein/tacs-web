/**
 *  服务端uri
 * @type {string}
 */

var uri = "http://localhost:8089/";


/**
 * 成功返回码
 * @type {string}
 */
var successCode = "90000";

var verifyCode =  "90006";

var errorImgLabel = "<img class='regImg' src='../../statics/images/error.png' />";
var accountReg = /^[0-9a-zA-Z_\u3E00-\u9FA5]{4,20}$/;//4-20字节，允许字母数字下划线
var mobileReg = /^1[23456789][0-9]{9}/;


