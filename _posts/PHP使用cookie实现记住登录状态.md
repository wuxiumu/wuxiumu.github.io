# PHP 使用cookie实现记住登录状态

php使用cookie实现记住登录状态，本文用最原始的方法讲解如何实现记住登录状态，给出3个步骤和具体实现代码，需要的朋友可以参考下。

要实现记住密码自动登录的功能，我们大多数据都是利用了客户端的cookies来实现。

php制作记住密码自动登录的解决思路，其实也就是对session，cookies的操作

## 一、检查用户是否登录

```
<?php  
// 检查用户是否登录  
function checklogin() {  
    if (empty ( $_SESSION ['user_info'] ))         // 检查一下session是不是为空  
    {   
        if (empty ( $_COOKIE ['username'] ) || empty ( $_COOKIE ['password'] ))   
        {   
            header ( "location:login.php?req_url=" . $_SERVER ['REQUEST_URI'] ); // 转到登录页面，记录请求的url，登录后跳转过去，用户体验好。  
        }   
        else  
        {   
            $user = getUserInfo ( $_COOKIE ['username'], $_COOKIE ['password'] ); // 去取用户的个人资料  
            if (empty ( $user ))   
            {   
                header ( "location:login.php?req_url=" . $_SERVER ['REQUEST_URI'] );  
            }   
            else {  
                $_SESSION ['user_info'] = $user; // 用户名和密码对了，把用户的个人资料放到session里面  
            }  
        }  
    }  
}  
```  

## 二，用户提交登录信息
```
<?php  
$username = trim ( $_POST ['username'] );  
$password = md5 ( trim ( $_POST ['password'] ) );  
$remember = $_POST ['remember'];  
$validatecode = $_POST ['validateCode'];  
$ref_url = $_GET ['req_url'];  
   
$err_msg = '';  
if ($validatecode != $_SESSION ['checksum']) {  
    $err_msg = "验证码不正确";  
} elseif ($username == '' || $password == '') {  
    $err_msg = "用户名和密码都不能为空";  
} else {  
    $row = getUserInfo ( $username, $password );  
       
    if (empty ( $row )) {  
        $err_msg = "用户名和密码都不正确";  
    } else {  
        $_SESSION ['user_info'] = $row;  
        if (! empty ( $remember )) { // 如果记住登陆，则记录登录状态，把用户名和加密的密码放到cookie里面  
            setcookie ( "username", $username, time () + 3600 * 24 * 365 );  
            setcookie ( "password", $password, time () + 3600 * 24 * 365 );  
        }  
        if (strpos ( $ref_url, "login.php" ) === false) {  
            header ( "location:" . $ref_url );  
        } else {  
            header ( "location:main_user.php" );  
        }  
    }  
}  
?>   
```

## 三，当用户点退出时，清出记录登录状态

```
<?php  
// 退出登录  
function logout()   
{  
    unset ( $_SESSION ['user_info'] );  
    if (! empty ( $_COOKIE ['username'] ) || ! empty ( $_COOKIE ['password'] ))   
    {  
        setcookie ( "username", null, time () - 3600 * 24 * 365 );  
        setcookie ( "password", null, time () - 3600 * 24 * 365 );  
    }  
}  
?>
```

## 四、简洁版实例
```
<?php  
    // 读取COOKIE的用户名和密码的值即可  
    if ($_COOKIE ['uname'] != '') {  
        $CKUNAME = $_COOKIE ['uname'];  
    }  
    if ($_COOKIE ['pwd'] != '') {  
        $CKPWD = $_COOKIE ['pwd'];  
    }  
    echo $CKUNAME;  
    echo '<br>';  
    echo $CKPWD;  
?>   
<form id="form1" name="form1" method="post" action="">  
    <input type="text" name="uname" id="uname" value="<?=$CKUNAME;?>" />   
    <input type="password" name="pwd" id="pwd" value="<?=$CKPWD;?>" />   
    <input name="remember" type="checkbox" value="1" <? if($CKUNAME!=''){?> checked="checked" <? } ?> /> 记住我!   
    <input type="submit" name="button" id="button" value="登录" />  
</form>  
   
<?php  
    // 登录，将用户名和密码存入到COOKIE  
    if ($_POST ['button'] != '')   
    {  
        $uname = $_POST ['uname'];  
        $pwd = $_POST ['pwd'];  
           
        // 如果输入的加密密码和COOKIE中不一样，那么就加密  
        if ($pwd != $CKPWD) {  
            $pwd = md5 ( $pwd );  
        }  
        $remember = $_POST ['remember'];  
        if ($remember == 1) {  
            setcookie ( "uname", $uname, time () + 3600 * 24 * 30 );  
            setcookie ( "pwd", $pwd, time () + 3600 * 24 * 30 );  
        }  
    }  
?>
```  