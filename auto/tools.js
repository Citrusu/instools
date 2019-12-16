//工具方法
const fs = require('fs');
const config = require('./config');

class Tools {
    constructor() {
        this.startTime = null;
        this.downloadCount = 0;
        this.errNum = 0;
    }
    /**
     * 保存文件
     */
    saveFile(dist, fileData, func) {
        let that = this;
        if (fs.existsSync(dist)) {
            console.log(`已存在: ${dist}`);
            if (func) { func() };
            return false;
        }
        fs.writeFile(dist, fileData, (err) => {
            if (err) {
                return console.log(err);
            }
            that.downloadCount += 1;
            console.log(`已保存文件: ${dist},当前下载:${that.downloadCount}`);
            if (func) { func() }
        });
    }
    /**
     * 解析请求参数
     */
    getVariables(param) {
        return '&variables=' + JSON.stringify(param);
    }
    //随机数
    getRandom(a, b) {
        return Math.round(Math.random() * (b - a) + a);
    }
    //任务记录
    record(text, func) {
        let that = this;
        let pre = `>>> ${that.startTime} -- ${that.formatTime()}\n`;
        let fileData = text || `本次总下载：${that.downloadCount}`;
        let suf = `\n--------------------------\n`;
        that.appendFile(`${config.logDist}record.text`, `${pre}${fileData}${suf}`, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            if (func) {
                func();
            }
            return;
        });
        console.log(fileData);
    }
    log(text) {
        this.appendFile(`${config.logDist}log.text`, `${text}\n`, (err) => {
            return;
        });
    }
    err(text) {
        let that = this;
        that.errNum += 1;
        let pre = `>>> 当前错误：${that.errNum} - ${that.formatTime()}\n`;
        that.appendFile(`${config.logDist}err.text`, `${pre}${text}\n`, (err) => {
            return;
        });
        console.log(`已记录错误：${that.errNum}`);
    }
    //文件内容写入追加
    appendFile(dist, fileData, func) {
        fs.appendFile(dist, fileData, 'utf8', (err) => {
            if (err) {
                console.log(err);
                if (func) { func(err) };
            }
        })
    }
    //格式化时间
    formatTime() {
        var nowTime = new Date();
        var Y = nowTime.getFullYear().toString();
        var M = litter(nowTime.getMonth() + 1);
        var D = litter(nowTime.getDate());
        var H = litter(nowTime.getHours());
        var Min = litter(nowTime.getMinutes());
        var S = litter(nowTime.getSeconds());

        function litter(v) {
            return v >= 10 ? v.toString() : '0' + v.toString();
        }
        var now = `${Y}-${M}-${D} ${H}:${Min}:${S}`;
        return now;
    }
};

module.exports = Tools;