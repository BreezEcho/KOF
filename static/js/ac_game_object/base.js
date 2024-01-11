let AC_GAME_OBJECTS = [];

class AcGameObject {
    constructor () {
        AC_GAME_OBJECTS.push(this);
        
        this.timedelta = 0;  // 物体运动取决于时间，这里计算时间间隔
        this.has_call_start = false;
    }

    start() {  // 初始执行一次
        
    }

    update() {  // 每帧执行一次（除第一帧外)
        
    }

    destroy() {  // 删除当前对象
        for (let i in AC_GAME_OBJECTS) {
            if (AC_GAME_OBJECTS[i] === this) {
                AC_GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}


// 动画辅助对象构建
let last_timestamp;

let AC_GAME_OBJECTS_FRAME = (timestamp) => {  // 在JavaScript中，当你需要使用Timestamp时，你通常不需要显式地定义它。
    for (let obj of AC_GAME_OBJECTS) {
        if (!obj.has_call_start) {
            obj.start();
            obj.has_call_start = true;
        } 

        else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    last_timestamp = timestamp;
    requestAnimationFrame(AC_GAME_OBJECTS_FRAME);
}

requestAnimationFrame(AC_GAME_OBJECTS_FRAME);  // 无止境的变化

export {
    AcGameObject
}