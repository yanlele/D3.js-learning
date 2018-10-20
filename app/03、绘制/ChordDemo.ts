/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-20 20:40
 */
import {select} from "d3-selection";
import {formatPrefix} from "d3-format";
import {chord, ribbon} from "d3-chord";
import {descending, range} from "d3-array";
import {ChordLayout} from "d3-chord";
import {Arc, arc, DefaultArcObject} from "d3-shape";
import {scaleOrdinal} from "d3-scale";

class ChordDemo {
    // 数据的矩阵
    private static matrix = [
        [11975,  5871, 8916, 2868],
        [ 1951, 10048, 2060, 6171],
        [ 8010, 16145, 8090, 8045],
        [ 1013,   990,  940, 6907]
    ];
    private static width = 960;                         // 获取svg元素的宽度
    private static height = 960;                        //  获取svg元素的高度
    private static svg = select('body')         // 获取svg元素
        .selectAll('svg')
        .enter()
        .append('svg')
        .attr('width', ChordDemo.width)
        .attr('height', ChordDemo.height);

    static main() {
        // 计算外半径尺寸，这里取svg画布的宽、高的最小值的一半，减去40，表示两边留有余地；
        let outerRadius: number = Math.min(this.width, this.height) * 0.5 - 40,
            // 计算内半径尺寸
            innerRadius: number = outerRadius - 30;

        // 定义数值的格式化函数
        let formatValue: (n: number | { valueOf(): number }) => string = formatPrefix(',.0', 1e3);

        // 定义一个chord diagram的布局函数chord()由于通过chord()函数将matrix转换后，matrix实际分成了
        // 两个部分，groups 和 chords ,其中groups
        // 表示弦图上的弧，称为外弦，groups中的各个元素都被计算用添加上了angle、startAngle、endAngle、index、value
        // 等字段；chords 称为内弦，表示弦图中节点的连线及其权重。chords 里面分为 source 和 target ，分别标识连线的两端。
        let chordMain: ChordLayout = chord()
        // 设置弦片段之间的间隔角度，即chord diagram 图中组成外层圆圈的各个弧段之间的角度
            .padAngle(0.05)
        // 设置数据矩阵matrix 的行内各列的排序顺序为降序排列
            .sortSubgroups(descending);

        // 定义一个弧线的布局函数arc()
        let arcMain: Arc<any, DefaultArcObject> = arc()
        // 设置弧线的内半径
            .innerRadius(innerRadius)
        // 设置弧线的外半径
            .outerRadius(outerRadius);

        // 定义一个弦布局函数ribbon()
        let ribbonMain = ribbon()
        // 设置弦的半径为弧线的内半径
            .radius(innerRadius);

        // 定义一个颜色函数color(),返回离散的颜色值，即四种颜色
        let color = scaleOrdinal()
            .domain()
    }
}