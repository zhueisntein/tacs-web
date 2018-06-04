$(function () {
	$('.logon_c .txt').focus(function () {
		$(this).siblings('i').addClass('cur');
	})
	/**
	 * 企业名称校验
	 */
	$(".qyname").blur(function () {
		if ($(this).val() != "") {
			$(".qynamewarn").html("");
		}
		
	})
	/**
	 * 姓名校验
	 */
	$(".legalname").blur(function () {
		if ($(this).val() != "") {
			$(".legalnamewarn").html("");
		}
		
	})
	/**
	 *  社会统一信用号码
	 */
	$(".registnum").blur(function () {
		var certificateSno = $(this).val();
		if (certificateSno != "") {
			$.ajax({
				url: "/corp/checkCertificateSno.do",
				type: "POST",
				data: {certificateSno: $(this).val()},
				dataType: "json",
				success: function (result) {
					console.log(result)
					if (result.code == successCode) {
						console.log("Right!");
						$(".zchwarn").html('');
					} else {
						$(".zchwarn").html("<img class='regImg' src='/static/images/error.png' /> " + result.msg + "");
					}
				},
				error: function (error) {
					$(".zchwarn").html("<img class='regImg' src='/static/images/error.png' /> " + error.msg + "");
				}
			})
		} else {
			$(".zchwarn").html("<img class='regImg' src='/static/images/error.png' /> 企业工商注册号/统一社会信用代码必须填写");
		}
		
	});
	
	/**
	 *  法定代表人身份证号码
	 */
	$(".frcard").blur(function () {
		var regex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		var cardNo = $(this).val();
		if (cardNo == "") {
			$(".frcardwarn").html("<img class='regImg' src='/static/images/error.png' /> 法定代表人身份证号必须填写");
			return false;
		} else if (!regex.test(cardNo)) {
			$(".frcardwarn").html("<img class='regImg' src='/static/images/error.png' /> 法定代表人身份证号不合法");
			return false;
		} else {
			$(".frcardwarn").html("");
		}
		
		$.ajax({
			url: "/corp/checkIdCard.do",
			type: "POST",
			data: {idCard: cardNo},
			dataType: "json",
			async: false,
			success: function (result) {
				console.log(result)
				if (result.code == successCode) {
					$(".frcardwarn").html('');
				} else {
					$(".frcardwarn").html("<img class='regImg' src='/static/images/error.png' /> " + result.msg + "");
				}
			},
			error: function (error) {
				$(".frcardwarn").html("<img class='regImg' src='/static/images/error.png' /> " + error.msg);
			}
		})
	});
	$("#agreexy").click(function () {
		if($(this).is(':checked')){
			$(".agreexywarn").html("");
		}
	})
	/**
	 * ajax 提交验证法人和法人账号信息，提交到后台，保存到Redis中
	 */
	$("#corporateSubmit").click(function () {
		if(!$("#agreexy").is(':checked')){
			$(".agreexywarn").html("<img class='regImg' src='/static/images/error.png' /> 请点击同意注册协议");
			return false;
		}
		if ($(".qyname").val() == "") {
			$(".qyname").focus();
			$(".qynamewarn").html("<img class='regImg' src='/static/images/error.png' /> 企业名称必须填写");
			return false;
		}
		if ($(".registnum").val() == "") {
			$(".registnum").focus();
			$(".zchwarn").html("<img class='regImg' src='/static/images/error.png' /> 企业工商注册号/统一社会信用代码必须填写");
			return false;
		}
		if ($(".legalname").val() == "") {
			$(".legalname").focus();
			$(".legalnamewarn").html("<img class='regImg' src='/static/images/error.png' /> 姓名必须填写");
			return false;
		} else {
			$(".legalnamewarn").html("");
		}
		if ($(".frcard").val() == "") {
			$(".frcard").focus();
			$(".frcardwarn").html("<img class='regImg' src='/static/images/error.png' /> 法定代表人身份证号必须填写");
			return false;
		}
		
		$.ajax({
			url: "/corp/checkInformation.do",
			type: "POST",
			data: {
				corporateType: $("#corporateType").val(),
				certificateSno: $(".registnum").val(),
				name: $(".qyname").val(),
				legalUserName: $(".legalname").val(),
				legalUserCert: $(".frcard").val()
			},
			dataType: "json",
			async: false,
			success: function (result) {
				console.log(result)
				if (result.code == successCode) {
					var key = result.data.key;
					window.location.href = "/corp/stepToTwo.do?key=" + key;
				} else {
					alert(result.msg);
				}
			},
			error: function (error) {
			}
		});
	});
	
	var nameFlag = false;
	var phoneFlag = false;
	var passworfFlag = false;
	/**
	 * 用户名校验
	 */
	$(".username").blur(function () {
		nameFlag = false;
		console.log(123123)
		var this_ = this;
		$('.logon_c em').hide();
		var username = $(this).val();
		var regex = /^[0-9a-zA-Z_\u3E00-\u9FA5]{4,20}$/;
		if (username == "") {
			
			$(this_).siblings('em').eq(0).removeClass('pass');
			$(".userwarn").html("<img class='regImg' src='/static/images/error.png' /> 用户名称必须填写");
		} else if (!regex.test(username)) {
			$('.logon_c em').hide();
			$(this_).siblings('em').eq(0).removeClass('pass');
			$(".userwarn").html("<img class='regImg' src='/static/images/error.png' /> 用户名称不合法");
			return false;
		} else {
			$(".userwarn").html("");
		}
		
		$.ajax({
			url: "/corp/checkLoginNo.do",
			type: "POST",
			data: {loginNo: username},
			dataType: "json",
			success: function (result) {
				console.log(result)
				if (result.code == successCode) {
					$('.logon_c em').eq(0).show();
					nameFlag = true;
				} else {
					$('.logon_c em').hide();
					$(".userwarn").html("<img class='regImg' src='/static/images/error.png' /> " + result.msg);
				}
			},
			error: function (error) {
			}
		})
	});
	
	/**
	 * 发送手机验证码
	 */
	$(".phone").blur(function () {
		var phone = $(this).val();
		var regex = /^1[0-9]{10}/;
		if (!regex.test(phone)) {
			$('.logon_c em').eq(1).hide();
			$(".phonewarn").html("<img class='regImg' src='/static/images/error.png' /> 手机不合法");
			return false;
		} else {
			$('.logon_c em').eq(1).show();
			$(".phonewarn").html("");
		}
	})
	$(".phone").change(function () {
		phoneFlag = false;
	})
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
			url: "/corp/" + phone + "/sendCode.do",
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
				url: "/corp/" + phone + "/verifyCode.do",
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
	/**
	 * 密码校验
	 */
	//判断密码
	$('.password').focus(function () {
		$(".pwdwarn").html('');
	})
	$('.password').blur(function () {
		if ($(".rpassword").val() != "") {
			var pwdval = $('.password').val();
			var rpassword = $('.rpassword').val();
			if (pwdval != rpassword) {
				passworfFlag = false;
				$(".rpwdwarn").html("<img class='regImg' src='/static/images/error.png' /> 与密码不一致！");
			} else {
				$(".rpwdwarn").html("");
				passworfFlag = true;
			}
		}
		var reg = /(?!.*[\u4E00-\u9FA5\s])(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^a-zA-Z\d]+$)^.{6,16}$/;
		var userPwd = $('.password').val();
		if (userPwd == "") {
			$(".pwdwarn").html("<img class='regImg' src='/static/images/error.png' /> 密码不能为空！");
			$(this).siblings('i').removeClass('pass');
			return false;
		} else if (userPwd.length < 6 || userPwd.length > 16) {
			$(".pwdwarn").html("<img class='regImg' src='/static/images/error.png' /> 长度不符合！");
			$(this).siblings('i').removeClass('pass');
			return false;
		} else if (!reg.test(userPwd)) {
			$(".pwdwarn").html("<img class='regImg' src='/static/images/error.png' /> 密码不符合要求！");
			$(this).siblings('i').removeClass('pass');
			return false;
		} else {
			$(".pwdwarn").html('');
			$('.slevel').show();
			$(this).siblings('i').removeClass('cur').addClass('pass');
			return true;
		}
	})
	$('.rpassword').focus(function () {
		$(".rpwdwarn").html('');
	})
	$('.rpassword').blur(function () {
		var reg = /[\u4E00-\u9FA5]/;
		var pwdval = $('.password').val();
		var rpassword = $('.rpassword').val();
		if (rpassword == "") {
			$(".rpwdwarn").html("<img class='regImg' src='/static/images/error.png' /> 密码不能为空！");
			$(this).siblings('i').removeClass('pass');
			return false;
		} else if (rpassword != pwdval) {
			$(".rpwdwarn").html("<img class='regImg' src='/static/images/error.png' /> 与密码不一致！");
			$(this).siblings('i').removeClass('pass');
			return false;
		} else {
			passworfFlag = true;
			$(".rpwdwarn").html('');
			$(this).siblings('i').removeClass('cur').addClass('pass');
			return true;
		}
	})
	
	$("#showPwd").click(function () {
		if ($(this).is(':checked')) {
			$(".password").attr("type", "text");
			$(".rpassword").attr("type", "text");
		} else {
			$(".password").attr("type", "password");
			$(".rpassword").attr("type", "password");
		}
	});
	
	$("#forSuccess").click(function () {
		if ($(".username").val() == "") {
			$(".userwarn").html("<img class='regImg' src='/static/images/error.png' /> 用户名称必须填写");
			return false;
		}
		
		if ($(".password").val() == "") {
			$(".pwdwarn").html("<img class='regImg' src='/static/images/error.png' /> 密码不能为空！");
			return false;
		}
		if ($(".rpassword").val() == "") {
			$(".rpwdwarn").html("<img class='regImg' src='/static/images/error.png' /> 密码不能为空！");
			return false;
		}
		var key = $("#key").val();
		if (key != "" && nameFlag && phoneFlag && passworfFlag) {
			$.ajax({
				url: "/corp/" + key + "/save.do",
				type: "POST",
				data: {
					loginNo: $(".username").val(),
					loginPwd: $(".password").val(),
					corporateMobile: $(".phone").val()
				},
				dataType: "json",
				success: function (result) {
					console.log(result)
					if (result.code == successCode) {
						window.location.href = "/corp/step2Three.do";
					} else {
						
						$(".userwarn").html("<img class='regImg' src='/static/images/error.png' /> " + result.msg);
					}
				},
				error: function (error) {
				}
			})
		}
	})
});