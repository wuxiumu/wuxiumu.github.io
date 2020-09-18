---
layout:     post
title:      "你好！ 桶排序"
subtitle:   " \"Bucket Sort\""
date:       2020-09-18 12:00:02
author:     "WuQingBao"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
tags:
    - 算法
    - php
---

## 桶排序的基本概念

桶排序 (Bucket sort)或所谓的**箱排序**的原理是

将数组分到有限数量的桶子里，

然后对每个桶子再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排序），

最后将各个桶中的数据有序的合并起来。

桶排序是计数排序的升级版。它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。为了使桶排序更加高效，我们需要做到这两点：

1. 在额外空间充足的情况下，尽量增大桶的数量
2. 使用的映射函数能够将输入的 N 个数据均匀的分配到 K 个桶中

同时，对于桶中元素的排序，选择何种比较排序算法对于性能的影响至关重要。

**1. 什么时候最快:**

当输入的数据可以均匀的分配到每一个桶中。

**2. 什么时候最慢:**

当输入的数据被分配到了同一个桶中。

## 桶排序的算法步骤

排序过程：

1. 假设待排序的一组数统一的分布在一个范围中，并将这一范围划分成几个子范围，也就是桶
2. 将待排序的一组数，分档规入这些子桶，并将桶中的数据进行排序
3. 将各个桶中的数据有序的合并起来

[Data Structure Visualizations](http://www.cs.usfca.edu/~galles/visualization/BucketSort.html) 提供了一个桶排序的分步动画演示。

## 桶排序的分析

设有数组 array = [29, 25, 3, 49, 9, 37, 21, 43]，那么数组中最大数为 49，先设置 5 个桶，那么每个桶可存放数的范围为：0~9、10~19、20~29、30~39、40~49，然后分别将这些数放人自己所属的桶，如下图：

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/bucket-sort-1.png)

然后，分别对每个桶里面的数进行排序，或者在将数放入桶的同时用插入排序进行排序。最后，将各个桶中的数据有序的合并起来，如下图：

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/bucket-sort-2.png)

## 桶排序的代码实现

### JavaScript 代码实现桶排序



```
<script>
function bucketSort(array) {
    var bucket = [], // 正数桶
        negativeBucket = [], // 负数桶
        result = [],
        l = array.length,
        i,
        j,
        k,
        abs;
    // 入桶
    for (i = 0; i < l; i++) {
        if (array[i] < 0) {
            abs = Math.abs(array[i]);
            if (!negativeBucket[abs]) {
                negativeBucket[abs] = [];
            }
            negativeBucket[abs].push(array[i]);
        } else {
            if (!bucket[array[i]]) {
                bucket[array[i]] = [];
            }
            bucket[array[i]].push(array[i]);
        }
    }
    // 出桶
    l = negativeBucket.length;
    for (i = l - 1; i >= 0; i--) {
        if (negativeBucket[i]) {
            k = negativeBucket[i].length;
            for (j = 0; j < k; j++) {
                result.push(negativeBucket[i][j]);
            }
        }
    }
    l = bucket.length;
    for (i = 0; i < l; i++) {
        if (bucket[i]) {
            k = bucket[i].length;
            for (j = 0; j < k; j++) {
                result.push(bucket[i][j]);
            }
        }
    }
    return result;
}
document.write(bucketSort([5, 2, 4, 6, 1, 3]));
</script>

```

下面这种方式就是文中举例分析的那样，每个桶存放一定范围的数字，用 step 参数来设置该范围，取 step 为 1 就退化成前一种实现方式。关键部位代码有注释，慢慢看，逻辑稍微有点复杂。



```
<script>
/*
* @array 将要排序的数组
*
* @step 划分桶的步长，比如 step = 5，表示每个桶存放的数字的范围是 5，像 -4~1、0~5、6~11
*/
function bucketSort(array, step) {
    var result = [],
        bucket = [],
        bucketCount,
        l = array.length,
        i,
        j,
        k,
        s,
        max = array[0],
        min = array[0],
        temp;
    for (i = 1; i < l; i++) {
        if (array[i] > max) {
            max = array[i]
        }
        if (array[i] < min) {
            min = array[i];
        }
    }
    min = min - 1;
    bucketCount = Math.ceil((max - min) / step); // 需要桶的数量
    for (i = 0; i < l; i++) {
        temp = array[i];
        for (j = 0; j < bucketCount; j++) {
            if (temp > (min + step * j) && temp <= (min + step * (j + 1))) { // 判断放入哪个桶
                if (!bucket[j]) {
                    bucket[j] = [];
                }
                // 通过插入排序将数字插入到桶中的合适位置
                s = bucket[j].length;
                if (s > 0) {
                    for (k = s - 1; k >= 0; k--) {
                        if (bucket[j][k] > temp) {
                            bucket[j][k + 1] = bucket[j][k];
                        } else {
                            break;
                        }
                    }
                    bucket[j][k + 1] = temp;
                } else {
                    bucket[j].push(temp);
                }
            }
        }
    }
    for (i = 0; i < bucketCount; i++) { // 循环取出桶中数据
        if (bucket[i]) {
            k = bucket[i].length;
            for (j = 0; j < k; j++) {
                result.push(bucket[i][j]);
            }
        }
    }
    return result;
}
document.write(bucketSort([5, 2, 4, 6, 1, 3],6));
</script>

```



   提示：可以修改代码后运行

### Java 代码实现桶排序

```
public class BucketSort implements IArraySort {
 
    private static final InsertSort insertSort = new InsertSort();
 
    @Override
    public int[] sort(int[] sourceArray) throws Exception {
        // 对 arr 进行拷贝，不改变参数内容
        int[] arr = Arrays.copyOf(sourceArray, sourceArray.length);
 
        return bucketSort(arr, 5);
    }
 
    private int[] bucketSort(int[] arr, int bucketSize) throws Exception {
        if (arr.length == 0) {
            return arr;
        }
 
        int minValue = arr[0];
        int maxValue = arr[0];
        for (int value : arr) {
            if (value < minValue) {
                minValue = value;
            } else if (value > maxValue) {
                maxValue = value;
            }
        }
 
        int bucketCount = (int) Math.floor((maxValue - minValue) / bucketSize) + 1;
        int[][] buckets = new int[bucketCount][0];
 
        // 利用映射函数将数据分配到各个桶中
        for (int i = 0; i < arr.length; i++) {
            int index = (int) Math.floor((arr[i] - minValue) / bucketSize);
            buckets[index] = arrAppend(buckets[index], arr[i]);
        }
 
        int arrIndex = 0;
        for (int[] bucket : buckets) {
            if (bucket.length <= 0) {
                continue;
            }
            // 对每个桶进行排序，这里使用了插入排序
            bucket = insertSort.sort(bucket);
            for (int value : bucket) {
                arr[arrIndex++] = value;
            }
        }
 
        return arr;
    }
 
    /**
     * 自动扩容，并保存数据
     *
     * @param arr
     * @param value
     */
    private int[] arrAppend(int[] arr, int value) {
        arr = Arrays.copyOf(arr, arr.length + 1);
        arr[arr.length - 1] = value;
        return arr;
    }
 
}
```

### PHP 代码实现桶排序

```
function bucketSort($arr, $bucketSize = 5)
{
    if (count($arr) === 0) {
      return $arr;
    }
 
    $minValue = $arr[0];
    $maxValue = $arr[0];
    for ($i = 1; $i < count($arr); $i++) {
      if ($arr[$i] < $minValue) {
          $minValue = $arr[$i];
      } else if ($arr[$i] > $maxValue) {
          $maxValue = $arr[$i];
      }
    }
 
    $bucketCount = floor(($maxValue - $minValue) / $bucketSize) + 1;
    $buckets = array();
    for ($i = 0; $i < count($buckets); $i++) {
        $buckets[$i] = [];
    }
 
    for ($i = 0; $i < count($arr); $i++) {
        $buckets[floor(($arr[$i] - $minValue) / $bucketSize)][] = $arr[$i];
    }
 
    $arr = array();
    for ($i = 0; $i < count($buckets); $i++) {
        $bucketTmp = $buckets[$i];
        sort($bucketTmp);
        for ($j = 0; $j < count($bucketTmp); $j++) {
            $arr[] = $bucketTmp[$j];
        }
    }
 
    return $arr;
}
```

### C++ 语言实现桶排序

```
#include<iterator>
#include<iostream>
#include<vector>
using namespace std;
const int BUCKET_NUM = 10;
 
struct ListNode{
        explicit ListNode(int i=0):mData(i),mNext(NULL){}
        ListNode* mNext;
        int mData;
};
 
ListNode* insert(ListNode* head,int val){
        ListNode dummyNode;
        ListNode *newNode = new ListNode(val);
        ListNode *pre,*curr;
        dummyNode.mNext = head;
        pre = &dummyNode;
        curr = head;
        while(NULL!=curr && curr->mData<=val){
                pre = curr;
                curr = curr->mNext;
        }
        newNode->mNext = curr;
        pre->mNext = newNode;
        return dummyNode.mNext;
}
 
 
ListNode* Merge(ListNode *head1,ListNode *head2){
        ListNode dummyNode;
        ListNode *dummy = &dummyNode;
        while(NULL!=head1 && NULL!=head2){
                if(head1->mData <= head2->mData){
                        dummy->mNext = head1;
                        head1 = head1->mNext;
                }else{
                        dummy->mNext = head2;
                        head2 = head2->mNext;
                }
                dummy = dummy->mNext;
        }
        if(NULL!=head1) dummy->mNext = head1;
        if(NULL!=head2) dummy->mNext = head2;
         
        return dummyNode.mNext;
}
 
void BucketSort(int n,int arr[]){
        vector<ListNode*> buckets(BUCKET_NUM,(ListNode*)(0));
        for(int i=0;i<n;++i){
                int index = arr[i]/BUCKET_NUM;
                ListNode *head = buckets.at(index);
                buckets.at(index) = insert(head,arr[i]);
        }
        ListNode *head = buckets.at(0);
        for(int i=1;i<BUCKET_NUM;++i){
                head = Merge(head,buckets.at(i));
        }
        for(int i=0;i<n;++i){
                arr[i] = head->mData;
                head = head->mNext;
        }
}
```

 