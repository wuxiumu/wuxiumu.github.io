---
layout:     post
title:      "PHP算法实战-冒泡"
subtitle:   " \"PHP-algorithm's practice bubble\""
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
## PHP - 数组的排序函数
- sort() - 以升序对数组排序
- rsort() - 以降序对数组排序
- asort() - 根据值，以升序对关联数组进行排序
- ksort() - 根据键，以升序对关联数组进行排序
- arsort() - 根据值，以降序对关联数组进行排序
- krsort() - 根据键，以降序对关联数组进行排序

## 排序算法-冒泡排序

@param  array $value 待排序数组 the array that is waiting for sorting

@return array
```php
function bubble($value = [])
{
  $length = count($value) - 1;
  // 外循环

  // outside loop

  for ($j = 0; $j < $length; ++$j) {
      // 内循环

      // inside loop

      for ($i = 0; $i < $length; ++$i) {
          // 如果后一个值小于前一个值，则互换位置

          // if the next value is less than the current value, exchange each other.
          
          if ($value[$i + 1] < $value[$i]) {
              $tmp = $value[$i + 1];
              $value[$i + 1] = $value[$i];
              $value[$i] = $tmp;
          }
      }
  }
  return $value;
}
``` 
调用并测试运算时间
```php
$t1 = microtime(true);
bubble($arr);
$t2 = microtime(true);
echo (($t2 - $t1) * 1000 . 'ms');
```

## 优化冒泡排序

optimized bubble sort algorithm

@param  array $value 待排序数组 the array that is waiting for sorting

@return array
```php
function bubble_better($value = [])
{

$flag   = true; 
// 标示 排序未完成 the flag about the sorting is whether or not finished.

$length = count($value)-1; 
// 数组最后一个元素的索引 the index of the last item about the array.

$index  = $length; 
// 最后一次交换的索引位置 初始值为最后一位 the last exchange of index position, default value is equal to the last index.

while ($flag) {

  $flag = false; 
  // 假设排序已完成 let's suppose the sorting is finished.

  for ($i=0; $i < $index; $i++) {

    if ($value[$i] > $value[$i+1]) {

      $flag  = true; 
      // 如果还有交换发生，则排序未完成  if the exchange still happen, it show that the sorting is not finished.

      $last  = $i; 
      // 记录最后一次发生交换的索引位置 taking notes the index position of the last exchange.

      $tmp   = $value[$i];
      $value[$i] = $value[$i+1];
      $value[$i+1] = $tmp;
    }

  }

  $index = $last;
}

return $value;
}
```  
调用并测试运算时间
```php
$t1 = microtime(true);
bubble_better($arr);
$t2 = microtime(true);
echo (($t2 - $t1) * 1000 . 'ms');
```
—— 其他
```
public function bubble($value = [])
{
    $len = count($value);
    for ($i=0;$i<$len;$i++) {
        // 第二层将从键为$i的地方循环到数组最后
        for ($j=$i+1;$j<$len;$j++) {
            // 比较数组中相邻两个值的大小
            if ($value[$i] > $value[$j]) {
                $tmp       = $value[$i]; // 这里的tmp是临时变量
                $value[$i] = $value[$j]; // 第一次更换位置
                $value[$j] = $tmp;       // 完成位置互换
            }
        }
    }
    return $value;
}
```  
—— 其他
```
public function bubble($value = [])
{
    $len = count($value);
    for ($i=0;$i<$len;$i++) {
        // 第二层将从键为$i的地方循环到数组最后
        for ($j=0;$j<$len-$i-1;$j++) {
            // 比较数组中相邻两个值的大小
            if ($value[$j] > $value[$j+1]) {
                $tmp       = $value[$j+1]; // 这里的tmp是临时变量
                $value[$j+1] = $value[$j]; // 第一次更换位置
                $value[$j] = $tmp;       // 完成位置互换
            }
        }
    }
    return $value;
}
```

## 拓展
[冒泡排序以及优化]()