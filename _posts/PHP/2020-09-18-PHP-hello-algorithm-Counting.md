---
layout:     post
title:      "你好！ 计数排序"
subtitle:   " \"Counting Sort\""
date:       2020-09-18 12:00:03
author:     "WuQingBao"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
tags:
    - 算法
    - php
---

## 计数排序的基本概念

计数排序的核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。

作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。

1. 计数排序的特征

当输入的元素是 n 个 0 到 k 之间的整数时，它的运行时间是 Θ(n + k)。计数排序不是比较排序，排序的速度快于任何比较排序算法。

由于用来计数的数组C的长度取决于待排序数组中数据的范围（等于待排序数组的最大值与最小值的差加上1），这使得计数排序对于数据范围很大的数组，需要大量时间和内存。例如：计数排序是用来排序0到100之间的数字的最好的算法，但是它不适合按字母顺序排序人名。但是，计数排序可以用在基数排序中的算法来排序数据范围很大的数组。

通俗地理解，例如有 10 个年龄不同的人，统计出有 8 个人的年龄比 A 小，那 A 的年龄就排在第 9 位,用这个方法可以得到其他每个人的位置,也就排好了序。当然，年龄有重复时需要特殊处理（保证稳定性），这就是为什么最后要反向填充目标数组，以及将每个数字的统计减去 1 的原因。

## 计数排序的算法步骤

1. 找出待排序的数组中最大和最小的元素
2. 统计数组中每个值为i的元素出现的次数，存入数组C的第i项
3. 对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）
4. 反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1

## 计数排序的分析

为了更好的理解计数排序，我们先来想象一下如果一个数组里所有元素都是整数，而且都在0-k以内。那对于数组里每个元素来说，如果我能知道数组里有多少项小于或等于该元素。我就能准确地给出该元素在排序后的数组的位置。

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/02104300-d3e4d27e10e345039858525ce433f31e.png)

拿上图这个数组来说，元素5之前有8个元素小于等于5（含5本身），因此我排序后5所在的位置肯定是8.所以我只要构造一个（k+1）大小的数组，里面存下所有对应A中每个元素之前的元素个数，理论上就能在线性时间内完成排序。

**算法过程**

根据以上说明，我们能得出计数算法的过程：

1. 初始化一个大小为（k+1）的数组C（所有元素初始值为0），遍历整个待排序数组A，将A中每个元素对应C中的元素大小+1。操作结果见下图：

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/fvr0ablcbvVAwCwIAwAAQBgAAADCAAAAJIQBAABICAMAAJAQBgAAICEMAABAQhgAAICEMAAAAAlhAAAAEsIAAAAkSfoPauDCJAQ2BXkAAAAASUVORK5CYII.png)

我们可以得到原数组中有2个0,0个1,2个2,3个3,0个4,1个5.

2.我们将C中每个i位置的元素大小改成C数组前i项和（基于之前的算法思考，我们不难理解这么做的道理）：

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/Cjishu.png)

3.OK，现在我们已经快看到成功的曙光了。现在要做的就是初始化一个和A同样大小的数组B用于存储排序后数组，然后倒序遍历A中元素（后面会提到为何要倒序遍历），通过查找C数组，将该元素放置到B中相应的位置，同时将C中对应的元素大小-1（表明已经放置了一个这样大小的元素，下次再放同样大小的元素，就要往前挤一个位置）。遍历完A数组后，就完成了所有的排序工作（只画出了前3步）：

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/hgxSoOVjcFgMHoDVjYGg8HoDVjZGAwGozdgZWMwGIzegJWNwWAwegNWNgaDwegNWNkYDAajN2BlYzAYjN6AlY3BYDB6A1Y2BoPB6A1Y2RgMBqM3YGVjMBiM3oCVjcFgMHoDVjYGg8HoDf8f40Sk-2B6u3sAAAAASUVORK5CYII.png)

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/FjNtGx9fb2K00L-z0GjIMhvyubm5ubmZjUNjN9YGZWeDbIvQKMgCIIg1oBGQRAEQawBjYIgCIJYAxoFQRAEsQY0CoIgCGINaBQEQRDEGtAoCIIgiDWgURAEQRBrQKMgCIIg1oBGQRAEQawBjYIgCIJYw3-huN1X9cQSFAAAAABJRU5ErkJggg.png)

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/P1t9jlsLTWGKMo5U260-EKqB0RRuYOfn55lMplAoWH0grevp6enh4eHj48PqA6EaGE3hBpbJZBRFUVXV6gOhKMo4msINrFAoqKpKO2IU1dD-A20u1e6-5X4xAAAAAElFTkSuQmCC.png)

最后排序结果B:

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/977L7XtuirEAAAAASUVORK5CYII.png)

我们现在回过头来思考一下为什么要限定A中是整数而且要限定元素大小？以及这个计数算法的时间复杂度是多少？

首先第一个问题，要知道我们要在C数组中存储所有A中对应元素之前的元素个数，因此如果不是整数或者大小范围无限大的话，我们就没法构造C数组，加之我们要对C数组遍历操作，如果K太大的话，这个算法的线性复杂度也就没有任何意义了。所以限制是整数纯粹只是为了限制C数组的大小，如果你想提出另外一种有限范围的限制，比如都是整数或者0.5结尾的小数（1.5,3.5等）也是可以的，只要将C的数组大小变成2k+2就可以了，只不过这种假设几乎没有任何实际意义而已。



对于第二个问题，我们来看看算法过程：第一步我们遍历了A数组，因此操作时间是Θ(n)，第二步遍历C数组操作时间是Θ(k)，第三步遍历A数组插入B，因此操作时间是也是Θ(n)。加起来时间复杂度就是Θ(n+k)。据此我们也能得到该算法的适用场景仅限于k较小的情况，如果k很大的话，就不如使用比较排序效率高了。

细心的读者应该还记得我在前文提过要解释为何要倒序遍历A数组，我们观察一下A数组中的3，我们可以看到有3个元素都等于3,对应位置:3,6,8。这3个3最后在5，6，7位置

我们是把8位置的3放在了7位置上，6位置的3放在了6位置上，3位置的3放在了5位置上。也就是说所有元素仍保持了之前的相对位置，我们称这个性质为排序的**稳定性**。有可能有人会觉得这个稳定性看起来没什么用，单纯从计数排序结果看，确实没什么用处，但是当在其他地方用到计数排序时，稳定性就非常有用了，比如我们在下一篇博客将要谈到的**基数排序**。

## 计数排序的动图演示

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/countingSort-1.gif)

## 计数排序的代码实现

### JavaScript 代码实现计数排序



```
<script>
function countingSort(arr, maxValue) {
    var bucket = new Array(maxValue+1),
        sortedIndex = 0;
        arrLen = arr.length,
        bucketLen = maxValue + 1;
    for (var i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }
    for (var j = 0; j < bucketLen; j++) {
        while(bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
        }
    }
    return arr;
}
document.write(countingSort([5, 2, 4, 6, 1, 3], 6));
</script>
```



   提示：可以修改代码后运行

### Python 代码实现计数排序

```
def countingSort(arr, maxValue):
    bucketLen = maxValue+1
    bucket = [0]*bucketLen
    sortedIndex =0
    arrLen = len(arr)
    for i in range(arrLen):
        if not bucket[arr[i]]:
            bucket[arr[i]]=0
        bucket[arr[i]]+=1
    for j in range(bucketLen):
        while bucket[j]>0:
            arr[sortedIndex] = j
            sortedIndex+=1
            bucket[j]-=1
    return arr
```

### Go 代码实现计数排序

```
func countingSort(arr []int, maxValue int) []int {
        bucketLen := maxValue + 1
        bucket := make([]int, bucketLen) // 初始为0的数组
 
        sortedIndex := 0
        length := len(arr)
 
        for i := 0; i < length; i++ {
                bucket[arr[i]] += 1
        }
 
        for j := 0; j < bucketLen; j++ {
                for bucket[j] > 0 {
                        arr[sortedIndex] = j
                        sortedIndex += 1
                        bucket[j] -= 1
                }
        }
 
        return arr
}
```

### Java 代码实现计数排序

```
public class CountingSort implements IArraySort {
 
    @Override
    public int[] sort(int[] sourceArray) throws Exception {
        // 对 arr 进行拷贝，不改变参数内容
        int[] arr = Arrays.copyOf(sourceArray, sourceArray.length);
 
        int maxValue = getMaxValue(arr);
 
        return countingSort(arr, maxValue);
    }
 
    private int[] countingSort(int[] arr, int maxValue) {
        int bucketLen = maxValue + 1;
        int[] bucket = new int[bucketLen];
 
        for (int value : arr) {
            bucket[value]++;
        }
 
        int sortedIndex = 0;
        for (int j = 0; j < bucketLen; j++) {
            while (bucket[j] > 0) {
                arr[sortedIndex++] = j;
                bucket[j]--;
            }
        }
        return arr;
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
 
}
```

### PHP 代码实现计数排序

```
function countingSort($arr, $maxValue = null)
{
    if ($maxValue === null) {
        $maxValue = max($arr);
    }
    for ($m = 0; $m < $maxValue + 1; $m++) {
        $bucket[] = null;
    }
 
    $arrLen = count($arr);
    for ($i = 0; $i < $arrLen; $i++) {
        if (!array_key_exists($arr[$i], $bucket)) {
            $bucket[$arr[$i]] = 0;
        }
        $bucket[$arr[$i]]++;
    }
 
    $sortedIndex = 0;
    foreach ($bucket as $key => $len) {
        if ($len !== null) $arr[$sortedIndex++] = $key;
    }
 
    return $arr;
}
```

### C 语言实现计数排序

```
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
 
void print_arr(int *arr, int n) {
        int i;
        printf("%d", arr[0]);
        for (i = 1; i < n; i++)
                printf(" %d", arr[i]);
        printf("\n");
}
 
void counting_sort(int *ini_arr, int *sorted_arr, int n) {
        int *count_arr = (int *) malloc(sizeof(int) * 100);
        int i, j, k;
        for (k = 0; k < 100; k++)
                count_arr[k] = 0;
        for (i = 0; i < n; i++)
                count_arr[ini_arr[i]]++;
        for (k = 1; k < 100; k++)
                count_arr[k] += count_arr[k - 1];
        for (j = n; j > 0; j--)
                sorted_arr[--count_arr[ini_arr[j - 1]]] = ini_arr[j - 1];
        free(count_arr);
}
 
int main(int argc, char **argv) {
        int n = 10;
        int i;
        int *arr = (int *) malloc(sizeof(int) * n);
        int *sorted_arr = (int *) malloc(sizeof(int) * n);
        srand(time(0));
        for (i = 0; i < n; i++)
                arr[i] = rand() % 100;
        printf("ini_array: ");
        print_arr(arr, n);
        counting_sort(arr, sorted_arr, n);
        printf("sorted_array: ");
        print_arr(sorted_arr, n);
        free(arr);
        free(sorted_arr);
        return 0;
}
```