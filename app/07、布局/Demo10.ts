/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-31 21:25
 */


import {select} from "d3-selection";
import {hierarchy, treemap, treemapResquarify} from "d3-hierarchy";
import {schemeCategory10} from "d3-scale-chromatic";

/*简单矩阵树图示例*/
class Demo10 {
    main() {
        let height: number = 600;
        let width: number = 1200;
        let svg = select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        let data: any = {
            "name": "gen",
            "children": [
                {
                    "name": "num1",
                    "children": [{"name": "num1-1", "size": "5"}, {"name": "num1-2", "size": "5"}]
                },
                {
                    "name": "num2",
                    "size": 10
                },
                {
                    "name": "num3",
                    "size": 10
                },
                {
                    "name": "num4",
                    "size": 10
                },
                {
                    "name": "num5",
                    "size": 10
                }
            ]
        };

        let treeMapMain = treemap()
            .tile(treemapResquarify)
            .size([width, height])
            .round(true)
            .paddingInner(10);

        let hi = hierarchy(data)
            .sum(function (d: any) {
                return d.size
            })
            .sort(function (a: any, b: any) {
                return b.value - a.value
            });

        treeMapMain(hi);

        let cell = svg.selectAll('g')
            .data(hi.leaves())
            .enter()
            .append('g');

        cell.append('rect')
            .attr("x", function (d: any) {
                return d.x0;
            })
            .attr("y", function (d: any) {
                return d.y0;
            })
            .attr("width", function (d: any) {
                return d.x1 - d.x0;
            })
            .attr("height", function (d: any) {
                return d.y1 - d.y0;
            })
            .attr('fill', schemeCategory10[0]);

        cell.append('text')
            .attr('x', function (d: any) {
                return d.x0
            })
            .attr('y', function (d: any) {
                return d.y0
            })
            .attr('dy', '1.5em')
            .attr('dx', '1em')
            .attr('font-size', 18)
            .attr('fill', 'white')
            .text(function (d: any) {
                return `name: ${d.data.name} - size: ${d.data.size}`
            })
    }
}


export default Demo10;