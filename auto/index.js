const netFunc = require('./net');
const net = new netFunc();

const toolsFunc = require('./tools');
const tools = new toolsFunc();

const config = require('./config');
const fs = require('fs');
const dist = config.dist; //输出目录
const collectList = config.collectList;
const requestUrl = config.requestUrl;

let downIdx = 0;
let listDone = false;
const asyncMax = config.asyncMax;
let asyncCount = 0;
let downLoadFuncs = [];
let downTimer = null;
let errCount = 0;
console.log('开始获取');

let getRes = async function(queryVar, otherParam, errBack){
    let src = requestUrl + tools.getVariables(queryVar);
    // console.log(src)
    let param = await net.getByProxy(src, errBack);
    let media = param.data.user.edge_owner_to_timeline_media;
    let totalCount = media.count;//总页数
    let list = media.edges;//分页信息
    let nextPage = media.page_info;

    list.forEach(async (n, i) => {
        let shortCode = n.node.shortcode; // 文章短名，可拼上获得文章详情地址
        let imgRealUrl = n.node.display_url; // 图片地址
        let suffix = imgRealUrl.split('.').pop(); //文件后缀
        let downSrc = otherParam.dir + shortCode + '.' + suffix;

        //console.log(`下载：${n.node.display_url}`);
        if(fs.existsSync(downSrc)){
            // console.log(`已存在 ${downSrc}`);
            // downIdx += 1;
            // downList(downIdx);
            return false;
        }

        let fileFunc = async (errBack) => {
            // console.log(`下载：${imgRealUrl}`);
            let file = await net.getByProxy(imgRealUrl, errBack);
            tools.saveFile(downSrc, file, () => {
                asyncCount -= 1;
            });
            
        }
        downLoadFuncs.push(fileFunc);
        
    });
    console.log(`获取列表成功，当前任务数：${downLoadFuncs.length}`);
    
    //是否有下一页
    if(nextPage.has_next_page && nextPage.has_next_page != 'false'){
        downLoadFuncs.push(async (errBack) => {
            asyncCount -= 1;
            getRes({
                id: queryVar.id, 
                first: config.pageNum, 
                after: nextPage.end_cursor
            }, otherParam, errBack)
        })
    
    }else{
        console.log(`${otherParam.user}已经下载完成, 总数：${totalCount}`);
        downIdx += 1;
        downList(downIdx);
    }
}

// 执行列队
function startDownFuncs(){
    for(var i = 0; i < downLoadFuncs.length; i++){
        if(asyncCount < asyncMax){
            let nowTask = downLoadFuncs.splice(i, 1)[0];
            asyncCount += 1;
            //将当前方法抽出，如果失败则重新加入列队
            nowTask(() => {
                // tools.log(`reTask`)
                if(asyncCount >= 0){
                    asyncCount -= 1;
                }
                
                downLoadFuncs.push(nowTask);
            });
        }else{
            break;
        }
    }
    console.log(`当前任务：${downLoadFuncs.length}，并发数：${asyncCount}`);
}
downTimer = setInterval(() => {
    if(listDone && downLoadFuncs.length <= 0){
        console.log('所有任务已经完成');
        clearInterval(downTimer);
        return;
    }
    var delayTime = tools.getRandom(10 * 1000, 35 * 1000);
    // if(downLoadFuncs.length < asyncMax){
    //     delayTime = tools.getRandom(2 * 1000, 5 * 1000);
    // }
    setTimeout(() => {
        startDownFuncs();
    }, delayTime);
    
}, 3000);

function downList(index){
    let idx = index || 0;
    let n = collectList[idx];
    if(!n){
        listDone = true;
        return false;
    }
    //检查目录是否存在，不存在则创建
    let dir = `${dist}${n.username}/`
    console.log(`开始下载：${n.username}`);
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir, () => {
            console.log(`创建目录 ${dir}`);
        });

    }
    getRes({id: n.userid, first: config.pageNum}, {dir: dir, user: n.username});
}
downList();

