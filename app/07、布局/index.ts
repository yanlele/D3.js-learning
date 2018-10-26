/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-26 23:20
 */
import {select} from "d3-selection";
import {arc, pie} from "d3-shape";
import {schemeAccent, schemeBlues, schemeCategory10, schemePaired, schemeSet1} from "d3-scale-chromatic";


class Index {
    private width: number = 600;
    private height: number = 600
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
            })


    }
}

let index: Index = new Index();
index.demo1();


export default Index;