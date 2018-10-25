## 交互

- [01、监听器](#01、监听器)


### 01、监听器

api | 说明
:- | :- 
selection.on('click', function(){}) | 设置监听器
selection.on('click.first', function(){}), 
selection.on('click.section', function(){}) | 设置多个监听器
selection.on('click', null) | 移除监听器

说明： 过渡对象是没有监听器的，所以要使用过渡对象的时候，监听器要写在过渡对象之前。

#### 5.1、鼠标
