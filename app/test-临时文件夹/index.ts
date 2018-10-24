/**
 * create by yanlele
 * create time 2018-10-24 19:23
 */
import {select} from "d3-selection";
import {schemeCategory10} from "d3-scale-chromatic";
import {range} from "d3-array";

class Index {
    private width: number = 600;
    private height: number = 600;
    private svg;
    private padding: any = {
        top: 20,
        bottom: 20,
        right: 20,
        left: 20
    };

    constructor() {
        this.svg = select('body').append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
    }

    main() {
        let dataSet: Array<number> = range(5);

        // 定义色彩
        let color: ReadonlyArray<string> = schemeCategory10;

        let circle = this.svg.selectAll('circle');
        circle.data(dataSet)
            .enter()
            .append('circle')
            .attr('cx', function (d: number) {
                return 100 + d * 80
            })
            .attr('cy', 100)
            .attr('r', 30)
            .attr('fill', function (d: number, i: number) {
                return color[i]
            })

    }


}

let index: Index = new Index();
index.main();


export default Index;
