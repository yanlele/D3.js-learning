/**
 * create by yanlele
 * create time 2018-10-24 19:23
 */
import {event, select} from "d3-selection";
import {schemeCategory10} from "d3-scale-chromatic";
import {range} from "d3-array";
import {scaleLinear, scaleOrdinal} from "d3-scale";
import {axisBottom} from "d3-axis";
import CircleDemo from "../04、过渡效果/CircleDemo";
import {forceCenter, forceLink, forceManyBody, forceSimulation} from "d3-force";
import {drag} from "d3-drag";

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
            .on('tick', ()=>this.ticked(links, linksText, gs))
            .force('forceLinkMain', forceLinkMain)
            .force('charge', forceManyBody())
            .force('forceCenterMain', forceCenterMain);

        let links = this.svg.append('g')
            .selectAll('link')
            .data(this.edges)
            .enter()
            .append('link')
            .attr('fill', function (d: any, i: number) {
                return colorScale(i.toString())
            })
            .attr('stroke-width', 1);

        let linksText = this.svg.append('g')
            .selectAll('text')
            .data(this.edges)
            .enter()
            .append('text')
            .text(function (d: any, i: number) {
                return d.relation
            })
            .call(
                drag()
                    .on('start', function (d: any) {
                        if(!event.active) {
                            forceSimulationMain.alphaTarget(0.8).restart();
                        }
                        d.fx = d.x;
                        d.fy = d.y;
                    })
                    .on('drag', function (d: any) {
                        console.log('d.fx', d.fx);
                        console.log('d.fy', d.fy);
                        console.log('x', event.x);
                        console.log('y', event.y);
                        d.fx = event.x;
                        d.fy = event.y;
                    })
                    .on('end', function (d: any) {
                        if(!event.active) {
                            forceSimulationMain.alphaDecay(0);
                            d.df = null;
                            d.dy = null
                        }
                    })
            );

        let gs = this.svg.selectAll('.circleText')
            .data(this.nodes)
            .enter()
            .append('g')
            .attr('transform', function (d: any, i: number) {
                return `translate(${d.x}}, ${d.y})`
            });

        gs.appned('circle')
            .attr('r', 10)
            .attr('fill', function (d: any, i: number) {
                return colorScale(i.toString())
            });

        gs.append('text')
            .text(function (d: any) {
                return d.name
            });
    }

    ticked(links, linksText, gs) {
        links
            .attr('x1', function (d: any) {
                return d.source.x;
            })
            .attr('y1', function (d: any) {
                return d.source.y;
            })
            .attr('x2', function (d: any) {
                return d.target.x;
            })
            .attr('y2', function (d: any) {
                return d.target.y;
            });

        linksText
            .attr('x', function (d: any) {
                return (d.source.x + d.target.x) / 2;
            })
            .attr('y', function (d: any) {
                return (d.source.y + d.target.y) / 2;
            });

        gs.attr('transform', function (d: any) {
            return `translate(${d.x}, ${d.y})`
        })
    }
}

let circleDemo: CircleDemo = new CircleDemo();


export default Index;
