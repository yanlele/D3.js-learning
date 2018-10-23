## 动画

### <div id="class04-01">01、过渡</div>
 
#### 创建过渡

创建过渡有两种方式： transition 和 selection.transition

api | 说明
:- | :- 
selection.transition([name]) | 在指定的 selection 上返回指定的 name 的过渡。如果没有指定 name 则会使用 null。新的过渡仅仅与其他相同名字的过渡相排斥。
transition.delay([value]) | 对于每个选中的元素，将当前元素的过渡的延时设置为指定的 value(毫秒)。
transition.duration([value]) | 对于每个选中的元素，设置过渡时长为指定的 value(毫秒)。
transition.ease([value]) | 为所有选中的元素指定过渡的 [easing function(缓动函数)。](https://github.com/xswei/d3-ease)

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
this.svg.append('rect')
    .attr('fill', schemeCategory10[1])
    .attr('height', 100)
    .attr('width', 100)
    .attr('x', 10)
    .attr('y', 10)
    .transition()
    .delay(500)
    .duration(3000)
    .ease(easeBounceIn)
    .attr('width', 300)
```

#### 过度的属性

**属性过度**

api | 说明
:- | :- 
transition.attr(name, value) | 将属性name过度到目标值value。value可是是一个函数。
transition.attrTween(name[, factory]) | 将属性 name 使用插值函数 tween() 进行过度。

**说明**
对于
transition.attr(name, value) 很好理解，看一下下面这个例子，秒懂：
```typescript
this.svg.append('rect')
    .attr('fill', schemeCategory10[1])
    .attr('height', 100)
    .attr('width', 100)
    .transition()
    .attr('width', 300)
```

对于 transition.attrTween(name[, factory]) 的理解：
```typescript
this.svg.append('rect')
    .attr('fill', schemeCategory10[2])
    .attr('width', 100)
    .attr('height', 30)
    .attr('x', 10)
    .attr('y', 10)
    .transition()
    .duration(2000)
    .attrTween('width', function (d: any, i: number, a: any) {
        return function (t: number) {
            return t * 300 + 100
        }
    })
```
其中attrTween() 第一个参数是一个属性名，第二个参数是是一个无名函数， d 是被绑定的数据， i 是数据索引， a 是变化到最后的元素selection。
返回值也是一个函数，t的取值范围是 [0,1], 0 开始变化， 1 变化结束。 


**样式过度**

api | 说明
:- | :- 
transition.style(name, value[, priority]) | 将css 样式的 name 属性过度到目标值。priority 表示优先级。 只有null, important 两个值。                   
transition.styleTween(name[, factory[, priority]])) | 与 attrTween() 类似。

demo4: 基本使用
```typescript
this.svg.append('rect')
    .style('fill', schemeCategory10[0])
    .attr('width', 100)
    .attr('height', 30)
    .attr('x', 10)
    .attr('y', 10)
    .transition()
    .delay(1000)
    .style('fill', schemeCategory10[1])
```

**文字过度**

api | 说明
:- | :- 
transition.text(value) | 过度开始的时候，将文字设置为value 的值。
transition.tween(name[, factory]) | factory必须是一个返回函数的函数。 将属性 name 按照函数factory 进行过渡

demo5：
```typescript
let rect = this.svg
    .append('rect')
    .style('fill', schemeCategory10[0])
    .attr('width', 100)
    .attr('height', 30)
    .attr('x', 10)
    .attr('y', 10);

let text = this.svg
    .append('text')
    .attr('stroke', 'white')
    .attr('y', 15)
    .attr('x', 100)
    .attr('dy', '1em')
    .attr('text-anchor', 'end');

let textTrans = text
    .transition()
    .duration(2000)
    .tween('text', function () {
        return function (t) {
             text.text(Math.floor( t * 300))
                 .attr('x', Math.floor(100 + t * 300));
             rect.attr('width', Math.floor(100 + t * 300))
        }
    })
```


**remove**

api | 说明
:- | :- 
transition.remove() | 过渡结束之后， 删除被选择的元素

例如：
```typescript
rect.transaction()
    .attr('width', 300)
    .remove();
```