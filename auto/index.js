const request = require('superagent');
// extend with Request#proxy()
require('superagent-proxy')(request);

const config = require('./config');
const fs = require('fs');
const dist = config.config.dist; //输出目录

const base_header = {
    Accept: '*/*',
    'Accept-Encoding':'gzip, deflate',
    'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4,ja;q=0.2',
    'Cache-Control':'no-cache',
    Connection:'keep-alive',
    DNT:1,
    Pragma:'no-cache',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest'
}

let cookie = 'csrftoken=NOU5FhFSqv53rIoBWEdg19JayG1yv3Lu; shbid=7933; ds_user_id=1424909330; sessionid=IGSC784213ecf9dd1e35de5f57de4657b1e6477279f05977d2fb69820efb560a6707:q6d26LTnpXAisZ69HKArWEjPsL3Pm4Ar:{"_auth_user_id":1424909330,"_auth_user_backend":"accounts.backends.CaseInsensitiveModelBackend","_auth_user_hash":"","_platform":4,"_token_ver":2,"_token":"1424909330:irK9dwZqOEHVtCT2LHd5ontUF2ima0GN:380a6be291763f64a2aaf866e9563b8d3421314147d38d783b49eb61615b6f9e","last_refreshed":1524119698.9382300377}; mid=Wtg3zAAEAAGHpn57nED-0esin2GQ; ig_pr=2; ig_vh=984; ig_or=landscape-primary; mcd=3; rur=FTW; ig_vw=1920; urlgen="{\"time\": 1524119511\054 \"67.209.184.179\": 25820}:1f9Mpy:68of2DhqCEKJ5aYUd2np-3e8Fck"';

let src = 'https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"45290591","first":50}';
console.log('开始获取');

//export http_proxy=http://127.0.0.1:1087;export https_proxy=http://127.0.0.1:1087;

// HTTP, HTTPS, or SOCKS proxy to use
var proxy = 'http://127.0.0.1:1087';

async function getByProxy(src, func){
    request
        .get(src)
        .proxy(proxy)
        .set(base_header)
        .set("Cookie",cookie)
        .end(onresponse);

    function onresponse (err, res) {
        if (err) {
            console.log(err);
        } else {
            // console.log(res.status, res.headers);
            // console.log(res.body);
            // download.downByJson(res.body, dist);
            if(func){
                func(res.body);
            }else{
                return res.body;
            }
        }
    }
}

getByProxy(src, function(param){
    let totalCount = param.data.user.edge_owner_to_timeline_media.count;
    let list = param.data.user.edge_owner_to_timeline_media.edges;
    console.log('获取列表成功，开始下载图片');
    list.forEach( (n, i) => {
        // if(i > 1) return
        let shortCode = n.node.shortcode; // 文章短名，可拼上获得文章详情地址
        let imgRealUrl = n.node.display_url; // 图片地址
        let suffix = imgRealUrl.split('.').pop(); //文件后缀
        let downSrc = dist + shortCode + '.' + suffix;

        //console.log(`下载：${n.node.display_url}`);
        if(fs.existsSync(downSrc)){
            console.log(`已存在 ${downSrc}`);
            return false;
        }
        getByProxy(imgRealUrl, function(data){
            saveFile(downSrc, data);
        });
    })
});

/*
 * 保存文件
 * */
function saveFile(dist, fileData){
    if(fs.existsSync(dist)){
        console.log(`已存在 ${dist}`);
        return false;
    }
    fs.writeFile(dist, fileData, (err) => {
        if(err){
            return console.log(err);
        }

        console.log(`已下载 ${dist}`);
    });
}