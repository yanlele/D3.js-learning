/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-22 23:03
 */
import {select} from "d3-selection";
import {schemeCategory10} from "d3-scale-chromatic";
import {easeBounceIn} from "d3-ease";

class Index {
    private width: number = 600;
    private height: number = 600;
    private svg;

    constructor() {
        this.svg = select('body').append('svg')
            .attr('height', this.height)
            .attr('width', this.width);
    }

    /*最简单过度函数*/
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

    /*稍微复杂点儿的过度实例*/
    demo2() {
        this.svg.append('rect')
            .attr('fill', schemeCategory10[1])
            .attr('height', 100)
            .attr('width', 100)
            .attr('x', 10)
            .attr('y', 10)
            .transition()
            .delay(500)
            .duration(3000)
            .ease(easeBounceIn)
            .attr('width', 300)
    }

    /*transition.attrTween(name[, factory]) 的理解*/
    demo3() {
        this.svg.append('rect')
            .attr('fill', schemeCategory10[2])
            .attr('width', 100)
            .attr('height', 30)
            .attr('x', 10)
            .attr('y', 10)
            .transition()
            .duration(2000)
            .attrTween('width', function (d: any, i: number, a: any) {
                return function (t: number) {
                    return t * 300 + 100
                }
            })
    }

    /*transition.style(name, value[, priority]) 使用*/
    demo4() {
        this.svg.append('rect')
            .style('fill', schemeCategory10[0])
            .attr('width', 100)
            .attr('height', 30)
            .attr('x', 10)
            .attr('y', 10)
            .transition()
            .delay(1000)
            .style('fill', schemeCategory10[1])
    }

    /*文字的过渡*/
    demo5() {
        let rect = this.svg
            .append('rect')
            .style('fill', schemeCategory10[0])
            .attr('width', 100)
            .attr('height', 30)
            .attr('x', 10)
            .attr('y', 10);

        let text = this.svg
            .append('text')
            .attr('stroke', 'white')
            .attr('y', 15)
            .attr('x', 100)
            .attr('dy', '1em')
            .attr('text-anchor', 'end');

        let textTrans = text
            .transition()
            .duration(2000)
            .tween('text', function () {
                return function (t) {
                     text.text(Math.floor( t * 300))
                         .attr('x', Math.floor(100 + t * 300));
                     rect.attr('width', Math.floor(100 + t * 300))
                }
            })
    }
}

let index = new Index();
index.demo5();


export default Index;