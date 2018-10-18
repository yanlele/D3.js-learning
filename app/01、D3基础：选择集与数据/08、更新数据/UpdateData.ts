/**
 * create by yanlele
 * create time 2018-10-18 12:11
 */
import {select, Selection} from "d3-selection";
import {descending} from "d3-array";

class UpdateData {
    /*实时更新数据*/
    static draw() {
        // 矩形的高度
        let dataset: Array<number> = [50, 43, 120, 87, 99, 167, 142];

        // 创建svg 画布的宽高
        let width: number = 400;
        let height: number = 400;

        let svg = select('body').append('svg');
        svg.attr('width', width);
        svg.attr('height', width);

        // 定义上下边距
        let padding: any = {
            top: 20,
            bottom: 20,
            right: 20,
            left: 20
        };

        // 矩形所占据的宽度， 包括空白，单位为像素
        let rectStep: number = 35;

        // 矩形所餐具的宽度， 不包括空白， 单位像素
        let rectWidth: number = 30;

        let updateRect = svg.selectAll('rect')
            .data(dataset);
        let enterRect = updateRect.enter();
        let exitRect = updateRect.exit();

        updateRect
            .attr('fill', 'SlateBlue')
            .attr('x', function (d, i) {
                return padding.left + i * rectStep;
            })
            .attr('y', function(d) {
                return height - d -padding.bottom
            })
            .attr('width', rectWidth)
            .attr('height', function(d) {
                return d
            });

        // enter处理办法
        enterRect
            .append('rect')
            .sort(descending)
            .attr('fill', 'SlateBlue')
            .attr('x', function (d, i) {
                return padding.left + i * rectStep;
            })
            .attr('y', function(d) {
                return height - d -padding.bottom
            })
            .attr('width', rectWidth)
            .attr('height', function(d) {
                return d
            });
        exitRect.remove();

    }
}


export default UpdateData;