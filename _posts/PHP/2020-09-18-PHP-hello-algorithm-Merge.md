---
layout:     post
title:      "你好！ 归并排序 "
subtitle:   " \"Merge Sort\""
date:       2020-09-18 12:00:06
author:     "WuQingBao"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
tags:
    - 算法
    - php
---

## 归并排序的基本概念

归并排序（Merge sort）是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。

作为一种典型的分而治之思想的算法应用，归并排序的实现由两种方法：

- 自上而下的递归（所有递归的方法都可以用迭代重写，所以就有了第 2 种方法）；
- 自下而上的迭代；

在我们继续之前，让我们先谈谈分而治之（Divide and Conquer，缩写为D＆C），这是一个强大的解决问题的范例。
分而治之算法通过以下步骤解决（某种类型的）问题 - 比如我们的排序问题：

1. 划分步骤：将大的原始问题划分成较小的子问题并递归地解决较小的子问题，
2. 解决步骤：结合较小的子问题的结果来产生较大的原始问题的结果。

## 归并排序的算法步骤

归并并排序是分而治之的排序算法。
划分步骤很简单：将当前数组分成两半（如果N是偶数，则将其完全平等，或者如果N是奇数，则一边稍大于一个元素），然后递归地对这两半进行排序。

## 归并排序的分析

以数组 array = [6, 5, 3, 1, 8, 7, 2, 4] 为例，首先将数组分为长度为 2 的子数组，并使每个子数组有序：

```
[6, 5]  [3, 1]  [8, 7]  [2, 4]
   ↓       ↓       ↓       ↓
[5, 6]  [1, 3]  [7, 8]  [2, 4]
```

然后再两两合并：

```
[6, 5, 3, 1]  [8, 7, 2, 4]
      ↓             ↓
[1, 3, 5, 6]  [2, 4, 7, 8]
```

最后将两个子数组合并：

```
[6, 5, 3, 1, 8, 7, 2, 4]
            ↓
[1, 2, 3, 4, 5, 6, 7, 8]
```

排序过程动画演示如下：

![图片来自维基百科](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/merge-sort-example-300px.gif)
图片来自维基百科

再有数组 array = [5, 2, 4, 6, 1, 3, 2, 6]，归并排序流程也可以如下表示：

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/merge-sort-example.gif)

## 归并排序的动图演示

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/mergeSort.gif)

## 归并排序的代码实现

### JavaScript 代码实现归并排序



```
<script>
function mergeSort(arr) {  // 采用自上而下的递归方法
    var len = arr.length;
    if(len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right)
{
    var result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length)
        result.push(left.shift());
    while (right.length)
        result.push(right.shift());
    return result;
}
var arraySample=[1,4,232,23,123,545,232,22,312];
document.write(mergeSort(arraySample));
</script>

```



   提示：可以修改代码后运行

### Python 代码实现归并排序

```
def mergeSort(arr):
    import math
    if(len(arr)<2):
        return arr
    middle = math.floor(len(arr)/2)
    left, right = arr[0:middle], arr[middle:]
    return merge(mergeSort(left), mergeSort(right))
 
def merge(left,right):
    result = []
    while left and right:
        if left[0] <= right[0]:
            result.append(left.pop(0));
        else:
            result.append(right.pop(0));
    while left:
        result.append(left.pop(0));
    while right:
        result.append(right.pop(0));
    return result
```

### Go 代码实现归并排序

```
func mergeSort(arr []int) []int {
        length := len(arr)
        if length < 2 {
                return arr
        }
        middle := length / 2
        left := arr[0:middle]
        right := arr[middle:]
        return merge(mergeSort(left), mergeSort(right))
}
 
func merge(left []int, right []int) []int {
        var result []int
        for len(left) != 0 && len(right) != 0 {
                if left[0] <= right[0] {
                        result = append(result, left[0])
                        left = left[1:]
                } else {
                        result = append(result, right[0])
                        right = right[1:]
                }
        }
 
        for len(left) != 0 {
                result = append(result, left[0])
                left = left[1:]
        }
 
        for len(right) != 0 {
                result = append(result, right[0])
                right = right[1:]
        }
 
        return result
}
```

### Java 代码实现归并排序

```
public class MergeSort implements IArraySort {
 
    @Override
    public int[] sort(int[] sourceArray) throws Exception {
        // 对 arr 进行拷贝，不改变参数内容
        int[] arr = Arrays.copyOf(sourceArray, sourceArray.length);
 
        if (arr.length < 2) {
            return arr;
        }
        int middle = (int) Math.floor(arr.length / 2);
 
        int[] left = Arrays.copyOfRange(arr, 0, middle);
        int[] right = Arrays.copyOfRange(arr, middle, arr.length);
 
        return merge(sort(left), sort(right));
    }
 
    protected int[] merge(int[] left, int[] right) {
        int[] result = new int[left.length + right.length];
        int i = 0;
        while (left.length > 0 && right.length > 0) {
            if (left[0] <= right[0]) {
                result[i++] = left[0];
                left = Arrays.copyOfRange(left, 1, left.length);
            } else {
                result[i++] = right[0];
                right = Arrays.copyOfRange(right, 1, right.length);
            }
        }
 
        while (left.length > 0) {
            result[i++] = left[0];
            left = Arrays.copyOfRange(left, 1, left.length);
        }
 
        while (right.length > 0) {
            result[i++] = right[0];
            right = Arrays.copyOfRange(right, 1, right.length);
        }
 
        return result;
    }
 
}
```

### PHP 代码实现归并排序

```
function mergeSort($arr)
{
    $len = count($arr);
    if ($len < 2) {
        return $arr;
    }
    $middle = floor($len / 2);
    $left = array_slice($arr, 0, $middle);
    $right = array_slice($arr, $middle);
    return merge(mergeSort($left), mergeSort($right));
}
 
function merge($left, $right)
{
    $result = [];
 
    while (count($left) > 0 && count($right) > 0) {
        if ($left[0] <= $right[0]) {
            $result[] = array_shift($left);
        } else {
            $result[] = array_shift($right);
        }
    }
 
    while (count($left))
        $result[] = array_shift($left);
 
    while (count($right))
        $result[] = array_shift($right);
 
    return $result;
}
```

### C 语言实现归并排序

迭代版

```
int min(int x, int y) {
    return x < y ? x : y;
}
void merge_sort(int arr[], int len) {
    int *a = arr;
    int *b = (int *) malloc(len * sizeof(int));
    int seg, start;
    for (seg = 1; seg < len; seg += seg) {
        for (start = 0; start < len; start += seg * 2) {
            int low = start, mid = min(start + seg, len), high = min(start + seg * 2, len);
            int k = low;
            int start1 = low, end1 = mid;
            int start2 = mid, end2 = high;
            while (start1 < end1 && start2 < end2)
                b[k++] = a[start1] < a[start2] ? a[start1++] : a[start2++];
            while (start1 < end1)
                b[k++] = a[start1++];
            while (start2 < end2)
                b[k++] = a[start2++];
        }
        int *temp = a;
        a = b;
        b = temp;
    }
    if (a != arr) {
        int i;
        for (i = 0; i < len; i++)
            b[i] = a[i];
        b = a;
    }
    free(b);
}
```

递归版

```
void merge_sort_recursive(int arr[], int reg[], int start, int end) {
    if (start >= end)
        return;
    int len = end - start, mid = (len >> 1) + start;
    int start1 = start, end1 = mid;
    int start2 = mid + 1, end2 = end;
    merge_sort_recursive(arr, reg, start1, end1);
    merge_sort_recursive(arr, reg, start2, end2);
    int k = start;
    while (start1 <= end1 && start2 <= end2)
        reg[k++] = arr[start1] < arr[start2] ? arr[start1++] : arr[start2++];
    while (start1 <= end1)
        reg[k++] = arr[start1++];
    while (start2 <= end2)
        reg[k++] = arr[start2++];
    for (k = start; k <= end; k++)
        arr[k] = reg[k];
}
 
void merge_sort(int arr[], const int len) {
    int reg[len];
    merge_sort_recursive(arr, reg, 0, len - 1);
}
```

### C++ 语言实现归并排序

迭代版

```
template<typename T> // 整數或浮點數皆可使用,若要使用物件(class)時必須設定"小於"(<)的運算子功能
void merge_sort(T arr[], int len) {
    T *a = arr;
    T *b = new T[len];
    for (int seg = 1; seg < len; seg += seg) {
        for (int start = 0; start < len; start += seg + seg) {
            int low = start, mid = min(start + seg, len), high = min(start + seg + seg, len);
            int k = low;
            int start1 = low, end1 = mid;
            int start2 = mid, end2 = high;
            while (start1 < end1 && start2 < end2)
                b[k++] = a[start1] < a[start2] ? a[start1++] : a[start2++];
            while (start1 < end1)
                b[k++] = a[start1++];
            while (start2 < end2)
                b[k++] = a[start2++];
        }
        T *temp = a;
        a = b;
        b = temp;
    }
    if (a != arr) {
        for (int i = 0; i < len; i++)
            b[i] = a[i];
        b = a;
    }
    delete[] b;
}
```

递归版

```
void Merge(vector<int> &Array, int front, int mid, int end) {
    // preconditions:
    // Array[front...mid] is sorted
    // Array[mid+1 ... end] is sorted
    // Copy Array[front ... mid] to LeftSubArray
    // Copy Array[mid+1 ... end] to RightSubArray
    vector<int> LeftSubArray(Array.begin() + front, Array.begin() + mid + 1);
    vector<int> RightSubArray(Array.begin() + mid + 1, Array.begin() + end + 1);
    int idxLeft = 0, idxRight = 0;
    LeftSubArray.insert(LeftSubArray.end(), numeric_limits<int>::max());
    RightSubArray.insert(RightSubArray.end(), numeric_limits<int>::max());
    // Pick min of LeftSubArray[idxLeft] and RightSubArray[idxRight], and put into Array[i]
    for (int i = front; i <= end; i++) {
        if (LeftSubArray[idxLeft] < RightSubArray[idxRight]) {
            Array[i] = LeftSubArray[idxLeft];
            idxLeft++;
        } else {
            Array[i] = RightSubArray[idxRight];
            idxRight++;
        }
    }
}
 
void MergeSort(vector<int> &Array, int front, int end) {
    if (front >= end)
        return;
    int mid = (front + end) / 2;
    MergeSort(Array, front, mid);
    MergeSort(Array, mid + 1, end);
    Merge(Array, front, mid, end);
}
```

### C#实现归并排序

```
public static List<int> sort(List<int> lst) {
    if (lst.Count <= 1)
        return lst;
    int mid = lst.Count / 2;
    List<int> left = new List<int>();  // 定义左侧List
    List<int> right = new List<int>(); // 定义右侧List
    // 以下兩個循環把 lst 分為左右兩個 List
    for (int i = 0; i < mid; i++)
        left.Add(lst[i]);
    for (int j = mid; j < lst.Count; j++)
        right.Add(lst[j]);
    left = sort(left);
    right = sort(right);
    return merge(left, right);
}
/// <summary>
/// 合併兩個已經排好序的List
/// </summary>
/// <param name="left">左側List</param>
/// <param name="right">右側List</param>
/// <returns></returns>
static List<int> merge(List<int> left, List<int> right) {
    List<int> temp = new List<int>();
    while (left.Count > 0 && right.Count > 0) {
        if (left[0] <= right[0]) {
            temp.Add(left[0]);
            left.RemoveAt(0);
        } else {
            temp.Add(right[0]);
            right.RemoveAt(0);
        }
    }
    if (left.Count > 0) {
        for (int i = 0; i < left.Count; i++)
            temp.Add(left[i]);
    }
    if (right.Count > 0) {
        for (int i = 0; i < right.Count; i++)
            temp.Add(right[i]);
    }
    return temp;
}
```

### Swift实现归并排序

```
func mergeSort(_ array: [Int]) -> [Int] {
  guard array.count > 1 else { return array }    // 1
 
  let middleIndex = array.count / 2              // 2
 
  let leftArray = mergeSort(Array(array[0..<middleIndex]))             // 3
 
  let rightArray = mergeSort(Array(array[middleIndex..<array.count]))  // 4
 
  return merge(leftPile: leftArray, rightPile: rightArray)             // 5
}
func merge(leftPile: [Int], rightPile: [Int]) -> [Int] {
  // 1
  var leftIndex = 0
  var rightIndex = 0
 
  // 2
  var orderedPile = [Int]()
 
  // 3
  while leftIndex < leftPile.count && rightIndex < rightPile.count {
    if leftPile[leftIndex] < rightPile[rightIndex] {
      orderedPile.append(leftPile[leftIndex])
      leftIndex += 1
    } else if leftPile[leftIndex] > rightPile[rightIndex] {
      orderedPile.append(rightPile[rightIndex])
      rightIndex += 1
    } else {
      orderedPile.append(leftPile[leftIndex])
      leftIndex += 1
      orderedPile.append(rightPile[rightIndex])
      rightIndex += 1
    }
  }
 
  // 4
  while leftIndex < leftPile.count {
    orderedPile.append(leftPile[leftIndex])
    leftIndex += 1
  }
 
  while rightIndex < rightPile.count {
    orderedPile.append(rightPile[rightIndex])
    rightIndex += 1
  }
 
  return orderedPile
}
```

### Ruby实现归并排序

```
def merge list
  return list if list.size < 2
 
  pivot = list.size / 2
 
  # Merge
  lambda { |left, right|
    final = []
    until left.empty? or right.empty?
      final << if left.first < right.first; left.shift else right.shift end
    end
    final + left + right
  }.call merge(list[0...pivot]), merge(list[pivot..-1])
end
```