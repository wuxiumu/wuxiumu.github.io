---
layout:     post
title:      "JQuery操作复选框，全选，反选，选中的值"
subtitle:   " \"JQuery Action check box, select all, inverted, selected value\""
date:       2018-12-05 09:50:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - jq
---

>  jq实战

参考了一下别人jQuery复选框操作的代码，发现在使用attr()来处理属性赋值的时候会出现第一次功能正常，第二次再点击时无反应的问题。

这里使用prop()来进行操作会正常。

```
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script> 
<ul id="list">   
   <li><label><input type="checkbox" name="step" value="1"> 1.我是记录来的呢</label></li> 
   <li><label><input type="checkbox" name="step" value="2"> 2.哈哈，真的太天真了</label></li> 
   <li><label><input type="checkbox" name="step" value="3"> 3.爱上你是我的错吗？</label></li> 
   <li><label><input type="checkbox" name="step" value="4"> 4.从开始你就不应用爱上我</label></li> 
   <li><label><input type="checkbox" name="step" value="5"> 5.喜欢一个人好难</label></li> 
   <li><label><input type="checkbox" name="step" value="6"> 6.你在那里呢</label></li> 
</ul> 
<input type="checkbox" id="all"> 
<input type="button" value="全选" class="btn" id="selectAll">   
<input type="button" value="全不选" class="btn" id="unSelect">   
<input type="button" value="反选" class="btn" id="reverse">   
<input type="button" value="获得选中的所有值" class="btn" id="getValue">

<script type="text/javascript">
$(function(){
    //全选
    $("#all").click(function(){
        if (this.checked) {
            $("#list :checkbox").prop("checked",true); 
        }else{
            $("#list :checkbox").prop("checked",false);
        }
    });

    $("#selectAll").click(function(){
        $("#list :checkbox,#all").prop("checked",true);
    });

    $("#unSelect").click(function(){
        $("#list :checkbox,#all").prop("checked",false);
    });

    $("#reverse").click(function(){
        $("#list :checkbox").each(function(){
            $(this).prop("checked",!$(this).prop("checked"));
        });
        allCheck();
    });

    //设置全选复选框 
    $("#list :checkbox").click(function(){ 
        allCheck(); 
    }); 

    $("#getValue").click(function(){
        var valArr = new Array;
        $("#list input[name='step']").each(function(i){
            if($(this).prop("checked")){
                valArr[i]=$(this).val();
            }
        });
        var vals = valArr.join(',');
        alert(vals);
    })

    function allCheck(){
        var count = $("#list :checkbox").size();
        var cut = 0;
        $("#list :checkbox").each(function(){
            if ($(this).prop("checked") == true) {
                cut++;
            }
        });
        // alert(cut,count);
        if (cut == count) {
            $("#all").prop("checked",true);
        }else{
            $("#all").prop("checked",false);
        }
    }
})
    
</script>
```

## 根据跟定的值，选中复选框，使用场景 考试题目答案勾选
```
//遍历某个class属性下的checkbox
$('.muti-opt-items input:checkbox').each(function () {
         //需要选中的值
         var answer = "ABCD";
         var arr = answer.split("");
         var check = $(this);//遍历下的每个checkbox
         //遍历数组
         $.each(arr,function (index,value) {
               if(check.attr("value")==value){
                     check.attr("checked",true);
                }
          })
});
```

## jquery格式化时间
```
function timeStamp2String(time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}
```