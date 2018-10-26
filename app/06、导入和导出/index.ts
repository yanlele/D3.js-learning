/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-26 22:57
 */
import {json} from "d3-fetch";

class Index {
    demo1() {
        json('city.json').then(data=> {
            console.log(data)
        }).catch(error => {
            console.log(error)
        })
    }
}

let index: Index = new Index();
index.demo1();


export default Index;
