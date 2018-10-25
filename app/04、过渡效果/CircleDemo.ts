import {range} from "d3-array";
import Method from "../02、比例尺与坐标轴/Method";
import {scaleLinear} from "d3-scale";
import {select} from "d3-selection";
import {axisBottom, axisLeft} from "d3-axis";
import {schemeCategory10} from "d3-scale-chromatic";

/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-25 19:41
 */

class CircleDemo {
    // 圆心数据
    private center: number[][] = range(10).map(function (item, index) {
        return [Method.randomFrom(1, 9) / 10, Method.randomFrom(1, 9) / 10];
    });

    // 外边框
    private padding: any = {top: 30, right: 30, bottom: 30, left: 30};

    // x轴
    private xAxisWidth: number = 500;

    // y轴
    private yAxisWidth: number = 500;

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


        select('body').append('br')
        let button = select('body')
            .selectAll('.button')
            .data(range(3))
            .enter()
            .append('button')
            .text((d: number, index: number) => {
                if (index === 0) {
                    return '更新'
                } else if (index === 1) {
                    return '添加'
                } else if (index === 2) {
                    return '减少'
                }
            })
            .attr('id', (d: number, i: number) => {
                return `button${i}`
            })
            .on('click', (d: number, index: number) => {
                if (index === 0) {
                    this.update()
                } else if (index === 1) {
                    this.add()
                } else if (index === 2) {
                    this.sub();
                }
            });

        this.drawAxis();
        this.drawCircle();
    }


    drawCircle() {
        // 绑定数据
        let circleUpdate = this.svg.selectAll('circle')
            .data(this.center);

        let circleEnter = circleUpdate.enter();

        let circleExit = circleUpdate.exit();

        circleUpdate.transition()
            .duration(1000)
            .attr('cx', (d: number) => {
                return this.padding.left + this.xScale(d[0])
            })
            .attr('cy', (d: number) => {
                return this.height - this.padding.bottom - this.yScale(d[1])
            });

        circleEnter.append('circle')
            .attr('fill', (d: number) => {
                return schemeCategory10[Math.floor(Math.random() * 10)]
            })
            .attr('cx', this.padding.left)
            .attr('cy', this.height - this.padding.bottom)
            .attr('r', 7)
            .transition()
            .duration(1000)
            .attr('cx', (d: number) => {
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
        let xAxis = axisBottom(this.xScale).ticks(10);

        // y轴生成器
        this.yScale.range([this.yAxisWidth, 0]);
        let yAxis = axisLeft(this.yScale).ticks(10);

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

    /*更新数据事件*/
    update() {
        for (let i: number = 0; i < this.center.length; i++) {
            this.center[i][0] = Method.randomFrom(1, 9) / 10;       // 更新X坐标
            this.center[i][1] = Method.randomFrom(1, 9) / 10;
        }
        this.drawCircle();
    }


    add() {
        this.center.push([Method.randomFrom(1, 9) / 10, Method.randomFrom(1, 9) / 10]);
        this.drawCircle();
    }

    sub() {
        this.center.pop();
        this.drawCircle();
    }
}

export default CircleDemo;