// 读取键盘信息

export class Controller {
    constructor($canvas) {
        this.$canvas = $canvas;
        this.pressed_keys = new Set();
        this.start();
    }

    start() {
        let outer = this;  // 在函数内部不能直接用this，所以得承接下
        this.$canvas.keydown((e) => {
            outer.pressed_keys.add(e.key);
            console.log(e.key);  // 输出读取键位
        });

        this.$canvas.keyup(function(e) {
            outer.pressed_keys.delete(e.key);
        })
    }
}