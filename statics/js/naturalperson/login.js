/**
 * Created by zcx on 2018/5/28.
 */
$(function () {
	/*$.dict("REGEX");
	$.dicts['REGEX']['PASSWORD'];*/
	/**
	 *  法人登录
	 */
	$("#legalLoginSubmit").click(function () {
		$("#legalLoginForm").submit();
	});

	$.validator.addMethod("legalLoginNoValidator", function (value, element, param) {
		$("#loginWarn").empty();
		if(!accountReg.test(value)){
			$.validator.messages.legalLoginNoValidator = "请输入合法的用户，长度为4-20位，不能包含空格、中文";
			return false
		}else{
			return true;
		}
	}, "请输入合法的用户");

	$.validator.addMethod("legalCodeValidator", function (value, element, param) {
		$("#loginWarn").empty();
		if(value.trim().length < 4){
			$.validator.messages.legalLoginNoValidator = "请输入正确的验证码";
			return false
		}else{
			return true;
		}
	}, "请输入正确的验证码");
	// 清空密码和验证码
	$("#legalLoginNo").change(function () {
		// 清空密码和验证码
		$("#legalLoginPwd").val("");
		$("#legalCode").val("");
	});
	$("#legalLoginForm").validate({
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().next());
		},
		rules: {
			legalLoginNo:{
				required: true,
				//legalLoginNoValidator: true,
			},
			legalLoginPwd:{
				required: true,
			},
			legalCode:{
				required: true,
				legalCodeValidator: true,
			}
		},
		messages:{
			legalLoginNo:{
				required: "请输入账号或者社会统一信用代码"
			},
			legalLoginPwd:{
				required: "请输入密码"
			},
			legalCode:{
				required: "请输入验证码",
			}
		},
		onfocusout: false,
		onkeyup: function(element) { $(element).valid(); },
		submitHandler: function () {
			var legalLoginNo = $("#legalLoginNo");
			var legalLoginPwd = $("#legalLoginPwd");
			var legalCode = $("#legalCode");
			$.ajax({
				url: jsCtx + "/corp/login.do",
				type: "POST",
				data: {
					loginNo: legalLoginNo.val(),
					loginPwd: encrypt(legalLoginPwd.val()),
					legalCode:legalCode.val(),
				},
				dataType: "json",
				async: false,
				success: function (result) {
					$("#createCodeBtn").click();
					console.log(result)
					if (result.code == successCode) {
						//window.location.href = jsCtx + "/corp/userCenter.do";
					}else{
						$("#loginWarn").html(errorImgLabel + result.msg);
					}
				},
			});
		},
	});


	$('.login_t h2').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		$('.logon_c').eq($(this).index()).addClass('cur').siblings().removeClass('cur');
	})
	$('.logon_c .txt').focus(function () {
		$(this).prev().addClass('cur');
	})
});

//短信倒计时
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
var code = ""; //验证码
var codeLength = 6;//验证码长度
function sendMessage() {
	curCount = count;
	var dealType; //验证方式
	var uid=$("#uid").val();//用户uid
	//产生验证码
	for (var i = 0; i < codeLength; i++) {
		code += parseInt(Math.random() * 9).toString();
	}
	//设置button效果，开始计时
	$("#btnSendCode").attr("disabled", "true");
	$("#btnSendCode").val("请在" + curCount + "秒内输入");
	InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
}
//timer处理函数
function SetRemainTime() {
	if (curCount == 0) {
		window.clearInterval(InterValObj);//停止计时器
		$("#btnSendCode").removeAttr("disabled");//启用按钮
		$("#btnSendCode").val("重新发送");
		code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
	}
	else {
		curCount--;
		$("#btnSendCode").val("请在" + curCount + "秒内输入");
	}
}
function sendMessage2() {
	curCount = count;
	var dealType; //验证方式
	var uid=$("#uid").val();//用户uid
	//产生验证码
	for (var i = 0; i < codeLength; i++) {
		code += parseInt(Math.random() * 9).toString();
	}
	//设置button效果，开始计时
	$("#btnSendCode2").attr("disabled", "true");
	$("#btnSendCode2").val("请在" + curCount + "秒内输入");
	InterValObj = window.setInterval(SetRemainTime2, 1000); //启动计时器，1秒执行一次
}
//timer处理函数
function SetRemainTime2() {
	if (curCount == 0) {
		window.clearInterval(InterValObj);//停止计时器
		$("#btnSendCode2").removeAttr("disabled");//启用按钮
		$("#btnSendCode2").val("重新发送");
		code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
	}
	else {
		curCount--;
		$("#btnSendCode2").val("请在" + curCount + "秒内输入");
	}
}
/**
 * 自然人登录
 * */
//校验用户名
var userNameVerify=false;
var nameTestCorrect="";
function userNameTest(){
	//$("#a").hide();
	$(".userwarn").html("");
	var personName=$("#personName").val();
	var reg = /^[0-9a-zA-Z_\u3E00-\u9FA5]{6,20}$/;//6-20字节，允许字母数字下划线
	if(personName==null||personName==""){
		$(".userwarn").html(errorImgLabel+"用户名不能为空");
		//$("#a").hide();
		//$(this).siblings('i').removeClass('pass');
	}else if(!reg.test(personName)){
		$(".userwarn").html(errorImgLabel+"用户名格式不正确");
		//$("#a").hide();
		//$(this).siblings('i').removeClass('pass');
	}else{
		$(".userwarn").html("");
		userNameVerify=true;
		nameTestCorrect=personName;
		 //   $("#a").show();
          //  $(this).siblings('i').removeClass('cur').addClass('pass');
	}
}

//密码校验
var passwordTest=false;
var apsswordTestCorrect="";
function passwordVerify(){
//	$("#b").hide();
	$(".pwdwarn").html('');
	var p=$(".password").val();
	
    var reg= /(?!.*[\u4E00-\u9FA5\s])(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^a-zA-Z\d]+$)^.{6,16}$/;
  
	
	$(".pwdwarn").html("");	
	if(!reg.test(p)){
		$(".pwdwarn").html(errorImgLabel+"您输入的密码格式不对!");
	//	$("#b").hide();
	//	$(this).siblings('i').removeClass('pass');
	}
	else{
		passwordTest=true;
		apsswordTestCorrect=p;
		$(".pwdwarn").html('');
      //  $("#b").show();
      //  $(this).siblings('i').removeClass('cur').addClass('pass');
       
	}	

}
//验证码校验
var verificationCodeTest=false;
var loginCode="";
function loginCodeTest(){
	var reg=/^[0-9a-zA-Z]{4}$/;
	var testCode=$("#testCode").val();
	 $("#codeError").html("");
	if(testCode==""){
		$("#codeError").html(errorImgLabel+"验证码不能为空");
	//	$("#c").hide();
	//	$(this).siblings('i').removeClass('pass');
	}else if(!reg.test(testCode)){
		$("#codeError").html(errorImgLabel+"验证码格式有误");
	//	$("#c").hide();
	//	$(this).siblings('i').removeClass('pass');
	}
	else{
		 
            	 verificationCodeTest=true;
            	 loginCode=testCode;
            	 $("#codeError").html('');
              //   $("#c").show();
              //   $(this).siblings('i').removeClass('cur').addClass('pass');
	}
	
}
//登录
function personLoginSubmit(){
    // 回调地址
    var reg = new RegExp("(^|&)callbackUrl=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    var callbackUrl=null;
    if(r != null){
        callbackUrl=unescape(r[2]);
    }
	    $("#loginError").html(""); 
		if(userNameVerify==false){
			$("#loginError").html(errorImgLabel+"用户名为空或格式有误");
		}else if(passwordTest==false){
			$("#loginError").html(errorImgLabel+"密码为空或格式有误");
		}else if(verificationCodeTest==false){
			$("#loginError").html(errorImgLabel+"验证码为空或格式有误");
		}else{
			 $.ajax({ 
	             url:jsCtx+"/natural/login.do",
	             type:"post",
	             data:{"loginNo":nameTestCorrect,"userPwd":encrypt(apsswordTestCorrect),"loginCode":loginCode,"loginUUID":loginUUID},
	             success:function(data){
	             	var result=	data.code;
	             	var msg=data.msg;
	             	var url=data.data;
	             if(result!="90000"){
	            	$("#loginError").html(errorImgLabel+msg);
	             }else{
	            	 $("#loginError").html(""); 
	            	 window.location.href=url; 
	             }
	             }
	         });
/*		 $(".password").val(encrypt(apsswordTestCorrect));
		 alert( $(".password").val());
		 $("#personRegister").attr({"action":jsCtx+"/natural/login.do","method":"post"});
		 $("#personRegister").submit();*/
		}
	}
function ddd() {
	 window.location.href=jsCtx+"/natural/personRegister.do";
}
function mmm(){
	 window.location.href=jsCtx+"/natural/passwordEdit.do";
}