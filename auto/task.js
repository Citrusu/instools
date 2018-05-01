const config = require('./config');

const toolsFunc = require('./tools');
const tools = new toolsFunc();

const fs = require('fs');

class Task{
    constructor(){
        this.taskFuncs = [];
        this.taskCount = 0;
        this.taskTimer = null;
        this.taskMax = config.taskMax;
        this.listDone = false;
    }
    init(){
        let that = this;
        that.taskTimer = setInterval(() => {
            if(that.listDone && that.taskFuncs.length <= 0){
                console.log('所有任务已经完成');
                that.endTask();
                return;
            }
            let delayTime = tools.getRandom(10 * 1000, 35 * 1000);
            if(that.taskFuncs.length < that.taskMax){
                delayTime = tools.getRandom(5 * 1000, 10 * 1000);
            }
            setTimeout(() => {
                that.startDownFuncs();
            }, delayTime);
            
        }, 3000);
    }

    startDownFuncs(){
        let that = this;
        for(var i = 0; i < that.taskFuncs.length; i++){
            if(that.taskCount < that.taskMax){
                let nowTask = that.taskFuncs.splice(i, 1)[0];
                that.taskCount += 1;
                //将当前方法抽出，如果失败则重新加入列队
                nowTask((err) => {
                    // tools.log(`reTask`)
                    if(that.taskCount > 0){
                        that.taskCount -= 1;
                    }
                    if(err.status != '404'){
                        that.taskFuncs.push(nowTask);
                    }
                    
                });
            }else{
                break;
            }
        }
        console.log(`当前任务：${that.taskFuncs.length}，并发数：${that.taskCount}`);
    }

    endTask(){
        clearInterval(this.taskTimer);
    }
}

module.exports = Task;