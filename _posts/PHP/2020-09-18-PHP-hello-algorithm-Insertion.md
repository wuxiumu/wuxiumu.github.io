---
layout:     post
title:      "你好！ 插入排序"
subtitle:   " \"Insertion Sort\""
date:       2020-09-18 12:00:05
author:     "WuQingBao"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
tags:
    - 算法
    - php
---

## 插入排序的基本概念

插入排序的代码实现虽然没有冒泡排序和选择排序那么简单粗暴，但它的原理应该是最容易理解的了，因为只要打过扑克牌的人都应该能够秒懂。

插入排序是一种最简单直观的排序算法，它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

插入排序和冒泡排序一样，也有一种优化算法，叫做拆半插入。

## 插入排序的算法步骤

将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。

从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）

## 插入排序的分析

现有一组数组 arr = [5, 6, 3, 1, 8, 7, 2, 4]，共有八个记录，排序过程如下：

```
[5]   6   3   1   8   7   2   4
  ↑   │
  └───┘

[5, 6]   3   1   8   7   2   4
↑        │
└────────┘

[3, 5, 6]  1   8   7   2   4
↑          │
└──────────┘

[1, 3, 5, 6]  8   7   2   4
           ↑  │
           └──┘

[1, 3, 5, 6, 8]  7   2   4
            ↑    │
            └────┘

[1, 3, 5, 6, 7, 8]  2   4
   ↑                │
   └────────────────┘

[1, 2, 3, 5, 6, 7, 8]  4
         ↑             │
         └─────────────┘

[1, 2, 3, 4, 5, 6, 7, 8]
```



其中有一点比较有意思的是，在每次比较操作发现新元素小于等于已排序的元素时，可以将已排序的元素移到下一位置，然后再将新元素插入该位置，接着再与前面的已排序的元素进行比较，这样做交换操作代价比较大。还有一个做法是，将新元素取出，从左到右依次与已排序的元素比较，如果已排序的元素大于新元素，那么将该元素移动到下一个位置，接着再与前面的已排序的元素比较，直到找到已排序的元素小于等于新元素的位置，这时再将新元素插入进去，就像下面这样：

![图片来自维基百科](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/Insertion-sort-example-300px.gif)
图片来自维基百科

## 插入排序的动图演示

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/insertionSort.gif)

 

## 插入排序的代码实现

### JavaScript 代码实现插入排序



```
<script>
function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while(preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1] = current;
    }
    return arr;
}
var arraySample=[1,4,232,23,123,545,232,22,312];
document.write(insertionSort(arraySample));
</script>

```



   提示：可以修改代码后运行

### Python 代码实现插入排序

```
def insertionSort(arr):
    for i in range(len(arr)):
        preIndex = i-1
        current = arr[i]
        while preIndex >= 0 and arr[preIndex] > current:
            arr[preIndex+1] = arr[preIndex]
            preIndex-=1
        arr[preIndex+1] = current
    return arr
```

### Go 代码实现插入排序

```
func insertionSort(arr []int) []int {
        for i := range arr {
                preIndex := i - 1
                current := arr[i]
                for preIndex >= 0 && arr[preIndex] > current {
                        arr[preIndex+1] = arr[preIndex]
                        preIndex -= 1
                }
                arr[preIndex+1] = current
        }
        return arr
}
```

### Java 代码实现插入排序

```
public class InsertSort implements IArraySort {
 
    @Override
    public int[] sort(int[] sourceArray) throws Exception {
        // 对 arr 进行拷贝，不改变参数内容
        int[] arr = Arrays.copyOf(sourceArray, sourceArray.length);
 
        // 从下标为1的元素开始选择合适的位置插入，因为下标为0的只有一个元素，默认是有序的
        for (int i = 1; i < arr.length; i++) {
 
            // 记录要插入的数据
            int tmp = arr[i];
 
            // 从已经排序的序列最右边的开始比较，找到比其小的数
            int j = i;
            while (j > 0 && tmp < arr[j - 1]) {
                arr[j] = arr[j - 1];
                j--;
            }
 
            // 存在比其小的数，插入
            if (j != i) {
                arr[j] = tmp;
            }
 
        }
        return arr;
    }
}
```

### PHP 代码实现插入排序

```
function insertionSort($arr)
{
    $len = count($arr);
    for ($i = 1; $i < $len; $i++) {
        $preIndex = $i - 1;
        $current = $arr[$i];
        while($preIndex >= 0 && $arr[$preIndex] > $current) {
            $arr[$preIndex+1] = $arr[$preIndex];
            $preIndex--;
        }
        $arr[$preIndex+1] = $current;
    }
    return $arr;
}
```

### C 语言实现插入排序

```
void insertion_sort(int arr[], int len){
        int i,j,key;
        for (i=1;i<len;i++){
                key = arr[i];
                j=i-1;
                while((j>=0) && (arr[j]>key)) {
                        arr[j+1] = arr[j];
                        j--;
                }
                arr[j+1] = key;
        }
}
```

### C++ 语言实现插入排序

```
void insertion_sort(int arr[],int len){
        for(int i=1;i<len;i++){
                int key=arr[i];
                int j=i-1;
                while((j>=0) && (key<arr[j])){
                        arr[j+1]=arr[j];
                        j--;
                }
                arr[j+1]=key;
        }
}
```

### C#实现插入排序

```
public static void InsertSort(int[] array)
{
    for(int i = 1;i < array.length;i++)
    {
        int temp = array[i];
        for(int j = i - 1;j >= 0;j--)
        {
            if(array[j] > temp)
            {
                array[j + 1] = array[j];
                array[j] = temp;
            }
            else
                break;
        }
    }
}
```

### Swift实现插入排序

```
for i in 1..<arr.endIndex {
    let temp = arr[i]
    for j in (0..<i).reversed() {
        if arr[j] > temp {
            arr.swapAt(j, j+1)
        }
    }
}
```

 