/**
 * Created by zcx on 2018/5/28.
 */
$(function () {
	/**
	 * 点亮
	 */
	$('.logon_c .txt').focus(function () {
		$(this).siblings('i').addClass('cur');
	});

	$("#legalAccountSubmit").click(function(){
		$("#accountValidateForm").submit();
	});
	$.validator.addMethod("legalAccountValidate", function (value, element, params) {
		if(!accountReg.test(value)){
			$.validator.messages.legalAccountValidate = "请输入正确的格式的账号";
			return false;
		}else{
			return true;
		}
	}, "账号不能为空");
	$.validator.addMethod("legalCodeValidate", function (value, element, params) {
		$(element).parent().next("span").eq(0).empty();
		if(value.length != 4){
			$.validator.messages.legalCodeValidate = "请输入4位验证码";
			return false;
		}else{
			return true;
		}
	}, "账号不能为空");
	$("#accountValidateForm").validate({
			showErrors:function () {

			},
			errorPlacement: function (error, element) {
				error.appendTo(element.parent().next());
			},
			rules:{
				legalAccount: {
				required: true,
					legalAccountValidate: true,
				},
				legalCode:{
					required: true,
					legalCodeValidate:true
				}
			},
			messages:{
				legalAccount: {
					required: "请输入账号"
				},
				legalCode:{
					required: "请输入验证码"
				}
			},
			submitHandler:function(){
				$.ajax({
				url: jsCtx + "/corp/forgetPsd/checkLegalAccount.do",
				type: "POST",
				data: {legalAccountNo: $("#legalAccount").val(), legalCode: $("#legalCode").val()},
				dataType: "json",
				async: false,
				success: function (result) {
					if (result.code == successCode) {
						$("#forget-step1").hide();
						$(".desensitizationAccountNo").html(result.data.desensitizationAccountNo);
						$(".desensitizationMobilePhone").html(result.data.desensitizationMobilePhone);
						$("#forget-step2").show();
						$("#corpId").val(result.data.corpId);
						$("#certKey").val(result.data.certKey);
					}else{
						$("#createCodeBtn").click();
						// 错误处理
						if(result.code == "BN115") {
							$("#legalCode").parent().next().html(errorImgLabel + result.msg);
						}else{
							$("#legalAccount").parent().next().html(errorImgLabel + result.msg);
						}
					}
				}
			})
		}
	})
	$("#forwardFind").click(function () {
		$("#forget-step2").hide();
		$(".pgsbar_t").find("span").eq(1).removeClass("graybg").addClass("redbg");
		$(".pgsbar_t").find("img").eq(0).attr("src", jsCtxStatic + "/images/pgsbaricon4.png");
		$(".pgsbar").find("em").eq(1).addClass("cur");
		$("#forget-step3").show();
	});
	$("#rtnLastStep").click(function () {
		$("#forget-step1").show();
		$("#forget-step2").hide();
		$("#createCodeBtn").click();
		$("#legalCode").val("");
	})
	$("#corporateMobile").change(function () {
		if(mobileReg.test($("#corporateMobile").val())){
			$("#corporateMobile").parent().next().html("");
			return true;
		}else{
			$("#corporateMobile").parent().next().html(errorImgLabel + "请输入有效的手机号码");
			return false;
		}
	});

	$("#btnSendCode").click(function () {
		if(!mobileReg.test($("#corporateMobile").val())){
			$("#corporateMobile").parent().next().html(errorImgLabel + "请输入有效的手机号码");
			return false;
		}
		sendMessage();
		$.ajax({
			url: jsCtx + "/corp/forgetPsd/sendBindMobile.do",
			type: "POST",
			data: {corpId: $("#corpId").val(), legalMobile: $("#corporateMobile").val()},
			dataType: "json",
			async: false,
			success: function (result) {
				console.log(result)
				if(result.code != successCode){
					$("#corporateMobile").parent().next().html(errorImgLabel + result.msg)
				}
			}
		})

	});

	$("#forgetPsdMobileCode").blur(function () {
		var forgetPsdMobileCode = $(this).val().trim();
		if(forgetPsdMobileCode.length != 6){
			$(this).parent().next("span").html(errorImgLabel + "请输入6位验证码");
			return false;
		}else{
			$(this).parent().next("span").html("");
		}
	});


	$("#mobileVerifySubmit").click(function () {
		var flag = true;
		var mobileCode = $("#forgetPsdMobileCode").val().trim();
		if($("#corporateMobile").val() == ""){
			$("#corporateMobile").parent().next("span").html(errorImgLabel + "请输入手机号码");
			$("#corporateMobile").focus();
			flag = false;
		}
		if(mobileCode == ""){
			$("#forgetPsdMobileCode").parent().next("span").html(errorImgLabel + "请输入6位验证码");
			if(flag){
				$("#forgetPsdMobileCode").focus();
			}
		}else{
			if(mobileCode.length != 6){
				$(this).parent().next("span").html(errorImgLabel + "请输入6位验证码");
				if(flag){
					$("#forgetPsdMobileCode").focus();
				}
			}
		}
		if(!flag){
			return false;
		}

		$.ajax({
			url: jsCtx + "/corp/forgetPsd/verifyBindMobile.do",
			type: "POST",
			data: {corpId: $("#corpId").val(), mobileCode: mobileCode,legalMobile:$("#corporateMobile").val()},
			dataType: "json",
			async: false,
			success: function (result) {
				console.log(result)
				if (result.code == successCode) {
					$("#forget-step3").hide();
					$(".pgsbar_t").find("span").eq(2).removeClass("graybg").addClass("redbg");
					$(".pgsbar_t").find("img").eq(1).attr("src", jsCtxStatic + "/images/pgsbaricon4.png");
					$(".pgsbar").find("em").eq(2).addClass("cur");
					$("#forget-step4").show();
					flag = true;
				}else{
					$("#forgetPsdMobileCode").parent().next().html(errorImgLabel + result.msg);
					flag = false;
				}
			}
		});
		if(!flag){
			return false;
		}
	});
	$("#reSelectType").click(function () {
		$("#forget-step2").show();
		$(".pgsbar_t").find("span").eq(1).removeClass("redbg").addClass("graybg");
		$(".pgsbar_t").find("img").eq(0).attr("src", jsCtxStatic + "/images/pgsbaricon3.png");
		$(".pgsbar").find("em").eq(1).removeClass("cur");
		$("#forget-step3").hide();
	})
	$("#passwordSubmit").click(function () {
		$("#passwordForm").submit();
	});
	$.validator.addMethod("newPasswordTest", function (value, element, param) {
		var content = "";
		var flag = false;
		var reg = /(?!.*[\u4E00-\u9FA5\s])(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^a-zA-Z\d]+$)^.{6,16}$/;
		if(value.length < 6 || value.length > 16){
			flag = false;
			content = "密码长度不符合";
		}else if(!reg.test(value)){
			flag = false;
			content = "密码不符合要求";
		}else{
			flag = true;
		}
		$.validator.messages.newPasswordTest = content;
		if(flag){
			$(element).next().show();
		}else{
			$(element).next().hide();
		}
		return flag;
	}, "秘密强度不够");
	$("#passwordForm").validate({
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().next());
		},
		rules:{
			newPassword:{
				required: true,
				newPasswordTest: true,
			},
			confirmNewPassword:{
				required:true,
				equalTo: "#newPassword"
			}
		},
		messages:{
			newPassword:{
				required: "请输入密码",
			},
			confirmNewPassword:{
				required: "请输入密码",
				equalTo: "两次输入密码不一样"
			}
		},
		submitHandler:function(){
			var flag = false;
			var password = $("#newPassword").val().trim();
			$.ajax({
				url: jsCtx + "/corp/forgetPsd/updatePassword.do",
				type: "POST",
				data: {corpId: $("#corpId").val(), password: password, certKey: $("#certKey").val()},
				dataType: "json",
				async: false,
				success: function (result) {
					console.log(result)
					if (result.code == successCode) {
						$("#forget-step4").hide();
						$(".pgsbar_t").find("span").eq(3).removeClass("graybg").addClass("redbg");
						$(".pgsbar_t").find("img").eq(2).attr("src", jsCtxStatic + "/images/pgsbaricon4.png");
						$(".pgsbar").find("em").eq(3).addClass("cur");
						$("#forget-step5").show();
						flag = true;
					}else{
						$("#forgetPsdMobileCode").parent().next().html(errorImgLabel + result.msg);
					}
				}
			});
			if(!flag){
				return false;
			}else{
				goToLogin();
			}
		}
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
	$("#btnSendCode").val("请在" + curCount + "后重新获取");
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
		$("#btnSendCode").val("请在" + curCount + "后重新获取");
	}
}
var InterValObj; //timer变量，控制时间
var countGo = 3;

function goToLogin() {
	var countGo = 3; //间隔函数，1秒执行
	InterValObj = window.setInterval(goLogin, 1000);
}

function goLogin() {
	if (countGo == 0) {
		window.clearInterval(InterValObj);//停止计时器
		window.location.href=   jsCtx + "/corp/corporateLoginIndex.do?type=corp" ;
	}
	else {
		countGo--;
		$("#successGo").html(""+ countGo+" 秒后自动跳转...");
	}
}