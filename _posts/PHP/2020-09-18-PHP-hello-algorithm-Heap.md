---
layout:     post
title:      "你好！ 堆排序"
subtitle:   " \"Heap Sort\""
date:       2020-09-18 12:00:04
author:     "WuQingBao"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
tags:
    - 算法
    - php
---

## 堆排序的基本概念

堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。堆排序可以说是一种利用堆的概念来排序的选择排序。分为两种方法：

1. 大顶堆：每个节点的值都大于或等于其子节点的值，在堆排序算法中用于升序排列；
2. 小顶堆：每个节点的值都小于或等于其子节点的值，在堆排序算法中用于降序排列；

堆排序的平均时间复杂度为 Ο(nlogn)。

## 堆排序的算法步骤

先上一张堆排序动画演示图片：

![图片来自维基百科](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/Sorting_heapsort_anim.gif)
图片来自维基百科

### **二叉树**

要了解堆首先得了解一下二叉树，在计算机科学中，二叉树是每个节点最多有两个子树的树结构。通常子树被称作“左子树”（left subtree）和“右子树”（right subtree）。二叉树常被用于实现二叉查找树和二叉堆。

二叉树的每个结点至多只有二棵子树（不存在度大于 2 的结点），二叉树的子树有左右之分，次序不能颠倒。

**在二叉树的第i层至多有**![20150904215445580](https://7n.w3cschool.cn/attachments/image/20180418/1524038527732616.gif)**个结点**

**深度为K的二叉树的最大节点数为(k>=1)**

![20150904220459657](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/1524038574116984.png)

**对于任何终端结点** ![20150904221345964](https://7n.w3cschool.cn/attachments/image/20180418/1524038617105561.png) **，度为2的节点数为** ![20150904221441164](https://7n.w3cschool.cn/attachments/image/20180418/1524038623867819.png) **，则** ![20150904221345964](https://7n.w3cschool.cn/attachments/image/20180418/1524038631607278.png) **=** ![20150904221441164](https://7n.w3cschool.cn/attachments/image/20180418/1524038638559818.png) **+ 1** 

树和二叉树的三个主要差别：

- 树的结点个数至少为 1，而二叉树的结点个数可以为 0
- 树中结点的最大度数没有限制，而二叉树结点的最大度数为 2
- 树的结点无左、右之分，而二叉树的结点有左、右之分

二叉树又分为完全二叉树（complete binary tree）和满二叉树（full binary tree）

满二叉树：一棵深度为 k，且有 2k - 1 个节点称之为满二叉树

![深度为 3 的满二叉树 full binary tree](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/full-binary-tree.png)
深度为 3 的满二叉树 full binary tree

完全二叉树：深度为 k，有 n 个节点的二叉树，当且仅当其每一个节点都与深度为 k 的满二叉树中序号为 1 至 n 的节点对应时，称之为完全二叉树

![深度为 3 的完全二叉树 complete binary tree](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/complete-binary-tree.png)
深度为 3 的完全二叉树 complete binary tree

### **什么是堆？**

堆（二叉堆）可以视为一棵完全的二叉树，完全二叉树的一个“优秀”的性质是，除了最底层之外，每一层都是满的，这使得堆可以利用数组来表示（普通的一般的二叉树通常用链表作为基本容器表示），每一个结点对应数组中的一个元素。

如下图，是一个堆和数组的相互关系

![堆和数组的相互关系](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/heap-and-array.png)
堆和数组的相互关系

对于给定的某个结点的下标 i，可以很容易的计算出这个结点的父结点、孩子结点的下标：

- Parent(i) = floor(i/2)，i 的父节点下标
- Left(i) = 2i，i 的左子节点下标
- Right(i) = 2i + 1，i 的右子节点下标

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/heap-and-array-parent-children.png)

二叉堆一般分为两种：最大堆和最小堆。

最大堆：

- 最大堆中的最大元素值出现在根结点（堆顶）
- 堆中每个父节点的元素值都大于等于其孩子结点（如果存在）

![最大堆](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/max-heap.png)

最小堆：

- 最小堆中的最小元素值出现在根结点（堆顶）
- 堆中每个父节点的元素值都小于等于其孩子结点（如果存在）

![最小堆](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/min-heap.png)

## 堆排序的分析

> **堆排序的基本思想是：将待排序序列构造成一个大顶堆，此时，整个序列的最大值就是堆顶的根节点。将其与末尾元素进行交换，此时末尾就为最大值。然后将剩余n-1个元素重新构造成一个堆，这样会得到n个元素的次小值。如此反复执行，便能得到一个有序序列了**

**步骤一 构造初始堆。将给定无序序列构造成一个大顶堆（一般升序采用大顶堆，降序采用小顶堆)。**

a.假设给定无序序列结构如下

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/1024555-20161217192038651-934327647.png)

2.此时我们从最后一个非叶子结点开始（叶结点自然不用调整，第一个非叶子结点 arr.length/2-1=5/2-1=1，也就是下面的6结点），从左至右，从下至上进行调整。

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/1024555-20161217192209433-270379236.png)

4.找到第二个非叶节点4，由于[4,9,8]中9元素最大，4和9交换。

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/1024555-20161217192854636-1823585260.png)

这时，交换导致了子根[4,5,6]结构混乱，继续调整，[4,5,6]中6最大，交换4和6。

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/1024555-20161217193347886-1142194411.png)

此时，我们就将一个无需序列构造成了一个大顶堆。

**步骤二 将堆顶元素与末尾元素进行交换，使末尾元素最大。然后继续调整堆，再将堆顶元素与末尾元素交换，得到第二大元素。如此反复进行交换、重建、交换。**

a.将堆顶元素9和末尾元素4进行交换

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/1024555-20161217194207620-1455153342.png)

b.重新调整结构，使其继续满足堆定义

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/1024555-20161218153110495-1280388728.png)

c.再将堆顶元素8与末尾元素5进行交换，得到第二大元素8.

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/1024555-20161218152929339-1114983222.png)

后续过程，继续进行调整，交换，如此反复进行，最终使得整个序列有序

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/1024555-20161218152348229-935654830.png)

再简单总结下堆排序的基本思路：

**a.将无需序列构建成一个堆，根据升序降序需求选择大顶堆或小顶堆;**

　　**b.将堆顶元素与末尾元素交换，将最大元素"沉"到数组末端;**

　　**c.重新调整结构，使其满足堆定义，然后继续交换堆顶元素与当前末尾元素，反复执行调整+交换步骤，直到整个序列有序。**

 

## 堆排序的动图演示

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/heapSort.gif)

## 堆排序的代码实现

### JavaScript 代码实现堆排序



```
<script>
var len;    // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
function buildMaxHeap(arr) {   // 建立大顶堆
    len = arr.length;
    for (var i = Math.floor(len/2); i >= 0; i--) {
        heapify(arr, i);
    }
}
function heapify(arr, i) {     // 堆调整
    var left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;
    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest != i) {
        swap(arr, i, largest);
        heapify(arr, largest);
    }
}
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function heapSort(arr) {
    buildMaxHeap(arr);
    for (var i = arr.length-1; i > 0; i--) {
        swap(arr, 0, i);
        len--;
        heapify(arr, 0);
    }
    return arr;
}
var arraySample=[1,4,272,23,123,545,232,22,312];
document.write(heapSort(arraySample));
</script>
```



   提示：可以修改代码后运行

### Python 代码实现堆排序

```
def big_endian(arr, start, end):
   root = start
   while True:
       child = root * 2 + 1   # 左孩子
       if child > end:        # 孩子比最后一个节点还大 也就意味着最后一个叶子节点了 就得跳出去一次循环已经调整完毕
           break
       if child + 1 <= end and arr[child] < arr[child + 1]:   # 为了始终让其跟子元素的较大值比较 如果右边大就左换右，左边大的话就默认
           child += 1
       if arr[root] < arr[child]:     # 父节点小于子节点直接换位置 同时坐标也得换这样下次循环可以准确判断是否为最底层是不是调整完毕
           arr[root], arr[child] = arr[child], arr[root]
           root = child
       else:                            # 父子节点顺序正常 直接过
           break
             
             
def heap_sort(arr):
   # 无序区大根堆排序
   first = len(arr) // 2 - 1
   for start in range(first, -1, -1):   # 从下到上，从右到左对每个节点进调整 循环得到非叶子节点
       big_endian(arr, start, len(arr) - 1)  # 去调整所有的节点
   for end in range(len(arr) - 1, 0, -1):
       arr[0], arr[end] = arr[end], arr[0]   # 顶部尾部互换位置
       big_endian(arr, 0, end - 1)          # 重新调整子节点的顺序  从顶开始调整
   return arr
     
     
def main():
   l = [3, 1, 4, 9, 6, 7, 5, 8, 2, 10]
   print(heap_sort(l))  # 原地排序
     
if __name__ == "__main__":
   main() 
```

### Go 代码实现堆排序

```
func heapSort(arr []int) []int {
        arrLen := len(arr)
        buildMaxHeap(arr, arrLen)
        for i := arrLen - 1; i >= 0; i-- {
                swap(arr, 0, i)
                arrLen -= 1
                heapify(arr, 0, arrLen)
        }
        return arr
}
 
func buildMaxHeap(arr []int, arrLen int) {
        for i := arrLen / 2; i >= 0; i-- {
                heapify(arr, i, arrLen)
        }
}
 
func heapify(arr []int, i, arrLen int) {
        left := 2*i + 1
        right := 2*i + 2
        largest := i
        if left < arrLen && arr[left] > arr[largest] {
                largest = left
        }
        if right < arrLen && arr[right] > arr[largest] {
                largest = right
        }
        if largest != i {
                swap(arr, i, largest)
                heapify(arr, largest, arrLen)
        }
}
 
func swap(arr []int, i, j int) {
        arr[i], arr[j] = arr[j], arr[i]
}
```

### Java 代码实现堆排序

```
public class HeapSort implements IArraySort {
 
    @Override
    public int[] sort(int[] sourceArray) throws Exception {
        // 对 arr 进行拷贝，不改变参数内容
        int[] arr = Arrays.copyOf(sourceArray, sourceArray.length);
 
        int len = arr.length;
 
        buildMaxHeap(arr, len);
 
        for (int i = len - 1; i > 0; i--) {
            swap(arr, 0, i);
            len--;
            heapify(arr, 0, len);
        }
        return arr;
    }
 
    private void buildMaxHeap(int[] arr, int len) {
        for (int i = (int) Math.floor(len / 2); i >= 0; i--) {
            heapify(arr, i, len);
        }
    }
 
    private void heapify(int[] arr, int i, int len) {
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        int largest = i;
 
        if (left < len && arr[left] > arr[largest]) {
            largest = left;
        }
 
        if (right < len && arr[right] > arr[largest]) {
            largest = right;
        }
 
        if (largest != i) {
            swap(arr, i, largest);
            heapify(arr, largest, len);
        }
    }
 
    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
 
}
```

### PHP 代码实现堆排序

```
function buildMaxHeap(&$arr)
{
    global $len;
    for ($i = floor($len/2); $i >= 0; $i--) {
        heapify($arr, $i);
    }
}
 
function heapify(&$arr, $i)
{
    global $len;
    $left = 2 * $i + 1;
    $right = 2 * $i + 2;
    $largest = $i;
 
    if ($left < $len && $arr[$left] > $arr[$largest]) {
        $largest = $left;
    }
 
    if ($right < $len && $arr[$right] > $arr[$largest]) {
        $largest = $right;
    }
 
    if ($largest != $i) {
        swap($arr, $i, $largest);
        heapify($arr, $largest);
    }
}
 
function swap(&$arr, $i, $j)
{
    $temp = $arr[$i];
    $arr[$i] = $arr[$j];
    $arr[$j] = $temp;
}
 
function heapSort($arr) {
    global $len;
    $len = count($arr);
    buildMaxHeap($arr);
    for ($i = count($arr) - 1; $i > 0; $i--) {
        swap($arr, 0, $i);
        $len--;
        heapify($arr, 0);
    }
    return $arr;
}
```

### C 语言实现堆排序

```
#include <stdio.h>
#include <stdlib.h>
  
void swap(int* a, int* b) {
    int temp = *b;
    *b = *a;
    *a = temp;
}
  
void max_heapify(int arr[], int start, int end) {
    //建立父节点指标和子节点指标
    int dad = start;
    int son = dad * 2 + 1;
    while (son <= end) { //若子节点指标在范围内才做比较
        if (son + 1 <= end && arr[son] < arr[son + 1]) //先比较两个子节点大小，选择最大的
            son++;
        if (arr[dad] > arr[son]) //如果父节点大於子节点代表调整完毕，直接跳出函数
            return;
        else { //否则交换父子内容再继续子节点和孙节点比较
            swap(&arr[dad], &arr[son]);
            dad = son;
            son = dad * 2 + 1;
        }
    }
}
  
void heap_sort(int arr[], int len) {
    int i;
    //初始化，i从最後一个父节点开始调整
    for (i = len / 2 - 1; i >= 0; i--)
        max_heapify(arr, i, len - 1);
    //先将第一个元素和已排好元素前一位做交换，再重新调整，直到排序完毕
    for (i = len - 1; i > 0; i--) {
        swap(&arr[0], &arr[i]);
        max_heapify(arr, 0, i - 1);
    }
}
  
int main() {
    int arr[] = { 3, 5, 3, 0, 8, 6, 1, 5, 8, 6, 2, 4, 9, 4, 7, 0, 1, 8, 9, 7, 3, 1, 2, 5, 9, 7, 4, 0, 2, 6 };
    int len = (int) sizeof(arr) / sizeof(*arr);
    heap_sort(arr, len);
    int i;
    for (i = 0; i < len; i++)
        printf("%d ", arr[i]);
    printf("\n");
    return 0;
}
```

### C++ 语言实现堆排序

```
#include <iostream>
#include <algorithm>
using namespace std;
  
void max_heapify(int arr[], int start, int end) {
    //建立父节点指标和子节点指标
    int dad = start;
    int son = dad * 2 + 1;
    while (son <= end) { //若子节点指标在范围内才做比较
        if (son + 1 <= end && arr[son] < arr[son + 1]) //先比较两个子节点大小，选择最大的
            son++;
        if (arr[dad] > arr[son]) //如果父节点大於子节点代表调整完毕，直接跳出函数
            return;
        else { //否则交换父子内容再继续子节点和孙节点比较
            swap(arr[dad], arr[son]);
            dad = son;
            son = dad * 2 + 1;
        }
    }
}
  
void heap_sort(int arr[], int len) {
    //初始化，i从最後一个父节点开始调整
    for (int i = len / 2 - 1; i >= 0; i--)
        max_heapify(arr, i, len - 1);
    //先将第一个元素和已经排好的元素前一位做交换，再从新调整(刚调整的元素之前的元素)，直到排序完毕
    for (int i = len - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        max_heapify(arr, 0, i - 1);
    }
}
  
int main() {
    int arr[] = { 3, 5, 3, 0, 8, 6, 1, 5, 8, 6, 2, 4, 9, 4, 7, 0, 1, 8, 9, 7, 3, 1, 2, 5, 9, 7, 4, 0, 2, 6 };
    int len = (int) sizeof(arr) / sizeof(*arr);
    heap_sort(arr, len);
    for (int i = 0; i < len; i++)
        cout << arr[i] << ' ';
    cout << endl;
    return 0;
}
```

 