/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-25 21:37
 */
import {select} from "d3-selection";
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
                return this.padding.left + 50 * i
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

        // 比例尺
        let xScale = scaleLinear().domain([0,8]).range([0, (this.dataSet.length + 1) * 50]);
        let yScale = scaleLinear().domain([0, max(this.dataSet) + 50]).range([max(this.dataSet) + 50, 0]);

        // 坐标轴
        let xAxis = axisBottom(xScale).ticks(this.dataSet.length);
        let yAxis = axisLeft(yScale).ticks(10);


    }
}

let index: Index = new Index();
index.demo1();



export default Index;