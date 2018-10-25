import {range} from "d3-array";
import Method from "../02、比例尺与坐标轴/Method";
import {scaleLinear} from "d3-scale";
import {select} from "d3-selection";
import {axisBottom, axisLeft} from "d3-axis";

/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-25 19:41
 */

class CircleDemo {
    // 圆心数据
    private center: number[][] = range(10).map(function(item, index) {
        return [Method.randomFrom(1, 9)/ 10, Method.randomFrom(1, 9)/ 10];
    });

    // 外边框
    private padding: any = {top: 30, right: 30, bottom: 30, left: 30};

    // x轴
    private xAxisWidth: number = 300;

    // y轴
    private yAxisWidth: number = 300;

    //　x轴比例尺
    private xScale = scaleLinear().domain([0, 1]).range([0, this.xAxisWidth]);
    // y轴比例尺
    private yScale = scaleLinear().domain([0, 1]).range([0, this.yAxisWidth]);

    private width: number = 600;
    private height: number = 600;
    private svg;

    constructor() {
        this.svg = select('body').append('svg')
            .attr('height', this.height)
            .attr('width', this.width);
    }


    drawCircle() {
        // 绑定数据
        let circleUpdate = this.svg.selectAll('circle')
            .data(this.center);

        let circleEnter = circleUpdate.enter();

        let circleExit = circleUpdate.exit();

        circleUpdate.transition()
            .duration(1000)
            .attr('cx',  (d: number) => {
                return this.padding.left + this.xScale(d[0])
            })
            .attr('cy', (d: number) => {
                return this.height - this.padding.bottom - this.yScale(d[1])
            });

        circleEnter.append('circle')
            .attr('fill', 'black')
            .attr('cx', this.padding.left)
            .attr('cy', this.height - this.padding.bottom)
            .attr('r', 7)
            .transition()
            .duration(1000)
            .attr('cx',  (d: number) => {
                return this.padding.left + this.xScale(d[0])
            })
            .attr('cy', (d: number) => {
                return this.height - this.padding.bottom - this.yScale(d[1])
            });

        circleExit.transition()
            .duration(1000)
            .attr('fill', 'white')
            .remove();
    }

    // 坐标轴
    drawAxis() {
        // x轴生成器
        let xAxis = axisBottom(this.xScale).ticks(5);

        // y轴生成器
        this.yScale.range([this.yAxisWidth, 0]);
        let yAxis = axisLeft(this.yScale).ticks(5);

        // 绘制x轴
        this.svg.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(${this.padding.left}, ${this.height - this.padding.bottom})`)
            .call(xAxis);

        // 绘制y轴
        this.svg.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(${this.padding.left}, ${this.height - this.padding.bottom - this.yAxisWidth})`)
            .call(yAxis);

        // 绘制完毕之后坐标轴将值域回滚回去
        this.yScale.range([0, this.yAxisWidth]);
    }
}