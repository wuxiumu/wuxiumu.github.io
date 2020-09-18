---
layout:     post
title:      "你好！ 快速排序 "
subtitle:   " \"Quick Sort\""
date:       2020-09-18 12:00:07
author:     "WuQingBao"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - php
	- 算法
---

## 快速排序的基本概念

快速排序是由东尼·霍尔所发展的一种排序算法。在平均状况下，排序 n 个项目要 Ο(nlogn) 次比较。在最坏状况下则需要 Ο(n2) 次比较，但这种状况并不常见。事实上，快速排序通常明显比其他 Ο(nlogn) 算法更快，因为它的内部循环（inner loop）可以在大部分的架构上很有效率地被实现出来。

快速排序使用分治法（Divide and conquer）策略来把一个串行（list）分为两个子串行（sub-lists）。

快速排序又是一种分而治之思想在排序算法上的典型应用。本质上来看，快速排序应该算是在冒泡排序基础上的递归分治法。

> 快速排序的最坏运行情况是 O(n²)，比如说顺序数列的快排。但它的平摊期望时间是 O(nlogn)，且 O(nlogn) 记号中隐含的常数因子很小，比复杂度稳定等于 O(nlogn) 的归并排序要小很多。所以，对绝大多数顺序性较弱的随机数列而言，快速排序总是优于归并排序。

## 快速排序的算法步骤

快速排序流程：
(1) 从数列中挑出一个基准值。
(2) 将所有比基准值小的摆放在基准前面，所有比基准值大的摆在基准的后面(相同的数可以到任一边)；在这个分区退出之后，该基准就处于数列的中间位置。
(3) 递归地把"基准值前面的子数列"和"基准值后面的子数列"进行排序。

## 快速排序的分析

下面以数列a={30,40,60,10,20,50}为例，演示它的快速排序过程(如下图)。

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/121659127078460.jpg)

上图只是给出了第1趟快速排序的流程。在第1趟中，设置x=a[i]，即x=30。
(01) 从"右 --> 左"查找小于x的数：找到满足条件的数a[j]=20，此时j=4；然后将a[j]赋值a[i]，此时i=0；接着从左往右遍历。
(02) 从"左 --> 右"查找大于x的数：找到满足条件的数a[i]=40，此时i=1；然后将a[i]赋值a[j]，此时j=4；接着从右往左遍历。
(03) 从"右 --> 左"查找小于x的数：找到满足条件的数a[j]=10，此时j=3；然后将a[j]赋值a[i]，此时i=1；接着从左往右遍历。
(04) 从"左 --> 右"查找大于x的数：找到满足条件的数a[i]=60，此时i=2；然后将a[i]赋值a[j]，此时j=3；接着从右往左遍历。
(05) 从"右 --> 左"查找小于x的数：没有找到满足条件的数。当i>=j时，停止查找；然后将x赋值给a[i]。此趟遍历结束！

按照同样的方法，对子数列进行递归遍历。最后得到有序数组！

**快速排序稳定性**
快速排序是不稳定的算法，它不满足稳定算法的定义。
*算法稳定性 -- 假设在数列中存在a[i]=a[j]，若在排序之前，a[i]在a[j]前面；并且排序之后，a[i]仍然在a[j]前面。则这个排序算法是稳定的！*

**快速排序时间复杂度**
快速排序的时间复杂度在最坏情况下是O(N2)，平均的时间复杂度是O(N*lgN)。
这句话很好理解：假设被排序的数列中有N个数。遍历一次的时间复杂度是O(N)，需要遍历多少次呢？至少lg(N+1)次，最多N次。
(01) 为什么最少是lg(N+1)次？快速排序是采用的分治法进行遍历的，我们将它看作一棵二叉树，它需要遍历的次数就是二叉树的深度，而根据完全二叉树的定义，它的深度至少是lg(N+1)。因此，快速排序的遍历次数最少是lg(N+1)次。
(02) 为什么最多是N次？这个应该非常简单，还是将快速排序看作一棵二叉树，它的深度最大是N。因此，快读排序的遍历次数最多是N次。

## 快速排序的动图演示

![img](https://cdn.breakyizhan.com/wp-content/uploads/2019/04/quickSort.gif)

## 快速排序的代码实现

### JavaScript 代码实现归并排序



```
<script>
function quickSort(arr){
    //如果数组<=1,则直接返回
    if(arr.length<=1){return arr;}
    var pivotIndex=Math.floor(arr.length/2);
    //找基准，并把基准从原数组删除
    var pivot=arr.splice(pivotIndex,1)[0];
    //定义左右数组
    var left=[];
    var right=[];
    //比基准小的放在left，比基准大的放在right
    for(var i=0;i<arr.length;i++){
        if(arr[i]<=pivot){
            left.push(arr[i]);
        }
        else{
            right.push(arr[i]);
        }
    }
    //递归
    return quickSort(left).concat([pivot],quickSort(right));
}
var arraySample=[1,4,272,23,123,545,232,22,312];
document.write(quickSort(arraySample));
</script>
```



   提示：可以修改代码后运行

### Python 代码实现归并排序

```
def quick_sort(data):    
    """快速排序"""   
    if len(data) >= 2:  # 递归入口及出口        
        mid = data[len(data)//2]  # 选取基准值，也可以选取第一个或最后一个元素        
        left, right = [], []  # 定义基准值左右两侧的列表        
        data.remove(mid)  # 从原始数组中移除基准值        
        for num in data:            
            if num >= mid:                
                right.append(num)            
            else:                
                left.append(num)        
        return quick_sort(left) + [mid] + quick_sort(right)    
    else:        
        return data
  
# 示例：
array = [2,3,5,7,1,4,6,15,5,2,7,9,10,15,9,17,12]
print(quickSort(array))
# 输出为[1, 2, 2, 3, 4, 5, 5, 6, 7, 7, 9, 9, 10, 12, 15, 15, 17]
```

### Go 代码实现归并排序

```
// 第一种写法
func quickSort(values []int, left, right int) {
    temp := values[left]
    p := left
    i, j := left, right
  
    for i <= j {
        for j >= p && values[j] >= temp {
            j--
        }
        if j >= p {
            values[p] = values[j]
            p = j
        }
  
        for values[i] <= temp && i <= p {
            i++
        }
        if i <= p {
            values[p] = values[i]
            p = i
        }
    }
    values[p] = temp
    if p-left > 1 {
        quickSort(values, left, p-1)
    }
    if right-p > 1 {
        quickSort(values, p+1, right)
    }
}
  
func QuickSort(values []int) {
    if len(values) <= 1 {
        return
    }
    quickSort(values, 0, len(values)-1)
}
  
// 第二种写法
func Quick2Sort(values []int) {
    if len(values) <= 1 {
        return
    }
    mid, i := values[0], 1
    head, tail := 0, len(values)-1
    for head < tail {
        fmt.Println(values)
        if values[i] > mid {
            values[i], values[tail] = values[tail], values[i]
            tail--
        } else {
            values[i], values[head] = values[head], values[i]
            head++
            i++
        }
    }
    values[head] = mid
    Quick2Sort(values[:head])
    Quick2Sort(values[head+1:])
}
  
// 第三种写法
func Quick3Sort(a []int,left int, right int)  {
  
    if left >= right {
        return
    }
  
    explodeIndex := left
  
    for i := left + 1; i <= right ; i++ {
  
        if a[left] >= a[i]{
  
            //分割位定位++
            explodeIndex ++;
            a[i],a[explodeIndex] = a[explodeIndex],a[i]
  
  
        }
  
    }
  
    //起始位和分割位
    a[left], a[explodeIndex] = a[explodeIndex],a[left]
  
    Quick3Sort(a,left,explodeIndex - 1)
    Quick3Sort(a,explodeIndex + 1,right)
  
}
```

### Java 代码实现归并排序

```
class　Quick {
    　public　void　sort(int　arr[],int　low,int　high) {
        　int　l=low;
        　int　h=high;
        　int　povit=arr[low];
          
        　while(l<h) {
            　while(l<h&&arr[h]>=povit)
            　    h--;
            　if(l<h){
                　arr[l]=arr[h];
                　l++;
            　}
              
            　while(l<h&&arr[l]<=povit)
            　    l++;
              
            　if(l<h){
                　arr[h]=arr[l];
                　h--;
            　}
        　}
            num[l]=povit;
        　print(arr);
        　System.out.print("l="+(l+1)+"h="+(h+1)+"povit="+povit+"\n");
        　if(l-1>low)sort(arr,low,l-1);
        　if(h+1<high)sort(arr,h+1,high);
    　}
}
  
  
/*//////////////////////////方式二////////////////////////////////*/
更高效点的代码：
public<TextendsComparable<?superT>>
T[]quickSort(T[]targetArr,intstart,intend)
{
inti=start+1,j=end;
Tkey=targetArr[start];
SortUtil<T>sUtil=newSortUtil<T>();
  
if(start=end)return(targetArr);
  
  
/*从i++和j--两个方向搜索不满足条件的值并交换
*
*条件为：i++方向小于key，j--方向大于key
*/
while(true)
{
while(targetArr[j].compareTo(key)>0)j--;
while(targetArr[i].compareTo(key)<0&&i<j)i++;
if(i>=j)break;
sUtil.swap(targetArr,i,j);
if(targetArr[i]==key)
{
j--;
}else{
i++;
}
}
  
/*关键数据放到‘中间’*/
sUtil.swap(targetArr,start,j);
  
if(start<i-1)
{
this.quickSort(targetArr,start,i-1);
}
if(j+1<end)
{
this.quickSort(targetArr,j+1,end);
}
  
returntargetArr;
}
  
  
/*//////////////方式三：减少交换次数，提高效率/////////////////////*/
private<TextendsComparable<?superT>>
voidquickSort(T[]targetArr,intstart,intend)
{
inti=start,j=end;
Tkey=targetArr[start];
  
while(i<j)
{
/*按j--方向遍历目标数组，直到比key小的值为止*/
while(j>i&&targetArr[j].compareTo(key)>=0)
{
j--;
}
if(i<j)
{
/*targetArr[i]已经保存在key中，可将后面的数填入*/
targetArr[i]=targetArr[j];
i++;
}
/*按i++方向遍历目标数组，直到比key大的值为止*/
while(i<j&&targetArr[i].compareTo(key)<=0)
/*此处一定要小于等于零，假设数组之内有一亿个1，0交替出现的话，而key的值又恰巧是1的话，那么这个小于等于的作用就会使下面的if语句少执行一亿次。*/
{
i++;
}
if(i<j)
{
/*targetArr[j]已保存在targetArr[i]中，可将前面的值填入*/
targetArr[j]=targetArr[i];
j--;
}
}
/*此时i==j*/
targetArr[i]=key;
  
/*递归调用，把key前面的完成排序*/
this.quickSort(targetArr,start,i-1);
  
  
/*递归调用，把key后面的完成排序*/
this.quickSort(targetArr,j+1,end);
  
}
```

### PHP 代码实现归并排序

```
function qs($a, $s=0, $e=null) {
    if($e === null) {
        $e = count($a);
    }
    if($s >= $e) {
        return $a;
    }
      
    $j = $e-1; 
    $i = $s;
    $n = $a[$s];
    //$ac = $a;
    for(; $j>$i; $j--) {
        if($a[$j] < $n) {
            $t = $a[$i];
            $a[$i] = $a[$j];
            $a[$j] = $t;
            for($i++;$i<$j;$i++) {
                if($a[$i] > $n) {
                    $t = $a[$j];
                    $a[$j] = $a[$i];
                    $a[$i] = $t;
                    break;
                }
            }
        }
    }
    //printf("\n[%s], %s ~ %s [%s] %s-%s-%s", implode($ac, ','), $s, $e, implode($a, ','), $i, $j, $e);
    qs(&$a, $s, $i);
    qs(&$a, $i+1, $e);
    return $a;
}
$n = mt_rand(10000000, 99999999);
$n = '7,3,2,8,7,2,0,2';//trim(preg_replace('/(\d)/', '$1,', $n), ',');
$n = explode(',', $n);
echo "\n".implode($n, ',');
echo "\n".implode(qs($n), ',');
```

### C 语言实现归并排序

```
void sort(int *a, int left, int right)
{
    if(left >= right)/*如果左边索引大于或者等于右边的索引就代表已经整理完成一个组了*/
    {
        return ;
    }
    int i = left;
    int j = right;
    int key = a[left];
      
    while(i < j)                               /*控制在当组内寻找一遍*/
    {
        while(i < j && key <= a[j])
        /*而寻找结束的条件就是，1，找到一个小于或者大于key的数（大于或小于取决于你想升
        序还是降序）2，没有符合条件1的，并且i与j的大小没有反转*/
        {
            j--;/*向前寻找*/
        }
          
        a[i] = a[j];
        /*找到一个这样的数后就把它赋给前面的被拿走的i的值（如果第一次循环且key是
        a[left]，那么就是给key）*/
          
        while(i < j && key >= a[i])
        /*这是i在当组内向前寻找，同上，不过注意与key的大小关系停止循环和上面相反，
        因为排序思想是把数往两边扔，所以左右两边的数大小与key的关系相反*/
        {
            i++;
        }
          
        a[j] = a[i];
    }
      
    a[i] = key;/*当在当组内找完一遍以后就把中间数key回归*/
    sort(a, left, i - 1);/*最后用同样的方式对分出来的左边的小组进行同上的做法*/
    sort(a, i + 1, right);/*用同样的方式对分出来的右边的小组进行同上的做法*/
                       /*当然最后可能会出现很多分左右，直到每一组的i = j 为止*/
}
```

### C++ 语言实现归并排序

```
#include <iostream>
  
using namespace std;
  
void Qsort(int arr[], int low, int high){
    if (high <= low) return;
    int i = low;
    int j = high + 1;
    int key = arr[low];
    while (true)
    {
        /*从左向右找比key大的值*/
        while (arr[++i] < key)
        {
            if (i == high){
                break;
            }
        }
        /*从右向左找比key小的值*/
        while (arr[--j] > key)
        {
            if (j == low){
                break;
            }
        }
        if (i >= j) break;
        /*交换i,j对应的值*/
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    /*中枢值与j对应值交换*/
    int temp = arr[low];
    arr[low] = arr[j];
    arr[j] = temp;
    Qsort(arr, low, j - 1);
    Qsort(arr, j + 1, high);
}
  
int main()
{
    int a[] = {57, 68, 59, 52, 72, 28, 96, 33, 24};
  
    Qsort(a, 0, sizeof(a) / sizeof(a[0]) - 1);/*这里原文第三个参数要减1否则内存越界*/
  
    for(int i = 0; i < sizeof(a) / sizeof(a[0]); i++)
    {
        cout << a[i] << "";
    }
      
    return 0;
}/*参考数据结构p274(清华大学出版社，严蔚敏)*/
```

### C#实现归并排序

```
using System; 
    using System.Collections.Generic; 
    using System.Linq; 
    using System.Text;
    namespace test
{
    class QuickSort
    {
        static void Main(string[] args)
        {
            int[] array = { 49, 38, 65, 97, 76, 13, 27 };
            sort(array, 0, array.Length - 1);
            Console.ReadLine();
        }
        /**一次排序单元，完成此方法，key左边都比key小，key右边都比key大。
           
  
**@param array排序数组 
           
  
**@param low排序起始位置 
           
  
**@param high排序结束位置
           
  
**@return单元排序后的数组 */
        private static int sortUnit(int[] array, int low, int high)
        {
            int key = array[low];
            while (low < high)
            {
                /*从后向前搜索比key小的值*/
                while (array[high] >= key && high > low)
                    --high; 
                /*比key小的放左边*/
                array[low] = array[high];   
                /*从前向后搜索比key大的值，比key大的放右边*/
                while (array[low] <= key && high > low)
                    ++low; 
                /*比key大的放右边*/
                array[high] = array[low];
            }
            /*左边都比key小，右边都比key大。//将key放在游标当前位置。//此时low等于high */
            array[low] = key;
            foreach (int i in array)
            {
                Console.Write("{0}\t", i);
            }
            Console.WriteLine();
            return high;
        }    
        /**快速排序 
*@paramarry 
*@return */
        public static void sort(int[] array, int low, int high)
        {
            if (low >= high)
                return; 
            /*完成一次单元排序*/
            int index = sortUnit(array, low, high); 
            /*对左边单元进行排序*/
            sort(array, low, index - 1);
            /*对右边单元进行排序*/
            sort(array, index + 1, high);
        }
    }
} 
```