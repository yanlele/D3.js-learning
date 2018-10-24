/**
 * create by yanlele
 * create time 2018-10-24 19:23
 */
import {select} from "d3-selection";
import {schemeCategory10} from "d3-scale-chromatic";

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

    }


}

let index: Index = new Index();
index.main();


export default Index;
