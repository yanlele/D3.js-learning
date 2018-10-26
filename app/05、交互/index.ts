/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-25 21:37
 */
import {event, select, touches} from "d3-selection";
import {schemeCategory10} from "d3-scale-chromatic";
import {scaleLinear} from "d3-scale";
import {max} from "d3-array";
import {axisBottom, axisLeft} from "d3-axis";

class Index {
    private height: number = 600;
    private width: number = 600;
    private svg;
    // 外边框
    private padding: any = {top: 30, right: 30, bottom: 30, left: 30};

    // 矩形的高度
    private dataSet: number[] = [150, 123, 220, 387, 199, 367, 442];

    // x轴
    private xAxisWidth: number = 500;

    // y轴
    private yAxisWidth: number = 500;

    constructor() {
        this.svg = select('body')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
    }

    demo1() {
        let rect = this.svg.selectAll('rect')
            .data(this.dataSet)
            .enter()
            .append('rect')
            .attr('x', (d: number, i: number) => {
                return this.padding.left + 30 + 50 * i
            })
            .attr('y', (d: number, i: number) => {
                return this.height - this.padding.bottom - d;
            })
            .attr('height', (d: number) => {
                return d
            })
            .attr('width', 40)
            .attr('fill', (d:number) => {
                return schemeCategory10[0]
            });

        let text = this.svg.selectAll('.text')
            .data(this.dataSet)
            .enter()
            .append('text')
            .attr('x', (d: number, i: number) => {
                return this.padding.left + 30 + 50 * i
            })
            .attr('y', (d: number, i: number) => {
                return this.height - this.padding.bottom - d;
            })
            .attr('dy', '1em')
            .attr('dx', 20)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('font-size', '16px')
            .text(function (d: number) {
                return d
            });

        rect.on('mouseover',  function (d: number, i: number) {
            select(this)
                .transition()
                .duration(500)
                .attr('stroke', schemeCategory10[2])
                .attr('stroke-width', '3px')
                .attr('fill', schemeCategory10[1]);
        });

        rect.on('mouseout',  function (d: number, i: number) {
            select(this)
                .transition()
                .duration(500)
                .attr('stroke-width', null)
                .attr('stroke', null)
                .attr('fill', schemeCategory10[0]);
        });

        // 比例尺
        let xScale = scaleLinear().domain([0,8]).range([0, (this.dataSet.length + 1) * 50]);
        let yScale = scaleLinear().domain([0, max(this.dataSet) + 50]).range([max(this.dataSet) + 50, 0]);

        // 坐标轴
        let xAxis = axisBottom(xScale).ticks(this.dataSet.length);
        let yAxis = axisLeft(yScale).ticks(10);

        // 绘制
        this.svg.append('g')
            .attr('transform', `translate(${this.padding.left}, ${this.height - this.padding.bottom})`)
            .call(xAxis);

        this.svg.append('g')
            .attr('transform', `translate(${this.padding.left}, ${this.height - this.padding.bottom - (max(this.dataSet) + 50)})`)
            .call(yAxis);
    }

    demo2() {
        let characters: string[] = ['A', 'S', 'D', 'F'];

        // 绘制四个矩形
        let rect = this.svg.selectAll('.rect')
            .data(characters)
            .enter()
            .append('rect')
            .attr('width', 60)
            .attr('height', 60)
            .attr('x',  (d: string, i: number) => {
                return this.padding.left + i * 70;
            })
            .attr('y',this.padding.top)
            .attr('fill', schemeCategory10[0]);


        let text = this.svg.selectAll('.text')
            .data(characters)
            .enter()
            .append('text')
            .attr('y', this.padding.top)
            .attr('x', (d: string , i: number) => {
                return this.padding.left + i * 70;
            })
            .attr('dy', '1.7em')
            .attr('dx', 30)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('font-size', '22px')
            .text(function (d: string) {
                return d;
            });

        // 添加监听
        select('body')
            .on('keydown', function () {
                rect.attr('fill', function (d: string) {
                    if(d === String.fromCharCode(event.keyCode)) {
                        return schemeCategory10[1]
                    } else {
                        return schemeCategory10[0]
                    }
                })
            })
            .on('keyup', function () {
                rect.attr('fill', schemeCategory10[0])
            })
    }

    demo3() {
        let circle = this.svg.append('circle')
            .attr('r', 50)
            .attr('cx', 150)
            .attr('cy', 200)
            .attr('fill', schemeCategory10[0])
            .on('touchstart', function () {
                select(this).attr('fill', schemeCategory10[1])
            })
            .on('touchmove', function () {
                let pos = touches(this)[0];

                select(this).attr('cx', pos[0])
                    .attr('cy', pos[1]);
            })
            .on('touchend', function () {
                select(this).attr('fill', schemeCategory10[0])
            })
    }
}

let index: Index = new Index();
index.demo3();



export default Index;