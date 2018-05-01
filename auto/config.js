//收集的用户列表
const collectList = [
    {
        userid: '45290591',
        username: 'maria_domark'
    },
    {
        userid: '814273802',
        username: 'mavrinland'
    },
    {
        userid: '1524747082',
        username: 'alexisren'
    },
    {
        userid: '2073848940',
        username: 'stayinthesun'
    },
    {
        userid: '2142081715',
        username: 'fox_model_israel'
    },
    {
        userid: '4517059',
        username: 'yuiiwadee'
    },
    {
        userid: '609915005',
        username: 'sakura_nuii'
    },
    {
        userid: '1724424',
        username: 'auauau'
    },
    {
        userid: '629028990',
        username: 'celineschh'
    },
    {
        userid: '1095764373',
        username: 'mavrinstudios'
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

let cookie = 'csrftoken=NOU5FhFSqv53rIoBWEdg19JayG1yv3Lu; ds_user_id=1424909330; shbid=7933; mid=Wt1qTwAEAAGYfR0jgiCguLenJSyF; mcd=3; rur=FTW; sessionid=1424909330%3AirK9dwZqOEHVtC%3A2; urlgen="{\"time\": 1524631842\054 \"67.209.184.179\": 25820}:1fBK1O:ELnyrKMGLJRdYZaS4H4R1PFPmxU"';

//export http_proxy=http://127.0.0.1:1087;export https_proxy=http://127.0.0.1:1087;

// HTTP, HTTPS, or SOCKS proxy to use
let proxy = 'http://127.0.0.1:1087';

const config = {
    collectList: collectList,
    dist: './dist/',//基础路径
    logDist: './log/log.text',
    requestUrl: 'https://www.instagram.com/graphql/query/?query_id=17888483320059182',
    pageNum: 12, //每页数量
    requestId: '1424909330',//查询的账户id
    cookie: cookie,
    reqHeader: reqHeader,
    proxy: proxy,
    taskMax: 12,
    writeMax: 50
};

module.exports = config;

