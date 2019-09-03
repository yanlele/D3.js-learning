import {selectAll} from "d3-selection";


const element = selectAll('p');
element.style('color', 'red')
    .style('font-size', '36px')
    .text('hello d3');
