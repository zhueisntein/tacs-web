$(function(){

    //个人中心昵称护照点击修改或添加
    $('.personal_r input').focus(function(){
        $(this).css('borderColor','#3385ff');
    })
    $('.personal_r .editxt').click(function(){
        var txt=$(this).html();
        if(txt=='修改' || txt=='填写'){
            $(this).siblings('input').attr('readonly',false).addClass('cur');
            $(this).addClass('cur');
            $(this).html('保存');
        }else if(txt=='保存'){
            $(this).removeClass('cur');
            $(this).html('修改');
            $(this).siblings('input').attr('readonly',true).removeClass('cur');
            $(this).siblings('input').css('border','none');
        }
    })
    //个人中心点击性别或民族
    $('.personal_r .nationsel').click(function(){
        var txt=$(this).html();
        if(txt=='修改' || txt=='填写'){
            $(this).siblings('.selcont').hide();
            $(this).siblings('select').show();
            
            $(this).addClass('cur');
            $(this).html('保存');
        }else if(txt=='保存'){
            var seltxt=$('#nation option:selected').text();
            $(this).siblings('.selcont').html(seltxt);
            $(this).siblings('.selcont').show();
            $(this).siblings('select').hide();
            $(this).html('修改');
            $(this).removeClass('cur');
        }
    })
    $('.personal_r .sexsel').click(function(){
        var txt=$(this).html();
        if(txt=='修改' || txt=='填写'){
            $(this).siblings('.selcont').hide();
            $(this).siblings('select').show();
            
            $(this).addClass('cur');
            $(this).html('保存');
        }else if(txt=='保存'){
            var seltxt=$('#sex option:selected').text();
            $(this).siblings('.selcont').html(seltxt);
            $(this).siblings('.selcont').show();
            $(this).siblings('select').hide();
            $(this).html('修改');
            $(this).removeClass('cur');
        }
    })


    //法人注册法定代表人身份所在地选择
    $('.seladstype label').click(function(){
        $('.legalseltype').eq($(this).index()).addClass('cur').siblings().removeClass('cur');
    })
    //能否提供含有法人编号的法人单位证件
    $('.inforct_t label').click(function(){
        $('.inforct_c').eq($(this).index()).addClass('cur').siblings().removeClass('cur');
    })

	//登录选项卡切换
	$('.login_t h2').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		$('.logon_c').eq($(this).index()).addClass('cur').siblings().removeClass('cur');
	})
    //二维码登录切换
    $('.login_seltype .twocode').click(function(){
        $(this).hide();
        $(this).siblings('.pccode').css('display','block');
        $(this).parent().siblings('.scan_box').show();
        $(this).parent().siblings('.loginform').hide();
        $(this).parent().siblings('.tiplogin').show();
    })
    $('.login_seltype .pccode').click(function(){
        $(this).hide();
        $(this).siblings('.twocode').css('display','block');
        $(this).parent().siblings('.loginform').show();
        $(this).parent().siblings('.scan_box').hide();
        $(this).parent().siblings('.tiplogin').hide();
    })

    //法人登陆遇到问题详情的弹出
    $('.bintang .problem').click(function(){
        $('.problem_c').stop().slideToggle();
    })

    //数字证书登录
    $('.digital_btn').click(function(){
        $('.digital_shadow').stop().fadeIn();
    })
    $('.digital_shadow .close').click(function(){
        $('.digital_shadow').stop().fadeOut();
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

    //个人注册人脸识别引导
    $('.facebtn').click(function(){
         $('.shadow').stop().fadeIn();
        $('.facestep_pop').stop().fadeIn();
    })
    $('.facestep_pop .close,.shadow').click(function(){
        $('.shadow').stop().fadeOut();
        $('.facestep_pop').stop().fadeOut();
    })

    //初级认证选择类型
    $('.seltype label').click(function(){
        $('.optionlist').eq($(this).index()).addClass('cur').siblings().removeClass('cur');
        if($(this).attr('for')=='radio4'){
            $('.fntype').show();
            $('.fntype label').click(function(){
                if($(this).attr('for')=='radio6'){
                    $('.fnoption').html('请您提供护照，及手持护照的照片，我们收到后，两个工作日之内完成认证。')
                }else{
                    $('.fnoption').html('请您提供外国人永久居留身份证，及手持外国人永久居留身份证的照片，我们收到后，两个工作日之内完成认证。')
                }
            })
        }else{
            $('.fntype').hide();
        }
    })

    //人工申诉问题
    $('.question a').click(function(){
        $(this).addClass('cur').siblings().removeClass('cur');
    })

    //点击按钮跳转链接，后期请根据需要删除
    $('#registbtn').click(function(){
        location.href="person_certification.html"
    })



	$('.logon_c .txt').focus(function(){
		$(this).siblings('i').addClass('cur');
	})
	
    //个人用户登录-----begin
	//判断用户名
	$('.username').focus(function(){
		$(".userwarn").html('');
	})
	$('.username').blur(function(){
		var reg = /^[0-9a-zA-Z_\u3E00-\u9FA5]{3,15}$/;//4-16字节，允许字母数字下划线
        var userName = $(".username").val();
        if (userName == "") {
            $(".userwarn").html("<img class='regImg' src='images/error.png' /> 用户名不能为空！");
            $(this).siblings('i').removeClass('pass');
            return false;
        } else if (!reg.test(userName)) {
            $(".userwarn").html("<img class='regImg' src='images/error.png' /> 不正确的用户名格式！");
             $(this).siblings('i').removeClass('pass');
            return false;
        } else {
        	 $(".userwarn").html('');
        	 $('.logon_c em').show();
        	 $(this).siblings('i').removeClass('cur').addClass('pass');
        	 return true;
        }  
	})
	//判断密码
	$('.password').focus(function(){
		$(".pwdwarn").html('');
	})
	$('.password').blur(function(){
        var reg = /[\u4E00-\u9FA5]/;
        var userPwd = $('.password').val();
        if (userPwd == "") {
            $(".pwdwarn").html("<img class='regImg' src='images/error.png' /> 密码不能为空！");
            $(this).siblings('i').removeClass('pass');
            return false;
        } else if (userPwd.length < 6 || userPwd.length > 16) {
            $(".pwdwarn").html("<img class='regImg' src='images/error.png' /> 长度不符合！");
            $(this).siblings('i').removeClass('pass');
            return false;
        } else if(!reg.test(userPwd)){
            $(".pwdwarn").html("<img class='regImg' src='images/error.png' /> 密码不能有中文！");
            $(this).siblings('i').removeClass('pass');
             return false;
        } else {
        	$(".pwdwarn").html('');
            $('.slevel').show();
        	$(this).siblings('i').removeClass('cur').addClass('pass');
            return true;
        }
	})

	//判断验证码
	$('.vdtxt').focus(function(){
		$(".vdwarn").html('');
	})
	$('.vdtxt').blur(function(){
        var userVd = $('.vdtxt').val();
        if (userVd == "") {
            $(".vdwarn").html("<img class='regImg' src='images/error.png' /> 验证码不能为空！");
            $(this).siblings('i').removeClass('pass');
            return false;
        }else {
        	$(".vdwarn").html('');
        	$(this).siblings('i').removeClass('cur').addClass('pass');
            return true;
        }
	})
    //个人用户登录-----end

    //法人用户登录-----begin
    //判断用户名
    $('.lusername').focus(function(){
        $(".luserwarn").html('');
    })
    $('.lusername').blur(function(){
        var reg = /^[0-9a-zA-Z_\u3E00-\u9FA5]{3,15}$/;//4-16字节，允许字母数字下划线
        var luserName = $(".lusername").val();
        if (luserName == "") {
            $(".luserwarn").html("<img class='regImg' src='images/error.png' /> 用户名不能为空！");
            $(this).siblings('i').removeClass('pass');
            return false;
        } else if (!reg.test(luserName)) {
            $(".luserwarn").html("<img class='regImg' src='images/error.png' /> 不正确的用户名格式！");
             $(this).siblings('i').removeClass('pass');
            return false;
        } else {
             $(".luserwarn").html('');
             $('.logon_c em').show();
             $(this).siblings('i').removeClass('cur').addClass('pass');
             return true;
        }  
    })
    //判断密码
    $('.lpassword').focus(function(){
        $(".lpwdwarn").html('');
    })
    $('.lpassword').blur(function(){
        var reg = /[\u4E00-\u9FA5]/;
        var luserPwd = $('.lpassword').val();
        if (luserPwd == "") {
            $(".lpwdwarn").html("<img class='regImg' src='images/error.png' /> 密码不能为空！");
            $(this).siblings('i').removeClass('pass');
            return false;
        } else if (luserPwd.length < 6 || luserPwd.length > 16) {
            $(".lpwdwarn").html("<img class='regImg' src='images/error.png' /> 长度不符合！");
            $(this).siblings('i').removeClass('pass');
            return false;
        } else if(!reg.test(luserPwd)){
            $(".lpwdwarn").html("<img class='regImg' src='images/error.png' /> 密码不能有中文！");
            $(this).siblings('i').removeClass('pass');
             return false;
        } else {
            $(".lpwdwarn").html('');
            $(this).siblings('i').removeClass('cur').addClass('pass');
            return true;
        }
    })

    //判断验证码
    $('.lvdtxt').focus(function(){
        $(".lvdwarn").html('');
    })
    $('.lvdtxt').blur(function(){
        var luserVd = $('.lvdtxt').val();
        if (luserVd == "") {
            $(".lvdwarn").html("<img class='regImg' src='images/error.png' /> 验证码不能为空！");
            $(this).siblings('i').removeClass('pass');
            return false;
        }else {
            $(".lvdwarn").html('');
            $(this).siblings('i').removeClass('cur').addClass('pass');
            return true;
        }
    })
    //法人用户登录-----end


	//点击登录按钮时验证
    //个人
	$('#loginbtn').click(function(){
		//用户名
		var reg = /^[0-9a-zA-Z_\u3E00-\u9FA5]{3,15}$/;//4-16字节，允许字母数字下划线
        var userName = $(".username").val();
        if (userName == "") {
            $(".userwarn").html("<img class='regImg' src='images/error.png' /> 用户名不能为空！");
            $(this).siblings('i').removeClass('pass');
            return false;
        } else if (!reg.test(userName)) {
            $(".userwarn").html("<img class='regImg' src='images/error.png' /> 不正确的用户名格式！");
             $(this).siblings('i').removeClass('pass');
            return false;
        }
        //密码
        var reg = /[\u4E00-\u9FA5]/;
        var userPwd = $('.password').val();
        if (userPwd == "") {
            $(".pwdwarn").html("<img class='regImg' src='images/error.png' /> 密码不能为空！");
            $(this).siblings('i').removeClass('pass');
            return false;
        } else if (userPwd.length < 6 || userPwd.length > 16) {
            $(".pwdwarn").html("<img class='regImg' src='images/error.png' /> 长度不符合！");
            $(this).siblings('i').removeClass('pass');
            return false;
        } else if(reg.test(userPwd)){
            $(".pwdwarn").html("<img class='regImg' src='images/error.png' /> 密码不能有中文！");
            $(this).siblings('i').removeClass('pass');
             return false;
        }
        //验证码
        var userVd = $('.vdtxt').val();
        if (userVd == "") {
            $(".vdwarn").html("<img class='regImg' src='images/error.png' /> 验证码不能为空！");
            $(this).siblings('i').removeClass('pass');
            return false;
        }
	})
    //法人
    $('#loginlgbtn').click(function(){
        //用户名
        var reg = /^[0-9a-zA-Z_\u3E00-\u9FA5]{3,15}$/;//4-16字节，允许字母数字下划线
        var luserName = $(".lusername").val();
        if (luserName == "") {
            $(".luserwarn").html("<img class='regImg' src='images/error.png' /> 用户名不能为空！");
            $(this).siblings('i').removeClass('pass');
            return false;
        } else if (!reg.test(luserName)) {
            $(".luserwarn").html("<img class='regImg' src='images/error.png' /> 不正确的用户名格式！");
             $(this).siblings('i').removeClass('pass');
            return false;
        }
        //密码
        var reg = /[\u4E00-\u9FA5]/;
        var luserPwd = $('.lpassword').val();
        if (luserPwd == "") {
            $(".lpwdwarn").html("<img class='regImg' src='images/error.png' /> 密码不能为空！");
            $(this).siblings('i').removeClass('pass');
            return false;
        } else if (luserPwd.length < 6 || luserPwd.length > 16) {
            $(".lpwdwarn").html("<img class='regImg' src='images/error.png' /> 长度不符合！");
            $(this).siblings('i').removeClass('pass');
            return false;
        } else if(reg.test(luserPwd)){
            $(".lpwdwarn").html("<img class='regImg' src='images/error.png' /> 密码不能有中文！");
            $(this).siblings('i').removeClass('pass');
             return false;
        }
        //验证码
        var luserVd = $('.lvdtxt').val();
        if (luserVd == "") {
            $(".lvdwarn").html("<img class='regImg' src='images/error.png' /> 验证码不能为空！");
            $(this).siblings('i').removeClass('pass');
            return false;
        }
    })

    //个人注册
    //确认密码
    $('.rpassword').focus(function(){
        $(".rpwdwarn").html('');
    })
    $('.rpassword').blur(function(){
        var reg = /[\u4E00-\u9FA5]/;
        var pwdval=$('.password').val();
        var rpassword = $('.rpassword').val();
        if (rpassword == "") {
            $(".rpwdwarn").html("<img class='regImg' src='images/error.png' /> 密码不能为空！");
            $(this).siblings('i').removeClass('pass');
            return false;
        } else if (rpassword != pwdval) {
            $(".rpwdwarn").html("<img class='regImg' src='images/error.png' /> 与密码不一致！");
            $(this).siblings('i').removeClass('pass');
            return false;
        } else {
            $(".rpwdwarn").html('');
            $(this).siblings('i').removeClass('cur').addClass('pass');
            return true;
        }
    })

    //判断图片验证码
    $('.imgvd').focus(function(){
        $(".imgvdwarn").html('');
    })
    $('.imgvd').blur(function(){
        var imgVd = $('.imgvd').val();
        if (imgVd == "") {
            $(".imgvdwarn").html("<img class='regImg' src='images/error.png' /> 验证码不能为空！");
            $(this).siblings('i').removeClass('pass');
            return false;
        }else {
            $(".imgvdwarn").html('');
            $(this).siblings('i').removeClass('cur').addClass('pass');
            return true;
        }
    })

    //手机号码验证
    $('.phone').focus(function(){
        $(".phonewarn").html('');
    })
    $('.phone').blur(function(){
        var reg =  /^0?(13[0-9]|15[012356789]|17[0678]|18[0123456789]|14[57])[0-9]{8}$/;
        var phoneVd = $('.phone').val();
        if (phoneVd == "") {
            $(".phonewarn").html("<img class='regImg' src='images/error.png' /> 手机号码不能为空！");
            $(this).siblings('i').removeClass('pass');
            return false;
        } else if (phoneVd.length < 11) {
            $(".phonewarn").html("<img class='regImg' src='images/error.png' /> 手机号码长度有误！");
            $(this).siblings('i').removeClass('pass');
            return false;
        } else if (!reg.test(phoneVd)) {
            $(".phonewarn").html("<img class='regImg' src='images/error.png' /> 手机号不存在！");
            $(this).siblings('i').removeClass('pass');
            return false;
        }else {
            $(".phonewarn").html('');
            $(this).siblings('i').removeClass('cur').addClass('pass');
            return true;
        }
    })

    //身份证验证
    $('.card').focus(function(){
        $(".cardwarn").html('');
    })
    $('.card').blur(function(){
        var cardVd = $('.card').val();
        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        if(!cardVd || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(cardVd)){
            $(".cardwarn").html("<img class='regImg' src='images/error.png' /> 身份证号格式错误！");
            $(this).siblings('i').removeClass('pass');
            return false;
        }else if(!city[cardVd.substr(0,2)]){
            $(".cardwarn").html("<img class='regImg' src='images/error.png' /> 地址编码错误！");
            $(this).siblings('i').removeClass('pass');
            return false;
        }else if(cardVd.length == 18){
            //18位身份证需要验证最后一位校验位
            cardVd = cardVd.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = cardVd[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != cardVd[17]){
                $(".cardwarn").html("<img class='regImg' src='images/error.png' /> 校验位错误！");
                $(this).siblings('i').removeClass('pass');
                return false;
            }
        }else{
            $(".cardwarn").html('');
            $(this).siblings('i').removeClass('cur').addClass('pass');
            return true;
        }
    })

    //军官证验证
    $('.officervd').focus(function(){
        $(".officerwarn").html('');
    })
    $('.officervd').blur(function(){
        var reg=/^[a-zA-Z0-9]{7,21}$/;
        var imgVd = $('.officervd').val();
        if (imgVd == "") {
            $(".officerwarn").html("<img class='regImg' src='images/error.png' /> 军官证不能为空！");
            $(this).siblings('i').removeClass('pass');
            return false;
        }else if(!reg.test(imgVd)){
            $(".officerwarn").html("<img class='regImg' src='images/error.png' /> 请输入正确的军官证！");
            $(this).siblings('i').removeClass('pass');
            return false;
        }else {
            $(".officerwarn").html('');
            $(this).siblings('i').removeClass('cur').addClass('pass');
            return true;
        }
    })

    //重置密码
    $('.repassword').focus(function(){
        $(".repwdwarn").html('');
    })
    $('.repassword').blur(function(){
        var reg = /[\u4E00-\u9FA5]/;
        var pwdval=$('.password').val();
        var repassword = $('.repassword').val();
        if (repassword == "") {
            $(".repwdwarn").html("<img class='regImg' src='images/error.png' /> 密码不能为空！");
            $(this).siblings('i').removeClass('pass');
            return false;
        } else if (repassword != pwdval) {
            $(".repwdwarn").html("<img class='regImg' src='images/error.png' /> 与密码不一致！");
            $(this).siblings('i').removeClass('pass');
            return false;
        } else {
            $(".repwdwarn").html('');
            $(this).siblings('i').removeClass('cur').addClass('pass');
            return true;
        }
    })

    //地址验证
    $('.address').focus(function(){
        $(".adswarn").html('');
    })
    $('.address').blur(function(){
        var reg = /[\u4E00-\u9FA5]/;
        var pwdval=$('.password').val();
        var address = $('.address').val();
        if (address == "") {
            $(".adswarn").html("<img class='regImg' src='images/error.png' /> 地址不能为空！");
            $(this).siblings('i').removeClass('pass');
            return false;
        }else {
            $(".adswarn").html('');
            $(this).siblings('i').removeClass('cur').addClass('pass');
            return true;
        }
    })

    //邮箱验证
    $('.message').focus(function(){
        $(".msgwarn").html('');
    })
    $('.message').blur(function(){
        var message = $('.message').val();
        var isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (message == "") {
            $(".msgwarn").html("<img class='regImg' src='images/error.png' /> 邮箱不能为空！");
            $(this).siblings('i').removeClass('pass');
            return false;
        }else if(!(isEmail.test(message))){
             $(".msgwarn").html("<img class='regImg' src='images/error.png' /> 邮箱格式不正确！");
            $(this).siblings('i').removeClass('pass');
            return false;
        }else {
            $(".msgwarn").html('');
            $(this).siblings('i').removeClass('cur').addClass('pass');
            return true;
        }
    })
    
})