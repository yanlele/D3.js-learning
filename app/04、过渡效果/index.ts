/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-22 23:03
 */
import {select, selection} from "d3-selection";
import {schemeCategory10} from "d3-scale-chromatic";

class Index {
    private width: number = 600;
    private height: number = 600;
    private svg;

    constructor() {
        this.svg = select('body').append('svg')
            .attr('height', this.height)
            .attr('width', this.width);
    }

    demo1() {
        this.svg.append('rect')
            .attr('fill', schemeCategory10[0])
            .attr('x', 10)
            .attr('y', 10)
            .attr('width', 100)
            .attr('height', 100)
            .transition()
            .duration(3000)
            .attr('width', 300)
    }
}

let index = new Index();
index.demo1();


export default Index;