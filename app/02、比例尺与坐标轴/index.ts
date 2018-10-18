import {scaleLinear} from "d3-scale";
import {line} from "d3-shape";

class Index {
    /*比例尺*/
    demo1() {
        let linear = scaleLinear().domain([0, 500]).range([0, 100]);
        console.log(linear(50));            // 结果10
        console.log(linear(250));           // 结果50
        console.log(linear(450));           // 结果90
    }

    /*线性比例尺的用法*/
    demo2() {
        let linear = scaleLinear().domain([0, 20]).range([0, 100]);
        console.log(linear(10));            // 获取定义域为10 的值域 结果为 50
        console.log(linear(30));                      // 结果150
        console.log(linear.invert(80));         // 结果 16

        // 如果不希望超出范围
        linear.clamp(true);
        console.log(linear(30));                        // 100

        // 如果希望获取值域的时候四舍五入, 用下面的方法代替range()　方法
        linear.rangeRound([0, 100]);
        console.log(linear(13.33));                    // 67

        // 理想化定义域
        linear.domain([0.12300000, 0.4888888]).nice();
        console.log(linear.domain());                  // [0.1, 0.5]
    }
}

let index: Index = new Index();
index.demo2();


export default Index;