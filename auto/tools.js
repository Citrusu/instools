//工具方法
const fs = require('fs');
const config = require('./config');
const Tools = function (){
    this.downloadCount = 0;
    this.logNum = 0;
};

Tools.prototype = {
    /**
    * 保存文件
    */
    saveFile: function(dist, fileData, func){
        let that = this;
        if(fs.existsSync(dist)){
            console.log(`已存在: ${dist}`);
            if(func){func()};
            return false;
        }
        fs.writeFile(dist, fileData, (err) => {
            if(err){
                return console.log(err);
            }
            that.downloadCount += 1;
            console.log(`已保存文件: ${dist},当前下载:${that.downloadCount}`);
            if(func){func()}
        });
    },
    /**
    * 解析请求参数
    */
    getVariables: function(param){
        return '&variables=' + JSON.stringify(param);
    },
    //随机数
    getRandom: function (a , b){
        return Math.round(Math.random()*(b-a)+a);
    },
    log: function(text){
        let that = this;
        this.logNum += 1;
        let pre = `当前错误：${that.logNum} - ${new Date()}\n`;
        fs.appendFile(config.logDist, `${pre}${text}\n`, 'utf8', (err)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log(`已记录错误：${that.logNum}`);
        })
    }
};

module.exports = Tools;