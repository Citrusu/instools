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
        userid: '28656806',
        username: 'alexisren'
    },
    {
        userid: '2073848940',
        username: 'stayinthesun'
    },
    // {
    //     userid: '2142081715',
    //     username: 'fox_model_israel'
    // },
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
    },
    {
        userid: '2203549042',
        username: 'smile_seonhui'
    }
];

const reqHeader = {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4,ja;q=0.2',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    DNT: 1,
    Pragma: 'no-cache',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
}

let cookie = 'mid=XIB58QAEAAH1LTLbwuF-kUTKWigU; csrftoken=8CK6jIaCmrwpqeYeaIncZwEYTb05tjbp; sessionid=1424909330%3Ap7Frlo9qbRiBan%3A7; shbid=7933; shbts=1566547664.190208; ds_user_id=1424909330; rur=FTW; urlgen="{\"104.225.151.3\": 25820}:1i152F:waXIDApTiTBqYcxSXOej4x0z2W8"';

//export http_proxy=http://127.0.0.1:1087;export https_proxy=http://127.0.0.1:1087;

// HTTP, HTTPS, or SOCKS proxy to use
let proxy = 'http://127.0.0.1:1087';

const config = {
    collectList: collectList,
    // dist: './dist/',//基础路径
    dist: '/Users/citrus/Pictures/insdownload/',//基础路径
    logDist: './log/',
    // requestUrl: 'https://www.instagram.com/graphql/query/?query_id=17888483320059182',
    requestUrl: 'https://www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a',//  query_hash=472f257a40c653c64c666ce877d59d2b
    pageNum: 12, //每页数量
    requestId: '1424909330',//查询的账户id
    cookie: cookie,
    reqHeader: reqHeader,
    proxy: proxy,
    taskMax: 12,
    writeMax: 50
};

module.exports = config;

