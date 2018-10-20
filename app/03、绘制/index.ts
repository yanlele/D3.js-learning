/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-20 11:04
 */
import {rgb} from "d3-color";
import {interpolate} from "d3-interpolate";
import {select} from "d3-selection";
import {
    Arc, arc, area, curveBasis, curveCardinal, curveStep, DefaultArcObject, Line, line, symbol,
    symbols
} from "d3-shape";
import {schemeCategory10} from "d3-scale-chromatic";
import {chord, Ribbon, ribbon, RibbonSubgroup} from "d3-chord";
import {range} from "d3-array";
import ChordDemo from "./ChordDemo";

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

    test() {
        console.log('------------test------------------');
        console.log(range(4))
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

    /*弧形成器*/
    demo5() {
        let dataSet: DefaultArcObject = {
            startAngle: 0,
            endAngle: Math.PI * .75,
            innerRadius: 50,
            outerRadius: 100
        };
        // 创建弧形生成器
        let arcPath = arc();
        // 添加路径
        this.svg.append('path')
            .attr('d', arcPath(dataSet))
            .attr('transform', `translate(250, 250)`)
            .attr('stroke', schemeCategory10[0])
            .attr('stroke-width', '3px')
            .attr('fill', schemeCategory10[1])
    }

    /*弧形生成器的第二种用法*/
    demo6() {
        // 创建弧形生成器
        let arcPath = arc().innerRadius(50).outerRadius(100).startAngle(0).endAngle(Math.PI *.75);
        // 添加路径
        this.svg.append('path')
            .attr('d', arcPath)
            .attr('transform', `translate(250, 250)`)
            .attr('stroke', schemeCategory10[2])
            .attr('stroke-width', '3px')
            .attr('fill', schemeCategory10[3])
    }

    /*复杂的弧形生成器示例*/
    demo7() {
        let dataSet: DefaultArcObject[] = [
            {
                startAngle: 0,
                endAngle: Math.PI * .6,
                innerRadius: 0,
                outerRadius: 100
            },
            {
                startAngle: Math.PI * .6,
                endAngle: Math.PI,
                innerRadius: 0,
                outerRadius: 100
            },
            {
                startAngle: Math.PI,
                endAngle: Math.PI * 1.7,
                innerRadius: 0,
                outerRadius: 100
            },
            {
                startAngle: Math.PI * 1.7,
                endAngle: Math.PI * 2,
                innerRadius: 0,
                outerRadius: 100
            },
        ];

        let arcPath = arc();
        this.svg.selectAll('path')
            .data(dataSet)
            .enter()
            .append('path')
            .attr('d', function (d: DefaultArcObject) {
                return arcPath(d);
            })
            .attr('transform', 'translate(250, 250)')
            .attr('stroke', 'black')
            .attr('stroke-width', '2px')
            .attr('fill', function (d:DefaultArcObject, i: number) {
                return schemeCategory10[i]
            });

        // 添加文字
        this.svg.selectAll('text')
            .data(dataSet)
            .enter()
            .append('text')
            .attr('transform', function (d: DefaultArcObject) {
                return `translate(250, 250) translate(${arcPath.centroid(d)})`
            })
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('font-size', '18px')
            .text(function(d: DefaultArcObject) {
                return Math.floor((d.endAngle - d.startAngle) * 180 / Math.PI) + '°'
            });
    }

    /*符号生成器: symbol*/
    demo8() {
        // 略过，以后如果需要用到的时候再来看看
    }

    /*弦生成器： ribbon 使用方法1*/
    demo9() {
        let dataSet: Ribbon = {
            source: {
                startAngle: 0.2,
                endAngle: Math.PI *0.3,
                radius: 100
            },
            target: {
                startAngle: Math.PI,
                endAngle: Math.PI * 1.6,
                radius: 100
            }
        };
        // 创建一个简单的弦生成器
        let ribbonIndex = ribbon();

        // 创建路径
        this.svg.append('path')
            .attr('d', ribbonIndex(dataSet))
            .attr('transform', 'translate(200, 200)')
            .attr('fill', schemeCategory10[1])
            .attr('stroke', schemeCategory10[0])
            .attr('stroke-width', '2px')
    }

    /*弦生成器： ribbon 使用方法2*/
    demo10() {
        // 创建一个简单的弦生成器
        let ribbonIndex = ribbon()
            .source(function (d: Ribbon): RibbonSubgroup {
                return {
                    startAngle: 0.2,
                    endAngle: Math.PI *0.3,
                    radius: 100
                }
            })
            .target(function (d: Ribbon): RibbonSubgroup {
                return {
                    startAngle: Math.PI,
                    endAngle: Math.PI * 1.6,
                    radius: 100
                }
            })
            .radius(100);

        this.svg.append('path')
            .attr('d', ribbonIndex)
            .attr('transform', 'translate(200, 200)')
            .attr('stroke', schemeCategory10[8])
            .attr('stroke-width', '2px')
            .attr('fill', schemeCategory10[9])
    }
}

// let index: Index = new Index();
// index.demo10();
// index.test();


let chordDemo:ChordDemo = new ChordDemo()
chordDemo.main();


export default Index;