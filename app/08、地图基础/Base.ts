/**
 * create by yanlele
 * create time 2018-11-01 12:06
 */
import {select} from "d3-selection";

class Base {
    protected width:number = 800;
    protected height: number = 800;
    protected svg = select('body').append('svg').attr('width', this.width).attr('height', this.height);
}


export default Base;