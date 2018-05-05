//工具方法
const fs = require('fs');
const config = require('./config');
const Tools = function (){
    this.downloadCount = 0;
    this.errNum = 0;
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
    record: function(text){
        let that = this;
        let pre = `>>> ${new Date()}\n`;
        let fileData = text || `本次总下载：${that.downloadCount}`;
        let suf = `\n==========================\n`;
        that.appendFile(`${config.logDist}record.text`, `${pre}${fileData}${suf}`, (err) => {
            return;
        });
        console.log(fileData);
    },
    log: function(text){
        this.appendFile(`${config.logDist}log.text`, `${text}\n`, (err) => {
            return;
        });
    },
    err: function(text){
        let that = this;
        that.errNum += 1;
        let pre = `>>> 当前错误：${that.errNum} - ${new Date()}\n`;
        that.appendFile(`${config.logDist}err.text`, `${pre}${text}\n`, (err) => {
            return;
        });
        console.log(`已记录错误：${that.errNum}`);
    },
    appendFile: function(dist, fileData, func){
        fs.appendFile(dist, fileData, 'utf8', (err)=>{
            if(err){
                console.log(err);
                if(func){func(err)};
            }
        })
    }
};

module.exports = Tools;