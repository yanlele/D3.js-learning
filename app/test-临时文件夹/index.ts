/**
 * create by yanlele
 * create time 2018-10-24 19:23
 */
import {event, select} from "d3-selection";
import {schemeCategory10} from "d3-scale-chromatic";
import {histogram, max, range} from "d3-array";
import {scaleLinear, scaleOrdinal} from "d3-scale";
import {axisBottom} from "d3-axis";
import CircleDemo from "../04、过渡效果/CircleDemo";
import {forceCenter, forceLink, forceManyBody, forceSimulation} from "d3-force";
import {drag} from "d3-drag";
import {randomBates} from "d3-random";

interface IEdges {
    source: number;
    target: number;
    relation: string;
    value: number
}

class Index {
    main() {
        let width: number = 900;
        let height: number = 900;
        let padding: any = {
            top: 30,
            bottom: 30,
            left: 30,
            right: 30,
        };
        let data:number[] = range(1000).map(randomBates(10));

        let xScale = scaleLinear().domain([0, 20]).rangeRound([0, width]);

        let histogramMain = histogram().domain([0, 20]).thresholds(xScale.ticks(20));

        let bins = histogramMain(data);

        let yScale = scaleLinear().domain([0, max(bins, function (d: any) {
            return d.length;
        })]).range([height - padding.bottom - padding.top, 0]);

        // 绘图
    }
}

// let circleDemo: CircleDemo = new CircleDemo();
let index: Index = new Index();
index.main();

export default Index;
