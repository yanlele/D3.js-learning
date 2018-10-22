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


### <div class="class03-04">04、弧形成器: arc</div>

api | 说明
:- | :- 
d3.arc() | 使用默认的设置创建一个新的 arc 生成器。
arc(arguments…) | 根据指定的 arguments 生成 arc。arguments 是任意的; 它们只是简单地传递到 arc 生成器的访问器函数的对象。
arc.centroid(arguments…) | 计算由给定 arguments 生成的 generated的中间点 [x, y]. arguments 是任意的，它们会被传递给 arc 生成器的访问器。为了与生成的弧保持一致，访问器必须是确定的。例如，相同的参数返回相同的值。中间点被定义为 (startAngle + endAngle) / 2 和 (innerRadius + outerRadius) / 2。
arc.innerRadius([radius]) | 如果指定了 radius 则将**内半径设置**为指定的函数或数值并返回当前 arc 生成器。如果没有指定 radius 则返回当前的内半径访问器
arc.outerRadius([radius]) | 如果指定了 radius 则将**外半径设置**为指定的函数或数值并返回当前 arc 生成器。如果没有指定 radius 则返回当前的外半径访问器
arc.cornerRadius([radius]) | 如果指定了 radius 则将**拐角半径设置**为指定的函数或数值并返回当前 arc 生成器。
arc.startAngle([angle]) | 如果指定了 angle 则将**起始角度设置**为指定的函数或数值并返回当前 arc 生成器。如果没有指定 angle 则返回当前的起始角度访问器
arc.endAngle([angle]) | 如果指定了 angle 则将**终止角度设置**为指定的函数或数值并返回当前 arc 生成器。如果没有指定 angle 则返回当前的终止角度访问器
arc.padAngle([angle]) | 如果指定了 angle 则将**间隙角度设置**为指定的函数或数值，并返回当前 arc 生成器。如果 angle 没有指定则返回当前间隙角度访问器
arc.padRadius([radius]) | 如果指定了 radius 则将间隔半径设置为指定的函数或数值并返回 arc 生成器。如果没有指定 radius 则返回当前的间隔半径访问器，默认为 null

arc(arguments…) 使用示范
```typescript
var arc = d3.arc();
arc({
  innerRadius: 0,
  outerRadius: 100,
  startAngle: 0,
  endAngle: Math.PI / 2
}); // "M0,-100A100,100,0,0,1,100,0L0,0Z"
```

基本使用方式1， 请见demo5:
```typescript
let dataSet: DefaultArcObject = {
    startAngle: 0,
    endAngle: Math.PI * .75,
    innerRadius: 50,
    outerRadius: 100
};
// 创建弧形生成器
let arcPath = arc();
// 添加路径
this.svg.append('path')
    .attr('d', arcPath(dataSet))
    .attr('transform', `translate(250, 250)`)
    .attr('stroke', schemeCategory10[0])
    .attr('stroke-width', '3px')
    .attr('fill', schemeCategory10[1])
```

基本使用方式2， 请见demo6:
```typescript
// 创建弧形生成器
let arcPath = arc().innerRadius(50).outerRadius(100).startAngle(0).endAngle(Math.PI *.75);
// 添加路径
this.svg.append('path')
    .attr('d', arcPath)
    .attr('transform', `translate(250, 250)`)
    .attr('stroke', schemeCategory10[2])
    .attr('stroke-width', '3px')
    .attr('fill', schemeCategory10[3])
```

添加一个复杂的使用示例， 绘制饼状图， 请见demo7:
```typescript
let dataSet: DefaultArcObject[] = [
    {
        startAngle: 0,
        endAngle: Math.PI * .6,
        innerRadius: 0,
        outerRadius: 100
    },
    {
        startAngle: Math.PI * .6,
        endAngle: Math.PI,
        innerRadius: 0,
        outerRadius: 100
    },
    {
        startAngle: Math.PI,
        endAngle: Math.PI * 1.7,
        innerRadius: 0,
        outerRadius: 100
    },
    {
        startAngle: Math.PI * 1.7,
        endAngle: Math.PI * 2,
        innerRadius: 0,
        outerRadius: 100
    },
];

let arcPath = arc();
this.svg.selectAll('path')
    .data(dataSet)
    .enter()
    .append('path')
    .attr('d', function (d: DefaultArcObject) {
        return arcPath(d);
    })
    .attr('transform', 'translate(250, 250)')
    .attr('stroke', 'black')
    .attr('stroke-width', '2px')
    .attr('fill', function (d:DefaultArcObject, i: number) {
        return schemeCategory10[i]
    });

// 添加文字
this.svg.selectAll('text')
    .data(dataSet)
    .enter()
    .append('text')
    .attr('transform', function (d: DefaultArcObject) {
        return `translate(250, 250) translate(${arcPath.centroid(d)})`
    })
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('font-size', '18px')
    .text(function(d: DefaultArcObject) {
        return Math.floor((d.endAngle - d.startAngle) * 180 / Math.PI) + '°'
    })
```

### <div id="class03-05">05、符号生成器: symbol</div>

api | 说明
:- | :- 
symbol(datum [, index]) | 返回自定数据的路径字符串
symbol.type([type]) | 设定过着获取符号类型
symbol.size([size]) | 设定或者获取符号的大小，单位是像素的平方。 比如设定为100， 则是一个宽10， 高 10 的符号。
symbolTypes | 支持的符号类型


**略过，以后如果需要用到的时候再来看看**


### <div id="class03-06">06、弦生成器</div>
#### chord

api | 说明
:- | :- 
d3.chord() | 使用默认的设置创建一个新的弦图布局
chord(matrix) | 对 matrix 进行计算，计算出矩阵数据对应的弦图布局数据以备画图。matrix 必须为方阵。matrix[i][j] 表示第 i 个节点到第 j 个节点的流量。matrix[i][j]不能为负数。
chord.padAngle([angle]) | 设置或获取相邻分组之间的间隔，默认为 0
chord.sortGroups([compare]) | 设置或获取分组的排序规则。
chord.sortSubgroups([compare]) | 设置或获取子分组的排序规则
chord.sortChords([compare]) | 设置或获取弦的排序规则

请见示例类：[ChordDemo](./ChordDemo.ts)

#### ribbon

api | 说明
:- | :- 
d3.ribbon() | 使用默认的设置创建一个新的ribbon生成器
ribbon(arguments…) | 根据指定的数据生成一个ribbon路径
ribbon.source([source]) | 设置或获取source访问器
ribbon.target([target]) | 设置或获取targete访问器
ribbon.radius([radius]) | 设置或获取半径访问器
ribbon.startAngle([angle]) | 设置或获取起始角度访问器， 12点钟方向为0度，以弧度为单位
ribbon.endAngle([angle]) | 设置或获取终止角度访问器

ribbon 请见demo9, 使用方式1：
```typescript
let dataSet: Ribbon = {
    source: {
        startAngle: 0.2,
        endAngle: Math.PI *0.3,
        radius: 100
    },
    target: {
        startAngle: Math.PI,
        endAngle: Math.PI * 1.6,
        radius: 100
    }
};
// 创建一个简单的弦生成器
let ribbonIndex = ribbon();

// 创建路径
this.svg.append('path')
    .attr('d', ribbonIndex(dataSet))
    .attr('transform', 'translate(200, 200)')
    .attr('fill', schemeCategory10[1])
    .attr('stroke', schemeCategory10[0])
    .attr('stroke-width', '2px')
```

ribbon 请见demo10， 使用方式2： 
```typescript
let ribbonIndex = ribbon()
    .source(function (d: Ribbon): RibbonSubgroup {
        return {
            startAngle: 0.2,
            endAngle: Math.PI *0.3,
            radius: 100
        }
    })
    .target(function (d: Ribbon): RibbonSubgroup {
        return {
            startAngle: Math.PI,
            endAngle: Math.PI * 1.6,
            radius: 100
        }
    })
    .radius(100);

this.svg.append('path')
    .attr('d', ribbonIndex)
    .attr('transform', 'translate(200, 200)')
    .attr('stroke', schemeCategory10[8])
    .attr('stroke-width', '2px')
    .attr('fill', schemeCategory10[9])
```

#### 说明：
**1、chord(matrix)**                         

chord(matrix) 的返回值是一组 chords ，chord 表示两个节点 i 和 j 之间的流量大小，为对象类型，包含以下属性:                  
- source - 该弦的源子分组对象                
- target - 该弦的目标子分组对象               
每一个 source 和 target 子分组都有以下数属性:                 

- startAngle - 起始角度                 
- endAngle - 终止角度               
- value - matrix[i][j] 的值                           
- index - 索引 i              
 -subindex - 索引 j                   

弦图数组也包含了另一个表示分组的属性 chords.groups, chords.groups表示计算后的分组数组，每个分组包含以下属性:               
- startAngle - 起始角度             
- endAngle - 终止角度           
- value - 从节点 i 出去的总量               
- index - 节点索引 i                


### <div id=class03-07>07、对角线生成器</div>
version 5 把这个玩意儿删除了

