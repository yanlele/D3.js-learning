/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-26 23:20
 */
import {select} from "d3-selection";

class Index {
    private width: number = 600;
    private height: number = 600
    private svg;

    constructor() {
        this.svg = select('body').append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
    }
}

let index:Index = new Index();


export default Index;