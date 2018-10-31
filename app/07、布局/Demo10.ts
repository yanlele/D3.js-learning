/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-31 21:25
 */

/*书本实例*/
import {randomNormal} from "d3-random";
import {Bin, histogram, HistogramGeneratorNumber} from "d3-array";
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
            xTicks = hisData.map(function (d: any) {
                return d.x
            });

        let xScale = scaleLinear().domain(xTicks).range([xAxisWidth, 0.1]);

        let padding: any = {
            top: 30,
            bottom: 30,
            left: 30,
            right: 30,
        };

        let axis = axisBottom(xScale);

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
    }
}


export default Demo10;