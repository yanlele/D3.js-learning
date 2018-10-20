/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-20 11:04
 */
import {rgb} from "d3-color";
import {interpolate} from "d3-interpolate";

class Index {
    /*插值*/
    demo1() {
        let a = rgb('red');
        let b = rgb('green');

        let compute = interpolate(a, b);

        console.log(compute(0));
        console.log(compute(.2));
        console.log(compute(.5));
        console.log(compute(1));

    }
}

let index:Index = new Index();
index.demo1();

export default Index;