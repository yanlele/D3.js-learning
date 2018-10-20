## 绘制

### <div id="class03-01">01、颜色</div>

#### RGB

api | 说明
:- | :- 
d3.rgb(r, g, b[, opacity])、 d3.rgb(specifier)、 d3.rgb(color) | 创建颜色
color.brighter([k]) | 指定明亮度
color.darker([k]) | 指定暗度
color.hex() | 返回色彩对应的HSL
color.toString() | 字符串形式返回颜色值


#### 插值

api | 说明
:- | :- 
interpolate(color1, color2) | 自动获取颜色类型，用户获取色彩之间的差值

```typescript
let a = rgb('red');
let b = rgb('green');

let compute = interpolate(a, b);

console.log(compute(0));
console.log(compute(.2));
console.log(compute(.5));
console.log(compute(1));
```


### <div id="class03-02">02、线段生成器 line</div>

api | 说明
:- | :- 
d3.line() | 使用默认的设置构造一个 line 生成器。
line(data) | 根据指定的 data 数组生成一个线条。
line.x([x]) | 如果指定了 x 则将 x 访问器设置为指定的函数或数值并返回当前 line 生成器。如果没有指定 x 则返回当前 x 访问器
line.y([y]) | 如果指定了 y 则将 y 访问器设置为指定的函数或数值并返回当前 line 生成器。如果没有指定 y 则返回当前 y 访问器
line.defined([defined]) | 设置或者获取一个访问器，用于确认线段是否存在。
line.curve([curve]) | 设置和获取选段的插值模式 具体有哪些插值模式，[直接去看官方api](https://github.com/xswei/d3js_doc/blob/master/API_Reference/API.md#curves)

请看demo2:                
```typescript
var lines: [number, number][] = [[80, 80], [200, 100], [200, 200], [100, 200], [80, 80]];

// 创建一个线段生成器
let linePath = line().x(function (d: [number, number]): number {

    return d[0];
}).curve(curveBasis);
this.svg.append('path')
    .attr('d', linePath(lines))
    .attr('stroke', 'black')
    .attr('stroke-width', '3px')
    .attr('fill', 'none')
```

请看demo3:                
```typescript
let lines: [number, number][] = [[80, 80], [120, 120], [160, 160], [200, 200], [240, 240], [280, 280]];
let linePath = line().x(function (d: [number, number]) {
    return d[0];
}).y(function (d: [number, number], index: number) {
    return index % 2 === 0 ? 40 : 120;
})
    .curve(curveBasis)
    .curve(curveCardinal)
    .curve(curveStep)
    .defined(function (d: [number, number]) {
        return d[0] < 200
    });

this.svg.append('path')
    .attr('d', linePath(lines))
    .attr('stroke', 'black')
    .attr('stroke-width', '3px')
    .attr('fill', 'none')
```


### <div id="class03-03">03、区域生成器 area</div>

**基础api 和 线段生成器是一模一样的**。但是多了几个api

分别为: **x0()、x1()、y0()、y1() 分别代表的是X轴方向基底和基顶、y轴方向基底与基顶；**

请看demo4:            
```typescript
let dataSet: [number, number][] = [[80, 80], [120, 120], [130, 130], [70, 70], [60, 60], [90, 90]];
// 创建一个区域生成器
let areaPath = area()
    .x((d: [number, number], i: number) => {
        return 50 + i * 60;
    })
    .y0((d: [number, number], i: number) => {
        return this.height / 2;
    })
    .y1((d: [number, number], i: number) => {
        return this.height / 2 - d[1];
    });

this.svg.append('path')
    .attr('d', areaPath(dataSet))
    .attr('stroke', 'block')
    .attr('stroke-width', '3px')
    .attr('fill', schemeCategory10[0])
```




