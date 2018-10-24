/**
 * create by yanlele
 * create time 2018-10-24 19:23
 */
import {select} from "d3-selection";
import {schemeCategory10} from "d3-scale-chromatic";
import {range} from "d3-array";
import {scaleLinear} from "d3-scale";
import {axisBottom} from "d3-axis";

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
        let color = schemeCategory10;

        let xScale = scaleLinear().domain([1, 10]).range([0, 400])

        let bottomAxis = axisBottom(xScale);

        let xLine = this.svg.append('g')
            .attr('transform', 'translate(80, 80)')
            .call(bottomAxis);
    }


}

let index: Index = new Index();
index.main();


export default Index;
