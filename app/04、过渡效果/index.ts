/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-22 23:03
 */
import {select} from "d3-selection";
import {schemeCategory10} from "d3-scale-chromatic";
import {easeBounceIn} from "d3-ease";
import {scaleLinear} from "d3-scale";
import {axisBottom} from "d3-axis";
import Method from "../02、比例尺与坐标轴/Method";
import {range} from "d3-array";

class Index {
    private width: number = 600;
    private height: number = 600;
    private svg;

    constructor() {
        this.svg = select('body').append('svg')
            .attr('height', this.height)
            .attr('width', this.width);
    }

    /*最简单过度函数*/
    demo1() {
        this.svg.append('rect')
            .attr('fill', schemeCategory10[0])
            .attr('x', 10)
            .attr('y', 10)
            .attr('width', 100)
            .attr('height', 100)
            .transition()
            .duration(3000)
            .attr('width', 300)
    }

    /*稍微复杂点儿的过度实例*/
    demo2() {
        this.svg.append('rect')
            .attr('fill', schemeCategory10[1])
            .attr('height', 100)
            .attr('width', 100)
            .attr('x', 10)
            .attr('y', 10)
            .transition()
            .delay(500)
            .duration(3000)
            .ease(easeBounceIn)
            .attr('width', 300)
    }

    /*transition.attrTween(name[, factory]) 的理解*/
    demo3() {
        this.svg.append('rect')
            .attr('fill', schemeCategory10[2])
            .attr('width', 100)
            .attr('height', 30)
            .attr('x', 10)
            .attr('y', 10)
            .transition()
            .duration(2000)
            .attrTween('width', function (d: any, i: number, a: any) {
                return function (t: number) {
                    return t * 300 + 100
                }
            })
    }

    /*transition.style(name, value[, priority]) 使用*/
    demo4() {
        this.svg.append('rect')
            .style('fill', schemeCategory10[0])
            .attr('width', 100)
            .attr('height', 30)
            .attr('x', 10)
            .attr('y', 10)
            .transition()
            .delay(1000)
            .style('fill', schemeCategory10[1])
    }

    /*文字的过渡*/
    demo5() {
        let rect = this.svg
            .append('rect')
            .style('fill', schemeCategory10[0])
            .attr('width', 100)
            .attr('height', 30)
            .attr('x', 10)
            .attr('y', 10);

        let text = this.svg
            .append('text')
            .attr('stroke', 'white')
            .attr('y', 15)
            .attr('x', 100)
            .attr('dy', '1em')
            .attr('text-anchor', 'end');

        let textTrans = text
            .transition()
            .duration(2000)
            .tween('text', function () {
                return function (t) {
                    text.text(Math.floor(t * 300))
                        .attr('x', Math.floor(100 + t * 300));
                    rect.attr('width', Math.floor(100 + t * 300))
                }
            })
    }

    /*子元素过度*/
    demo6() {
        let dataSet: number[] = [100, 100, 100];

        let g = this.svg.append('g');

        let rect = g.selectAll('rect')
            .data(dataSet)
            .enter()
            .append('rect')
            .attr('fill', schemeCategory10[0])
            .attr('id', function (d: number, i: number) {               // 给定给一个id　属性
                return 'rect' + i;
            })
            .attr('x', 10)
            .attr('y', function (d: number, i: number) {
                return 10 + i * 35;
            })
            .attr('width', function (d: number, i: number) {
                return d
            })
            .attr('height', 30);

        // 第二个元素添加过度效果
        g.transition()
            .select('#rect1')
            .attr('width', 300);

        //　全部过度
        g.transition()
            .selectAll('rect')
            .attr('width', 300);

        // 过滤器
        g.transition()
            .selectAll('rect')
            .filter(function (d: number, i: number) {
                return i >= 1;
            })
            .attr('width', 300)
    }

    /*transition.each([type, ] function)*/
    demo7() {
        let dataSet: number[] = [100, 100, 100];

        let g = this.svg.append('g');

        let rect = g.selectAll('rect')
            .data(dataSet)
            .enter()
            .append('rect')
            .attr('fill', schemeCategory10[0])
            .attr('id', function (d: number, i: number) {               // 给定给一个id　属性
                return 'rect' + i;
            })
            .attr('x', 10)
            .attr('y', function (d: number, i: number) {
                return 10 + i * 35;
            })
            .attr('width', function (d: number, i: number) {
                return d
            })
            .attr('height', 30);

        g.transition()
            .duration(2000)
            .selectAll('rect')
            .each(function (d: number, i: number) {
                console.log('start')
            })
            .attr('width', 300);
    }

    /*transition.call(function[, arguments…])*/
    demo8() {
        let xScale = scaleLinear().domain([0, 10]).range([0, 300]);

        let xAxis = axisBottom(xScale);

        let g = this.svg.append('g');

        g.attr('class', 'axis')
            .attr('transform', 'translate(50, 200)')
            .call(xAxis);

        xScale.domain([0, 50]);

        g.transition()
            .duration(2000)
            .call(xAxis)
    }

    demo9() {
        // 圆心数据
        let center: number[][] = range(10).map(function(item, index) {
            return [Method.randomFrom(1, 9)/ 10, Method.randomFrom(1, 9)/ 10];
        });

        // 外边框
        let padding: any = {top: 30, right: 30, bottom: 30, left: 30};

        // x轴
        let xAxisWidth: number = 300;

        // y轴
        let yAxisWidth: number = 300;

        //　x轴比例尺
        let xScale = scaleLinear().domain([0, 1]).range([0, xAxisWidth]);
        // y轴比例尺
        let yScale = scaleLinear().domain([0, 1]).range([0, yAxisWidth]);
    }


}

let index = new Index();
index.demo8();


export default Index;