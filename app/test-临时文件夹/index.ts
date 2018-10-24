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
        let rectStep: number = 35;
        let rectWidth: number = 30;
        let dataSet: number[] = [50, 43, 120, 87, 99, 167, 142];                // 高度
        let rect = this.svg.selectAll('rect');
        rect.data(dataSet)
            .enter()
            .append('rect')
            .attr('width', rectWidth)
            .attr('height', (d: number) => {
                return d;
            })
            .attr('y', (d: number) => {
                return this.height - d - this.padding.bottom
            })
            .attr('x', (d: number, i: number) => {
                return this.padding.left + i * rectStep;
            })
            .attr('fill', schemeCategory10[0]);

        let text = this.svg.selectAll('text');
        text.data(dataSet)
            .enter()
            .append('text')
            .attr('dx', rectWidth / 2)
            .attr('dy', '1em')
            .attr('x', (d: number, i: number) => {
                return this.padding.left + i * rectStep
            })
            .attr('y', (d: number, i: number) => {
                return this.height - this.padding.bottom - d;
            })
            .attr('text-anchor', 'middle')
            .attr('fill', schemeCategory10[1])
            .text((d:number) => {
                return d
            })
    }


}

let index: Index = new Index();
index.main();


export default Index;
