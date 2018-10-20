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

