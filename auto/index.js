const config = require('./config');
const fs = require('fs');
const dist = config.dist; //输出目录
const collectList = config.collectList;
const requestUrl = config.requestUrl;

const ToolsFunc = require('./tools');
const tools = new ToolsFunc();

const NetFunc = require('./net');
const net = new NetFunc(tools);

const TaskFunc = require('./task');
let task = new TaskFunc(tools);

let downIdx = 0;

console.log('开始获取');
tools.startTime = tools.formatTime();
let getRes = async function(queryVar, otherParam, errBack) {
    let src = requestUrl + tools.getVariables(queryVar);
    console.log(src)
    if (typeof queryVar == 'string') {
        src = queryVar;
    }
    let param = await net.getByProxy(src, errBack);
    let media = param.data.user.edge_owner_to_timeline_media;
    let totalCount = media.count; //总页数
    let list = media.edges; //分页信息
    let nextPage = media.page_info;
    let breakList = false;

    for (let n of list) {
        let shortCode = n.node.shortcode; // 文章短名，可拼上获得文章详情地址
        let imgRealUrl = n.node.display_url; // 图片地址
        let suffix = imgRealUrl.split('.').pop(); //文件后缀
        let downSrc = otherParam.dir + shortCode + '.' + suffix;

        //console.log(`下载：${n.node.display_url}`);
        if (fs.existsSync(downSrc)) {
            // console.log(`已存在 ${downSrc}`);
            // continue;
            breakList = true;
            break;
        }

        let fileFunc = async(errBack) => {
            // console.log(`下载：${imgRealUrl}`);
            let file = await net.getByProxy(imgRealUrl, errBack);
            tools.saveFile(downSrc, file, () => {
                task.taskCount -= 1;
            });

        }
        task.taskFuncs.push(fileFunc);

    };
    console.log(`获取列表成功，当前:${otherParam.user},任务数:${task.taskFuncs.length}`);

    //是否有下一页
    if (!breakList && nextPage.has_next_page && nextPage.has_next_page != 'false') {
        task.taskFuncs.push(async(errBack) => {
            task.taskCount -= 1;
            getRes({
                id: queryVar.id,
                first: config.pageNum,
                after: nextPage.end_cursor
            }, otherParam, errBack)
        })
    } else {
        console.log(`${otherParam.user}已经下载完成, 总数：${totalCount}`);
        downIdx += 1;
        downList(downIdx);
    }
}

function downList(index) {
    let idx = index || 0;
    let n = collectList[idx];
    if (!n) {
        task.listDone = true;
        return false;
    }
    //检查目录是否存在，不存在则创建
    let dir = `${dist}${n.username}/`
    console.log(`开始下载：${n.username}`);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, () => {
            console.log(`创建目录 ${dir}`);
        });

    }
    task.taskFuncs.push(async(errBack) => {
        task.taskCount -= 1;
        getRes({
            id: n.userid,
            first: config.pageNum
        }, {
            dir: dir,
            user: n.username
        }, errBack);
    })

}
downList();
task.init();