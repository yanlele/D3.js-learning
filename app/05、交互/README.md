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

#### 1.1、鼠标

api | 说明
:- | :- 
click | 单击事件
mouseover | 鼠标移动到某元素上
mouseout | 鼠标从某元素移出
mousemove | 鼠标被移动时候触发
mousedown | 鼠标按下
mouseup | 鼠标按下之后的松开


