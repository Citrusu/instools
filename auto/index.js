const request = require('superagent');
// extend with Request#proxy()
require('superagent-proxy')(request);

const toolsFunc = require('./tools');
const tools = new toolsFunc();

const config = require('./config');
const fs = require('fs');
const dist = config.dist; //输出目录
const collectList = config.collectList;
const requestUrl = config.requestUrl;

console.log('开始获取');

//let src = 'https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"45290591","first":50}';
let getByProxy = function(src, func){
    try{
        return new Promise((resolve, reject) => {
            request
            .get(src)
            .proxy(config.proxy)
            .set(config.reqHeader)
            .set("Cookie",config.cookie)
            .end(onresponse);

            function onresponse (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(res.body);
                }
            }
        })
    }catch(e){
        console.log(e);
    }
}

let getRes = async function(queryVar){
    let src = requestUrl + tools.getVariables(queryVar);
    console.log(src)
    let param = await getByProxy(src);
    let media = param.data.user.edge_owner_to_timeline_media;
    let totalCount = media.count;//总页数
    let list = media.edges;//分页信息
    let nextPage = media.page_info;
    console.log('获取列表成功，开始下载图片');

    list.forEach(async (n, i) => {
        let shortCode = n.node.shortcode; // 文章短名，可拼上获得文章详情地址
        let imgRealUrl = n.node.display_url; // 图片地址
        let suffix = imgRealUrl.split('.').pop(); //文件后缀
        let downSrc = dist + shortCode + '.' + suffix;

        //console.log(`下载：${n.node.display_url}`);
        if(fs.existsSync(downSrc)){
            console.log(`已存在 ${downSrc}`);
            return false;
        }
        setTimeout(async () => {
            let file = await getByProxy(imgRealUrl);
            tools.saveFile(downSrc, file);
        }, 1000)
        
    });

    //是否有下一页
    if(nextPage.has_next_page && nextPage.has_next_page != 'false'){
        setTimeout(() => {
            getRes({
                id: queryVar.id, 
                first: config.pageNum, 
                after: nextPage.end_cursor
            })
        }, 1000 * 10);
    }
}


collectList.forEach((n, i) => {
    getRes({id: n.userid, first: config.pageNum});
})
