/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-28 14:51
 */

/*书籍上的示例，用5版本的写法*/
import {select} from "d3-selection";
import {forceCenter, forceLink, forceManyBody, forceSimulation} from "d3-force";

class Demo3 {
    private nodes: { name: string }[] = [
        {name: '1'},
        {name: '2'},
        {name: '3'},
        {name: '4'},
        {name: '5'},
        {name: '6'},
        {name: '7'},
    ];

    private edges: any[] = [
        {source: 0, target: 1},
        {source: 0, target: 2},
        {source: 0, target: 3},
        {source: 1, target: 4},
        {source: 1, target: 5},
        {source: 1, target: 6}
    ];

    private height = 800;
    private width = 800;

    private svg = select('body').append('svg').attr('width', this.width).attr('height', this.height);

    main() {
        let forceLinkMain = forceLink().links(this.edges).distance(123);

        let forceCenterMain = forceCenter().x(this.width / 2).y(this.height / 2);

        let forceSimulationMain = forceSimulation()
            .nodes(this.nodes)
            .force('forceLinkMain', forceLinkMain)
            .force('charge', forceManyBody())
            .force('forceCenterMain', forceCenterMain)
        // .on('tick', ()=>this.ticked(links, linksText, gs))

        console.log(this.nodes);
        console.log(this.edges);


        console.log(this.nodes);
        console.log(this.edges);
    }
}


export default Demo3;