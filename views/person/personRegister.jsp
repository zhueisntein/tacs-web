<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>自然人用户注册</title>
		<link rel="stylesheet" href="${ctxStatic}/css/reset.css">
		<link rel="stylesheet" href="${ctxStatic}/css/style.css">
		<script type="text/javascript" src="${ctxStatic}/js/jquery-1.11.0.min.js"></script>
		<script type="text/javascript" src="${ctxStatic}/js/personRegister.js"></script>
		<script type="text/javascript" src="${ctxStatic}/js/My97DatePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="${ctxStatic}/js/passwordEncryption/encrypt.js"></script>
		<script type="text/javascript" src="${ctxStatic}/js/passwordEncryption/jsencrypt.min.js"></script>
		<style>
			#discode {
				background: url(${ctxStatic}/images/indcode.jpg) center no-repeat;
				font-size: 25px;
				height: 42px;
				font-style: italic;
				letter-spacing: 1px;
				color: slateblue;
				cursor: pointer;
				-moz-user-select: none;
				-khtml-user-select: none;
				user-select: none;
			}
			
			#p {
				line-height: 10px
			}
		</style>
	</head>

	<body>
		<div id="personDIV">
			<div class="nav">
				<div class="container">
					<h1>
							<a href="javascript:;"><img src="${ctxStatic}/images/logo.png" alt=""></a>
						</h1>
					<a href="javascript:;" class="fr" onclick="sss()">返回首页</a>
				</div>
			</div>
			<div class="container">
				<div class="tit">
					<h2>创建账号</h2>
				</div>
				<div class="container_regist">
					<div class="pgsbar">
						<div class="pgsbar_t">
							<span class="redbg">1</span>
							<img src="${ctxStatic}/images/pgsbaricon3.png" alt="">
							<span class="graybg">2</span>
							<img src="${ctxStatic}/images/pgsbaricon3.png" alt="">
							<span class="graybg">3</span>
						</div>
						<em class="cur">创建账号</em>
						<em>实名认证</em>
						<em>注册完成</em>
					</div>
					<div class="logon_c cregist_c paddingtnone">
						<ul>
							<h2>用户名 <b>*</b></h2>
							<li>
								<p>
									<i class="usericon"></i>
									<input type="text" class="txt username" onblur="verificationIdCard()" placeholder="用户名(请输入6-20位的字母或数字)/手机号/身份证">
									<em id="a"></em>
								</p>
								<span class="warn userwarn"></span>
							</li>
							<li>

								<p>
									<i class="phoneicon"></i>
									<input type="text" class="txt phone" onblur="verificationPhone()" placeholder="请输入您的手机号">
									<em id="b"></em>
								</p>
								<span class="warn phonewarn"></span>
							</li>
							<li>

								<p class="imgvdcode">
									<i class="imgvdicon"></i>
									<input type="text" class="txt imgvd" id="t1" onblur="but()" placeholder="请输入验证码" maxlength="4">
									<em id="c"></em>
									<span id="discode" style="font-size: 38px;" onclick="createCode()"></span>
								</p>
								<span class="warn imgvdwarn"></span>
							</li>
							<li>
								<p class="vdcode">
									<i class="vdicon"></i>
									<input type="text" class="txt vdtxt" onblur="phoneNoteVerify()" placeholder="请输入6位验证码" maxlength="6">
									<em id="d"></em>
									<button class="get_code" id="btnSendCode" onclick="sendMessage()">获取短信验证码</button>
								</p>
								<span class="warn vdwarn"></span>
							</li>
							<h2>密码 <b>*</b></h2>
							<li style="position:relative;">

								<p>
									<i class="pwdicon"></i>
									<input type="password" class="txt password" onblur="passwordVerify()" placeholder="请6-20位字符，必须由数字、字母或符号两种以上组成" maxlength="16">
									<em id="e"></em>
								</p>
								<span class="warn pwdwarn"></span>
								<span class="slevel">
										安全级别
										<span class="colred"></span>
								<span class="colblue"></span>
								<span class="colgreen"></span>
								</span>
							</li>
							<li>
								<p>
									<i class="rpwdicon"></i>
									<input type="password" class="txt rpassword" onblur="passwordVerifyTwo()" placeholder="请确认输入密码" maxlength="16">
									<em id="f"></em>
								</p>
								<span class="warn rpwdwarn"></span>
								<label><input type="checkbox" id="passwordShow" onclick="aaa()"><font color="green">显示密码</font></label>
							</li>
						</ul>
						<p class="agree mt10">
							<label for="agreecheck"><input type="checkbox" id="agreecheck" onclick="registrationProtocol()"> 我已阅读并同意<a href="javascript:;" class="ament">《注册协议》</a></label>
						</p>

						<input type="submit" class="loginbtn colblue mt5" id="registbtn" onclick="submitResult()" value="下一步">
						<span id="submitError"></span>
					</div>
				</div>
			</div>
			<div class="bottom"></div>
			<div class="agreement_shadow">
				<div class="agreement">
					<h2>
							个人用户注册协议
							<a href="javascript:;" class="close"></a>
						</h2>
					<div>
						<p>
							用户承诺对其发表或者上传于本站的所有信息(即属于《中华人民共和国著作权法》规定的作品，包括但不限于文字、图片、音乐、电影、表演和录音录像制品和电脑程序等)均享有完整的知识产权，或者已经得到相关权利人的合法授权；如用户违反本条规定造成本站被第三人索赔的，用户应全额补偿本站一切费用(包括但不限于各种赔偿费、诉讼代理费及为此支出的其它合理费用)；
						</p>
						<p>
							当第三方认为用户发表或者上传于本站的信息侵犯其权利，并根据《信息网络传播权保护条例》或者相关法律规定向本站发送权利通知书时，用户同意本站可以自行判断决定删除涉嫌侵权信息，除非用户提交书面证据材料排除侵权的可能性，本站将不会自动恢复上述删除的信息；
						</p>
					</div>
					<a href="javascript:;" class="loginbtn colblue">我同意遵守协议</a>
				</div>
			</div>
		</div>

		<div id="personTwoDIV">

			<div class="nav">
				<div class="container">
					<h1>
				<a href="javascript:;"><img src="${ctxStatic}/images/logo.png" alt=""></a>
			</h1>
					<a href="javascript:;" class="fr" onclick="returnBackoldplace()">返回上一页</a>
				</div>
			</div>
			<div class="container">
				<div class="tit">
					<h2>实名认证</h2>
				</div>
				<div class="container_regist">
					<div class="pgsbar">
						<div class="pgsbar_t">
							<span class="redbg">1</span>
							<img src="${ctxStatic}/images/pgsbaricon4.png" alt="">
							<span class="redbg">2</span>
							<img src="${ctxStatic}/images/pgsbaricon3.png" alt="">
							<span class="graybg">3</span>
						</div>
						<em class="cur">创建账号</em>
						<em class="cur">实名认证</em>
						<em>注册完成</em>
					</div>
					<div class="cregist_c paddingtnone">
						<div class="tipbox">
							为提升账号安全和信任级别，为方便您以后找回密码，请务必准确填写本人的身份证信息，认证后不能更改，隐私信息未经本人许可严密保密。
						</div>

						<div class="junior">
							<h2 class="rzbtn">初级认证</h2>
							<div class="seltype">
								请选择您的用户类型：
								<label for="radio1"><input type="radio" name="usertype" id="radio1" checked >大陆公民</label>
								<label for="radio2"><input type="radio" name="usertype" id="radio2">港澳同胞</label>
								<label for="radio3"><input type="radio" name="usertype" id="radio3">台湾同胞</label>
								<label for="radio4"><input type="radio" name="usertype" id="radio4">外籍人士</label>
								<label for="radio5"><input type="radio" name="usertype" id="radio5">军官证</label>
							</div>
							<div class="fntype">
								请选择证件类型：
								<label for="radio6"><input type="radio" name="usertypefn" id="radio6" checked>护照</label>
								<label for="radio7"><input type="radio" name="usertypefn" id="radio7">外国人永久居留身份证</label>
							</div>
							<div class="type_option">
								<ul>
									<li class="logon_c cregist_c optionlist ctnal cur">
										<ul>
											<li>

												<p>
													<i class="usericon"></i>
													<input type="text" class="txt username2" onblur="nameTest()" placeholder="请输入姓名(只支持中文)">
													<em id="g"></em>
												</p>
												<span class="warn userwarn2"></span>
											</li>
											<li>

												<p>
													<i class="card2icon"></i>
													<input type="text" class="txt card" onblur="cardTest()" placeholder="请输入身份证号" maxlength="18">
													<em id="h"></em>
												</p>
												<span class="warn cardwarn"></span>
											</li>
											<li>

												<input class="Wdate" size="23" align="center" style="border: 1px solid #ccc; " type="text" id="StrTime" onclick="WdatePicker({firstDayOfWeek:1,onpicked:function(){TimeLoader();}})" placeholder="身份证开始日期：" />
												<input class="Wdate" size="23" style="border: 1px solid #ccc; float: right" type="text" id="EndTime" onclick="WdatePicker({firstDayOfWeek:1,onpicked:function(){TimeLoader();}})" placeholder="身份证结束日期：" />
												<br>
												<span id="idcardTimeError"></span>
											</li>
										</ul>

										<a href="javascript:;" class="loginbtn colblue" onclick="registerSubmitTwo()">实名认证</a>
										<span id="goSub"></span>
									</li>
									<li class="logon_c cregist_c optionlist">
										<p class="tipoption">
											请您提供《港澳居民来往内地通行证》，及手持通行证的照片，我们收到后，两个工作日之内完成认证。
										</p>
										<a href="javascript:;" class="loginbtn colblue mgt80">人工认证</a>
									</li>
									<li class="logon_c cregist_c optionlist">
										<p class="tipoption">
											请您提供《台湾居民来往大陆通行证》，及手持通行证的照片，我们收到后，两个工作日之内完成认证。
										</p>
										<a href="javascript:;" class="loginbtn colblue mgt80">人工认证</a>
									</li>
									<li class="logon_c cregist_c optionlist">
										<p class="tipoption fnoption">
											请您提供护照，及手持护照的照片，我们收到后，两个工作日之内完成认证。
										</p>
										<a href="javascript:;" class="loginbtn colblue mgt80">人工认证</a>
									</li>
									<li class="logon_c cregist_c optionlist">
										<p class="tipoption">
											请您提供军官证，及手持军官证的照片，我们收到后，两个工作日之内完成认证。
										</p>
										<a href="officer.html" class="loginbtn colblue mgt80">人工认证</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="bottom"></div>
		</div>

	</body>

</html>