//工具方法
const fs = require('fs');
const Tools = function (){
    this.downloadCount = 0;
};

Tools.prototype = {
    /**
    * 保存文件
    */
    saveFile: function(dist, fileData){
        let that = this;
        if(fs.existsSync(dist)){
            console.log(`已存在: ${dist}`);
            return false;
        }
        fs.writeFile(dist, fileData, (err) => {
            if(err){
                return console.log(err);
            }
            that.downloadCount += 1;
            console.log(`已保存文件: ${dist},当前下载:${that.downloadCount}`);
        });
    },
    /**
    * 解析请求参数
    */
    getVariables: function(param){
        return '&variables=' + JSON.stringify(param);
    }
};

module.exports = Tools;