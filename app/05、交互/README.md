## 交互

- [01、监听器](#01、监听器)
    - [1、鼠标](#1.1、鼠标)
    - [2、键盘](#1.2、键盘)


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

#### 1.2、键盘

