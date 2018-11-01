/**
 * create by yanlele
 * create time 2018-11-01 12:08
 */
import {geoMercator, geoPath} from "d3-geo";
import {schemeCategory10} from "d3-scale-chromatic";
import {json} from "d3-fetch";
import Base from "./Base";
import {selectAll} from "d3-selection";


/*复杂使用示例： 点击某一省份， 显示出该省份的中心和边界框， 在控制台输出面积，中心， 边界信息*/
class Demo2 extends Base {
    constructor() {
        super();
    }

    main() {
        // 地图投影
        let projection = geoMercator()
            .center([107, 31])
            .scale(700)
            .translate([this.width / 2, this.height / 2]);

        // 地理路径生成器
        let path = geoPath().projection(projection);

        let color = schemeCategory10;

        json('china.geojson')
            .then( (root: any) => {
                let groups = this.svg.append('g');

                let paths = groups.selectAll('path')
                    .data(root.features)
                    .enter()
                    .append('path')
                    .attr('class', 'province')
                    .style('fill', function (d: any, i: number) {
                        return color[i%10];
                    })
                    .attr('d', path)
                    .on('click',  (d:any) => {
                        console.log(d);
                        // 计算面积、中心、边界框
                        let area = path.area(d);
                        let centroid = path.centroid(d);
                        let bounds = path.bounds(d);
                        let name = d.properties.name && d.properties.name;
                        let name_zh = d.properties.name_zh;

                        let currentAction = this.svg.selectAll(`#${name_zh}`);
                        let size: number =  currentAction.size();

                        if(!size) {
                            // 输出到控制台
                            console.log('省份：', name);
                            console.log('面积: ', area );
                            console.log('中心: ', centroid);
                            console.log('边界框：');
                            console.log(bounds);

                            // 显示中心
                            this.svg.append('circle')
                                .attr('id', name_zh)
                                .attr('cx', centroid[0])
                                .attr('cy', centroid[1])
                                .attr('r', 8)
                                .attr('fill', 'white');


                            // 边界框
                            this.svg.append('rect')
                                .attr('x', bounds[0][0])
                                .attr('id', name_zh)
                                .attr('y', bounds[0][1])
                                .attr('width', bounds[1][0] - bounds[0][0])
                                .attr('height', bounds[1][1] - bounds[0][1])
                                .attr('fill', 'none')
                                .attr('stroke', '#aeffda')
                                .attr('stroke-width', 2);
                        } else {
                            currentAction.remove();
                        }
                    })

            });
    }
}

export default Demo2;