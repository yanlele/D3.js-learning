/**
 * create by yanlele
 * create time 2018-10-30 15:21
 */
import {hierarchy, tree} from "d3-hierarchy";
import {line, linkHorizontal} from "d3-shape";
import {select, selectAll} from "d3-selection";

class Demo8 {
    private treeData: any = {
        "name": "中国",
        "children":
            [
                {
                    "name": "浙江",
                    "children":
                        [
                            {"name": "杭州"},
                            {"name": "宁波"},
                            {"name": "温州"},
                            {"name": "绍兴"}
                        ]
                },

                {
                    "name": "广西",
                    "children":
                        [
                            {
                                "name": "桂林",
                                "children":
                                    [
                                        {"name": "秀峰区"},
                                        {"name": "叠彩区"},
                                        {"name": "象山区"},
                                        {
                                            "name": "七星区",
                                            "children":
                                                [
                                                    {"name": "哈尔滨"},
                                                    {"name": "齐齐哈尔"},
                                                    {"name": "牡丹江"},
                                                    {"name": "大庆"}
                                                ]
                                        }
                                    ]
                            },
                            {"name": "南宁"},
                            {"name": "柳州"},
                            {"name": "防城港"}
                        ]
                },

                {
                    "name": "黑龙江",
                    "children":
                        [
                            {"name": "哈尔滨"},
                            {"name": "齐齐哈尔"},
                            {"name": "牡丹江"},
                            {"name": "大庆"}
                        ]
                },

                {
                    "name": "新疆",
                    "children":
                        [
                            {"name": "乌鲁木齐"},
                            {"name": "克拉玛依"},
                            {"name": "吐鲁番"},
                            {"name": "哈密"}
                        ]
                }
            ]
    };

    main() {
        let width: number = 900;
        let height: number = 1400;
        let treeWidth: number = width - 50;
        let treeHeight: number = height - 50;

        let treeMain = tree()
            .size([treeWidth, treeHeight])
            .separation(function (a, b) {
                return (a.parent === b.parent) ? 1 : 2
            });


        const hierarchyData = hierarchy(this.treeData).sum(function (d) {
            return d.value
        });

        // 创建svg
        let svg = select('body')
            .append('svg')
            .attr('width', treeWidth)
            .attr('height', treeHeight)
            .append('g')
            .attr('transform', 'translate(40, 0)');

        // 获取节点
        let nodes = hierarchyData.descendants();

        // 获取边线
        let links = hierarchyData.links();


        console.log('nodes: ', nodes);
        console.log('links: ', links);

        let g = svg.append('g').attr('transform', 'translate(40, 40)');

        // 绘制线
        g.selectAll('.link')
            .data(links)
            .enter().append('path')
            .attr('class', 'link')
            .style('fill', '#cccccc');
            // .attr('d', linkHorizontal()
            //     .x(function (d: any) {
            //         return d.y
            //     })
            //     .y(function (d: any) {
            //         return d.x
            //     }))

        g.selectAll('.node')
            .data(nodes)
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', function (d: any) {
                console.log(d);
                return `translate(${d.y}, ${d.x})`
            });
        g.selectAll('.node')
            .append('circle')
            .attr('r', 5)
            .attr('fill', 'green');
        g.selectAll('.node')
            .append('text')
            .attr('dy', 3)
            .attr('x', function (d: any) {
                return d.children ? -8 : 8;
            })
            .attr('text-anchor', function (d: any) {
                return d.children ? 'end' : 'start'
            })
            .text(function (d: any) {
                return d.data.name
            })
            .style('font-size', '11px')
    }
}

export default Demo8;