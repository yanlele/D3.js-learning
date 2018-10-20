/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-20 11:04
 */
import {rgb} from "d3-color";
import {interpolate} from "d3-interpolate";
import {select} from "d3-selection";
import {area, curveBasis, curveCardinal, curveStep, Line, line} from "d3-shape";
import {schemeCategory10} from "d3-scale-chromatic";

class Index {
    private svg;
    private height: number;
    private width: number;
    private points: [number, number][];

    constructor() {
        let width: number = 600, height: number = 600;
        this.svg = select('body').append('svg')
            .attr('height', height)
            .attr('width', width);

        this.height = 600;
        this.width = 600;
        this.points = [[80, 80], [120, 120], [160, 160], [200, 200], [240, 240], [280, 280]]
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

    /*区域生成器 area*/
    demo4() {
        let dataSet: [number, number][] = [[80, 80], [120, 120], [130, 130], [70, 70], [60, 60], [90, 90]];

        // 创建一个区域生成器
        let areaPath = area()
            .x((d: [number, number], i: number) => {
                return 50 + i * 60;
            })
            .y0((d: [number, number], i: number) => {
                return this.height / 2;
            })
            .y1((d: [number, number], i: number) => {
                return this.height / 2 - d[1];
            });

        this.svg.append('path')
            .attr('d', areaPath(dataSet))
            .attr('stroke', 'block')
            .attr('stroke-width', '3px')
            .attr('fill', schemeCategory10[0])
    }
}

let index: Index = new Index();
index.demo4();

export default Index;