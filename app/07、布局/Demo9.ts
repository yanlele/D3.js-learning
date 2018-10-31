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
import {schemeCategory10} from "d3-scale-chromatic";

class Demo9 {
    main() {
        let width: number = 900;
        let height: number = 900;
        let padding: any = {
            top: 30,
            bottom: 30,
            left: 30,
            right: 30,
        };
        let data: number[] = range(1000).map(randomBates(10));

        let xScale = scaleLinear().domain([0, 1]).rangeRound([0, width]);

        let histogramMain = histogram().domain([0, 1]).thresholds(xScale.ticks(20));

        let bins = histogramMain(data);
        console.log(bins);

        let yScale = scaleLinear().domain([0, max(bins, function (d: any) {
            return d.length;
        })]).range([height - padding.bottom - padding.top, 0]);

        let formatCount = format(',.0f');

        // 绘图
        let svg = select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('transform', `translate(${padding.left}, ${padding.top})`);

        let bar = svg.selectAll('.bar')
            .data(bins)
            .enter()
            .append('g')
            .attr('transform', function (d: any) {
                return `translate(${xScale(d.x0)}, ${yScale(d.length)})`
            });

        bar.append('rect')
            .attr('width', xScale(bins[0].x1) - xScale(bins[0].x0) -1)
            .attr('height', function (d: any) {
                return height - padding.bottom - yScale(d.length)
            })
            .attr('fill', schemeCategory10[0])
            .on('mouseover', function (d:any, i:number) {
                select(this)
                    .transition()
                    .attr('fill', schemeCategory10[1])
            })
            .on('mouseout', function (d: any, i: number) {
                select(this)
                    .transition()
                    .attr('fill', schemeCategory10[0])
            });

        bar.append('text')
            .attr('stroke', 'white')
            .attr('dy', '1em')
            .attr('y', 6)
            .attr('x', (xScale(bins[0].x1) - xScale(bins[0].x0)) / 2)
            .attr('text-anchor', 'middle')
            .attr('font-size', 12)
            .text(function (d: any) {
                return formatCount(d.length)
            });

        svg.append('g')
            .attr('transform', `translate(0, ${height - padding.bottom})`)
            .call(axisBottom(xScale));
    }
}

export default Demo9;