/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-27 21:16
 */
import {event, select, selectAll} from "d3-selection";
import {scaleOrdinal} from "d3-scale";
import {merge, range} from "d3-array";
import {schemeCategory10} from "d3-scale-chromatic";
import {
    forceCenter, forceLink, forceManyBody, forceSimulation, SimulationLinkDatum,
    SimulationNodeDatum
} from "d3-force";
import {drag} from "d3-drag";

class Demo2 {
    private marge = {
        top: 60,
        bottom: 60,
        left: 60,
        right: 60
    };
    private svg;
    private width = 800;
    private height = 800;

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
    private edges: { source: number, target: number, relation: string, value: number }[] = [
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

    private g;

    constructor() {
        this.svg = select('body').append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

        this.g = this.svg.append('g')
            .attr('transform', `translate(${this.marge.top}, ${this.marge.left})`)
    }

    main() {
        // 颜色比例尺
        let colorScale = scaleOrdinal().domain(range(this.nodes.length).map(function (item) {
            return item.toString();
        })).range(schemeCategory10);

        // 生成边集数据
        let forceLinkMain = forceLink().links(this.edges).distance(function (d: any) {
            return d.value * 100;
        });

        // 设置图形中心位置
        let forceCenterMain = forceCenter().x(this.width / 2).y(this.height / 2);

        let forceSimulationMain = forceSimulation()
            .nodes(this.nodes)
            .force('link', forceLinkMain)
            .force('charge', forceManyBody())
            .force('center', forceCenterMain)
    }
}

export default Demo2;