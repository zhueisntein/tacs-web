//校验身份证
var userNameVerify=false;
function usernameTest(){
	 
    var username=$(".username").val();
    $(".userwarn").html('');
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	if(username==null||username==""){
		$(".userwarn").html(errorImgLabel+"身份证不能为空");
		$("#a").hide();
		$(this).siblings('i').removeClass('pass');
	}else if(!reg.test(username)){
		$(".userwarn").html(errorImgLabel+"身份证格式不正确");
		$("#a").hide();
		$(this).siblings('i').removeClass('pass');
	}else{
		    userNameVerify=true;
		    $(".userwarn").html('');
		    $("#a").show();
            $(this).siblings('i').removeClass('cur').addClass('pass');
	}
	
}

//验证图片验证码
var code; //在全局 定义验证码
var codeVerify=false;
/*function createCode()
{ //创建验证码函数
 code = "";
 var codeLength =4;//验证码的长度
 var selectChar = new Array(0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k',
  'l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');//所有候选组成验证码的字符，当然也可以用中文的
 for(var i=0;i<codeLength;i++)
 { 
 var charIndex =Math.floor(Math.random()*36);
 code +=selectChar[charIndex]; 
 }
//// 设置验证码的显示样式，并显示
// document.getElementById("discode").style.fontFamily="Fixedsys"; //设置字体
 document.getElementById("discode").style.letterSpacing="15px"; //字体间距
// document.getElementById("discode").style.color="#0ab000"; //字体颜色
 document.getElementById("discode").innerHTML=code; // 显示

}
function but()
{//验证验证码输入是否正确
	 $(".imgvdwarn").html('');
 var val1=document.getElementById("t1").value;
 var val2=code;
 if(val1!=val2){
    $(".imgvdwarn").html("<img class='regImg' src='../static/images/error.png' /> 验证码不正确！");
    document.getElementById('t1').value="";
	$("#b").hide();
	$(this).siblings('i').removeClass('pass');
 }else{
  	        codeVerify=true;
  	        $(".imgvdwarn").html('');
            $("#b").show();
            $(this).siblings('i').removeClass('cur').addClass('pass');
           
  }
 }*/
function codeTest() {
	 $(".imgvdwarn").html('');
	var reg=/^[0-9a-zA-Z]{4}$/;
	var code=$("#code").val();
	if(code==""){
		 $(".imgvdwarn").html(errorImgLabel+"验证码不能为空");	
	}else if(!reg.test(code)){
		 $(".imgvdwarn").html(errorImgLabel+"请输入4位数验证码");
	}else{
		codeVerify=true;
	    $(".imgvdwarn").html('');
        $("#b").show();
        $(this).siblings('i').removeClass('cur').addClass('pass');	
	}
} 

var userNameTest=false;

var idCard="";
function nextStep(){
	var code=$("#code").val();
	$(".nextStepError").html("");	
	if(userNameVerify==false){
	$(".nextStepError").html(errorImgLabel+"请先填写正确格式的用户名");	
	}else if(codeVerify==false){
	$(".nextStepError").html(errorImgLabel+"请先填写正确的验证码");	
	}else{
		 var loginNo=$(".username").val();
		 var resultCode="";
		$.ajax({ 
	                url:jsCtx+"/natural/FindPasswordNameTest.do",
	                type:"post",
	                data:{"loginNo":loginNo,"code":code},
	                dataType:"json",
	                success:function(data){
	                var result=data.code;
	                var msg=data.msg;
	                var resultData=data.data;
	                if( result!="90000"){
	                	$(".nextStepError").html(errorImgLabel+msg);
	                }else{
	                	resultCode=result;
	                	userNameTest=true;
	                	idCard=resultData;
	                	document.getElementById("FindPasswordOneDIV").style.display="none";
                        document.getElementById("FindPasswordTwoDIV").style.display="block";
                      
                		
	                }
	                }
	            }); 
		
		
	           
	}
	
}

//验证手机号
var phoneVerify=false;		

function verificationPhone(){
	var phone=$(".phone").val();
	$("#phonewarn").html("");
	
    var reg =  /^1[2,3,4,5,6,7,8,9][0-9]{9}$/;
    var phoneVd = $('.phone').val();
    if (phoneVd == "") {
        $(".phonewarn").html(errorImgLabel+"手机号码不能为空");
        $("#c").hide();
    	$(this).siblings('i').removeClass('pass');
       
    } else if (phoneVd.length < 11) {
        $(".phonewarn").html(errorImgLabel+"手机号码长度有误！");
        $("#c").hide();
    	$(this).siblings('i').removeClass('pass');
       
    } else if (!reg.test(phoneVd)) {
        $(".phonewarn").html(errorImgLabel+"手机号格式不对！");
        $("#c").hide();
    	$(this).siblings('i').removeClass('pass');
    }else {
    	phoneVerify=true;
    	$(".phonewarn").html('');
        $("#c").show();
        $(this).siblings('i').removeClass('cur').addClass('pass');
    }
}

//发送短信验证码
//短信倒计时
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
var code = ""; //验证码
var codeLength = 6;//验证码长度
var MessageVerify=false;
function sendMessage(){
	console.log("OKKK");
	var phone=$(".phone").val();
	if(phone==""){
		$(".vdwarn").html(errorImgLabel+"手机不能为空");
	}else{
		curCount = count;	
		 $.ajax({ 
             url:jsCtx+"/natural/personRegisterSendMsg.do",
             type:"post",
             data:{"mobile":phone},
             dataType:"json",
             success:function(data){
             	var result=	data.code;
             	var msg=data.msg;
             	
             if(result!="90000"){
            
              $(".vdwarn").html(errorImgLabel+msg);
             }else{
             MessageVerify=true;	
             }
           }
        });	
		 $("#btnSendCode").attr("disabled", "true");
		 	
		 $("#btnSendCode").text( curCount + "秒后重发");
		
		 InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
	}
	
}

//timer处理函数
function SetRemainTime() {
   if (curCount == 0) {    
	window.clearInterval(InterValObj);//停止计时器
	$("#btnSendCode").removeAttr("disabled");//启用按钮
	$("#btnSendCode").text("重新发送");
	code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效 
   }
   else {
    curCount--;
    $("#btnSendCode").text( curCount + "秒后重发");
   }
} 





//短信验证码

var mobileCodeVerify=false;				
function phoneNoteVerify(){
	 $(".vdwarn").html('');
	 var phone=$(".phone").val();
	var mobileCode=$(".vdtxt").val();
	$(".vdwarn").html("");
	var reg=/^[0-9]{6}$/;
    if(phoneVerify==false){
    	$(".vdwarn").html(errorImgLabel+"请先输入正确手机号!");
    	$("#d").hide();
    	$(this).siblings('i').removeClass('pass');
    }else if(MessageVerify==false){
	   $(".vdwarn").html(errorImgLabel+"请先获取短信验证码!");
		$("#d").hide();
    	$(this).siblings('i').removeClass('pass');
       
    }else if(!reg.test(mobileCode)){
		$(".vdwarn").html(errorImgLabel+"输入的短信验证码格式有误!");
		$("#d").hide();
    	$(this).siblings('i').removeClass('pass');
	}else{
	      $.ajax({ 
                url:jsCtx+"/natural/personRegisterMobileCode.do",
                type:"post",
                data:{"mobile":phone,"mobileCode":mobileCode},
                dataType:"json",
                success:function(data){
                	var result=	data.code;
                	var msg=data.msg;
                	
                if(result!="90000"){
              	$(".vdwarn").html(errorImgLabel+msg);
                }else{
                	    mobileCodeVerify=true;
                	    $(".vdwarn").html('');
			            $("#d").show();
			            $(this).siblings('i').removeClass('cur').addClass('pass');
			          
                }
                }
            }); 
	}
}
function VerificationSuccessSMS(){
	if(mobileCodeVerify==false){
		$(".errorSMS").html(errorImgLabel+"还未成功验证短信");
	}else{
	document.getElementById("FindPasswordOneDIV").style.display="none";	
	document.getElementById("FindPasswordTwoDIV").style.display="none";
    document.getElementById("FindPasswordThreeDIV").style.display="block";
    document.getElementById("FindPasswordFourDIV").style.display="none";
  
  
	}
}
//返回身份证验证
function returnIDcardTest(){
	document.getElementById("FindPasswordOneDIV").style.display="block";	
	document.getElementById("FindPasswordTwoDIV").style.display="none";
	document.getElementById("FindPasswordThreeDIV").style.display="none";
	document.getElementById("FindPasswordFourDIV").style.display="none";
}
//返回上一步验证短信
function  returnHome(){
	document.getElementById("FindPasswordThreeDIV").style.display="none";
	document.getElementById("FindPasswordOneDIV").style.display="none";	
	document.getElementById("FindPasswordTwoDIV").style.display="block";
	document.getElementById("FindPasswordFourDIV").style.display="none";
	
}
//返回验证选择
function testSelect(){
	document.getElementById("FindPasswordOneDIV").style.display="none";	
	document.getElementById("FindPasswordTwoDIV").style.display="none";
	document.getElementById("FindPasswordThreeDIV").style.display="block";
	document.getElementById("FindPasswordFourDIV").style.display="none";	
}
//下一步修改密码
function leaveForpasswordFind() {
	document.getElementById("FindPasswordOneDIV").style.display="none";	
	document.getElementById("FindPasswordTwoDIV").style.display="none";
	document.getElementById("FindPasswordThreeDIV").style.display="none";
	document.getElementById("FindPasswordFourDIV").style.display="block";
	
}


//密码校验
var passwordTest=false;

function passwordVerify(){
	$(".pwdwarn").html('');
	var p=$(".password").val();
	var pt=$(".repassword").val();
    var reg= /(?!.*[\u4E00-\u9FA5\s])(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^a-zA-Z\d]+$)^.{6,16}$/;
  
	
	$(".pwdwarn").html("");	
	if(!reg.test(p)){
		$(".pwdwarn").html(errorImgLabel+"您输入的密码格式不对!");
		$("#e").hide();
    	$(this).siblings('i').removeClass('pass');
	
	}else if(pt!=null && pt!=""){
		if(pt!=p){
			$(".pwdwarn").html(errorImgLabel+"两次密码不相同!");
			$("#e").hide();
	    	$(this).siblings('i').removeClass('pass');
		}
	}
	else{
		passwordTest=true;
		$(".pwdwarn").html('');
        $("#e").show();
        $(this).siblings('i').removeClass('cur').addClass('pass');
       
	}	
}

var passwordTests=false;
function passwordVerifyTwo(){
	$(".repwdwarn").html("");
	var p=$(".password").val();
	var pt=$(".repassword").val();
	var reg= /(?!.*[\u4E00-\u9FA5\s])(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^a-zA-Z\d]+$)^.{6,16}$/;
	if(passwordTest==false){
		$(".repwdwarn").html(errorImgLabel+"您的上级密码未填或格式有误!");
		$("#f").hide();
    	$(this).siblings('i').removeClass('pass');
	}else if(!reg.test(pt)){
		$(".repwdwarn").html(errorImgLabel+"您输入的密码格式不对!");
		$("#f").hide();
    	$(this).siblings('i').removeClass('pass');
	}else if(p!=pt){
		$(".repwdwarn").html(errorImgLabel+"输入的两次密码不相同!");
		$("#f").hide();
    	$(this).siblings('i').removeClass('pass');
	}else{
		passwordTests=true;
		$(".repwdwarn").html('');
		$(".pwdwarn").html("");	
        $("#f").show();
        $(this).siblings('i').removeClass('cur').addClass('pass');
	}
}
	//密码明文
	var t=1;
	function PasswordShow(){
		if(t==1){
			$(".password").attr("type","text");
			$(".repassword").attr("type","text");
			t=2;
		}else if(t==2){
			$(".password").attr("type","password");
			$(".repassword").attr("type","password");
			t=1;
		}
	}

var updateTest=false;
function ResetPassword(){
	var p=$(".password").val();
	var pt=$(".repassword").val();
	 $("#updateError").html('');
	if(passwordTest==false){
		$("#updateError").html(errorImgLabel+"初次密码输入格式不正确");
	}else if(passwordTests==false){
		$("#updateError").html(errorImgLabel+"二次密码输入格式不正确");
	}else if(userNameVerify==false){
		$("#updateError").html(errorImgLabel+"页面校验未通过");
	}else if(codeVerify==false){
		$("#updateError").html(errorImgLabel+"页面校验未通过");
	}else if(userNameTest==false){
		$("#updateError").html(errorImgLabel+"页面校验未通过");
	}else if(phoneVerify==false){
		$("#updateError").html(errorImgLabel+"页面校验未通过");
	}else if(MessageVerify==false){
		$("#updateError").html(errorImgLabel+"页面校验未通过");
	}else if(mobileCodeVerify==false){
		$("#updateError").html(errorImgLabel+"页面校验未通过");
	}else {
		 $.ajax({ 
             url:jsCtx+"/natural/updatePassword.do",
             type:"post",
             data:{"certNo":idCard,"loginPwd":encrypt(p),"passwordEidtUUID":passwordEidtUUID},
             dataType:"json",
             success:function(data){
             	var result=	data.code;
             	var msg=data.msg;
             if(result!="90000"){
           	$("#updateError").html(errorImgLabel+msg);
             }else{
            	 updateTest=true;
            	 $("#updateError").html('');
            	 window.location.href=jsCtx+"/natural/updatePasswordSuccess.do"; 
             }
             }
         }); 
	}
}
function sss() {
	 window.location.href=jsCtx+"/natural/loginSso.do";
}