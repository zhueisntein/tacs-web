    //产生验证码  
    function createCode() {
        var code = ""; //定义验证码   
        var codeLength = 4; //验证码的长度  
        var checkCode = $('.vdtxt');
        var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数  
        for (var i = 0; i < codeLength; i++) { //循环操作  
            var index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）  
            code += random[index]; //根据索引取得随机数加到code上  
        }
        return code;
    }
    //校验验证码  
    function validate(incode, oldCode) {
        var inputCode = incode.toUpperCase(); //取得输入的验证码并转化为大写        
        if (inputCode == oldCode) {
            return true;
        } else {
            return false;
        }
    }
