;
(function($) {
	$.extend({
		"invoke" : function(url, param, async, method, callBackTrue,
				 isLoad) {
			layui.use('layer', function() {
				var layer = layui.layer;
				if (async == null){
					async = true;
				}
				if (!method)
					method = "post";
				if (!param)
					param = {};
				var index;
				if (isLoad)
					index = layer.load();
				$.ajax({
					url : url,
					type : method,
					cache : false, 
					async : async,
					data : param,
					dataType : "json",
					success : function(result) {
						callBackTrue(result);
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						var status = XMLHttpRequest.status;
						if (status == 404) {
							console.log("error:404");
						} else if (status == 302) {
							console.log("error:302");
						} else if (textStatus == "timeout") {
							console.log("error:请求超时");
						} else {
							console.log("error:未知错误");
						}
					},
					complete : function(XMLHttpRequest, textStatus) {
						if (isLoad)
							layer.close(index);
					}
				});
			});
		},
		"dicts":{},
		"dict" : function(name) {
				var url  = $("#path").val() + "/codeList/getDicts.do";
				$.invoke(url,{"name":name},false,"post",function (result){
					if (result.result['code'] == '0'){
						$.dicts = result.result.data;
					}
					console.info($.dicts);
				},false);
		}
	});
})(jQuery);