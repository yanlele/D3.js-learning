import {
    scaleLinear, ScaleOrdinal, scaleOrdinal, scalePow, ScaleQuantile, scaleQuantile, ScaleQuantize, scaleQuantize,
    ScaleThreshold,
    scaleThreshold
} from "d3-scale";
import Method from "./Method";
import {select} from "d3-selection";
import {descending, range} from "d3-array";

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
        let quantize: ScaleQuantize<number> = scaleQuantize().domain([0, 10]).range([1, 2, 3, 4, 5]);
        console.log(Method.getColor(quantize(1)));                  // red
        console.log(Method.getColor(quantize(3)));                  // green
        console.log(Method.getColor(quantize(5.999)));              // blue
        console.log(Method.getColor(quantize(6)));                  // yellow
    }

    /*量子比例尺的使用实例*/
    demo5() {
        let quantize: ScaleQuantize<number> = scaleQuantize().domain([0, 50]).range([5, 4, 3, 2, 1]);

        // 定义一个圆的半径
        let r: Array<number> = [45, 35, 25, 15, 5];

        // 添加svg
        let svg = select('body').append('svg')
            .attr('width', 400)
            .attr('height', 400);

        // 添加圆
        svg.selectAll('circle')
            .data(r)
            .enter()
            .append('circle')
            .sort(descending)
            .attr('cx', function (d, i) {
                return 50 + i * 30;
            })
            .attr('cy', 50)
            .attr('r', function (d) {
                return d
            })
            .attr('fill', function (d) {
                return Method.getColorCode(quantize(d))
            })
    }

    /*分位比例尺*/
    demo6() {
        // 量子比例尺
        let quantize: ScaleQuantize<number> = scaleQuantize().domain([0, 10]).range([1, 100]); // scaleQuantize().domain([]) 只允许给定两个值

        // 分位比例尺
        let quantile: ScaleQuantile<number> = scaleQuantile().domain([0, 2, 4, 10]).range([1, 100]);
        console.log(quantize(3));               // 1
        console.log(quantile(3));               // 100

        console.log(quantize(4.99));            // 1
        console.log(quantize(5));               // 100
        console.log(quantile(2.99));            // 1
        console.log(quantile(3));               // 100
    }

    /*阈值比例尺 scaleThreshold*/
    demo7() {
        let threshold: ScaleThreshold<number, number> = scaleThreshold().domain([10, 20, 30]).range(range(1, 5));
        console.log(Method.getColor(threshold(5)));                 // 1 - range
        console.log(Method.getColor(threshold(15)));                // 2 - green
        console.log(Method.getColor(threshold(25)));                // 3 - blue
        console.log(Method.getColor(threshold(35)));                // 4 - yellow

        console.log(threshold.invertExtent(1));                 // [undefined, 10]
        console.log(threshold.invertExtent(2));                 // [10, 20]
        console.log(threshold.invertExtent(3));                 // [20, 30]
        console.log(threshold.invertExtent(4));                 // [30, undefined]
    }

    /*序数比例尺 scaleOrdinal 的一个简单的使用*/
    demo8() {
        let ordinal = scaleOrdinal().domain(['1', '2', '3', '4', '5']).range([10, 20, 30, 40, 50]);
        console.log(ordinal('1'));              // 10
        console.log(ordinal('2'));              // 20
        console.log(ordinal('3'));              // 30
        console.log(ordinal('4'));              // 40
        console.log(ordinal('5'));              // 50
        console.log(ordinal('8'));              // 10
    }
}

let index: Index = new Index();
index.demo8();


export default Index;