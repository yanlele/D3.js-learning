/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-15 23:29
 */
import Main from "./Main.js";

class Index {
    protected d3;
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
        this.d3 = (<any>window).d3;
    }

    demo4() {
        let p = this.d3.select('body').selectAll('p');
        p.datum('Thunder').text(function (d, i) {
            return d + ' ' + i;
        })
    }

    /*数据相关*/
    demo5() {
        let p = this.d3.select('body').selectAll('p');
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
        let p = this.d3.select('body').selectAll('p');
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
                return b.id-a.id
            })
            .text(function (data) {
                return data.id + ': ' + data.name
            })
    }

    /*update/enter/exit*/
    demo7() {
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
    }

    /*filter*/
    demo8() {
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
    }

    /*遍历*/
    demo9() {
        let persons: Array<object> = [
            {
                id: 1001,
                name: '张三'
            },
            {
                id: 1002,
                name: '李四'
            }
        ];

        let p = this.d3.select('body').selectAll('p');

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
        this.d3.selectAll('p').call(myfun);
    }

    /*求值的示例*/
    demo11() {
        let number:Array<number> = [30, 20, 10, 50, 40];
        let min: number = this.d3.min(number);
        let max: number = this.d3.max(number);
        let extent: Array<number> = this.d3.extent(number);
        console.log(min);
        console.log(max);
        console.log(extent);


        let minAcc: number = this.d3.min(number, function(d) {return d*3});
        let maxAcc: number = this.d3.max(number, function(d) {return d - 5});
        console.log(minAcc);
        console.log(maxAcc);

        let numbers: Array<number> = [69, 11, undefined, 53, 27, 82, 65, 34, NaN];
        let sum:number = this.d3.sum(numbers, function(d) {return d/3});
        let mean: number = this.d3.mean(numbers);
        console.log(sum);
        console.log(mean);
    }

    /*生成与操作*/
    demo12() {
        let a: Array<number> = this.d3.range(10);
        console.log(a); // 输出 [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }

    /*map*/
    demo13() {
        // 以数组对象persons作为数据源，设定id为主键
        let map = this.d3.map(this.persons, function(d) {
            return d.id;
        });

        console.log(map.has(3));    // true
        console.log(map.has(4));    // false
        console.log(map.get(3));    // {id: 3, name: "王五"}
        console.log(map.get(5));    // undefined
        map.set(12, {id: 12, name: '王麻子'});
        map.set(3, {id: 3, name: '王小二'});
        map.remove(6);
        console.log(map.keys());
        console.log(map.values());
        console.log(map.entries());
        console.log('------------');

        map.each(function(value, key) {
            console.log(key);
            console.log(value);
        });
        console.log(map.empty());
        console.log(map.size());
    }
}

let index: Index = new Index();
index.demo13();

export default Index

