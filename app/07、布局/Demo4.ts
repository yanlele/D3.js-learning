/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-28 19:35
 */
import {select} from "d3-selection";
import {formatPrefix} from "d3-format";
import {chord, ChordGroup, ChordLayout, ribbon, Ribbon, RibbonGenerator, RibbonSubgroup} from "d3-chord";
import {descending, range} from "d3-array";
import {Arc, arc, DefaultArcObject} from "d3-shape";
import {rgb} from "d3-color";


/*官方弦图实例*/
class Demo4 {
    private matrix: number[][] = [
        [11975, 5871, 8916, 2868],
        [1951, 10048, 2060, 6171],
        [8010, 16145, 8090, 8045],
        [1013, 990, 940, 6907]
    ];
    private width = 960;
    private height = 960;
    private svg;

    constructor() {
        this.svg = select('body').append('svg')
            .attr('height', this.height)
            .attr('width', this.width);
    }

    main() {
        let outerRadius: number = Math.min(this.width, this.height) / 2 - 40;
        let innerRadius: number = outerRadius - 30;

        let formatValue: (n: number | { valueOf(): number }) => string = formatPrefix(',.0', 1e3);

        let chordMain: ChordLayout = chord()
            .padAngle(0.05)
            .sortSubgroups(descending);

        let arcMain: Arc<any, DefaultArcObject> = arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        let ribbonMain: RibbonGenerator<any, Ribbon, RibbonSubgroup> = ribbon()
            .radius(innerRadius);

        let g = this.svg
            .append('g')
            .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`)
            .datum(chordMain(this.matrix));

        let group = g.append('g')
            .attr('class', 'groups')
            .selectAll('g')
            .data(function (chords) {
                return chords.groups
            })
            .enter()
            .append('g');

        group.append('path')
            .style('fill', function (d: ChordGroup) {
                return GetColor[d.index]
            })
            .style('stroke', function (d: ChordGroup) {
                return rgb(GetColor[d.index]).darker().toString();
            })
            .attr('d', arcMain);

        let groupTick = group.selectAll('.group-tick')
            .data((d: ChordGroup) => {
                return this.groupTicks(d, 1e3)
            })
            .enter()
            .append('g')
            .attr('transform', function (d: any) {
                return `rotate(${d.angle * 180 / Math.PI - 90}) translate(${outerRadius}, 0)`;
            });

        groupTick.append('line')
            .attr('stroke', '#000')
            .attr('x2', 6);

        groupTick.filter(function (d: any) {
            return d.value % 5e3 === 0;
        })
            .append('text')
            .attr('x', 8)
            .attr('dy', '.35em')
            .attr('transform', function (d: any) {
                return d.angle > Math.PI ? 'rotate(180) translate(-16)' : null;
            })
            .style('text-anchor', function (d: any) {
                return d.angle > Math.PI ? 'end' : null;
            })
            .text(function (d: any) {
                return formatValue(d.value)
            });

        g.append('g')
            .style('fill-opacity', 0.67)
            .selectAll('path')
            .data(function (d: any) {
                return d
            })
            .enter()
            .append('path')
            .attr('d', ribbonMain)
            .style("fill", (d) => {
                return GetColor[d.target.index];
            })
            .style('stroke', function (d: any) {
                return rgb(GetColor[d.target.index]).darker();
            });
    }

    groupTicks(d: ChordGroup, step: number) {
        // k表示单位弧度
        let k: number = (d.endAngle - d.startAngle) / d.value;
        return range(0, d.value, step).map(function (value) {
            return {
                value,
                angle: value * k + d.startAngle
            };
        });
    }
}

enum GetColor {
    "#000000",
    "#FFDD89",
    "#957244",
    "#F26223"
}


export default Demo4;