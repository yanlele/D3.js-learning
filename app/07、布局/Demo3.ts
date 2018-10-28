/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-28 14:51
 */

/*书籍上的示例，用5版本的写法*/
import {event, select} from "d3-selection";
import {forceCenter, forceLink, forceManyBody, forceSimulation} from "d3-force";
import {scaleOrdinal} from "d3-scale";
import {range} from "d3-array";
import {schemeCategory10} from "d3-scale-chromatic";
import {drag} from "d3-drag";

class Demo3 {
    private nodes: { name: string }[] = [
        {name: '0'},
        {name: '1'},
        {name: '2'},
        {name: '3'},
        {name: '4'},
        {name: '5'},
        {name: '6'},
    ];

    private edges: any[] = [
        {source: 0, target: 1},
        {source: 0, target: 2},
        {source: 0, target: 3},
        {source: 1, target: 4},
        {source: 1, target: 5},
        {source: 1, target: 6}
    ];

    private height = 800;
    private width = 800;

    private svg = select('body').append('svg').attr('width', this.width).attr('height', this.height);

    main() {
        let forceLinkMain = forceLink().links(this.edges).distance(150);

        let forceCenterMain = forceCenter().x(this.width / 2).y(this.height / 2);

        let forceSimulationMain = forceSimulation()
            .nodes(this.nodes)
            .force('forceLinkMain', forceLinkMain)
            .force('charge', forceManyBody().strength(-25))
            .force('forceCenterMain', forceCenterMain)
            .on('end', function () {
                console.log('end')
            })
            .on('tick', function () {
                lines
                    .attr('x1', function (d: any) {
                        return d.source.x
                    })
                    .attr('y1', function (d: any) {
                        return d.source.y
                    })
                    .attr('x2', function (d: any) {
                        return d.target.x
                    })
                    .attr('y2', function (d: any) {
                        return d.target.y
                    });

                circles
                    .attr('cx', function (d: any) {
                        return d.x
                    })
                    .attr('cy', function (d: any) {
                        return d.y
                    });

                texts
                    .attr('x', function (d: any) {
                        return d.x
                    })
                    .attr('y', function (d: any) {
                        return d.y
                    })
            });

        console.log(this.nodes);
        console.log(this.edges);

        let colorScale = scaleOrdinal(range(this.nodes.length).map(function (d: number) {
            return d.toString()
        })).range(schemeCategory10);

        let lines = this.svg.selectAll('.forceLine')
            .data(this.edges)
            .enter()
            .append('line')
            .attr('stroke', function (d: any, i: number) {
                return colorScale((i%10).toString())
            })
            .attr('stroke-width', 2);

        let circles = this.svg.selectAll('.forceCircle')
            .data(this.nodes)
            .enter()
            .append('circle')
            .attr('class', 'forceCircle')
            .attr('r', 20)
            .style('fill', function (d: any, i: number) {
                return colorScale((i % 10).toString())
            });

        // 研究想一下拖拽
        this.svg.selectAll('.forceCircle')
            .call(drag()
                .on('start', function (d: any) {
                    console.log('开始')
                })
                .on('end', function (d: any) {
                    console.log('end')
                })
                .on('drag', function (d: any) {
                    select(this)
                        .attr('cx', d.cx = event.x)
                        .attr('cy', d.cy = event.y)
                })
            );

        let texts = this.svg.selectAll('.forceText')
            .data(this.nodes)
            .enter()
            .append('text')
            .attr('x', function (d: any) {
                return d.x
            })
            .attr('y', function (d: any) {
                return d.y
            })
            .attr('fill', 'white')
            .attr('stroke', 'white')
            .attr('text-anchor', 'middle')
            .attr('dy', '.3em')
            .text(function (d: any) {
                return d.name
            })
    }
}


export default Demo3;