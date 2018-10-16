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
}

let index: Index = new Index();
index.demo9();

export default Index

