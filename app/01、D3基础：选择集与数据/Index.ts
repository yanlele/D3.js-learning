/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-15 23:29
 */
import Main from "./Main.js";

class Index {
    protected d3;

    constructor() {
        this.d3 = (<any>window).d3;
    }

    demo4() {
        let p = this.d3.select('body').selectAll('p');
        p.datum('Thunder').text(function (d, i) {
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
index.demo5();

export default Index

