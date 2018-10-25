## 动画

### <div id="class04-01">01、过渡</div>
 
#### 1.1、创建过渡

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

#### 1.2、过度的属性

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


#### 1.3、子元素


api | 说明
:- | :- 
transition.select | 在选中的元素上指定一个过渡.
transition.selectAll | 在指定的元素上指定一个过渡.
transition.filter | 基于数据对元素进行过滤.

demo6:          
```typescript
let dataSet: number[] = [100, 100, 100];

let g = this.svg.append('g');

let rect = g.selectAll('rect')
    .data(dataSet)
    .enter()
    .append('rect')
    .attr('fill', schemeCategory10[0])
    .attr('id', function (d: number, i: number) {               // 给定给一个id　属性
        return 'rect' + i;
    })
    .attr('x', 10)
    .attr('y', function (d: number, i: number) {
        return 10 + i * 35;
    })
    .attr('width', function (d: number, i: number) {
        return d
    })
    .attr('height', 30);

// 第二个元素添加过度效果
g.transition()
    .select('#rect1')
    .attr('width', 300);

//　全部过度
g.transition()
    .selectAll('rect')
    .attr('width', 300);

// 过滤器
g.transition()
    .selectAll('rect')
    .filter(function (d: number, i: number) {
        return i>=1;
    })
    .attr('width', 300)
```

#### 1.4、事件监听和调用

api | 说明
:- | :- 
transition.each(function) | 为过渡中的每个选中的元素调用指定的 function，并传递当前元素 d 以及索引 i，函数内部 this 指向当前 DOM 元素。这个方法可以被用来为每个选中的元素调用任意代码，并且创建了一个能访问当前元素父节点和子节点数据的上下文。等价于 selection.each。
transition.call(function[, arguments…]) | 为当前过渡指定一次指定的函数.

dmoe7:              
```typescript
let dataSet: number[] = [100, 100, 100];

let g = this.svg.append('g');

let rect = g.selectAll('rect')
    .data(dataSet)
    .enter()
    .append('rect')
    .attr('fill', schemeCategory10[0])
    .attr('id', function (d: number, i: number) {               // 给定给一个id　属性
        return 'rect' + i;
    })
    .attr('x', 10)
    .attr('y', function (d: number, i: number) {
        return 10 + i * 35;
    })
    .attr('width', function (d: number, i: number) {
        return d
    })
    .attr('height', 30);

g.transition()
    .duration(2000)
    .selectAll('rect')
    .each(function (d: number, i: number) {
        console.log('start')
    })
    .attr('width', 300);
```


demo8: 
```typescript
let xScale = scaleLinear().domain([0, 10]).range([0, 300]);

let xAxis = axisBottom(xScale);

let g = this.svg.append('g');

g.attr('class', 'axis')
    .attr('transform', 'translate(50, 200)')
    .call(xAxis);

xScale.domain([0, 50]);

g.transition()
    .duration(2000)
    .call(xAxis)
```


### <div id="class04-02">02、散点图的过渡效果</div>

直接上代码： CircleDemo.ts
```typescript
import {range} from "d3-array";
import Method from "../02、比例尺与坐标轴/Method";
import {scaleLinear} from "d3-scale";
import {select} from "d3-selection";
import {axisBottom, axisLeft} from "d3-axis";
import {schemeCategory10} from "d3-scale-chromatic";

/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-25 19:41
 */

class CircleDemo {
    // 圆心数据
    private center: number[][] = range(10).map(function (item, index) {
        return [Method.randomFrom(1, 9) / 10, Method.randomFrom(1, 9) / 10];
    });

    // 外边框
    private padding: any = {top: 30, right: 30, bottom: 30, left: 30};

    // x轴
    private xAxisWidth: number = 500;

    // y轴
    private yAxisWidth: number = 500;

    //　x轴比例尺
    private xScale = scaleLinear().domain([0, 1]).range([0, this.xAxisWidth]);
    // y轴比例尺
    private yScale = scaleLinear().domain([0, 1]).range([0, this.yAxisWidth]);

    private width: number = 600;
    private height: number = 600;
    private svg;

    constructor() {
        this.svg = select('body').append('svg')
            .attr('height', this.height)
            .attr('width', this.width);


        select('body').append('br')
        let button = select('body')
            .selectAll('.button')
            .data(range(3))
            .enter()
            .append('button')
            .text((d: number, index: number) => {
                if (index === 0) {
                    return '更新'
                } else if (index === 1) {
                    return '添加'
                } else if (index === 2) {
                    return '减少'
                }
            })
            .attr('id', (d: number, i: number) => {
                return `button${i}`
            })
            .on('click', (d: number, index: number) => {
                if (index === 0) {
                    this.update()
                } else if (index === 1) {
                    this.add()
                } else if (index === 2) {
                    this.sub();
                }
            });

        this.drawAxis();
        this.drawCircle();
    }


    drawCircle() {
        // 绑定数据
        let circleUpdate = this.svg.selectAll('circle')
            .data(this.center);

        let circleEnter = circleUpdate.enter();

        let circleExit = circleUpdate.exit();

        circleUpdate.transition()
            .duration(1000)
            .attr('cx', (d: number) => {
                return this.padding.left + this.xScale(d[0])
            })
            .attr('cy', (d: number) => {
                return this.height - this.padding.bottom - this.yScale(d[1])
            });

        circleEnter.append('circle')
            .attr('fill', (d: number) => {
                return schemeCategory10[Math.floor(Math.random() * 10)]
            })
            .attr('cx', this.padding.left)
            .attr('cy', this.height - this.padding.bottom)
            .attr('r', 7)
            .transition()
            .duration(1000)
            .attr('cx', (d: number) => {
                return this.padding.left + this.xScale(d[0])
            })
            .attr('cy', (d: number) => {
                return this.height - this.padding.bottom - this.yScale(d[1])
            });

        circleExit.transition()
            .duration(1000)
            .attr('fill', 'white')
            .remove();
    }

    // 坐标轴
    drawAxis() {
        // x轴生成器
        let xAxis = axisBottom(this.xScale).ticks(10);

        // y轴生成器
        this.yScale.range([this.yAxisWidth, 0]);
        let yAxis = axisLeft(this.yScale).ticks(10);

        // 绘制x轴
        this.svg.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(${this.padding.left}, ${this.height - this.padding.bottom})`)
            .call(xAxis);

        // 绘制y轴
        this.svg.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(${this.padding.left}, ${this.height - this.padding.bottom - this.yAxisWidth})`)
            .call(yAxis);

        // 绘制完毕之后坐标轴将值域回滚回去
        this.yScale.range([0, this.yAxisWidth]);
    }

    /*更新数据事件*/
    update() {
        for (let i: number = 0; i < this.center.length; i++) {
            this.center[i][0] = Method.randomFrom(1, 9) / 10;       // 更新X坐标
            this.center[i][1] = Method.randomFrom(1, 9) / 10;
        }
        this.drawCircle();
    }


    add() {
        this.center.push([Method.randomFrom(1, 9) / 10, Method.randomFrom(1, 9) / 10]);
        this.drawCircle();
    }

    sub() {
        this.center.pop();
        this.drawCircle();
    }
}

export default CircleDemo;
```


