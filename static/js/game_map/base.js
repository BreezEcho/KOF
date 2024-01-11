import { AcGameObject } from '/static/js/ac_game_object/base.js';
import { Controller } from '../controller/base.js';

export class GameMap extends AcGameObject {
    constructor(root) {
        super();
        
        this.root = root;
        this.$canvas = $('<canvas id="tutorial" width="1280" height="720" tabindex=0></canvas>');  // 单位px，这里canvas需要输入，所以添加tabindex进行聚焦。
        this.ctx = this.$canvas[0].getContext('2d');  // js canvas构建的是一个数组
        this.root.$kof.append(this.$canvas);  // root为什么可调用$kof
        this.$canvas.focus();

        this.controller = new Controller(this.$canvas);

        this.root.$kof.append($(`<div class="kof-head">
        <div class="kof-head-hp-0"><div></div></div>
        <div class="kof-head-timer">60</div>
        <div class="kof-head-hp-1"><div></div></div>
    </div>`));  // 血量条

        this.time_left = 60000;  // 单位：毫秒
        this.$timer = this.root.$kof.find(".kof-head-timer");
    }

    start() {
        
    }

    update() {  // 常把复杂操作封装成函数，再放入这里
        this.time_left -= this.timedelta;
        if (this.time_left < 0) {
            this.time_left = 0;
            
            let [a, b] = this.root.players;
            if (a.status !== 6 && b.status !== 6) {
                a.status = b.status = 6;
                a.frame_current_cnt = b.frame_current_cnt = 0;
                a.vx = b.vx = 0
            }
        }
        this.$timer.text(parseInt(this.time_left/1000)); 
        this.render();
    }
    
    render() {  // 清除上一帧的画面
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);  // x、y都从左上除法；x👉, y👇。
        // this.ctx.fillStyle = 'black';
        // this.ctx.fillRect(0, 0, this.$canvas.width(), this.$canvas.height());
        // console.log(this.ctx.canvas.width);
    }
}