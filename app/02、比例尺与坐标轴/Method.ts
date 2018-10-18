/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-18 23:06
 */

class Method {
    static getColor(number: number) {
        switch (number) {
            case 1: return 'red';
            case 2: return 'green';
            case 3: return 'blue';
            case 4: return 'yellow';
            case 5: return 'black';
            default: return 'white';
        }
    }

    static getColorCode(number:number) {
        switch (number) {
            case 1: return '#888';
            case 2: return '#666';
            case 3: return '#444';
            case 4: return '#222';
            case 5: return '#000';
            default: return '#000';
        }
    }
}

export default Method;