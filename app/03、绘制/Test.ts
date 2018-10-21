/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-21 11:24
 */
import {select} from "d3-selection";
import {formatPrefix} from "d3-format";
import {chord, ChordLayout, ribbon} from "d3-chord";
import {descending} from "d3-array";
import {arc} from "d3-shape";

class Test{
    private static matrix = [
        [11975,  5871, 8916, 2868],
        [ 1951, 10048, 2060, 6171],
        [ 8010, 16145, 8090, 8045],
        [ 1013,   990,  940, 6907]
    ];

    private static width = 960;                         // 获取svg元素的宽度
    private static height = 960;                        //  获取svg元素的高度
    private static svg;
    private static outerRadius = Math.min(Test.width, Test.height) * .5 -40;
    private static innerRadius = Test.outerRadius - 30;

    static main() {
        this.svg = select('body').selectAll('svg').enter().append('svg')
            .attr('height', this.height)
            .attr('width', this.width);

        let formatValue: (n: number | { valueOf(): number }) => string = formatPrefix(',.0', 1e3);

        let chordMain: ChordLayout = chord()
            .padAngle(0.05)
            .sortSubgroups(descending);

        let arcMain = arc()
            .innerRadius(this.innerRadius)
            .outerRadius(this.outerRadius);

        let ribbonMain = ribbon().radius(this.innerRadius)




    }
}

enum GetColor {
    "#000000",
    "#FFDD89",
    "#957244",
    "#F26223"
}


export default Test;