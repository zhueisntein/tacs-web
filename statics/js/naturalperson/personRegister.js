$(function() {
	$("#personTwoDIV").hide();
	createCode();
	//用户协议弹窗
	$('.ament').click(function() {
		$('.agreement_shadow').stop().fadeIn();
	})
	$('.agreement_shadow .close,.agreement .loginbtn').click(function() {
		$('.agreement_shadow').stop().fadeOut();
	})
	$('.agreement_shadow .close').click(function() {
		$('.ament').siblings('input').prop("checked", false);
	})
	$('.agreement_shadow .loginbtn').click(function() {
		$('.ament').siblings('input').prop("checked", true);
	})
})

//验证用户名称
var userNameVerify = false;

function verificationIdCard() {
	var loginNo = $(".username").val();
	$(".userwarn").html("");
	var reg = /^[0-9a-zA-Z_\u3E00-\u9FA5]{6,20}$/; //6-16字节，允许字母数字下划线
	if(loginNo == null && loginNo == "") {
		$(".userwarn").html(errorImgLabel + "用户名不能为空!");
		$('#a').hide();
		$(this).siblings('i').removeClass('pass');
		return;
	}
	if(!reg.test(loginNo)) {
		$(".userwarn").html(errorImgLabel + "您输入的用户名格式有误!");
		$('#a').hide();
		$(this).siblings('i').removeClass('pass');
		return;
	}

	$.ajax({
		url: jsCtx + "/natural/personRegisterUsername.do",
		type: "post",
		data: { "loginNo": loginNo },
		dataType: "json",
		success: function(data) {
			var result = data.code;
			var msg = data.msg;
			if(result != "90000") {
				$(".userwarn").html(errorImgLabel + msg);
			} else {
				userNameVerify = true;
				$(".userwarn").html('');
				$('#a').show();
				$(this).siblings('i').removeClass('cur').addClass('pass');

			}

		}

	});

}
//验证手机号
var phoneVerify = false;

function verificationPhone() {
	var phone = $(".phone").val();
	$("#phonewarn").html("");

	var reg = /^1[2,3,4,5,6,7,8,9][0-9]{9}$/;
	var phoneVd = $('.phone').val();
	if(phoneVd == "") {
		$(".phonewarn").html(errorImgLabel + " 手机号码不能为空！");
		$(this).siblings('i').removeClass('pass');

	} else if(phoneVd.length < 11) {
		$(".phonewarn").html(errorImgLabel + "手机号码长度有误！");
		$(this).siblings('i').removeClass('pass');

	} else if(!reg.test(phoneVd)) {
		$(".phonewarn").html(errorImgLabel + " 手机号格式不对！");
		$(this).siblings('i').removeClass('pass');

	} else {
		$.ajax({
			url: jsCtx + "/natural/personRegisterMobile.do",
			type: "post",
			data: { "mobile": phone },
			dataType: "json",
			success: function(data) {
				var result = data.code;
				var msg = data.msg;
				if(result != "90000") {
					$(".phonewarn").html(errorImgLabel + msg);

				} else {
					phoneVerify = true;
					$(".phonewarn").html('');
					$("#b").show();
					$(this).siblings('i').removeClass('cur').addClass('pass');

				}

			}

		});
	}
}

//验证验证码

var code; //在全局 定义验证码
var codeVerify = false;

function createCode() { //创建验证码函数
	code = "";
	var codeLength = 4; //验证码的长度
	var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
		'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'); //所有候选组成验证码的字符，当然也可以用中文的
	for(var i = 0; i < codeLength; i++) {
		var charIndex = Math.floor(Math.random() * 36);
		code += selectChar[charIndex];
	}
	// 设置验证码的显示样式，并显示
	// $("#discode").style.fontFamily="Fixedsys"; //设置字体
	$("#discode").style.letterSpacing = "15px"; //字体间距
	$("#discode").style.color = "#0ab000"; //字体颜色
	$("#discode").innerHTML = code; // 显示
}
function but() { //验证验证码输入是否正确
	$(".imgvdwarn").html('');
	var val1 = $("#t1").value;
	var val2 = code;
	if(val1 != val2) {
		$(".imgvdwarn").html(errorImgLabel + " 验证码不正确！");
		document.getElementById('t1').value = "";
	} else {
		codeVerify = true;
		$(".imgvdwarn").html('');
		$("#c").show();
		$(this).siblings('i').removeClass('cur').addClass('pass');

	}
}

//发送短信验证码
//短信倒计时
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount; //当前剩余秒数
var code = ""; //验证码
var codeLength = 6; //验证码长度
var MessageVerify = false;

function sendMessage() {

	curCount = count;

	$(".vdwarn").html("");
	if(phoneVerify == false) {
		$(".vdwarn").html(errorImgLabel + "请先填写正确的手机号码!");
		return;
	}
	if(codeVerify == false) {
		$(".vdwarn").html(errorImgLabel + "您未填写图片验证码或填写有错!");
		return;
	}
	var mobile = $(".phone").val(); //获取正确的手机号

	$.ajax({
		url: jsCtx + "/natural/personRegisterSendMsg.do",
		type: "post",
		data: { "mobile": mobile },
		dataType: "json",
		success: function(data) {
			var result = data.code;
			var msg = data.msg;

			if(result != "90000") {

				$(".vdwarn").html(errorImgLabel + "" + msg + "");
				phoneVerify = false;

			} else {
				MessageVerify = true;
			}
		}
	});
	$("#btnSendCode").attr("disabled", "true");

	$("#btnSendCode").text(curCount + "秒后重发");

	InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次

}
//timer处理函数
function SetRemainTime() {
	if(curCount == 0) {
		window.clearInterval(InterValObj); //停止计时器
		$("#btnSendCode").removeAttr("disabled"); //启用按钮
		$("#btnSendCode").text("重新发送");
		code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效 
	} else {
		curCount--;
		$("#btnSendCode").text(curCount + "秒后重发");
	}

}

//短信验证码

var mobileCodeVerify = false;

function phoneNoteVerify() {
	$(".vdwarn").html('');
	var mobileCode = $(".vdtxt").val();
	var phone = $(".phone").val();
	var mobile = phone;

	$(".vdwarn").html("");
	var reg = /^[0-9]{6}$/;

	if(phoneVerify == false) {
		$(".vdwarn").html(errorImgLabel + "请先输入正确的手机号码!");
		return;
	}
	if(MessageVerify == false) {
		$(".vdwarn").html(errorImgLabel + "请先获取短信验证码!");
		return;
	}
	if(!reg.test(mobileCode)) {
		$(".vdwarn").html(errorImgLabel + "输入的短信验证码格式有误!");
		return;
	}
	$.ajax({
		url: jsCtx + "/natural/personRegisterMobileCode.do",
		type: "post",
		data: { "mobile": mobile, "mobileCode": mobileCode },
		dataType: "json",
		success: function(data) {
			var result = data.code;
			var msg = data.msg;

			if(result != "90000") {
				$(".vdwarn").html(errorImgLabel + "" + msg + "");

			} else {
				mobileCodeVerify = true;
				$(".vdwarn").html('');
				$("#d").show();
				$(this).siblings('i').removeClass('cur').addClass('pass');

			}
		}

	});
}

//密码校验
var passwordTest = false;

function passwordVerify() {
	$(".pwdwarn").html('');
	var p = $(".password").val();
	var pt = $(".rpassword").val();
	var reg = /(?!.*[\u4E00-\u9FA5\s])(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^a-zA-Z\d]+$)^.{6,16}$/;

	$(".pwdwarn").html("");
	if(!reg.test(p)) {
		$(".pwdwarn").html(errorImgLabel + "您输入的密码格式不对!");

	} else if(pt != null && pt != "") {
		if(pt != p) {
			$(".pwdwarn").html(errorImgLabel + "两次密码不相同!");

		}
	} else {

		passwordTest = true;
		$(".pwdwarn").html('');
		$("#e").show();
		$(this).siblings('i').removeClass('cur').addClass('pass');

	}

}

var passwordTests = false;

function passwordVerifyTwo() {
	var p = $(".password").val();
	var pt = $(".rpassword").val();
	var reg = /(?!.*[\u4E00-\u9FA5\s])(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^a-zA-Z\d]+$)^.{6,16}$/;

	if(passwordTest == false) {
		$(".rpwdwarn").html("");
		$(".rpwdwarn").html(errorImgLabel + "您的上级密码未填或格式有误!");
	} else if(!reg.test(pt)) {
		$(".rpwdwarn").html("");
		$(".rpwdwarn").html(errorImgLabel + "您输入的密码格式不对!");
	} else if(p != pt) {
		$(".rpwdwarn").html("");
		$(".rpwdwarn").html(errorImgLabel + "输入的两次密码不相同!");
	} else {
		passwordTests = true;
		$(".rpwdwarn").html('');
		$("#f").show();
		$(this).siblings('i').removeClass('cur').addClass('pass');
	}
}

//密码明文
var t = 1;

function aaa() {
	if(t == 1) {

		$(".password").attr("type", "text");
		$(".rpassword").attr("type", "text");
		t = 2;
	} else if(t == 2) {
		$(".password").attr("type", "password");
		$(".rpassword").attr("type", "password");
		t = 1;
	}
}

//数据确认后保存数据到新页面
var userNameResult;
var phoneResult;
var passwordResult;
//下一步数据确认
function submitResult() {
	//var t=$("#agreecheck").val();
	var t = $("#agreecheck").prop("checked");

	if(userNameVerify == false) {
		$("#submitError").html(errorImgLabel + "您的用户名未填写或填写有误!");

	} else

	if(phoneVerify == false) {
		$("#submitError").html(errorImgLabel + "您的手机号未填写或填写有误!");

	} else
	if(MessageVerify == false) {
		$("#submitError").html(errorImgLabel + "您的短信验证码发送失败!");

	} else
	if(codeVerify == false) {
		$("#submitError").html(errorImgLabel + "您的验证码未填写或填写有误!");

	} else
	if(mobileCodeVerify == false) {
		$("#submitError").html(errorImgLabel + "您的短信验证码未填写或填写有误!");

	} else
	if(passwordTest == false) {
		$("#submitError").html(errorImgLabel + "您的初次密码未填写或填写有误!");

	} else

	if(passwordTests == false) {
		$("#submitError").html(errorImgLabel + "您的二次密码未填写或填写有误!");

	} else
	if(t == false) {
		$("#submitError").html(errorImgLabel + "您还未勾选<<注册协议>>!");

	} else {
		$("#submitError").html("");
		//保存用户名
		userNameResult = $(".username").val();
		//保存手机号
		phoneResult = $(".phone").val();
		//保存密码
		passwordResult = $(".password").val();
		$("#personDIV").hide();
		$("#personTwoDIV").show();

	}
}

var userNameTwo = false;

function nameTest() {

	var userName2 = $(".username2").val();
	var nameTest = /^[\u4e00-\u9fa5]+$/
	if(userName2 == null || userName2 == "") {
		$(".userwarn2").html(errorImgLabel + "您的姓名不能为空!");
	} else if(!nameTest.test(userName2)) {
		$(".userwarn2").html(errorImgLabel + "您的姓名输入的格式不对!");
	} else {
		userNameTwo = true;
		$(".userwarn2").html('');
		$("#g").show();
		$(this).siblings('i').removeClass('cur').addClass('pass');
	}

}

var cardTestT = false;

function cardTest() {
	var certNo = $(".card").val();
	var certType = 1;
	$(".cardwarn").html("");
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	if(!reg.test(certNo)) {
		$(".cardwarn").html(errorImgLabel + "您输入的身份证格式有误!");

	} else if(certNo == null || certNo == "") {
		$(".cardwarn").html(errorImgLabel + "身份证信息不能为空!");

	} else {
		$.ajax({
			url: jsCtx + "/natural/personRegisterCardTest.do",
			type: "post",
			data: { "certType": certType, "certNo": certNo },
			dataType: "json",
			success: function(data) {
				var result = data.code;
				var msg = data.msg;
				if(result != "90000") {
					$(".cardwarn").html(errorImgLabel + msg);

				} else {
					cardTestT = true;
					$(".cardwarn").html('');
					$("#h").show();
					$(this).siblings('i').removeClass('cur').addClass('pass');

				}
			}

		});
	}
}

var registerSubmitTest = false;

function registerSubmitTwo() {
	var certType;
	var startTime = $("#StrTime").val();
	var endTime = $("#EndTime").val();
	var certNo = $(".card").val();
	var userName2 = $(".username2").val();
	$("#goSub").html("");
	if($("#radio1").prop("checked")) {
		certType = "1";

	} else if($("#radio2").prop("checked")) {
		certType = "2";
	} else if($("#radio3").prop("checked")) {
		certType = "3";
	} else if($("#radio4").prop("checked")) {
		certType = "4";
	} else if($("#radio5").prop("checked")) {
		certType = "5";
	}
	if(userNameTwo == false) {

		$("#goSub").html(errorImgLabel + "您的姓名未输入或格式有误!");

	} else if(cardTestT == false) {
		$("#goSub").html(errorImgLabel + "您的身份证未输入或格式有误!");

	} else if(startTime == null && startTime == "") {
		$("#goSub").html(errorImgLabel + "您的身份证开始日期未选择!");

	} else if(endTime == null && endTime == "") {
		$("#goSub").html(errorImgLabel + "您的身份证结束日期未选择!");

	} else {
		//开始注册
		$.ajax({
			url: jsCtx + "/natural/personRegisterSubmit.do",
			type: "post",
			data: { "userName": userName2, "loginNo": userNameResult, "loginPwd": encrypt(passwordResult), "certNo": certNo, "userMobile": phoneResult, "startTime": startTime, "endTime": endTime, "certType": certType },
			dataType: "json",

			success: function(data) {
				var result = data.code;
				state = data.code;
				var msg = data.msg;
				if(result != "90000") {
					$("#goSub").html(errorImgLabel + msg);

				} else {
					$("#goSub").html("");
					registerSubmitTest = true;
					window.location.href = jsCtx + "/natural/success.do";
				}
			}
		});
	}
}

function sss() {
	window.location.href = jsCtx + "/natural/loginSso.do";
}
//返回上一页
function returnBackoldplace() {
	$("#personTwoDIV").hide();
	$("#personDIV").show();
}