---
layout:     post
title:      "你好！ 基数排序 "
subtitle:   " \"Radix Sort\""
date:       2020-09-18 12:00:08
author:     "WuQingBao"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - php
	- 算法
---

## 基数排序的基本概念

基数排序是一种非比较型整数排序算法，其原理是将整数按位数切割成不同的数字，然后按每个位数分别比较。由于整数也可以表达字符串（比如名字或日期）和特定格式的浮点数，所以基数排序也不是只能使用于整数。

### 1. 基数排序 vs 计数排序 vs 桶排序

基数排序有两种方法：

这三种排序算法都利用了桶的概念，但对桶的使用方法上有明显差异：

- 基数排序：根据键值的每位数字来分配桶；
- 计数排序：每个桶只存储单一键值；
- 桶排序：每个桶存储一定范围的数值；

## 基数排序的算法步骤

排序过程：将所有待比较数值（**正整数**）统一为同样的数位长度，数位较短的数前面补零。然后，从最低位开始，依次进行一次排序。这样从最低位排序一直到最高位排序完成以后, 数列就变成一个有序序列。

基数排序法会使用到桶 (Bucket)，顾名思义，通过将要比较的位（个位、十位、百位…），将要排序的元素分配至 0~9 个桶中，借以达到排序的作用，在某些时候，基数排序法的效率高于其它的比较性排序法。

[Data Structure Visualizations](http://www.cs.usfca.edu/~galles/visualization/RadixSort.html) 提供了一个基数排序的分步动画演示。

## 基数排序的分析

基数排序的方式可以采用 LSD (Least sgnificant digital) 或 MSD (Most sgnificant digital)，LSD 的排序方式由键值的最右边开始，而 MSD 则相反，由键值的最左边开始。 以 LSD 为例，假设原来有一串数值如下所示：

```
36   9   0   25   1   49   64   16   81   4
```

首先根据个位数的数值，按照个位置等于桶编号的方式，将它们分配至编号0到9的桶子中：

| 编号 | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    | 9    |      |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | ---- |
|      | 0    | 1    |      |      | 64   | 25   | 36   |      |      | 9    |
|      |      | 81   |      |      | 4    |      | 16   |      |      | 49   |

然后，将这些数字按照桶以及桶内部的排序连接起来：

```
0   1   81   64   4   25   36   16   9   49
```

接着按照十位的数值，分别对号入座：

| 编号 | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    | 9    |      |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | ---- |
|      | 0    | 16   | 25   | 36   | 49   |      | 64   |      | 81   |      |
|      | 1    |      |      |      |      |      |      |      |      |      |
|      | 4    |      |      |      |      |      |      |      |      |      |
|      | 9    |      |      |      |      |      |      |      |      |      |

最后按照次序重现连接，完成排序：

```
0   1   4   9   16   25   36   49   64   81
```

## 基数排序动图演示

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/radixSort.gif)

## 基数排序的代码实现

### JavaScript 代码实现基数排序



```
<script>
function radixSort(array) {
    var bucket = [],
        l = array.length,
        loop,
        str,
        i,
        j,
        k,
        t,
        max = array[0];
    for (i = 1; i < l; i++) {
        if (array[i] > max) {
            max = array[i]
        }
    }
    loop = (max + '').length;
    for (i = 0; i < 10; i++) {
        bucket[i] = [];
    }
    for (i = 0; i < loop; i++) {
        for (j = 0; j < l; j++) {
            str = array[j] + '';
            if (str.length >= i + 1) {
                k = parseInt(str[str.length - i - 1]);
                bucket[k].push(array[j]);
            } else { // 高位为 0
                bucket[0].push(array[j]);
            }
        }
        array.splice(0, l);
        for (j = 0; j < 10; j++) {
            t = bucket[j].length;
            for (k = 0; k < t; k++) {
                array.push(bucket[j][k]);
            }
            bucket[j] = [];
        }
    }
    return array;
}
document.write(radixSort([5, 2, 4, 6, 1, 3]));
</script>

```



   提示：可以修改代码后运行

### Java 代码实现基数排序

```
/**
 * 基数排序
 * 
 */
public class RadixSort implements IArraySort {
 
    @Override
    public int[] sort(int[] sourceArray) throws Exception {
        // 对 arr 进行拷贝，不改变参数内容
        int[] arr = Arrays.copyOf(sourceArray, sourceArray.length);
 
        int maxDigit = getMaxDigit(arr);
        return radixSort(arr, maxDigit);
    }
 
    /**
     * 获取最高位数
     */
    private int getMaxDigit(int[] arr) {
        int maxValue = getMaxValue(arr);
        return getNumLenght(maxValue);
    }
 
    private int getMaxValue(int[] arr) {
        int maxValue = arr[0];
        for (int value : arr) {
            if (maxValue < value) {
                maxValue = value;
            }
        }
        return maxValue;
    }
 
    protected int getNumLenght(long num) {
        if (num == 0) {
            return 1;
        }
        int lenght = 0;
        for (long temp = num; temp != 0; temp /= 10) {
            lenght++;
        }
        return lenght;
    }
 
    private int[] radixSort(int[] arr, int maxDigit) {
        int mod = 10;
        int dev = 1;
 
        for (int i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
            // 考虑负数的情况，这里扩展一倍队列数，其中 [0-9]对应负数，[10-19]对应正数 (bucket + 10)
            int[][] counter = new int[mod * 2][0];
 
            for (int j = 0; j < arr.length; j++) {
                int bucket = ((arr[j] % mod) / dev) + mod;
                counter[bucket] = arrayAppend(counter[bucket], arr[j]);
            }
 
            int pos = 0;
            for (int[] bucket : counter) {
                for (int value : bucket) {
                    arr[pos++] = value;
                }
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
    private int[] arrayAppend(int[] arr, int value) {
        arr = Arrays.copyOf(arr, arr.length + 1);
        arr[arr.length - 1] = value;
        return arr;
    }
}
```

### PHP 代码实现基数排序

```
function radixSort($arr, $maxDigit = null)
{
    if ($maxDigit === null) {
        $maxDigit = max($arr);
    }
    $counter = [];
    for ($i = 0; $i < $maxDigit; $i++) {
        for ($j = 0; $j < count($arr); $j++) {
            preg_match_all('/\d/', (string) $arr[$j], $matches);
            $numArr = $matches[0];
            $lenTmp = count($numArr);
            $bucket = array_key_exists($lenTmp - $i - 1, $numArr)
                ? intval($numArr[$lenTmp - $i - 1])
                : 0;
            if (!array_key_exists($bucket, $counter)) {
                $counter[$bucket] = [];
            }
            $counter[$bucket][] = $arr[$j];
        }
        $pos = 0;
        for ($j = 0; $j < count($counter); $j++) {
            $value = null;
            if ($counter[$j] !== null) {
                while (($value = array_shift($counter[$j])) !== null) {
                    $arr[$pos++] = $value;
                }
          }
        }
    }
 
    return $arr;
}
```

### C++ 语言实现基数排序

```
int maxbit(int data[], int n) //辅助函数，求数据的最大位数
{
    int maxData = data[0];              ///< 最大数
    /// 先求出最大数，再求其位数，这样有原先依次每个数判断其位数，稍微优化点。
    for (int i = 1; i < n; ++i)
    {
        if (maxData < data[i])
            maxData = data[i];
    }
    int d = 1;
    int p = 10;
    while (maxData >= p)
    {
        //p *= 10; // Maybe overflow
        maxData /= 10;
        ++d;
    }
    return d;
/*    int d = 1; //保存最大的位数
    int p = 10;
    for(int i = 0; i < n; ++i)
    {
        while(data[i] >= p)
        {
            p *= 10;
            ++d;
        }
    }
    return d;*/
}
void radixsort(int data[], int n) //基数排序
{
    int d = maxbit(data, n);
    int *tmp = new int[n];
    int *count = new int[10]; //计数器
    int i, j, k;
    int radix = 1;
    for(i = 1; i <= d; i++) //进行d次排序
    {
        for(j = 0; j < 10; j++)
            count[j] = 0; //每次分配前清空计数器
        for(j = 0; j < n; j++)
        {
            k = (data[j] / radix) % 10; //统计每个桶中的记录数
            count[k]++;
        }
        for(j = 1; j < 10; j++)
            count[j] = count[j - 1] + count[j]; //将tmp中的位置依次分配给每个桶
        for(j = n - 1; j >= 0; j--) //将所有桶中记录依次收集到tmp中
        {
            k = (data[j] / radix) % 10;
            tmp[count[k] - 1] = data[j];
            count[k]--;
        }
        for(j = 0; j < n; j++) //将临时数组的内容复制到data中
            data[j] = tmp[j];
        radix = radix * 10;
    }
    delete []tmp;
    delete []count;
}
```

### C 语言实现基数排序

```
#include<stdio.h>
#define MAX 20
//#define SHOWPASS
#define BASE 10
 
void print(int *a, int n) {
  int i;
  for (i = 0; i < n; i++) {
    printf("%d\t", a[i]);
  }
}
 
void radixsort(int *a, int n) {
  int i, b[MAX], m = a[0], exp = 1;
 
  for (i = 1; i < n; i++) {
    if (a[i] > m) {
      m = a[i];
    }
  }
 
  while (m / exp > 0) {
    int bucket[BASE] = { 0 };
 
    for (i = 0; i < n; i++) {
      bucket[(a[i] / exp) % BASE]++;
    }
 
    for (i = 1; i < BASE; i++) {
      bucket[i] += bucket[i - 1];
    }
 
    for (i = n - 1; i >= 0; i--) {
      b[--bucket[(a[i] / exp) % BASE]] = a[i];
    }
 
    for (i = 0; i < n; i++) {
      a[i] = b[i];
    }
 
    exp *= BASE;
 
#ifdef SHOWPASS
    printf("\nPASS   : ");
    print(a, n);
#endif
  }
}
 
int main() {
  int arr[MAX];
  int i, n;
 
  printf("Enter total elements (n <= %d) : ", MAX);
  scanf("%d", &n);
  n = n < MAX ? n : MAX;
 
  printf("Enter %d Elements : ", n);
  for (i = 0; i < n; i++) {
    scanf("%d", &arr[i]);
  }
 
  printf("\nARRAY  : ");
  print(&arr[0], n);
 
  radixsort(&arr[0], n);
 
  printf("\nSORTED : ");
  print(&arr[0], n);
  printf("\n");
 
  return 0;
}
```