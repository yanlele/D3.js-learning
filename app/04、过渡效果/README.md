## 动画

### <div id="class04-01">01、过渡</div>
 
#### 创建过渡

创建过渡有两种方式： transition 和 selection.transition

api | 说明
:- | :- 
selection.transition([name]) | 在指定的 selection 上返回指定的 name 的过渡。如果没有指定 name 则会使用 null。新的过渡仅仅与其他相同名字的过渡相排斥。
transition.delay([value]) | 对于每个选中的元素，将当前元素的过渡的延时设置为指定的 value(毫秒)。
transition.duration([value]) | 对于每个选中的元素，设置过渡时长为指定的 value(毫秒)。
transition.ease([value]) | 为所有选中的元素指定过渡的 easing function(缓动函数)。

demo1:          
```typescript
this.svg.append('rect')
    .attr('fill', schemeCategory10[0])
    .attr('x', 10)
    .attr('y', 10)
    .attr('width', 100)
    .attr('height', 100)
    .transition()
    .duration(3000)
    .attr('width', 300)
```

**说明：**                 
如果调用了 transition() , 返回的不再是一个选择集对象， 返回的是一个 **过渡对象**。                    
得到过渡对象之后，就可以调用 delay([value])、duration([value]) 、ease([value])等方法。

demo2:
```typescript

```
