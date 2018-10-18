import {scaleLinear, scalePow, scaleQuantize} from "d3-scale";
import Method from "./Method";

class Index {
    /*比例尺*/
    demo1() {
        let linear = scaleLinear().domain([0, 500]).range([0, 100]);
        console.log(linear(50));            // 结果10
        console.log(linear(250));           // 结果50
        console.log(linear(450));           // 结果90
    }

    /*线性比例尺的用法*/
    demo2() {
        let linear = scaleLinear().domain([0, 20]).range([0, 100]);
        console.log(linear(10));            // 获取定义域为10 的值域 结果为 50
        console.log(linear(30));                      // 结果150
        console.log(linear.invert(80));         // 结果 16

        // 如果不希望超出范围
        linear.clamp(true);
        console.log(linear(30));                        // 100

        // 如果希望获取值域的时候四舍五入, 用下面的方法代替range()　方法
        linear.rangeRound([0, 100]);
        console.log(linear(13.33));                    // 67

        // 理想化定义域
        linear.domain([0.12300000, 0.4888888]).nice();
        console.log(linear.domain());                  // [0.1, 0.5]

        // 对于ticks() 和 tickFormat() 的使用
        linear = scaleLinear().domain([-20, 20]).range([0, 100]);
        let ticks: Array<any> = linear.ticks(5);
        console.log('ticks: ', ticks);          //  [-20, -10, 0, 10, 20]

        let tickFormat = linear.tickFormat(5, '+');

        ticks.map(function (item, index) {
            ticks[index] = tickFormat(ticks[index]);
        });
        console.log(ticks);         // ["-2e+1", "-1e+1", "+0", "+1e+1", "+2e+1"]
    }

    /*指数标尺和对数标尺: scalePow() | scaleLog()*/
    demo3() {
        let pow = scalePow().exponent(3);
        console.log(pow(2));            // 8
        console.log(pow(3));            // 27

        pow.exponent(0.5);
        console.log(pow(2));            // 1.4142135623730951
        console.log(pow(3));            // 1.7320508075688772

        // 指数标尺下的定义域和值域
        /*
        * 计算结果为11.25 结果分析如下
        * 指数标尺使得定义域相对的可以说是扩展为了[0, 3*3*3] = [0, 27]
        * 相对于pow(1.5) 就是 3.375
        * 相当于 对应的线性比例尺的结果
        * let linear = scaleLinear().domain([0, 27]).range([0, 90]);
        * console.log(linear(3.375));     // 11.25
        * */
        pow.exponent(3)
            .domain([0, 3])
            .range([0, 90]);
        console.log(pow(1.5))           // 11.25
    }

    /*量子比例尺*/
    demo4() {
        let quantize = scaleQuantize().domain([0, 10]).range([1, 2, 3, 4, 5]);
        console.log(Method.getColor(quantize(1)));                  // red
        console.log(Method.getColor(quantize(3)));                  // green
        console.log(Method.getColor(quantize(5.999)));              // blue
        console.log(Method.getColor(quantize(6)));                  // yellow
    }
}

let index: Index = new Index();
index.demo4();


export default Index;