/**
 * create by yanlele
 * create time 2018-11-01 9:59
 */


/*简单的矩阵树图示例2*/
import {select} from "d3-selection";
import {hierarchy, treemap, treemapResquarify} from "d3-hierarchy";
import {schemeCategory10} from "d3-scale-chromatic";
import {scaleOrdinal} from "d3-scale";
import {rgb} from "d3-color";


class Demo11 {
    main() {
        let data: any = {
            "name": "A1",
            "children": [
                {
                    "name": "B1",
                    "children": [
                        {
                            "name": "C1",
                            "value": 100
                        },
                        {
                            "name": "C2",
                            "value": 300
                        },
                        {
                            "name": "C3",
                            "value": 200
                        }
                    ]
                },
                {
                    "name": "B2",
                    "value": 200
                }
            ]
        };

        let width: number = 800;
        let height: number = 600;
        let svg = select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        let treeMapMain = treemap()
            .size([width, height])
            .tile(treemapResquarify)
            .paddingInner(16);

        let hiData = hierarchy(data)
            .sum(function (d: any) {
                return d.value
            })
            .sort(function (a:any, b:any) {
                return b.value - a.value
            });

        treeMapMain(hiData);
        console.log(hiData.leaves());

        let nodes = svg.selectAll('g')
            .data(hiData.leaves())
            .enter()
            .append('g');

        nodes.append('rect')
            .attr('x', function (d: any) {
                return d.x0
            })
            .attr('y', function (d: any) {
                return d.y0
            })
            .attr('height', function (d: any) {
                return d.y1-d.y0;
            })
            .attr('width', function (d:any) {
                return d.x1-d.x0;
            })
            .attr('fill', schemeCategory10[0]);

        nodes.append('text')
            .attr('x', function (d: any) {
                return d.x0
            })
            .attr('y', function (d: any) {
                return d.y0
            })
            .attr('dx', '1em')
            .attr('dy', '2em')
            .text(function (d:any) {
                return d.data.name;
            })
    }
}

export default Demo11