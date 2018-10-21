/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-21 11:24
 */
import {select} from "d3-selection";
import {formatPrefix} from "d3-format";
import {chord, ChordGroup, ChordLayout, ribbon} from "d3-chord";
import {descending, range} from "d3-array";
import {arc} from "d3-shape";
import {rgb} from "d3-color";

class Test {
    private static matrix = [
        [11975, 5871, 8916, 2868],
        [1951, 10048, 2060, 6171],
        [8010, 16145, 8090, 8045],
        [1013, 990, 940, 6907]
    ];

    private static width = 960;                         // 获取svg元素的宽度
    private static height = 960;                        //  获取svg元素的高度
    private static svg;
    private static outerRadius = Math.min(Test.width, Test.height) * .5 - 40;
    private static innerRadius = Test.outerRadius - 30;

    static main() {
        this.svg = select('body').append('svg')
            .attr('height', this.height)
            .attr('width', this.width);

        let formatValue: (n: number | { valueOf(): number }) => string = formatPrefix(',.0', 1e3);

        let chordMain: ChordLayout = chord()
            .padAngle(0.05)
            .sortSubgroups(descending);

        let arcMain = arc()
            .innerRadius(this.innerRadius)
            .outerRadius(this.outerRadius);

        let ribbonMain = ribbon().radius(this.innerRadius);

        let g = this.svg.append('g')
            .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`)
            .datum(chordMain(this.matrix));

        g.append('g')
            .style('fill-opacity', '0.67')
            .selectAll('path')
            .data(function (chords) {
                return chords
            })
            .enter()
            .append('path')
            .attr('d', ribbonMain)
            .attr('fill', function (d) {
                return GetColor[d.target.index]
            })
            .attr('stroke', function (d) {
                return rgb(GetColor[d.target.index]).darker()
            })

    }

    static groupTicks(d: ChordGroup, step: number) {
        // k表示单位弧度
        let k: number = (d.endAngle - d.startAngle) / d.value;
        return range(0, d.value, step).map(function (value) {
            return {value: value, angle: value * k + d.startAngle};
        });
    }
}

enum GetColor {
    "#000000",
    "#FFDD89",
    "#957244",
    "#F26223"
}


export default Test;