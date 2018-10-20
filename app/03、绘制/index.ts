/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-20 11:04
 */
import {rgb} from "d3-color";
import {interpolate} from "d3-interpolate";
import {select} from "d3-selection";
import {curveBasis, curveCardinal, curveStep, Line, line} from "d3-shape";

class Index {
    private svg;

    constructor() {
        let width: number = 600, height: number = 600;
        this.svg = select('body').append('svg')
            .attr('height', height)
            .attr('width', width);
    }

    /*插值*/
    demo1() {
        let a = rgb('red');
        let b = rgb('green');

        let compute = interpolate(a, b);

        console.log(compute(0));
        console.log(compute(.2));
        console.log(compute(.5));
        console.log(compute(1));
    }

    /*最简单的线段生成器*/
    demo2() {
        var lines: [number, number][] = [[80, 80], [200, 100], [200, 200], [100, 200], [80, 80]];

        // 创建一个线段生成器
        let linePath = line().x(function (d: [number, number]): number {
            return d[0];
        });
        this.svg.append('path')
            .attr('d', linePath(lines))
            .attr('stroke', 'black')
            .attr('stroke-width', '3px')
            .attr('fill', 'none')
    }

    /*线段生成器*/
    demo3() {
        let lines: [number, number][] = [[80, 80], [120, 120], [160, 160], [200, 200], [240, 240], [280, 280]];
        let linePath = line().x(function (d: [number, number]) {
            return d[0];
        }).y(function (d: [number, number], index: number) {
            return index % 2 === 0 ? 40 : 120;
        })
            .curve(curveBasis)
            .curve(curveCardinal)
            .curve(curveStep)
            .defined(function (d: [number, number]) {
                return d[0] < 200
            });

        this.svg.append('path')
            .attr('d', linePath(lines))
            .attr('stroke', 'black')
            .attr('stroke-width', '3px')
            .attr('fill', 'none')
    }

}

let index: Index = new Index();
index.demo3();

export default Index;