import {
    scaleBand, scaleLinear, scaleLog, scaleOrdinal, scalePoint, scalePow, ScaleQuantile, scaleQuantile,
    ScaleQuantize, scaleQuantize, ScaleThreshold, scaleThreshold,
} from "d3-scale";
import Method from "./Method";
import {select} from "d3-selection";
import {descending, max, range} from "d3-array";
import {schemeCategory10} from "d3-scale-chromatic";
import {axisBottom, axisLeft, axisRight} from "d3-axis";
import {format} from "d3-format";

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

    /*对于scalePoint() 的理解*/
    demo9() {
        let point = scalePoint().domain(['1', '2', '3', '4', '5']).range([0, 100]);
        console.log(point.range());         // [0, 100]
        console.log(point('1'));            // 0
        console.log(point('3'));            // 50
        console.log(point('5'));            // 100

        point.padding(5);
        console.log(point.range());         // [0, 100]
        console.log(point('1'));            // 16.666666666666664
        console.log(point('2'));            // 33.33333333333333
        console.log(point('3'));            // 50
        console.log(point('4'));            // 66.66666666666666
        console.log(point('5'));            // 83.33333333333334
    }

    /*对于scaleBand() 的理解*/
    demo10() {
        let bands = scaleBand().domain(['1', '2', '3', '4', '5']).range([0, 100]);
        console.log(bands.range());         // [0, 100]
        console.log(bands.bandwidth());     // 20
        console.log(bands.step());          // 20

        bands.paddingInner(0.5)
            .paddingOuter(0.2);
        console.log(bands.range());         // [0, 100]
        console.log(bands.bandwidth());     // 10.204081632653061
        console.log(bands.step());          // 20.408163265306122
        console.log(bands('1'));            // 4.081632653061227
        console.log(bands('2'));            // 24.48979591836735
        console.log(bands('3'));            // 44.89795918367347
        console.log(bands('4'));            // 65.3061224489796
        console.log(bands('5'));            // 85.71428571428572
    }

    /*颜色比例尺*/
    demo11() {
        let color: ReadonlyArray<string> = schemeCategory10;
        console.log(color[1]);              // #ff7f0e
        console.log(color[2]);              // #2ca02c
    }

    /*颜色比例尺的使用*/
    demo12() {
        let width: number = 600;
        let height: number = 600;
        let dataSet: Array<number> = range(5);

        // 定义色彩
        let color: ReadonlyArray<string> = schemeCategory10;

        let svg = select('body').append('svg');
        svg.attr('width', width);
        svg.attr('height', height);

        // 绘制圆形
        let circle = svg.selectAll('circle')
            .data(dataSet)
            .enter()
            .append('circle')
            .attr('cx', function (d, i) {
                return 100 + i * 80;
            })
            .attr('cy', 100)
            .attr('r', 30)
            .attr('fill', function (d, i) {
                return color[i];
            })
    }

    /*坐标轴的基本使用*/
    demo13() {
        let width: number = 600, height: number = 600;
        let svg = select('body').append('svg')
            .attr('height', height)
            .attr('width', width);

        // 用于坐标轴的线性比例尺
        let xScale = scaleLinear().domain([0, 10]).range([0, 300]);

        // 坐标轴
        let axis = axisBottom(xScale);

        // 在svg中添加一个包含坐标各个元素的g元素
        let gAxis = svg.append('g')
            .attr('transform', `translate(80, 80)`);         // 平移到（80，80）

        gAxis.call(axis);
    }

    /*坐标轴刻度问题*/
    demo14() {
        let width: number = 600, height: number = 600;
        let svg = select('body').append('svg')
            .attr('height', height)
            .attr('width', width);

        // 用于坐标轴的线性比例尺
        let xScale = scaleLinear().domain([0, 10]).range([0, 300]);

        // 坐标轴
        let leftAxis = axisLeft(xScale).ticks(5, '.1f');
        let leftAxis2 = axisBottom(xScale).ticks(5).tickSizeInner(1).tickSizeOuter(5);
        let rightAxis = axisRight(xScale).ticks([5], '.1f');
        let rightAxis2 = axisRight(xScale).tickValues([3, 4, 5, 6, 7]).tickFormat(format("$.1f"));


        // 在svg中添加一个包含坐标各个元素的g元素
        let lAxis = svg.append('g')
            .attr('transform', `translate(80, 80)`);         // 平移到（80，80）

        let rAxis = svg.append('g')
            .attr('transform', `translate(100, 80)`);         // 平移到（80，80）

        let rAxis2 = svg.append('g')
            .attr('transform', `translate(140, 80)`);         // 平移到（80，80）

        let lAxis2 = svg.append('g')
            .attr('transform', `translate(180, 80)`);

        lAxis.call(leftAxis);
        lAxis2.call(leftAxis2);
        rAxis.call(rightAxis);
        rAxis2.call(rightAxis2);
    }

    /*其他各种比例尺的坐标轴*/
    demo15() {
        let width: number = 600, height: number = 600;
        let svg = select('body').append('svg')
            .attr('height', height)
            .attr('width', width);

        // 用于坐标轴的线性比例尺
        let linear = scaleLinear().domain([0, 10]).range([0, 500]);
        let pow = scalePow().exponent(2).domain([0,10]).range([0,500]);
        let log = scaleLog().domain([0.01, 10]).range([0, 500]);


        // 坐标轴
        let linearBottomAxis = axisBottom(linear);
        let powBottomAxis = axisBottom(pow);
        let logBottomAxis = axisBottom(log);


        // 在svg中添加一个包含坐标各个元素的g元素
        let linearBottom = svg.append('g')
            .attr('transform', `translate(80, 80)`);         // 平移到（80，80）

        let powBottom = svg.append('g')
            .attr('transform', `translate(80, 120)`);         // 平移到（80，80）

        let logBottom = svg.append('g')
            .attr('transform', `translate(80, 160)`);         // 平移到（80，80）

        linearBottom.call(linearBottomAxis);
        powBottom.call(powBottomAxis);
        logBottom.call(logBottomAxis);
    }

    /*散点图*/
    demo16() {
        let width: number = 600, height: number = 600;
        let svg = select('body').append('svg')
            .attr('height', height)
            .attr('width', width);

        // 圆心数据
        let center: Array<Array<number>> = range(10).map(function(item, index) {
            return [Method.randomFrom(1, 9)/ 10, Method.randomFrom(1, 9)/ 10];
        });

        // x轴
        let xScale = scaleLinear().domain([0, 1.2 * max(center, function(d) {
            return d[0]
        })]).range([0, 500]);

        // y轴
        let yScale = scaleLinear().domain([0, 1.2 * max(center, function (d) {
            return d[1];
        })]).range([0, 500]);

        // 外边框
        let padding = {
            top: 30,
            right: 30,
            left: 30,
            bottom: 30
        };

        // 绘制圆
        let circle = svg.selectAll('circle')
            .data(center)
            .enter()
            .append('circle')
            .attr('fill', 'black')
            .attr('cx', function (d) {
                return padding.left + xScale(d[0])
            })
            .attr('cy', function (d) {
                return height - padding.bottom - yScale(d[1])
            })
            .attr('r', 5);

        // 绘制坐标轴
        let bottomAxis = axisBottom(xScale);
        yScale.range([500, 0]);             // 逆转Y轴刻度
        let leftAxis = axisLeft(yScale);

        let linearBottom = svg.append('g')
            .attr('transform', `translate(${padding.left}, ${height-padding.bottom})`);         // 平移到（80，80）
        let linearLeft = svg.append('g')
            .attr('transform', `translate(${padding.left}, ${height - padding.bottom - 500})`);
        linearBottom.call(bottomAxis);
        linearLeft.call(leftAxis);
    }
}

let index: Index = new Index();
index.demo16();


export default Index;