import {scaleLinear} from "d3-scale";

class Index {
    /*线性比例尺最标准的用法*/
    demo1() {
        let linear = scaleLinear().domain([0, 500]).range([0, 100]);
        console.log(linear(50));            // 结果10
        console.log(linear(250));           // 结果50
        console.log(linear(450));           // 结果90
    }
}

let index: Index = new Index();
index.demo1();


export default Index;