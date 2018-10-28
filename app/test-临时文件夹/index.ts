/**
 * create by yanlele
 * create time 2018-10-24 19:23
 */
import {select} from "d3-selection";
import {schemeCategory10} from "d3-scale-chromatic";
import {range} from "d3-array";
import {scaleLinear, scaleOrdinal} from "d3-scale";
import {axisBottom} from "d3-axis";
import CircleDemo from "../04、过渡效果/CircleDemo";
import {forceCenter, forceLink, forceManyBody, forceSimulation} from "d3-force";

interface IEdges {
    source: number;
    target: number;
    relation: string;
    value: number
}

class Index {
    private width: number = 800;
    private height: number = 800;
    private svg;
    private padding: any = {
        top: 20,
        bottom: 20,
        right: 20,
        left: 20
    };

    private nodes: { name: string }[] = [
        {name: "湖南邵阳"},
        {name: "山东莱州"},
        {name: "广东阳江"},
        {name: "山东枣庄"},
        {name: "泽"},
        {name: "恒"},
        {name: "鑫"},
        {name: "明山"},
        {name: "班长"}
    ];
    private edges: IEdges[] = [
        {source: 0, target: 4, relation: "籍贯", value: 1.3},
        {source: 4, target: 5, relation: "舍友", value: 1},
        {source: 4, target: 6, relation: "舍友", value: 1},
        {source: 4, target: 7, relation: "舍友", value: 1},
        {source: 1, target: 6, relation: "籍贯", value: 2},
        {source: 2, target: 5, relation: "籍贯", value: 0.9},
        {source: 3, target: 7, relation: "籍贯", value: 1},
        {source: 5, target: 6, relation: "同学", value: 1.6},
        {source: 6, target: 7, relation: "朋友", value: 0.7},
        {source: 6, target: 8, relation: "职责", value: 2}
    ];

    constructor() {
        this.svg = select('body').append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
    }

    main() {
        let g = this.svg.append('g')
            .attr('transform', `translate(${this.padding.left}, ${this.padding.top})`);

        let colorScale = scaleOrdinal().domain(range(this.nodes.length).map(function (d: number, i: number) {
            return d.toString()
        })).range(schemeCategory10);

        let forceLinkMain = forceLink().links(this.edges).distance(function (d: IEdges) {
            return d.value * 100;
        });

        let forceCenterMain = forceCenter().x(this.width / 2).y(this.height / 2);

        let forceSimulationMain = forceSimulation()
            .nodes(this.nodes)
            .force('forceLinkMain', forceLinkMain)
            .force('charge', forceManyBody())
            .force('forceCenterMain', forceCenterMain)


    }
}

let circleDemo: CircleDemo = new CircleDemo();


export default Index;
