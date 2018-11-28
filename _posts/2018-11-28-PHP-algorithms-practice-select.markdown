---
layout:     post
title:      "PHP算法实战-选择"
subtitle:   " \"PHP-algorithm's practice select\""
date:       2018-11-28 12:43:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 算法
    - php
---

>  php算法实战

```
<?php
/**
 * php算法实战.
 *
 * 排序算法-选择排序
 *
 * @author  <https://github.com/wuxiumu>
 */
 /**
  * 选择排序.
  *
  * @param  array $value 待排序数组
  *
  * @return array
  */
  function select_sort(&$value=[])
  {
    $length = count($value)-1;
    for ($i=0; $i < $length; $i++) {
      $point = $i;// 最小值索引
      for ($j=$i+1; $j <= $length; $j++) {
        if ($value[$point] > $value[$j]) {
          $point = $j;
        }
      }
      $tmp = $value[$i];
      $value[$i] = $value[$point];
      $value[$point] = $tmp;
    }
    return $value;
  }
```