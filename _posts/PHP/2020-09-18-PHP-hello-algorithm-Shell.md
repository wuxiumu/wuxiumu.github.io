---
layout:     post
title:      "你好！ 希尔排序"
subtitle:   " \"Shell Sort\""
date:       2020-09-18 12:00:10
author:     "WuQingBao"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
tags:
    - 算法
    - php
---

## 希尔排序的基本概念

希尔排序，也称递减增量排序算法，是插入排序的一种更高效的改进版本。但希尔排序是非稳定排序算法。

希尔排序是基于插入排序的以下两点性质而提出改进方法的：

- 插入排序在对几乎已经排好序的数据操作时，效率高，即可以达到线性排序的效率；
- 但插入排序一般来说是低效的，因为插入排序每次只能将数据移动一位；

希尔排序的基本思想是：先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录"基本有序"时，再对全体记录进行依次直接插入排序。

## 希尔排序的算法步骤

选择一个增量序列 t1，t2，……，tk，其中 ti > tj, tk = 1；

按增量序列个数 k，对序列进行 k 趟排序；

每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

## 希尔排序的分析

假设有数组 array = [80, 93, 60, 12, 42, 30, 68, 85, 10]，首先取 d1 = 4，将数组分为 4 组，如下图中相同颜色代表一组：

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/shell-sort-step1.1.png)

然后分别对 4 个小组进行插入排序，排序后的结果为：

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/shell-sort-step1.2.png)

然后，取 d2 = 2，将原数组分为 2 小组，如下图：

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/shell-sort-step2.1.png)

然后分别对 2 个小组进行插入排序，排序后的结果为：

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/shell-sort-step2.2.png)

最后，取 d3 = 1，进行插入排序后得到最终结果：

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/shell-sort-step3.png)

## 希尔排序的动图演示

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/Sorting_shellsort_anim.gif)

## 希尔排序的代码实现

### JavaScript 代码实现希尔排序



```
<script>
function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    while(gap < len/3) {          //动态定义间隔序列
        gap =gap*3+1;
    }
    for (gap; gap > 0; gap = Math.floor(gap/3)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
    }
    return arr;
}
var arraySample=[1,4,232,23,123,545,232,22,312];
document.write(shellSort(arraySample));
</script>

```



   提示：可以修改代码后运行

### Python 代码实现希尔排序

```
def shellSort(arr):
    import math
    gap=1
    while(gap < len(arr)/3):
        gap = gap*3+1
    while gap > 0:
        for i in range(gap,len(arr)):
            temp = arr[i]
            j = i-gap
            while j >=0 and arr[j] > temp:
                arr[j+gap]=arr[j]
                j-=gap
            arr[j+gap] = temp
        gap = math.floor(gap/3)
    return arr
}
```

### Go 代码实现希尔排序

```
func shellSort(arr []int) []int {
        length := len(arr)
        gap := 1
        for gap < gap/3 {
                gap = gap*3 + 1
        }
        for gap > 0 {
                for i := gap; i < length; i++ {
                        temp := arr[i]
                        j := i - gap
                        for j >= 0 && arr[j] > temp {
                                arr[j+gap] = arr[j]
                                j -= gap
                        }
                        arr[j+gap] = temp
                }
                gap = gap / 3
        }
        return arr
}
```

### Java 代码实现希尔排序

```
public class ShellSort implements IArraySort {
 
    @Override
    public int[] sort(int[] sourceArray) throws Exception {
        // 对 arr 进行拷贝，不改变参数内容
        int[] arr = Arrays.copyOf(sourceArray, sourceArray.length);
 
        int gap = 1;
        while (gap < arr.length) {
            gap = gap * 3 + 1;
        }
 
        while (gap > 0) {
            for (int i = gap; i < arr.length; i++) {
                int tmp = arr[i];
                int j = i - gap;
                while (j >= 0 && arr[j] > tmp) {
                    arr[j + gap] = arr[j];
                    j -= gap;
                }
                arr[j + gap] = tmp;
            }
            gap = (int) Math.floor(gap / 3);
        }
 
        return arr;
    }
}
```

### PHP 代码实现希尔排序

```
function shellSort($arr)
{
    $len = count($arr);
    $temp = 0;
    $gap = 1;
    while($gap < $len / 3) {
        $gap = $gap * 3 + 1;
    }
    for ($gap; $gap > 0; $gap = floor($gap / 3)) {
        for ($i = $gap; $i < $len; $i++) {
            $temp = $arr[$i];
            for ($j = $i - $gap; $j >= 0 && $arr[$j] > $temp; $j -= $gap) {
                $arr[$j+$gap] = $arr[$j];
            }
            $arr[$j+$gap] = $temp;
        }
    }
    return $arr;
}
```

### C 语言实现希尔排序

```
void shell_sort(int arr[], int len) {
        int gap, i, j;
        int temp;
        for (gap = len >> 1; gap > 0; gap >>= 1)
                for (i = gap; i < len; i++) {
                        temp = arr[i];
                        for (j = i - gap; j >= 0 && arr[j] > temp; j -= gap)
                                arr[j + gap] = arr[j];
                        arr[j + gap] = temp;
                }
}
```

### C++ 语言实现希尔排序

```
template<typename T>
void shell_sort(T array[], int length) {
    int h = 1;
    while (h < length / 3) {
        h = 3 * h + 1;
    }
    while (h >= 1) {
        for (int i = h; i < length; i++) {
            for (int j = i; j >= h && array[j] < array[j - h]; j -= h) {
                std::swap(array[j], array[j - h]);
            }
        }
        h = h / 3;
    }
}
```

### C#实现希尔排序

```
public static int[] ShellSort(int[] array){
    int length = array.Length;
    int k = 1;
    for (int h = length / 2; h > 0; h = h / 2)
    {                
        for (int i = h; i < length; i++)
        {
            int temp = array[i];
            if (temp.CompareTo(array[i - h]) < 0)
            {
                for (int j = 0; j < i; j += h)
                {
                    if (temp.CompareTo(array[j]) < 0)
                    {
                        temp = array[j];
                        array[j] = array[i];
                        array[i] = temp;
                    }
                }
            }
        }
        printArray(array);
        Console.WriteLine("第" + (k++) + "趟"+" 增量"+h);
    }
    return array;
}
```

### Swift实现希尔排序

```
var arr = [64, 20, 50, 33, 72, 10, 23, -1, 4, 5]
 
public func shellSort(_ list: inout [Int]) {
     
    var sublistCount = list.count / 2
    
    while sublistCount > 0 {
         
        for index in 0..<list.count {
            
            guard index + sublistCount < list.count else { break }
             
            if list[index] > list[index + sublistCount] {
                swap(&list[index], &list[index + sublistCount])
            }
             
            guard sublistCount == 1 && index > 0 else { continue }
             
            if list[index - 1] > list[index] {
                swap(&list[index - 1], &list[index])
            }
        }
        sublistCount = sublistCount / 2
    }
}
 
shellSort(&arr)
```

