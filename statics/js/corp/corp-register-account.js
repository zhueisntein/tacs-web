/**
 * Created by zcx on 2018/5/25.
 */
function getRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

$(function () {
	$("#createCodeBtn").attr("src",  uri +  '/servlet/verifyImgCodeServlet?rnd=' + Math.random());
	/**
	 * 点亮
	 */
	$('.logon_c .txt').focus(function () {
		$(this).siblings('i').addClass('cur');
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
			url: uri + "/corporate/register/checkLoginNo",
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
		var validateCode = $("#legalCode").val();
		if(validateCode == ""){
			$("#legalCode").parent().next("span").html(errorImgLabel + "请输入验证码");
			return false;
		}
		if(validateCode.length < 4){
            $("#legalCode").parent().next("span").html(errorImgLabel + "请输入正确的验证码");
            return false;
		}
		var regex = /^1[0-9]{10}/;
		if (!regex.test(phone)) {
			$(".phonewarn").html(errorImgLabel + "手机不合法");
			return false;
		} else {
            $(".phone").next('em').show();
            $(".phone").parent().next('span').empty();
		}
		sendMessage();
		$.ajax({
			url: uri + "/corporate/register/" + phone + "/sendCode",
			type: "POST",
			data: {validateCode: validateCode},
			dataType: "json",
			async: false,
            xhrFields: {
                withCredentials: true
            },
			success: function (result) {
				console.log(result)
				if (result.code != successCode) {
                    $(".phone").next('em').hide();
                    $(".phone").parent().next('span').html(errorImgLabel + result.msg);
				} else {
                    $("#legalCode").next().show();
				}
			},
			error: function (error) {
                console.log(error)
			}
		})
	});
	/**
	 * 校验短信验证码
	 */
	$("#phoneValidate").blur(function () {
		phoneFlag = false;
		var phone = $(".phone").val();
		var code = $("#phoneValidate").val();
		if (code.length == 6 && phone.length == 11) {
			$.ajax({
				url: uri + "/corporate/register/" + phone + "/verifyCode",
				type: "POST",
				data: {code: code},
				dataType: "json",
				async: false,
				success: function (result) {
					console.log(result)
					if (result.code == successCode) {
                        $("#phoneValidate").next('em').show();
                        $("#phoneValidate").parent().next("span").empty();
						phoneFlag = true;
					} else {
                        $("#phoneValidate").next('em').hide();
                        $("#phoneValidate").parent().next("span").html(errorImgLabel + result.msg);
					}
				},
				error: function (error) {
				}
			})
		} else if (phone.length == 11) {
            $("#phoneValidate").next('em').hide();
            $("#phoneValidate").parent().next("span").html(errorImgLabel + "请填写6位的验证码");
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
            legalCode:{
				required: true,
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
            legalCode:{
                required: "请输入验证码",
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
					url: uri + "/corporate/register/"+ getRequest().key +"/save",
					type: "POST",
					data: {
						loginNo: $("#loginNo").val(),
						loginPwd: $("#loginPwd").val(),
						corporateMobile: $("#corporateMobile").val()
					},
					dataType: "json",
					async: false,
					success: function (result) {
						console.log(result)
						if (result.code == successCode) {
							window.location.href = "corp-register-success.html";
						}
					},
					error: function (error) {
					}
				});
			}else {
                $("#phoneValidate").next('em').hide();
                $("#phoneValidate").parent().next("span").html(errorImgLabel + "请填写6位的验证码");
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
	window.open(uri + "/natural/personRegister.do")
}