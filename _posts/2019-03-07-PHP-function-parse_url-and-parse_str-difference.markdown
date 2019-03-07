---
layout:     post
title:      "PHP函数parse_url和parse_str区别"
subtitle:   " \"PHP function parse_url and parse_str difference\""
date:       2019-03-07 11:10:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - php    
---

>PHP中有两个方法可以用来解析URL，分别是parse_url和parse_str。

## parse_url
解析 URL，返回其组成部分
```
mixed parse_url ( string $url [, int $component = -1 ] )
```
本函数解析一个 URL 并返回一个关联数组，包含在 URL 中出现的各种组成部分。

本函数不是用来验证给定 URL 的合法性的，只是将其分解为下面列出的部分。不完整的 URL 也被接受，parse_url() 会尝试尽量正确地将其解析。

### 参数
```
url  要解析的 URL。无效字符将使用 _ 来替换。
component  指定 PHP_URL_SCHEME、 PHP_URL_HOST、 PHP_URL_PORT、 PHP_URL_USER、 PHP_URL_PASS、 PHP_URL_PATH、 PHP_URL_QUERY 
或 PHP_URL_FRAGMENT 的其中一个来获取 URL 中指定的部分的 string。 
（除了指定为 PHP_URL_PORT 后，将返回一个 integer 的值）。
```

### 返回值

对严重不合格的 URL，parse_url() 可能会返回 FALSE。

如果省略了 component 参数，将返回一个关联数组 array，在目前至少会有一个元素在该数组中。数组中可能的键有以下几种：
```
scheme - 如 http
host
port
user
pass
path
query - 在问号 ? 之后
fragment - 在散列符号 # 之后
```
如果指定了 component 参数， parse_url() 返回一个 string （或在指定为 PHP_URL_PORT 时返回一个 integer）而不是 array。如果 URL 中指定的组成部分不存在，将会返回 NULL。

### 实例

复制代码 代码如下:
```
<?php
$url = 'http://username:password@hostname/path?arg=value#anchor';
print_r(parse_url($url));
echo parse_url($url, PHP_URL_PATH);
?> 
```
以上例程会输出：

复制代码 代码如下:
```
Array
(
    [scheme] => http
    [host] => hostname
    [user] => username
    [pass] => password
    [path] => /path
    [query] => arg=value
    [fragment] => anchor
)

/path
```

## parse_str

将字符串解析成多个变量
```
void parse_str ( string $str [, array &$arr ] )
```
如果 str 是 URL 传递入的查询字符串（query string），则将它解析为变量并设置到当前作用域。

获取当前的 QUERY_STRING，你可以使用 $_SERVER['QUERY_STRING'] 变量。

### 参数
```
str  输入的字符串。

arr  如果设置了第二个变量 arr，变量将会以数组元素的形式存入到这个数组，作为替代。、
```
实例

复制代码 代码如下:
```
<?php
$str = "first=value&arr[]=foo+bar&arr[]=baz";
parse_str($str);
echo $first;  // value
echo $arr[0]; // foo bar
echo $arr[1]; // baz
parse_str($str, $output);
echo $output['first'];  // value
echo $output['arr'][0]; // foo bar
echo $output['arr'][1]; // baz
?> 
```

前一段时间在读php-resque的源码，看到了在其中对这两个的方法的应用，感觉用的很好，用来解析redis链接的设置。

redis链接的格式是：redis://user:pass@host:port/db?option1=val1&option2=val2，是不是和URL一样，所以用以上两个方法很容易解析。

地址： https://github.com/chrisboulton/php-resque/blob/master/lib/Resque/Redis.php

代码如下：

复制代码 代码如下:
```
    /**
     * Parse a DSN string, which can have one of the following formats:
     *
     * - host:port
     * - redis://user:pass@host:port/db?option1=val1&option2=val2
     * - tcp://user:pass@host:port/db?option1=val1&option2=val2
     *
     * Note: the 'user' part of the DSN is not used.
     *
     * @param string $dsn A DSN string
     * @return array An array of DSN compotnents, with 'false' values for any unknown components. e.g.
     *               [host, port, db, user, pass, options]
     */
    public static function parseDsn($dsn)
    {
        if ($dsn == '') {
            // Use a sensible default for an empty DNS string
            $dsn = 'redis://' . self::DEFAULT_HOST;
        }
        $parts = parse_url($dsn);
        // Check the URI scheme
        $validSchemes = array('redis', 'tcp');
        if (isset($parts['scheme']) && ! in_array($parts['scheme'], $validSchemes)) {
            throw new \InvalidArgumentException("Invalid DSN. Supported schemes are " . implode(', ', $validSchemes));
        }
        // Allow simple 'hostname' format, which `parse_url` treats as a path, not host.
        if ( ! isset($parts['host']) && isset($parts['path'])) {
            $parts['host'] = $parts['path'];
            unset($parts['path']);
        }
        // Extract the port number as an integer
        $port = isset($parts['port']) ? intval($parts['port']) : self::DEFAULT_PORT;
        // Get the database from the 'path' part of the URI
        $database = false;
        if (isset($parts['path'])) {
            // Strip non-digit chars from path
            $database = intval(preg_replace('/[^0-9]/', '', $parts['path']));
        }
        // Extract any 'user' and 'pass' values
        $user = isset($parts['user']) ? $parts['user'] : false;
        $pass = isset($parts['pass']) ? $parts['pass'] : false;
        // Convert the query string into an associative array
        $options = array();
        if (isset($parts['query'])) {
            // Parse the query string into an array
            parse_str($parts['query'], $options);
        }
        return array(
            $parts['host'],
            $port,
            $database,
            $user,
            $pass,
            $options,
        );
    }
```
上面所述就是PHP解析URL的2种方法了，希望小伙伴们能够喜欢。