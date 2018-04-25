//收集的用户列表
const collectList = [
    {
        userid: '45290591',
        username: 'maria_domark'
    }
];

const reqHeader = {
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

//export http_proxy=http://127.0.0.1:1087;export https_proxy=http://127.0.0.1:1087;

// HTTP, HTTPS, or SOCKS proxy to use
let proxy = 'http://127.0.0.1:1087';

const config = {
    collectList: collectList,
    dist: './dist/',//基础路径
    requestUrl: 'https://www.instagram.com/graphql/query/?query_id=17888483320059182',
    pageNum: 50, //每页数量
    requestId: '1424909330',//查询的账户id
    cookie: cookie,
    reqHeader: reqHeader,
    proxy: proxy
};

module.exports = config;

