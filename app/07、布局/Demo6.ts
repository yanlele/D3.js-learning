/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-30 0:00
 */
import {select, selectAll} from "d3-selection";
import {cluster, stratify, tree} from "d3-hierarchy";
import {csv} from "d3-fetch";
import {transition} from "d3-transition";

// Tidy Tree vs. Dendrogram

class Demo6 {
    main() {
        let svg = select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height"),
            g = svg.append("g").attr("transform", "translate(40,0)");

        let treeMain = tree()
            .size([height - 400, width - 160]);

        let clusterMain = cluster()
            .size([height, width - 160]);

        let stratifyMain = stratify()
            .parentId(function (d: any) {
                return d.id.substring(0, d.id.lastIndexOf("."));
            });

        csv("flare.csv").then(data => {
            let root = stratifyMain(data)
                .sort(function (a, b) {
                    return (a.height - b.height) || a.id.localeCompare(b.id);
                });

            clusterMain(root);

            let link = g.selectAll(".link")
                .data(root.descendants().slice(1))
                .enter().append("path")
                .attr("class", "link")
                .attr("d", diagonal);

            let node = g.selectAll(".node")
                .data(root.descendants())
                .enter().append("g")
                .attr("class", function (d: any) {
                    return "node" + (d.children ? " node--internal" : " node--leaf");
                })
                .attr("transform", function (d: any) {
                    return "translate(" + d.y + "," + d.x + ")";
                });

            node.append("circle")
                .attr("r", 2.5);

            node.append("text")
                .attr("dy", 3)
                .attr("x", function (d: any) {
                    return d.children ? -8 : 8;
                })
                .style("text-anchor", function (d: any) {
                    return d.children ? "end" : "start";
                })
                .text(function (d: any) {
                    return d.id.substring(d.id.lastIndexOf(".") + 1);
                });

            selectAll("input")
                .on("change", changed);

            let timeout = setTimeout(function () {
                select("input[value=\"tree\"]")
                    .property("checked", true)
                    .dispatch("change");
            }, 1000);

            function changed() {
                clearTimeout(timeout);
                (this.value === "tree" ? treeMain : clusterMain)(root);
                let t = transition().duration(750);
                node.transition(t).attr("transform", function (d: any) {
                    return "translate(" + d.y + "," + d.x + ")";
                });
                link.transition(t).attr("d", diagonal);
            }
        });

        function diagonal(d) {
            return "M" + d.y + "," + d.x
                + "C" + (d.parent.y + 100) + "," + d.x
                + " " + (d.parent.y + 100) + "," + d.parent.x
                + " " + d.parent.y + "," + d.parent.x;
        }
    }
}

export default Demo6;

