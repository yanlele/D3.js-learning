/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-26 23:20
 */
import {select} from "d3-selection";
import {arc, pie} from "d3-shape";
import {schemeAccent, schemeBlues, schemeCategory10, schemePaired, schemeSet1} from "d3-scale-chromatic";
import {sum} from "d3-array";
import Demo2 from "./Demo2";
import Demo3 from "./Demo3";
import Demo4 from "./Demo4";
import Demo5 from "./Demo5";
import Demo6 from "./Demo6";
import Demo7 from "./Demo7";
import Demo8 from "./Demo8";
import Demo9 from "./Demo9";
import Demo10 from "./Demo10";
import Demo11 from "./Demo11";


class Index {
    private width: number = 600;
    private height: number = 600;
    private svg;

    constructor() {
        this.svg = select('body').append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
    }

    /*饼状图*/
    demo1() {
        let dataSet: any = [
            ['小米', 60.8], ['三星', 58.4], ['联想', 47.3], ['苹果', 46.6],
            ['华为', 41.3], ['酷派', 40.1], ['其他', 111.5]
        ];

        let pieMain = pie().value(function (d) {
            return d[1]
        });
        let pieData = pieMain(dataSet);
        console.log(pieData);

        let outerRadius = this.width / 3;
        let innerRadius = 0;

        let arcMain = arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        let color = schemeCategory10;

        let arcs = this.svg.selectAll('g')
            .data(pieData)
            .enter()
            .append('g')
            .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

        arcs.append('path')
            .attr('fill', function (d: any, i: number) {
                return color[i];
            })
            .attr('d', function (d: any) {
                return arcMain(d);
            });

        // 添加文字
        arcs.append('text')
            .attr('transform', function (d: any) {
                let x: number = arcMain.centroid(d)[0] * 1.4;
                let y: number = arcMain.centroid(d)[1] * 1.4;
                return `translate(${x}, ${y})`
            })
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('font-size', 18)
            .text(function (d: any) {
                let percent: number = d.value / sum(dataSet, function (d: any) {
                    return d[1];
                }) * 100;
                return percent.toFixed(2) + '%';
            });

        // 添加链接弧外文字的直线元素
        arcs.append('line')
            .attr('x1', function (d: any) {
                return arcMain.centroid(d)[0] * 2;
            })
            .attr('y1', function (d: any) {
                return arcMain.centroid(d)[1] * 2;
            })
            .attr('x2', function (d: any) {
                return arcMain.centroid(d)[0] * 2.2;
            })
            .attr('y2', function (d: any) {
                return arcMain.centroid(d)[1] * 2.2;
            })
            .attr('stroke', 'black');

        // 添加文字
        arcs.append('text')
            .attr('dy', '.35em')
            .attr('text-anchor', 'middle')
            .attr('transform', function (d: any) {
                let x: number = arcMain.centroid(d)[0] * 2.4;
                let y: number = arcMain.centroid(d)[1] * 2.4;
                return `translate(${x}, ${y})`
            })
            .text(function (d: any) {
                return d.data[0];
            })
    }
}

// let index: Index = new Index();
// index.demo1();


// let demo2: Demo2 = new Demo2();
// demo2.main();

// let demo3: Demo3 = new Demo3();
// demo3.main();

// let demo4: Demo4 = new Demo4();
// demo4.main();

// let demo5: Demo5 = new Demo5();
// demo5.main();

// let demo6: Demo6 = new Demo6();
// demo6.main();

// let demo7: Demo7 = new Demo7();
// demo7.main();

// let demo8: Demo8 = new Demo8();
// demo8.main();

// let demo9: Demo9 = new Demo9();
// demo9.main();

// let demo10: Demo10 = new Demo10();
// demo10.main();

// let demo11: Demo11 = new Demo11();
// demo11.main();

export default Index;
