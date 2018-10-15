/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-15 21:26
 */

import Test from './test.js';
let test:Test = new Test();

let d3 = (<any>window).d3;

// let paragraphs = document.getElementsByTagName('p');
// for (let i = 0;i < paragraphs.length; i ++) {
//     let paragraph = paragraphs[i];
//     paragraph.innerHTML = 'hello world';
// }

let p = d3.select('body').selectAll('p').text('hello, world');
p.style('color', 'red');
p.style('font-size', '72px');




export default {};
