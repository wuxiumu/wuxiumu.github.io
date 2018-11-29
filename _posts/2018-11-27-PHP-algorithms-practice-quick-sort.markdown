---
layout:     post
title:      "PHP算法实战-快排"
subtitle:   " \"PHP-algorithm's practice Quick sort\""
date:       2018-11-26 20:10:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 算法
    - php
---

>  php算法实战

## 生成1w的随机数
```php
set_time_limit(0);
$arr = [];
for ($k = 0; $k < 10000; $k++) {
    $arr[] = $k;
}
shuffle($arr);
```

## 排序算法-快速排序

@param  array $value 待排序数组

@param  array $left  左边界

@param  array $right 右边界

@return array
```php
function quick(&$value, $left, $right)
{
	// 左右界重合 跳出
	
	if ($left >= $right) {
	  return;
	}

	$base = $left;
	do {

	 	// 从最右边开始找到第一个比基准小的值，互换位置

	  	// 找到基准索引为止

		for ($i=$right; $i > $base; --$i) {
		    if ($value[$i] < $value[$base]) {
		      $tmp = $value[$i];
		      $value[$i] = $value[$base];
		      $value[$base] = $tmp;
		      $base = $i; // 更新基准值索引

		      break;
		    }
		}

	  	// 从最左边开始找到第一个比基准大的值，互换位置

	  	// 找到基准索引为止

		for ($j=$left; $j < $base; ++$j) {
		    if ($value[$j] > $value[$base]) {
		      $tmp = $value[$j];
		      $value[$j] = $value[$base];
		      $value[$base] = $tmp;
		      $base = $j; // 更新基准值索引
		      
		      break;
		    }
		}

	} while ($i > $j);// 直到左右索引重合为止

	// 开始递归

	// 以当前索引为分界

	// 开始排序左部分

	quick($value, $left, $i-1);
	// 开始排序右边部分

	quick($value, $i+1, $right);

	return $value;
}
```
调用并测试运算时间
```php
$t1 = microtime(true);
quick($arr);
$t2 = microtime(true);
echo (($t2 - $t1) * 1000 . 'ms');
```
## 快速排序.while版本

@param  array $value 待排序数组

@param  array $left  左边界

@param  array $right 右边界

@return array
```php
function quick_while(&$value, $left, $right)
{
	// 左右界重合 跳出

	if ($left >= $right) {
	  return;
	}

	$point = $left;
	$i = $right;
	$j = $left;
	while ($i > $j) {

	  //查右边值

	  while ($i > $point) {
	    if ($value[$i] < $value[$point]) {
	      $tmp = $value[$i];
	      $value[$i] = $value[$point];
	      $value[$point] = $tmp;
	      $point = $i;
	      break;
	    }
	    --$i;
	  }

	  //查左边值

	  while ($j < $point) {
	    if ($value[$j] > $value[$point]) {
	      $tmp = $value[$j];
	      $value[$j] = $value[$point];
	      $value[$point] = $tmp;
	      $point = $j;
	      break;
	    }
	    ++$j;
	  }
	}

	// 开始递归

	// 以当前索引为分界

	// 开始排序左部分

	quick_while($value, $left, $i-1);

	// 开始排序右边部分

	quick_while($value, $i+1, $right);

	return $value;
}
```  
调用并测试运算时间
```php
$t1 = microtime(true);
quick_while($arr);
$t2 = microtime(true);
echo (($t2 - $t1) * 1000 . 'ms');
```

—— 其他
```
function quickSort($array)
{
    if(!isset($array[1]))
        return $array;
    $mid = $array[0]; //获取一个用于分割的关键字，一般是首个元素
    $leftArray = array(); 
    $rightArray = array();

    foreach($array as $v)
    {
        if($v > $mid)
            $rightArray[] = $v;  //把比$mid大的数放到一个数组里
        if($v < $mid)
            $leftArray[] = $v;   //把比$mid小的数放到另一个数组里
    }

    $leftArray = quickSort($leftArray); //把比较小的数组再一次进行分割
    $leftArray[] = $mid;        //把分割的元素加到小的数组后面，不能忘了它哦

    $rightArray = quickSort($rightArray);  //把比较大的数组再一次进行分割
    return array_merge($leftArray,$rightArray);  //组合两个结果
}
```