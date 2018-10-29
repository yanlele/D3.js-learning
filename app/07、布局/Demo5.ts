/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-28 20:49
 */
import {select} from "d3-selection";
import {
    chord,
    ChordGroup,
    ChordLayout,
    Chords,
    ChordSubgroup,
    ribbon,
    Ribbon,
    RibbonGenerator,
    RibbonSubgroup
} from "d3-chord";
import {ascending, max} from "d3-array";
import {schemeCategory10} from "d3-scale-chromatic";
import {arc, DefaultArcObject} from "d3-shape";
import {rgb} from "d3-color";

/*
* 书籍上的弦图示例
* */
class Demo5 {
    private continent: string[] = ['亚洲', '欧洲', '非洲', '美洲', '大洋洲'];
    private population: number[][] = [
        [9000, 870, 3000, 1000, 5200],
        [3400, 8000, 2300, 4922, 375],
        [2000, 2000, 7700, 4881, 1050],
        [3000, 8012, 5531, 500, 400],
        [3540, 4310, 1500, 1900, 300]
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
        let chordMain = chord()
            .padAngle(0.03)
            .sortSubgroups(ascending);

        // 弦图组 包含节点和弦
        let gChord = this.svg.append('g')
            .datum(chordMain(this.population))
            .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

        // 节点元素
        let gOuter = gChord.append('g');

        // 弦的元素
        let gInner = gChord.append('g');


        // 颜色
        let color = schemeCategory10;

        /*绘制节点*/
        let innerRadius = max([this.width, this.height]) / 2 * .7;
        let outerRadius = innerRadius * 1.1;

        // 生成弦
        let arcOuter = arc().innerRadius(innerRadius).outerRadius(outerRadius);

        // 弦图生成器
        let ribbonMain: RibbonGenerator<any, Ribbon, RibbonSubgroup> = ribbon()
            .radius(innerRadius);

        // 绘制节点弧度
        gOuter.selectAll('.outerPath')
            .data(function (d: Chords) {                // 绑定节点数
                return d.groups
            })
            .enter()
            .append('path')
            .attr('stroke', function (d: ChordGroup, i:number) {
                return rgb(schemeCategory10[d.index]).brighter();
            })
            .attr('stroke-width', 3)
            .style('fill', function (d: ChordGroup) {
                return schemeCategory10[d.index];
            })
            .attr('class', 'outerPath')
            // .attr('d', function (d: ChordGroup) {
            //     return arc()({
            //         startAngle: d.startAngle,
            //         endAngle: d.endAngle,
            //         innerRadius: innerRadius,
            //         outerRadius: outerRadius
            //     });
            // })
            /*
            * 说明
            * 这个地方因为预先给arcOuter定义了内外边距， 然后因为通过data注入了，groups
            * groups 有提预先计算好的角度数据，
            * 原理就如同上面是一模一样的。
            * */
            .attr('d', arcOuter);

        // 填写节点文字
        gOuter.selectAll('.outerText')
            .data(function (d: Chords) {
                return d.groups;
            })
            .enter()
            .append('text')
            .attr('class', 'outerText')
            .attr('dy', '.35em')
            .attr('transform', function (d: ChordGroup, ) {
                let angle: number = (d.startAngle + d.endAngle) / 2;    // 弧的中心角度

                let result: string = `rotate(${angle * 180/Math.PI})`;

                result += `translate(0, ${-1 * (outerRadius + 10)})`;

                if(angle > Math.PI * 2 /4 && angle < Math.PI * 6/4) {
                    result += 'rotate(180)'
                }
                return result;
            })
            .text( (d: ChordGroup, i: number) => {
                return this.continent[i];
            });

        gInner.selectAll('.innerPath')
            .data(function (d) {
                return d
            })
            .enter()
            .append('path')
            .attr('d', ribbonMain)
            .attr('stroke-width', 3)
            .attr('stroke', function (d) {
                return rgb(color[d.source.index]).darker()
            })
            .attr('class', 'innerPath')
            .attr('fill', function (d) {
                return color[d.source.index]
            });

        gOuter.selectAll('.outerPath')
            .on('mouseover', fade(0))
            .on('mouseout', fade(1));

        function fade(opacity: number) {
            return function (g, i) {
                gInner.selectAll('.innerPath')
                    .filter(function (d) {
                        return d.source.index != i && d.target.index != i;
                    })
                    .transition()
                    .style('opacity', opacity)
            }
        }
    }
}

export default Demo5;