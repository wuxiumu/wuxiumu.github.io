---
layout:     post
title:      "PHP的技术实例"
subtitle:   " \"PHP technical examples\""
date:       2018-11-27 09:10:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 知识
    - php
---

> php技术栈后端程序员的知识储备仓库

符合psr-1,2的编程实例

@author wuxiumu <https://github.com/wuxiumu>

## 顶部命名空间
```php
namespace Standard; 
```

## 空一行
```php
use Test\TestClass;//use引入类
```

##类描述[大写开头驼峰]
  
类名必须大写开头驼峰.

```php
abstract class StandardExample // {}必须换行
{

｝
```

##常量描述.[大写下划线分割]

@var string
```php
  const THIS_IS_A_CONST = ''; // 常量全部大写下划线分割
```
##属性描述.[小写驼峰]

@var string
```php
public $nameTest = ''; 
// 属性名称建议开头小写驼峰
// 成员属性必须添加public（不能省略）， private, protected修饰符
```

## 属性描述.[类私有成员]

@var string
```php  
private $_privateNameTest = ''; 
// 类私有成员属性，【个人建议】下划线小写开头驼峰
```
## 构造函数.[public，private,protected]

构造函数描述

@param  string $value 形参名称/描述
```php  
// 成员方法必须添加public（不能省略）， private, protected修饰符
public function __construct($value = '')
{// {}必须换行
  $this->nameTest = new TestClass();

  // 链式操作
  $this->nameTest->functionOne()
                 ->functionTwo()
                 ->functionThree();

  // 一段代码逻辑执行完毕 换行
  // code...
}
```

## 成员方法名称.[小写开头驼峰]

成员方法描述

@param  string $value 形参名称/描述

@return 返回值类型        返回值描述

返回值类型：string，array，object，mixed（多种，不确定的），void（无返回值）
```php  
// 成员方法必须小写开头驼峰
public function testFunction($value = '')
{
    // code...
}
```

## 成员方法名称.[私有成员]

@param  string $value 形参名称/描述

@return 返回值类型        返回值描述
```php  
// 私有成员方法【个人建议】下划线小写开头驼峰
private function _privateTestFunction($value = '')
{
    // code...
}
```

## 成员方法名称.[static]

成员方法描述

@param  string $value 形参名称/描述

@return 返回值类型        返回值描述
```php
 // static位于修饰符之后
public static function staticFunction($value = '')
{
// code...
}
```
## 成员方法名称.[abstract]

成员方法描述

@param  string $value 形参名称/描述

@return 返回值类型        返回值描述
```php
// abstract位于修饰符之前
abstract public function abstractFunction($value = ''); 
```

## 成员方法名称.[final]

成员方法描述

@param  string $value 形参名称/描述

@return 返回值类型        返回值描述
```php
// final位于修饰符之前
final public function finalFunction($value = '')
{
  // code...
}
```
## 成员方法名称.[控制结构]

成员方法描述

@param  string $valueOne 形参名称/描述
@param  string $valueTwo 形参名称/描述
@param  string $valueThree 形参名称/描述
@param  string $valueFour 形参名称/描述
@param  string $valueFive 形参名称/描述
@param  string $valueSix 形参名称/描述

@return 返回值类型        返回值描述
```php
public function tooLangFunction(
    // 变量命名可小写开头驼峰或者下划线命名,个人那习惯，据说下划线可读性好
    $valueOne   = '', 
    $valueTwo   = '',
    $valueThree = '',
    $valueFour  = '',
    $valueFive  = '',
    $valueSix   = '')// 参数过多换行
{
  // 控制结构=>后加空格,同{一行，（右边和)左边不加空格
  if ($valueOne === $valueTwo) {
    // code...
  }

  switch ($valueThree) {
    case 'value':
      // code...
      break;

    default:
      // code...
      break;
  }

  do {
    // code...
  } while ($valueFour <= 10);

  while ($valueFive <= 10) {
    // code...
  }

  for ($i=0; $i < $valueSix; $i++) {
    // code...
  }
}
```