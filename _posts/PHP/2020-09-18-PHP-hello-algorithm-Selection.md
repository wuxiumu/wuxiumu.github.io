---
layout:     post
title:      "你好！ 选择排序 "
subtitle:   " \"Selection Sort\""
date:       2020-09-18 12:00:09
author:     "WuQingBao"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
tags:
    - 算法
    - php
---

## 选择排序的基本概念

选择排序（Selection Sort）是一种简单直观的排序算法。它的工作原理如下，首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。选择排序无论什么数据进去都是 O(n²) 的时间复杂度。所以用到它的时候，数据规模越小越好。唯一的好处可能就是不占用额外的内存空间了吧。

选择排序的主要优点与数据移动有关。如果某个元素位于正确的最终位置上，则它不会被移动。选择排序每次交换一对元素，它们当中至少有一个将被移到其最终位置上，因此对n个元素的序列进行排序总共进行至多n-1次交换。在所有的完全依靠交换去移动元素的排序方法中，选择排序属于非常好的一种。

## 选择排序的算法步骤

首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置。

再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。

重复第二步，直到所有元素均排序完毕。

给定 **N** 个项目和 **L = 0** 的数组，选择排序将：

1. 在 **[L ... N-1]** 范围内找出最小项目 **X** 的位置，
2. 用第 **L** 项交换X，
3. 将下限 **L** 增加1并重复步骤1直到 **L = N-2**。

## 选择排序的分析

以数组 arr = [8, 5, 2, 6, 9, 3, 1, 4, 0, 7] 为例，先直观看一下每一步的变化，后面再介绍细节

第一次从数组 [8, 5, 2, 6, 9, 3, 1, 4, 0, 7] 中找到最小的数 0，放到数组的最前面（与第一个元素进行交换）：



```
                               min
                                ↓
8   5   2   6   9   3   1   4   0   7
↑                               ↑
└───────────────────────────────┘
```

交换后：

```
0   5   2   6   9   3   1   4   8   7
```

在剩余的序列中 [5, 2, 6, 9, 3, 1, 4, 8, 7] 中找到最小的数 1，与该序列的第一个个元素进行位置交换：

```
                       min
                        ↓
0   5   2   6   9   3   1   4   8   7
    ↑                   ↑
    └───────────────────┘
```

交换后：

```
0   1   2   6   9   3   5   4   8   7
```

在剩余的序列中 [2, 6, 9, 3, 5, 4, 8, 7] 中找到最小的数 2，与该序列的第一个个元素进行位置交换（实际上不需要交换）：

```
       min
        ↓
0   1   2   6   9   3   5   4   8   7
        ↑
```

重复上述过程，直到最后一个元素就完成了排序。

```
                   min
                    ↓
0   1   2   6   9   3   5   4   8   7
            ↑       ↑
            └───────┘

                           min
                            ↓
0   1   2   3   9   6   5   4   8   7
                ↑           ↑
                └───────────┘

                       min
                        ↓
0   1   2   3   4   6   5   9   8   7
                    ↑   ↑
                    └───┘

                       min
                        ↓
0   1   2   3   4   5   6   9   8   7
                        ↑   

                                   min
                                    ↓
0   1   2   3   4   5   6   9   8   7
                            ↑       ↑
                            └───────┘  

                               min
                                ↓
0   1   2   3   4   5   6   7   8   9
                                ↑      

                                   min
                                    ↓
0   1   2   3   4   5   6   7   8   9
                                    ↑
```

 

## 选择排序的动图演示

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/selectionSort.gif)

 

## 选择排序的代码实现

### JavaScript 代码实现选择排序



```
<script>
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     // 寻找最小的数
                minIndex = j;                 // 将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
var arraySample=[1,4,232,23,123,545,232,22,312];
document.write(selectionSort(arraySample));
</script>

```



   提示：可以修改代码后运行

### Python 代码实现选择排序

```
def selectionSort(arr):
    for i in range(len(arr) - 1):
        # 记录最小数的索引
        minIndex = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[minIndex]:
                minIndex = j
        # i 不是最小数时，将 i 和最小数进行交换
        if i != minIndex:
            arr[i], arr[minIndex] = arr[minIndex], arr[i]
    return arr
```

### Go 代码实现选择排序

```
func selectionSort(arr []int) []int {
        length := len(arr)
        for i := 0; i < length-1; i++ {
                min := i
                for j := i + 1; j < length; j++ {
                        if arr[min] > arr[j] {
                                min = j
                        }
                }
                arr[i], arr[min] = arr[min], arr[i]
        }
        return arr
}
```

### Java 代码实现选择排序

```
public class SelectionSort implements IArraySort {
 
    @Override
    public int[] sort(int[] sourceArray) throws Exception {
        int[] arr = Arrays.copyOf(sourceArray, sourceArray.length);
 
        // 总共要经过 N-1 轮比较
        for (int i = 0; i < arr.length - 1; i++) {
            int min = i;
 
            // 每轮需要比较的次数 N-i
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[min]) {
                    // 记录目前能找到的最小值元素的下标
                    min = j;
                }
            }
 
            // 将找到的最小值和i位置所在的值进行交换
            if (i != min) {
                int tmp = arr[i];
                arr[i] = arr[min];
                arr[min] = tmp;
            }
 
        }
        return arr;
    }
}
```

### PHP 代码实现选择排序

```
function selectionSort($arr)
{
    $len = count($arr);
    for ($i = 0; $i < $len - 1; $i++) {
        $minIndex = $i;
        for ($j = $i + 1; $j < $len; $j++) {
            if ($arr[$j] < $arr[$minIndex]) {
                $minIndex = $j;
            }
        }
        $temp = $arr[$i];
        $arr[$i] = $arr[$minIndex];
        $arr[$minIndex] = $temp;
    }
    return $arr;
}
```

### C 语言实现选择排序

```
void swap(int *a,int *b) //交換兩個變數
{
    int temp = *a;
    *a = *b;
    *b = temp;
}
void selection_sort(int arr[], int len) 
{
    int i,j;
 
        for (i = 0 ; i < len - 1 ; i++) 
    {
                int min = i;
                for (j = i + 1; j < len; j++)     //走訪未排序的元素
                        if (arr[j] < arr[min])    //找到目前最小值
                                min = j;    //紀錄最小值
                swap(&arr[min], &arr[i]);    //做交換
        }
}
```

### C++ 语言实现选择排序

```
template<typename T> //整數或浮點數皆可使用，若要使用物件（class）時必須設定大於（>）的運算子功能
void selection_sort(std::vector<T>& arr) {
        for (int i = 0; i < arr.size() - 1; i++) {
                int min = i;
                for (int j = i + 1; j < arr.size(); j++)
                        if (arr[j] < arr[min])
                                min = j;
                std::swap(arr[i], arr[min]);
        }
}
```

### C#实现选择排序

```
static void selection_sort<T>(T[] arr) where T : System.IComparable<T>{//整數或浮點數皆可使用
        int i, j, min, len = arr.Length;
        T temp;
        for (i = 0; i < len - 1; i++) {
                min = i;
                for (j = i + 1; j < len; j++)
                        if (arr[min].CompareTo(arr[j]) > 0)
                                min = j;
                temp = arr[min];
                arr[min] = arr[i];
                arr[i] = temp;
        }
}
```

### Swift实现选择排序

```
import Foundation
/// 选择排序
///
/// - Parameter list: 需要排序的数组
func selectionSort(_ list: inout [Int]) -> Void {
    for j in 0..<list.count - 1 {
        var minIndex = j
        for i in j..<list.count {
            if list[minIndex] > list[i] {
                minIndex = i
            }
        }
        list.swapAt(j, minIndex)
    }
}
```