## 交互

- [01、监听器](#class05-01)


### <div id="class05-01">01、监听器</div>

api | 说明
:- | :- 
selection.on('click', function(){}) | 设置监听器
selection.on('click.first', function(){})，          selection.on('click.section', function(){}) | 设置多个监听器
selection.on('click', null) | 移除监听器

说明： 过渡对象是没有监听器的，所以要使用过渡对象的时候，监听器要写在过渡对象之前。

#### 1.1鼠标

api | 说明
:- | :- 
click | 单击事件
mouseover | 鼠标移动到某元素上
mouseout | 鼠标从某元素移出
mousemove | 鼠标被移动时候触发
mousedown | 鼠标按下
mouseup | 鼠标按下之后的松开


请看帅气的demo1:
```typescript
let rect = this.svg.selectAll('rect')
            .data(this.dataSet)
            .enter()
            .append('rect')
            .attr('x', (d: number, i: number) => {
                return this.padding.left + 30 + 50 * i
            })
            .attr('y', (d: number, i: number) => {
                return this.height - this.padding.bottom - d;
            })
            .attr('height', (d: number) => {
                return d
            })
            .attr('width', 40)
            .attr('fill', (d:number) => {
                return schemeCategory10[0]
            });

        let text = this.svg.selectAll('.text')
            .data(this.dataSet)
            .enter()
            .append('text')
            .attr('x', (d: number, i: number) => {
                return this.padding.left + 30 + 50 * i
            })
            .attr('y', (d: number, i: number) => {
                return this.height - this.padding.bottom - d;
            })
            .attr('dy', '1em')
            .attr('dx', 20)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('font-size', '16px')
            .text(function (d: number) {
                return d
            });

        rect.on('mouseover',  function (d: number, i: number) {
            select(this)
                .transition()
                .duration(500)
                .attr('stroke', schemeCategory10[2])
                .attr('stroke-width', '3px')
                .attr('fill', schemeCategory10[1]);
        });

        rect.on('mouseout',  function (d: number, i: number) {
            select(this)
                .transition()
                .duration(500)
                .attr('stroke-width', null)
                .attr('stroke', null)
                .attr('fill', schemeCategory10[0]);
        });

        // 比例尺
        let xScale = scaleLinear().domain([0,8]).range([0, (this.dataSet.length + 1) * 50]);
        let yScale = scaleLinear().domain([0, max(this.dataSet) + 50]).range([max(this.dataSet) + 50, 0]);

        // 坐标轴
        let xAxis = axisBottom(xScale).ticks(this.dataSet.length);
        let yAxis = axisLeft(yScale).ticks(10);

        // 绘制
        this.svg.append('g')
            .attr('transform', `translate(${this.padding.left}, ${this.height - this.padding.bottom})`)
            .call(xAxis);

        this.svg.append('g')
            .attr('transform', `translate(${this.padding.left}, ${this.height - this.padding.bottom - (max(this.dataSet) + 50)})`)
            .call(yAxis);
```

#### 1.2 键盘

api | 说明
:- | :- 
keydown | 键盘按下
keypress | 键盘特殊键按下
keyup | 键盘松开

demo2: 响应键盘ASDF四个键
```typescript
let characters: string[] = ['A', 'S', 'D', 'F'];

// 绘制四个矩形
let rect = this.svg.selectAll('.rect')
    .data(characters)
    .enter()
    .append('rect')
    .attr('width', 60)
    .attr('height', 60)
    .attr('x',  (d: string, i: number) => {
        return this.padding.left + i * 70;
    })
    .attr('y',this.padding.top)
    .attr('fill', schemeCategory10[0]);


let text = this.svg.selectAll('.text')
    .data(characters)
    .enter()
    .append('text')
    .attr('y', this.padding.top)
    .attr('x', (d: string , i: number) => {
        return this.padding.left + i * 70;
    })
    .attr('dy', '1.7em')
    .attr('dx', 30)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('font-size', '22px')
    .text(function (d: string) {
        return d;
    });

// 添加监听
select('body')
    .on('keydown', function () {
        rect.attr('fill', function (d: string) {
            if(d === String.fromCharCode(event.keyCode)) {
                return schemeCategory10[1]
            }else {
                 return schemeCategory10[0]
             }
        })
    })
    .on('keyup', function () {
        rect.attr('fill', schemeCategory10[0])
    })
```

#### 1.3、触屏

api | 说明
:- | :- 
touchstart | 接触到屏幕
touchmove | 在屏幕上移动
touchend | 结束触屏
touches(this) | 从触摸的对象里面获取触摸点的坐标

```typescript
let circle = this.svg.append('circle')
    .attr('r', 50)
    .attr('cx', 150)
    .attr('cy', 200)
    .attr('fill', schemeCategory10[0])
    .on('touchstart', function () {
        select(this).attr('fill', schemeCategory10[1])
    })
    .on('touchmove', function () {
        let pos = touches(this)[0];

        select(this).attr('cx', pos[0])
            .attr('cy', pos[1]);
    })
    .on('touchend', function () {
        select(this).attr('fill', schemeCategory10[0])
    })
```


### <div id="class05-02">02、事件event</div>

#### 2.1、事件种类

event中保存了所有 D3 支持的事件种类，如果不知道事件有什么属性， 可以直接控制台看看。


### <div id="class05-03">03、行为动作</div>

#### 3.1、拖拽 drag

api | 说明
:- | :- 
d3.drag | 创建一个拖拽交互.
drag | 将拖拽交互应用于选择集上.
drag.container([container]) | 如果指定了 container，则将拖拽行为的容器访问器设置为指定的对象或方法。如果没有指定 container ，则返回当前的容器访问器.
drag.filter([filter]) | 忽略一些拖拽启动事件.
drag.touchable([touchable]) | 设置触摸支持检测.
drag.subject([subject]) | 设置被拖拽的主体.
drag.clickDistance | 设置可触发 click 事件的阈值距离
drag.on(typenames, [listener]) | 监听拖拽事件.
event.on | 在当前拖拽手势中监听拖拽事件.
d3.dragDisable | 阻止原生拖拽以及文本选择.
d3.dragEnable | 启用原生拖拽以及文本选择.

#### 说明：

drag.on(typenames, [listener])                  
start - 拖拽开始(mousedown or touchstart).              
drag - 拖拽中 (mousemove or touchmove).                    
end - 拖拽结束 (mouseup, touchend or touchcancel).                      

```typescript
let circles = [
    {
        cx: 150,
        cy: 200,
        r: 30
    },
    {
        cx: 250,
        cy: 200,
        r: 30
    }
]

let dragFun = drag()
    .on('start', function (d: any) {
        console.log('开始')
    })
    .on('end', function (d: any) {
        console.log('end')
    })
    .on('drag', function (d: any) {
        select(this)
            .attr('cx', d.cx = event.x)
            .attr('cy', d.cy = event.y)
    });

let circle = this.svg.selectAll('circle')
    .data(circles)
    .enter()
    .append('circle')
    .attr('cx', function (d: any) {
        return d.cx;
    })
    .attr('cy', function (d: any) {
        return d.cy;
    })
    .attr('r', function (d: any) {
        return d.r
    })
    .attr('fill', schemeCategory10[0])
    .call(dragFun);
```
