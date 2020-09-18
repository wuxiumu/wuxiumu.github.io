---
layout:     post
title:      "你好！ 冒泡排序"
subtitle:   " \"Bubble Sort\""
date:       2020-09-18 12:00:01
author:     "WuQingBao"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - php
	- 算法
---

## 冒泡排序的基本概念

冒泡排序（Bubble Sort）也是一种简单直观的排序算法。

它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。

走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。

这个算法的名字由来是因为越小的元素会经由交换慢慢"浮"到数列的顶端。

作为最简单的排序算法之一，冒泡排序给我的感觉就像 Abandon 在单词书里出现的感觉一样，每次都在第一页第一位，所以最熟悉。冒泡排序还有一种优化算法，就是立一个 flag，当在一趟序列遍历中元素没有发生交换，则证明该序列已经有序。但这种改进对于提升性能来说**并没有什么太大作用**。

## 冒泡排序的算法步骤

比较相邻的元素。如果第一个比第二个大，就交换他们两个。

对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。

针对所有的元素重复以上的步骤，除了最后一个。

持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

给定一个N个元素的数组，冒泡法排序将：

1. 如果元素大小关系不正确，交换这两个数（在本例中为a> b），
2. 比较一对相邻元素（a，b），
3. 重复步骤1和2，直到我们到达数组的末尾（最后一对是第（N-2）和（N-1）项，因为我们的数组从零开始）
4. 到目前为止，最大的元素将在最后的位置。 然后我们将N减少1，并重复步骤1，直到N = 1。

## 冒泡排序的分析

### 冒泡排序的算法时间分析

比较和交换需要一个以常量为界的时间，我们称之为c。
（标准）Bubble Sort中有两个嵌套循环。
外循环正好运行N次迭代。 但内部循环运行变得越来越短：

1. 当 i = 0，（N-1）次迭代（比较和可能交换）时。
2. 当 i = 1，（N-2）次迭代时，...
3. 当 i =（N-2）时，1次迭代,
4. 当 i=（N-1），0迭代.

因此，总迭代次数=（N-1）+（N-2）+ ... + 1 + 0 = N *（N-1）/ 2。
总时间= c * N *（N-1）/ 2 = O（N ^ 2）。
冒泡排序实际上是低效的，它的 O(N^2) 时间复杂度。 想象一下，我们有 N = 106 个数字。 即使我们的计算机速度超快，并且可以在1秒内计算108次操作，但冒泡排序仍需要大约100秒才能完成。
但是，它可以提前终止。
**冒泡排序什么时候最快：**
当输入的数据已经是正序时（都已经是正序了，我还要你冒泡排序有何用啊）。
**冒泡排序什么时候最慢：**
当输入的数据是反序时（写一个 for 循环反序输出数据不就行了，干嘛要用你冒泡排序呢，我是闲的吗）。

### 冒泡排序的实例分析

以数组 arr = [5, 1, 4, 2, 8] 为例说明，加粗的数字表示每次循环要比较的两个数字：

第一次外循环

( **5** **1** 4 2 8 ) → ( **1** **5** 4 2 8 )， 5 > 1 交换位置
( 1 **5** **4** 2 8 ) → ( 1 **4** **5** 2 8 )， 5 > 4 交换位置
( 1 4 **5** **2** 8 ) → ( 1 4 **2** **5** 8 )， 5 > 2 交换位置
( 1 4 2 **5** **8** ) → ( 1 4 2 **5** **8** )， 5 < 8 位置不变

第二次外循环（除开最后一个元素8，对剩余的序列）

( **1** **4** 2 5 8 ) → ( **1** **4** 2 5 8 )， 1 < 4 位置不变
( 1 **4** **2** 5 8 ) → ( 1 **2** **4** 5 8 )， 4 > 2 交换位置
( 1 2 **4** **5** 8 ) → ( 1 2 **4** **5** 8 )， 4 < 5 位置不变

第三次外循环（除开已经排序好的最后两个元素，可以注意到上面的数组其实已经排序完成，但是程序本身并不知道，所以还要进行后续的循环，直到剩余的序列为 1）



( **1** **2** 4 5 8 ) → ( **1** **2** 4 5 8 )
( 1 **2** **4** 5 8 ) → ( 1 **2** **4** 5 8 )

第四次外循环（最后一次）
( **1** **2** 4 5 8 ) → ( **1** **2** 4 5 8 )

## 冒泡排序的动图演示

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/bubbleSort.gif)

## 冒泡排序的代码实现

### JavaScript 代码实现冒泡排序



```
<script>
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {        // 相邻元素两两对比
                var temp = arr[j+1];        // 元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
var arraySample=[1,4,232,23,123,545,232,22,312];
document.write(bubbleSort(arraySample));
</script>
```

### Python 代码实现冒泡排序

```python
def bubbleSort(arr):
    for i in range(1, len(arr)):
        for j in range(0, len(arr)-i):
            if arr[j] > arr[j+1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr
```

### Go 代码实现冒泡排序

```go
func bubbleSort(arr []int) []int {
        length := len(arr)
        for i := 0; i < length; i++ {
                for j := 0; j < length-1-i; j++ {
                        if arr[j] > arr[j+1] {
                                arr[j], arr[j+1] = arr[j+1], arr[j]
                        }
                }
        }
        return arr
}
```

### Java 代码实现冒泡排序

```java
public class BubbleSort implements IArraySort {
 
    @Override
    public int[] sort(int[] sourceArray) throws Exception {
        // 对 arr 进行拷贝，不改变参数内容
        int[] arr = Arrays.copyOf(sourceArray, sourceArray.length);
 
        for (int i = 1; i < arr.length; i++) {
            // 设定一个标记，若为true，则表示此次循环没有进行交换，也就是待排序列已经有序，排序已经完成。
            boolean flag = true;
 
            for (int j = 0; j < arr.length - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    int tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;
 
                    flag = false;
                }
            }
 
            if (flag) {
                break;
            }
        }
        return arr;
    }
}
```

### PHP 代码实现冒泡排序

```php
function bubbleSort($arr)
{
    $len = count($arr);
    for ($i = 0; $i < $len - 1; $i++) {
        for ($j = 0; $j < $len - 1 - $i; $j++) {
            if ($arr[$j] > $arr[$j+1]) {
                $tmp = $arr[$j];
                $arr[$j] = $arr[$j+1];
                $arr[$j+1] = $tmp;
            }
        }
    }
    return $arr;
}
```

### C 语言实现冒泡排序

```
#include <stdio.h>
void bubble_sort(int arr[], int len) {
        int i, j, temp;
        for (i = 0; i < len - 1; i++)
                for (j = 0; j < len - 1 - i; j++)
                        if (arr[j] > arr[j + 1]) {
                                temp = arr[j];
                                arr[j] = arr[j + 1];
                                arr[j + 1] = temp;
                        }
}
int main() {
        int arr[] = { 22, 34, 3, 32, 82, 55, 89, 50, 37, 5, 64, 35, 9, 70 };
        int len = (int) sizeof(arr) / sizeof(*arr);
        bubble_sort(arr, len);
        int i;
        for (i = 0; i < len; i++)
                printf("%d ", arr[i]);
        return 0;
}
```

### C++ 语言实现冒泡排序

```
#include <iostream>
using namespace std;
template<typename T> //整数或浮点数皆可使用,若要使用类(class)或结构体(struct)时必须重载大于(>)运算符
void bubble_sort(T arr[], int len) {
        int i, j;
        for (i = 0; i < len - 1; i++)
                for (j = 0; j < len - 1 - i; j++)
                        if (arr[j] > arr[j + 1])
                                swap(arr[j], arr[j + 1]);
}
int main() {
        int arr[] = { 61, 17, 29, 22, 34, 60, 72, 21, 50, 1, 62 };
        int len = (int) sizeof(arr) / sizeof(*arr);
        bubble_sort(arr, len);
        for (int i = 0; i < len; i++)
                cout << arr[i] << ' ';
        cout << endl;
        float arrf[] = { 17.5, 19.1, 0.6, 1.9, 10.5, 12.4, 3.8, 19.7, 1.5, 25.4, 28.6, 4.4, 23.8, 5.4 };
        len = (float) sizeof(arrf) / sizeof(*arrf);
        bubble_sort(arrf, len);
        for (int i = 0; i < len; i++)
                cout << arrf[i] << ' '<<endl;
        return 0;
}
```

### C#实现冒泡排序

```
static void BubbleSort(int[] intArray) {
    int temp = 0;
    bool swapped;
    for (int i = 0; i < intArray.Length; i++)
    {
        swapped = false;
        for (int j = 0; j < intArray.Length - 1 - i; j++)
            if (intArray[j] > intArray[j + 1])
            {
                temp = intArray[j];
                intArray[j] = intArray[j + 1];
                intArray[j + 1] = temp;
                if (!swapped)
                    swapped = true;
            }
        if (!swapped)
            return;
    }
}
```

### Ruby实现冒泡排序

```
class Array
  def bubble_sort!
    for i in 0...(size - 1)
      for j in 0...(size - i - 1)
        self[j], self[j + 1] = self[j + 1], self[j] if self[j] > self[j + 1]
      end
    end
    self
  end
end
 
puts [22, 34, 3, 32, 82, 55, 89, 50, 37, 5, 64, 35, 9, 70].bubble_sort!
```

### Swift实现冒泡排序

```
import Foundation
 
func bubbleSort (arr: inout [Int]) {
    for i in 0..<arr.count - 1 {
        for j in 0..<arr.count - 1 - i {
            if arr[j] > arr[j+1] {
                arr.swapAt(j, j+1)
            }
        }
    }
}
 
// 测试调用
 
func testSort () {
    // 生成随机数数组进行排序操作
    var list:[Int] = []
    for _ in 0...99 {
        list.append(Int(arc4random_uniform(100)))
    }
    print("\(list)")
    bubbleSort(arr:&list)
    print("\(list)")
}
```

 

