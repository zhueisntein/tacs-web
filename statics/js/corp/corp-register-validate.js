/**
 * Created by zcx on 2018/5/25.
 */

$(function () {
	/**
	 * 点亮
	 */
	$('.logon_c .txt').focus(function () {
		$(this).siblings('i').addClass('cur');
	})

	//用户协议弹窗
	$('.ament').click(function(){
		$('.agreement_shadow').stop().fadeIn();
	})
	$('.agreement_shadow .close,.agreement .loginbtn').click(function(){
		$('.agreement_shadow').stop().fadeOut();
	})
	$('.agreement_shadow .close').click(function(){
		$('.ament').siblings('input').prop("checked",false);
	})
	$('.agreement_shadow .loginbtn').click(function(){
		$('.ament').siblings('input').prop("checked",true);
	})

	$("#corporateAuthSubmit").click(function () {
		$("#corporateAuthForm").submit();
		if($(".dateError").children("label").length == 2){
			$(".dateError").children("label").eq(0).remove();
		}
	})

	$.validator.addMethod("certificateSnoTest", function (value, element, param) {
		var content = "";
		var flag = false;
		var reg = /[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}/;
		if(!reg.test(value)){
			$.validator.messages.certificateSnoTest = "请输入合法的社会统一信用代码";
			return false;
		}else {
			$.ajax({
				url: jsCtx + "/corp/checkCertificateSno.do",
				type: "POST",
				data: {certificateSno: value},
				dataType: "json",
				async: false,
				success: function (result) {
					console.log(result)
					if (result.code == successCode) {
						$.validator.messages["certificateSnoTest"] = content;
						flag = true;
					} else {
						content = result.msg;
						console.log(content)
						$.validator.messages["certificateSnoTest"] = content;
					}
				}
			})
		}
		if(flag){
			$(element).next().show();
		}else{
			$(element).next().hide();
		}
		return flag;
	}, "请重新填写");
	$.validator.addMethod("legalUserCertTest", function (value, element, param) {
		var content = "";
		var flag = false;
		var regex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if (!regex.test(value)) {
			content = "请输入正确的法定代表人身份证号";
			$.validator.messages.legalUserCertTest = content;
			return false;
		}
		$.ajax({
			url: jsCtx + "/corp/checkIdCard.do",
			type: "POST",
			data: {idCard: value},
			dataType: "json",
			async: false,
			success: function (result) {
				console.log(result)
				if (result.code == successCode) {
					$.validator.messages["legalUserCertTest"] = content;
					flag = true;
				} else {
					content = result.msg;
					$.validator.messages["legalUserCertTest"] = content;
					flag = false;
				}
			}
		});
		if(flag){
			$(element).next().show();
		}else{
			$(element).next().hide();
		}
		return flag;
	}, "请重新填写");
	$.validator.addMethod("legalUserNameTest", function (value, element, param) {
		var reg = /^[\u4e00-\u9fa5]{2,10}$/;
		if(value == "") {
			$(element).next().hide();
			$.validator.messages.legalUserNameTest ="请输入法定代表人姓名";
			return false;
		}else if(!reg.test(value)){
			$(element).next().hide();
			$.validator.messages.legalUserNameTest ="请输入长度为2-10位合法的法定代表人姓名, 不能含有数字字母特殊字符";
			return false;
		}else{
			$(element).next().show();
			return true;
		}
	}, "请重新填写");
	$.validator.addMethod("corporateNameTest", function (value, element, param) {
		var reg = /^[\u4e00-\u9fa5]{4,50}$/;
		if(value == "") {
			$(element).next().hide();
			$.validator.messages.corporateNameTest ="请输入企业姓名";
			return false;
		}else if(!reg.test(value)) {
			$(element).next().hide();
			$.validator.messages.corporateNameTest ="请输入长度为4-50位合法的中文企业名称, 不能含有数字字母特殊字符";
		}else{
			$(element).next().show();
			return true;
		}

	}, "请重新填写");
	$.validator.addMethod("validateDateTest", function (value, element, param) {
		var startDate = $("#startDate").val();
		var endDate = $("#endDate").val();
		var flag = false;
		if(startDate == "" || endDate == ""){
			$(element).parent().next("span").eq(0).empty();
			$.validator.messages.validateDateTest = "请输入身份证有效日期";
		}else{
			startDate = new Date(startDate.replace(/-/,"/"))
			endDate = new Date(endDate.replace(/-/,"/"))
			var yearMinutes = 1000 * 60 * 60 * 24 * 365;
			if(startDate > new Date()){
				$.validator.messages.validateDateTest = "请输入身份证有效日期";
			}
			$(element).parent().next("span").eq(0).empty();
			var gap = parseInt((endDate.getTime() - startDate.getTime())/ yearMinutes );
			if(gap < 5){
				$.validator.messages.validateDateTest = "身份证有效区间不能少于5年";
			}else{
				flag = true;
			}
		}
		return flag;
	}, "请重新填写");

	$("#corporateAuthForm").validate({
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().next());
		},
		rules: {

			corporateName: {
				corporateNameTest: true
			},
			certificateSno: {
				required: true,
				certificateSnoTest: true,
			},
			legalUserName: {
				legalUserNameTest: true
			},
			legalUserCert: {
				required: true,
				legalUserCertTest: true
			},
			startDate:{
				validateDateTest: true,
			},
			endDate:{
				validateDateTest: true,
			},
			agreexy: "required",
		},
		messages: {
			certificateSno: {
				required: "请输入社会统一代码",
			},
			legalUserCert: {
				required: "请输入法定代表人身份证号码",
			},
			agreexy: "请接受 注册协议",

		},

		submitHandler: function () {
				$.ajax({
					url: jsCtx + "/corp/checkInformation.do",
					type: "POST",
					data: {
						corporateType: $("#corporateType").val(),
						certificateSno: $("#certificateSno").val(),
						corporateName: $("#corporateName").val(),
						legalUserName: $("#legalUserName").val(),
						legalUserCert: $("#legalUserCert").val(),
						legalCertBeginDate: $("#startDate").val().replace(/-/,"").replace(/-/,""),
						legalCertEndDate: $("#endDate").val().replace(/-/,"").replace(/-/,""),
					},
					dataType: "json",
					async: false,
					success: function (result) {
						console.log(result)
						if (result.code == successCode) {
							var key = result.data.key;
							console.log(key)
							window.location.href = "/corp/createAccount.do?key=" + key;
						}else{
							$(".dateError").html(errorImgLabel + result.msg)
						}
					},
					error: function (error) {
					}
				});

		}
	})

	$("#corporateAccountSubmit").click(function () {
		$("#corporateAccountForm").submit();
	});
	$.validator.addMethod("loginNoTest", function (value, element, param) {
		var content = "";
		var flag = false;
		var reg = /^[0-9a-zA-Z_\u3E00-\u9FA5]{4,15}$/;
		if(!reg.test(value)){
			content = "用户名称长度不够";
			$.validator.messages["loginNoTest"] = content;
			return flag;
		}
		$.ajax({
			url: jsCtx + "/corp/checkLoginNo.do",
			type: "POST",
			data: {loginNo: value},
			dataType: "json",
			async: false,
			success: function (result) {
				if (result.code == successCode) {
					$.validator.messages["loginNoTest"] = content;
					flag = true;
				} else {
					content = result.msg;
					$.validator.messages["loginNoTest"] = content;
				}
			}
		})
		if(flag){
			$(element).next().show();
		}else{
			$(element).next().hide();
		}
		return flag;
	}, "请重新输入");
	$.validator.addMethod("loginPwdTest", function (value, element, param) {
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
		$.validator.messages.loginPwdTest = content;
		if(flag){
			$(element).next().show();
		}else{
			$(element).next().hide();
		}
		return flag;
	}, "请重新输入");
	$.validator.addMethod("confirmLoginPwdTest", function (value, element, param) {
		var content = "";
		var flag = false;
		if(value != $("#loginPwd").val()){
			content = "两次密码输入不一致";
		}else{
			flag = true;
		}
		console.log(flag)
		$.validator.messages.confirmLoginPwdTest = content;
		if(flag){
			$(element).next().show();
		}else{
			$(element).next().hide();
		}
		return flag;
	}, "请重新输入");
	$.validator.addMethod("corporateMobileTest", function (value, element, param) {
		var content = "";
		var flag = false;
		var regex = /^1[0-9]{10}/;
		if (!regex.test(value)) {
			content = "手机号码不合法";
		} else {
			flag = true;
		}
		$.validator.messages.corporateMobileTest = content;
		if(flag){
			$(element).next().show();
		}else{
			$(element).next().hide();
		}
		return flag;
	}, "请重新输入");
	var phoneFlag = false;
	/**
	 * 获取验证码
	 */
	$("#btnSendCode").click(function () {
		var phone = $(".phone").val();
		var regex = /^1[0-9]{10}/;
		if (!regex.test(phone)) {
			$(".phonewarn").html("<img class='regImg' src='/static/images/error.png' /> 手机不合法");
			return false;
		} else {
			$('.logon_c em').eq(1).show();
			$(".phonewarn").html("");
		}
		sendMessage();
		$.ajax({
			url: jsCtx + "/corp/" + phone + "/sendCode.do",
			type: "POST",
			data: {},
			dataType: "json",
			async: false,
			success: function (result) {
				console.log(result)
				if (result.code != successCode) {
					$('.logon_c em').eq(1).hide();
					$(".phonewarn").html("<img class='regImg' src='/static/images/error.png' /> " + result.msg);
				} else {

				}
			},
			error: function (error) {
			}
		})
	})
	/**
	 * 校验短信验证码
	 */
	$(".vdtxt").blur(function () {
		phoneFlag = false;
		var phone = $(".phone").val();
		var code = $(".vdtxt").val();
		if (code.length == 6 && phone.length == 11) {
			$.ajax({
				url: jsCtx + "/corp/" + phone + "/verifyCode.do",
				type: "POST",
				data: {code: code},
				dataType: "json",
				async: false,
				success: function (result) {
					console.log(result)
					if (result.code == successCode) {
						$('.logon_c em').eq(2).show();
						$(".vdwarn").html("");
						phoneFlag = true;
					} else {
						$('.logon_c em').eq(2).hide();
						$(".vdwarn").html("<img class='regImg' src='/static/images/error.png' /> " + result.msg);
					}
				},
				error: function (error) {
				}
			})
		} else if (phone.length == 11) {
			$('.logon_c em').eq(2).hide();
			$(".vdwarn").html("<img class='regImg' src='/static/images/error.png' /> 请填写6位的验证码");
		}
	})

	$("#corporateAccountForm").validate({
		errorPlacement: function (error, element) {
			error.appendTo(element.parent().next());
		},
		rules: {

			loginNo: {
				required: true,
				loginNoTest: true
			},
			corporateMobile:{
				required: true,
				corporateMobileTest: true,
			},
			loginPwd: {
				required: true,
				loginPwdTest: true,
			},
			confirmLoginPwd: {
				required: true,
				confirmLoginPwdTest: true,
				equalTo: "#loginPwd",
			}
		},
		messages: {
			loginNo: {
				required: "请输入账号"
			},
			corporateMobile: {
				required: "请输入手机号码",
			},
			loginPwd: {
				required: "请输入密码",
			},
			confirmLoginPwd: {
				required: "请输入密码",
				equalTo: "两次密码输入不一致"
			}
		},
		submitHandler: function () {
			if(phoneFlag) {
				$.ajax({
					url: jsCtx + "/corp/save.do",
					type: "POST",
					data: {
						key: $("#redisKey").val(),
						loginNo: $("#loginNo").val(),
						loginPwd: $("#loginPwd").val(),
						corporateMobile: $("#corporateMobile").val()
					},
					dataType: "json",
					async: false,
					success: function (result) {
						console.log(result)
						if (result.code == successCode) {
							window.location.href = "/corp/success.do";
						}
					},
					error: function (error) {
					}
				});
			}else {
				$('.logon_c em').eq(2).hide();
				$(".vdwarn").html("<img class='regImg' src='/static/images/error.png' /> 请填写6位的验证码");
			}
		}
	});

	/**
	 * 显示密码
	 */
	$("#showPwd").click(function () {
		if ($(this).is(':checked')) {
			$(".password").attr("type", "text");
			$(".rpassword").attr("type", "text");
		} else {
			$(".password").attr("type", "password");
			$(".rpassword").attr("type", "password");
		}
	});

})
function goPersonRegister () {
	window.open(jsCtx + "/natural/personRegister.do")
}