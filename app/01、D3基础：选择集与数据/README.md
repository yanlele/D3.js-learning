## D3基础：选择集与数据

### <div id="class01-01">01、选择元素</div>

api | 说明
:- | :-
select | 选择多个元素
selectAll | 选择多个元素

类似于jquery 的选择器理解就可以了


### <div id="class01-02">02、选择集</div>
select 和 selectAll 返回的对象就是选择集（selection）                
选择集有如下api

#### 查看状态

api | 说明
:- | :-
empty() | 如果选择集为空，返回true, 反之返回false
node() | 返回第一个非空节点
size() | 返回选择集个数

#### 设置和获取属性

api | 说明
:- | :-
selection.attr(name[, value]) | 获取属性
selection.classed(name [, value]) | 获取class, 第二个参数如果要设置多个class名， 空格隔开就可以了。 第二个属性还可以是一个布尔值，表示开启与关闭， classed还可以携程对象的形式。 如果忽略第二个参数，返回的是一个布尔类型，表示是否开启。
selection.style(name [, value]) | 获取样式， name 为样式名字
selection.property(name [, value]) | 用来获取特殊的属性，比如input中的value
selection.text([value]) | 用来获取标签的文本
selection.html([value]) | 用来获取html字符串

### <div id="class01-03">03、添加、插入和删除</div>

api | 说明
:- | :-
selection.append(name) | 在选择集末尾添加一个元素，name 为元素名称
selection.insert(name [, before]) | 在指定的元素之前添加name元素名称的元素，before是css选择器
selection.remove(name) | 删除选择集中的元素


### <div id="class01-04">04、数据绑定</div>

api | 说明
:- | :-
selection.datum([value]) | 给选择集中的每一个元素都绑定相同的value， 如果没有参数，就返回绑定的值。
selection.data([values [, key]]) | 给选择集中的每一个分别绑定数组values的每一项，key是主键函数。

#### datum 的工作原理
对于选择集中的每一个元素，都为其添加一个__data__ 的属性，属性的值就是selection.datum(value)中的value。               
被绑定的元素可以传递给自己的子元素，对前一段的代码修改作用：
```typescript
import Main from "./Main.js";
class Index {
    protected d3;
    constructor() {
        this.d3 =  (<any>window).d3;
    }

    demo4() {
        let p = this.d3.select('body').selectAll('p');
        p.datum('Thunder').text(function(d,i) {
            return d + ' ' + i;
        })
    }
    
    demo5() {
            let p = this.d3.select('body').selectAll('p');
            p.datum('Thunder')
                .text(function (d, i) {
                    return d +' ' + i;
                })
                .append('span')
                .text(function (d, i) {
                    return ' ' + d;
                })
        }
}

let index: Index = new Index();
index.demo4();
export default Index
```

#### data()的工作原理

**1、区别datum**
data() 第一个参数是一个数组，这个数组的的元素分别对应选择集中的每一个元素。依次赋值的。

**2、理解update、enter、exit**

#### 绑定顺序问题
data() 接受第一个参数是数据数组， 第二个参数是主键函数，使用组件函数可以更改绑定的顺序或者规则。但是前提条件是必须选择集已经绑定有数据才行。
这个地方有BUG 我也不知道是怎么回事儿，所以直接略过。


### <div id="class01-05">05、update/enter/exit</div>
这三个概念太过于简单略过

给一个综合的示例 - demo7：
```typescript
let dataset: Array<number> = [10, 20, 30];
let p = this.d3.select('body').selectAll('p');

let update = p.data(dataset);
let enter = update.enter();
let exit = update.exit();

update.text(function(d) {
    return d;
});

enter.append('p')
    .text(function (d) {
        return d;
    });

exit.remove();
```


### <div id="class01-06">06、选择集的常用方法</div>

#### filter 过滤
```typescript
let dataset: Array<number> = [10, 20, 30];
let p = this.d3.select('body').selectAll('p');

let update = p.data(dataset);
let enter = update.enter();
let exit = update.exit();

update
    .filter(function (d, i) {
        if(d> 0) {
            return true
        } else {
            return false
        }
    })
    .text(function(d) {
    return d;
});

enter.append('p')
    .text(function (d) {
        return d;
    });

exit.remove();
```
满足调教的数据才会做后续的处理


#### 排序 sort
升序如下：
```typescript
select.sort(function(a,b) {
    return b-a;
})
```

#### 遍历each 










