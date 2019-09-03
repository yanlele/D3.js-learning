/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-30 0:28
 */
import {select} from "d3-selection";
import {hierarchy, tree} from "d3-hierarchy";
import {DefaultLinkObject, Link, linkVertical} from "d3-shape";
import {interval} from "d3-timer";

class Demo7 {
    main() {
        const duration = 750;
        const height = 600;
        const width = 1080;

        const svg = select('body').append('svg').attr("width", width).attr('height', height);
        const layoutTree = tree().size([width - 20, height - 20]);
        const renderLink: Link<any, DefaultLinkObject, [number, number]> = linkVertical().x(function (d: any) {
            return d.x
        }).y(function (d: any) {
            return d.y
        });
        const Node = hierarchy.prototype.constructor;
        const root = new Node;
        const nodes = [root];
        const links = [];

        layoutTree(root);

        let link = svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#000")
            .selectAll(".link");

        let node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 2)
            .selectAll(".node");

        const intervalMain = interval(() => {
            if (nodes.length >= 500) {
                return intervalMain.stop()
            }

            // Add a new node to a random parent.
            const parent = nodes[Math.random() * nodes.length | 0];
            const child = Object.assign(new Node, {parent, depth: parent.depth + 1});
            if (parent.children) parent.children.push(child);
            else parent.children = [child];
            nodes.push(child);
            links.push({source: parent, target: child});

            // Recompute the layout.
            layoutTree(root);

            // Add entering nodes in the parent’s old position.
            node = node.data(nodes);
            node = node.enter().append("circle")
                .attr("class", "node")
                .attr("r", 4)
                .attr("cx", function (d: any) {
                    return d.parent ? d.parent.px : d.px = d.x;
                })
                .attr("cy", function (d: any) {
                    return d.parent ? d.parent.py : d.py = d.y;
                })
                // @ts-ignore
                .merge(node);

            // Add entering links in the parent’s old position.
            link = link.data(links);
            link = link.enter().insert("path", ".node")
                .attr("class", "link")
                .attr("d", function (d: any): any {
                    const o = {x: d.source.px, y: d.source.py};
                    const data: any = {source: o, target: o};
                    return renderLink(data);
                })
                // @ts-ignore
                .merge(link);

            // Transition nodes and links to their new positions.
            const t = svg.transition()
                .duration(duration);

            link.transition(t)
                .attr("d", renderLink);

            node.transition(t)
                .attr("cx", (d: any) => d.px = d.x)
                .attr("cy", (d: any) => d.py = d.y);
        }, duration);


        return svg.node();
    }
}


export default Demo7;
