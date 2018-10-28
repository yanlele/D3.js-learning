/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-27 21:16
 */
import {event, select, selectAll} from "d3-selection";
import {scaleOrdinal} from "d3-scale";
import {merge, range} from "d3-array";
import {schemeCategory10} from "d3-scale-chromatic";
import {forceCenter, forceLink, forceManyBody, forceSimulation} from "d3-force";
import {drag} from "d3-drag";

class Demo2 {
    private marge = {
        top: 60,
        bottom: 60,
        left: 60,
        right: 60
    };
    private svg;
    private width = 600;
    private height = 600;

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
        function ticked() {
            links
                .attr('x1', function (d) {
                    return d.source.x
                })
                .attr('y1', function (d) {
                    return d.source.y
                })
                .attr('x2', function (d) {
                    return d.target.x
                })
                .attr('y2', function (d) {
                    return d.target.y
                });

            linkText
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

        //　设置一个颜色比例尺
        let colorScale = scaleOrdinal().domain(range(this.nodes.length).map(function (d: number) {
            return d.toString()
        })).range(schemeCategory10);

        // 周边数据
        let forceLinkMain = forceLink().links(this.edges).distance(function (d: any) {
            return d.value * 100
        });

        // 设置圆形的中间位置
        let forceCenterMain = forceCenter().x(this.width / 2).y(this.height / 2);

        // 创建一个力导向
        let forceSimulationMain = forceSimulation()
            .nodes(this.nodes)                                      // 生成节点数据
            .on('tick', ticked)                          // 非常重要
            .force('link', forceLinkMain)
            .force('change', forceManyBody())
            .force('center', forceCenterMain);

        // 这个时候 可以看到, 把我们的基础数据抛给 上面函数运行一遍，我们的基础函数就就得到了编译了
        console.log(this.nodes);
        console.log(this.edges);

        // 绘制边
        let links = this.g.append('g')
            .selectAll('line')
            .data(this.edges)
            .enter()
            .append('link')
            .attr('stroke', function (d: any, i: number) {
                return colorScale(i.toString())
            });

        // 绘制文字
        let linkText = this.g.append('g')
            .selectAll('text')
            .data(this.edges)
            .enter()
            .append('text')
            .text(function (d) {
                return d.relation
            });

        // 多拽函数
        let dragFun = drag().on('start', function (d: any) {
            if (!event.action) {
                forceSimulationMain.alphaTarget(0.8).restart();
            }
            d.fx = d.x;
            d.fy = d.y;
        }).on('end', function (d: any) {
            if (!event.active) {
                forceSimulationMain.alphaTarget(0);
            }
            d.fx = null;
            d.fy = null;
        }).on('drag', function (d: any) {
            d.fx = event.x;
            d.fy = event.y;
        });

        // 建立用来放在每个节点和对应文字的分组<g>
        let gs = selectAll('.circleText')
            .data(this.nodes)
            .enter()
            .append('g')
            .attr('transform', function (d: any, i: number) {
                let cirX = d.x;
                let cirY = d.y;
                return `translate(${cirX}, ${cirY})`
            });


        // 节点和文字
        gs.append('circle')
            .attr('r', 10)
            .attr('fill', function (d: any, i: number): any {
                return colorScale(i.toString())
            });

        gs.append('text')
            .attr('x', -10)
            .attr('y', -20)
            .attr('dy', 10)
            .text(function (d: any) {
                return d.name
            });


    }
}

export default Demo2;