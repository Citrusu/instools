//工具方法
const fs = require('fs');
const Tools = function (){};

tools.prototype = {
    /**
    * 保存文件
    */
    saveFile: function(dist, fileData){
        if(fs.existsSync(dist)){
            console.log(`已存在: ${dist}`);
            return false;
        }
        fs.writeFile(dist, fileData, (err) => {
            if(err){
                return console.log(err);
            }
    
            console.log(`已保存文件: ${dist}`);
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