/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-31 21:25
 */

/*书本实例*/
import {randomNormal} from "d3-random";
import {Bin, histogram, HistogramGeneratorNumber, max, min, tickIncrement} from "d3-array";
import {scaleLinear, scaleOrdinal} from "d3-scale";
import {axisBottom, AxisScale} from "d3-axis";
import {line} from "d3-shape";
import {select} from "d3-selection";

class Demo10 {
    main() {
        let width: number = 900;
        let height: number = 900;
        // 建立标准正态分布，平均值 170， 标准差 10
        let rand: () => number = randomNormal(170, 10);

        let dataSet: number[] = [];

        for (let i: number = 0; i < 100; i++) {
            dataSet.push(rand())
        }

        let binNum: number = 20,
            rangeMin: number = 130,
            rangeMax: number = 210;

        let histogramMain: HistogramGeneratorNumber<number, number> = histogram().domain([rangeMin, rangeMax]).thresholds(binNum);

        let hisData = histogramMain(dataSet);
        console.log(hisData);

        let xAxisWidth: number = 800,
            yAxisWidth: number = 800,

            LineMain = scaleLinear().domain([rangeMax, rangeMin]).range([xAxisWidth, 0.1]),
            yScale = scaleLinear().domain([min(hisData, function (d: any) {
                return d.y
            }), max(hisData, function (d: any) {
                return d.y
            })]).range([5, yAxisWidth]);

        let padding: any = {
            top: 30,
            bottom: 30,
            left: 30,
            right: 30,
        };

        let axis = axisBottom(LineMain).ticks(20);

        // 绘图
        let svg = select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('transform', `translate(${padding.left}, ${padding.top})`);

        svg.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(${padding.left}, ${height - padding.bottom})`)
            .call(axis);

        let gRect = svg.append('g')
            .attr('transform', `translate(${padding.left}, ${padding.bottom})`);

        gRect.selectAll('rect')
            .data(hisData)
            .enter()
            .append('rect')
            .attr('x', function (d: any, i: number) {
                return LineMain(d.x)
            })
            .attr('y', function (d: any, i: number) {
                return height - yScale(d.y)
            })
            .attr('width', function (d:any, i: number) {
                return xAxisWidth;
            })
            .attr('height', function (d: any) {
                return yScale(d.y)
            })
    }
}


export default Demo10;