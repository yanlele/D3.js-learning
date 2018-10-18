/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-15 23:29
 */

import {ascending, descending, extent, max, mean, min, range, sum} from "d3-array";
import {select, selectAll} from "d3-selection";
import {map} from "d3-collection";

class Index {

    protected persons: Array<any> = [
        {
            id: 6,
            name: '张三'
        },
        {
            id: 9,
            name: '李四'
        },
        {
            id: 3,
            name: '王五'
        }
    ];

    constructor() {

    }

    demo4() {
        let p = select('body').selectAll('p');
        p.datum('Thunder').text(function (d, i) {
            return d + ' ' + i;
        })
    }

    /*数据相关*/
    demo5() {
        let p = select('body').selectAll('p');
        p.datum('Thunder')
            .text(function (d, i) {
                return d + ' ' + i;
            })
            .append('span')
            .text(function (d, i) {
                return ' ' + d;
            })
    }

    /*绑定顺序问题*/
    demo6() {
        let p = select('body').selectAll('p');
        let persons: Array<any> = [
            {
                id: 6,
                name: '张三'
            },
            {
                id: 9,
                name: '李四'
            },
            {
                id: 3,
                name: '王五'
            }
        ];

        p
            .data(persons)
            .sort(function (a, b) {
                return b.id - a.id
            })
            .text(function (data) {
                return data.id + ': ' + data.name
            })
    }

    /*update/enter/exit*/
    demo7() {
        let dataset: Array<number> = [10, 20, 30];
        let p = select('body').selectAll('p');

        let update = p.data(dataset);
        let enter = update.enter();
        let exit = update.exit();

        update.text(function (d) {
            return d;
        });

        enter.append('p')
            .text(function (d) {
                return d;
            });

        exit.remove();
    }

    /*filter*/
    demo8() {
        let dataset: Array<number> = [10, 20, 30];
        let p = select('body').selectAll('p');

        let update = p.data(dataset);
        let enter = update.enter();
        let exit = update.exit();

        update
            .filter(function (d, i) {
                return d > 0;
            })
            .text(function (d) {
                return d;
            });

        enter.append('p')
            .text(function (d) {
                return d;
            });

        exit.remove();
    }

    /*遍历*/
    demo9() {
        let persons: Array<any> = [
            {
                id: 1001,
                name: '张三'
            },
            {
                id: 1002,
                name: '李四'
            }
        ];

        let p = select('body').selectAll('p');

        p
            .data(persons)
            .each(function (d, i) {
                d.age = 20;
            })
            .text(function (d, i) {
                return `${d.id} - ${d.name} - ${d.age}`;
            })
    }

    /*传递call*/
    demo10() {
        function myfun(selection) {
            // 这里做selection 的相关操作
        }

        selectAll('p').call(myfun);
    }

    /*求值的示例*/
    demo11() {
        let number: Array<number> = [30, 20, 10, 50, 40];
        let minNumber: number = min(number);
        let maxNumber: number = max(number);
        let extentArray: Array<number> = extent(number);
        console.log(minNumber);
        console.log(maxNumber);
        console.log(extentArray);


        let minAcc: number = min(number, function (d) {
            return d * 3
        });
        let maxAcc: number = max(number, function (d) {
            return d - 5
        });
        console.log(minAcc);
        console.log(maxAcc);

        let numbers: Array<number> = [69, 11, undefined, 53, 27, 82, 65, 34, NaN];
        let sumNumber: number = sum(numbers, function (d) {
            return d / 3
        });
        let meanNumber: number = mean(numbers);
        console.log(sumNumber);
        console.log(meanNumber);
    }

    /*生成与操作*/
    demo12() {
        let a: Array<number> = range(10);
        console.log(a); // 输出 [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }

    /*map*/
    demo13() {
        // 以数组对象persons作为数据源，设定id为主键
        let myMap = map(this.persons, function (d) {
            return d.id;
        });

        console.log(myMap.has('3'));    // true
        console.log(myMap.has('4'));    // false
        console.log(myMap.get('3'));    // {id: 3, name: "王五"}
        console.log(myMap.get('5'));    // undefined
        myMap.set('12', {id: 12, name: '王麻子'});
        myMap.set('3', {id: 3, name: '王小二'});
        myMap.remove('6');
        console.log(myMap.keys());
        console.log(myMap.values());
        console.log(myMap.entries());
        console.log('------------');

        myMap.each(function (value, key) {
            console.log(key);
            console.log(value);
        });
        console.log(myMap.empty());
        console.log(myMap.size());
    }

    /*柱形图*/
    demo14() {
        // 矩形的高度
        let dataset: Array<number> = [50, 43, 120, 87, 99, 167, 142];

        // 创建svg 画布的宽高
        let width: number = 400;
        let height: number = 400;

        let svg = select('body').append('svg');
        svg.attr('width', width)
            .attr('height', height);

        // 定义上下边距
        let padding: any = {
            top: 20,
            bottom: 20,
            right: 20,
            left: 20
        };

        // 矩形所占据的宽度， 包括空白，单位为像素
        let rectStep: number = 35;

        // 矩形所餐具的宽度， 不包括空白， 单位像素
        let rectWidth: number = 30;

        // 通过dataset给SVG 添加矩形和文字。
        let rect = svg.selectAll('rect');
        rect.data(dataset)                                          // 绑定数据
            .enter()
            .append('rect')                                         // 添加元素
            .attr('fill', 'steelblue')                 // 设置颜色
            .attr('x', function (d, i) {                // 设置x 坐标
                return padding.left + i * rectStep;
            })
            .attr('y', function (d) {                    // 谁知y 坐标
                console.log(d);
                return height - d - padding.bottom;
            })
            .attr('width', rectWidth)                       // 设置矩形宽度
            .attr('height', function (d) {            // 设置矩形高度
                return d
            });

        // 给矩形添加文字
        let text = svg.selectAll('text')
            .data(dataset)
            .enter()
            .append('text')
            .attr('fill', 'white')
            .attr('font-size', '14px')
            .attr('text-anchor', 'middle')
            .attr('x', function (d, i) {
                return padding.left + i * rectStep;
            })
            .attr('y', function (d) {
                return height - d - padding.bottom;
            })
            .attr('dx', rectWidth/2)
            .attr('dy', '1em')
            .text(function(d) {
                return d
            })
    }

    /*ts中使用D3， 画出柱形图*/
    demo15() {
        // 矩形的高度
        let dataset: Array<number> = [50, 43, 120, 87, 99, 167, 142];

        // 创建svg 画布的宽高
        let width: number = 400;
        let height: number = 400;

        let svg = select('body').append('svg');
        svg.attr('width', width);
        svg.attr('height', width);

        // 定义上下边距
        let padding: any = {
            top: 20,
            bottom: 20,
            right: 20,
            left: 20
        };

        // 矩形所占据的宽度， 包括空白，单位为像素
        let rectStep: number = 35;

        // 矩形所餐具的宽度， 不包括空白， 单位像素
        let rectWidth: number = 30;

        let rect = svg.selectAll('rect')
            .data(dataset)
            .enter()
            .append('rect')
            .sort(descending)
            .attr('fill', 'SlateBlue')
            .attr('x', function (d, i) {
                return padding.left + i * rectStep;
            })
            .attr('y', function(d) {
                return height - d -padding.bottom
            })
            .attr('width', rectWidth)
            .attr('height', function(d) {
                return d
            })
    }
}

let index: Index = new Index();
index.demo14();

export default Index

