/**
 * create by yanlele
 * create time 2018-10-31 17:55
 */

/*直方图简单实例*/
import {histogram, max, range} from "d3-array";
import {randomBates} from "d3-random";
import {scaleLinear} from "d3-scale";
import {select} from "d3-selection";
import {format, formatDefaultLocale} from "d3-format";
import {axisBottom} from "d3-axis";

class Demo9 {
    main() {
        let width: number = 400;
        let height: number = 400;
        let padding: any = {
            top: 10,
            right: 30,
            bottom: 30,
            left: 30
        };
        let data: number[] = range(1000).map(randomBates(10));

        let xScale = scaleLinear().rangeRound([0, width]);

        let histogramMain = histogram()
            .domain([0, 1])
            .thresholds(xScale.ticks(20));

        let bins = histogramMain(data);

        // y比例尺
        let yScale = scaleLinear()
            .domain([0, max(bins, function (d: any) {
                return d.length;
            })])
            .range([height - padding.bottom - padding.top, 0]);

        console.log(bins);

        // 绘图
        let svg = select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')');
        let bar = svg.selectAll('.bar')
            .data(bins)
            .enter().append('g')
            .attr('class', 'bar')
            .attr('transform', function (d) { return 'translate(' + xScale(d.x0) + ',' + yScale(d.length) + ')' });
        bar.append('rect')
            .attr('x', 1)
            .attr('width', xScale(bins[0].x1) - xScale(bins[0].x0) - 1)
            .attr('height', function (d) { return height - yScale(d.length) - 22 }) // d.length记录了该区间的个数
            .attr('fill', 'steelblue');

        let formatCount = format(',.0f');
        bar.append('text')
            .attr('stroke', 'white')
            .attr('dy', '.75em')
            .attr('y', 6)
            .attr('x', (xScale(bins[0].x1) - xScale(bins[0].x0)) / 2)
            .attr('text-anchor', 'middle')
            .attr('font-size', '10px')
            .text(function (d) { return formatCount(d.length) });

        svg.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + (height - 20) + ')')
            .call(axisBottom(xScale))

    }
}

export default Demo9;