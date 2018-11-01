/**
 * create by yanlele
 * create time 2018-11-01 12:08
 */
import {geoMercator, geoPath} from "d3-geo";
import {schemeCategory10} from "d3-scale-chromatic";
import {json} from "d3-fetch";
import Base from "./Base";
import {selectAll} from "d3-selection";


class Demo1 extends Base {
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
                    .attr('d', path);



            });
    }
}

export default Demo1;