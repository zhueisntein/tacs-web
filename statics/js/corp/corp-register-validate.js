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
				url: uri + "/corporate/register/checkCertificateSno",
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
			url: uri + "/corporate/register/checkIdCard",
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
					url: uri + "/corporate/register/checkInformation",
					type: "POST",
					data: {
                        corporateType: $("#corporateType").val(),
                        certificateSno: $("#certificateSno").val(),
                        name: $("#corporateName").val(),
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
							window.location.href="./corp-register-account.html?key=" + key;
						}else{
							$(".dateError").html(errorImgLabel + result.msg)
						}
					},
					error: function (error) {
					}
				});

		}
	})

})