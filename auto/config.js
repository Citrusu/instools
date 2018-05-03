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
    },
    {
        userid: '2203549042',
        username: 'smile_seonhui'
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

let cookie = 'csrftoken=NOU5FhFSqv53rIoBWEdg19JayG1yv3Lu; ds_user_id=1424909330; shbid=7933; mid=Wt1qTwAEAAGYfR0jgiCguLenJSyF; rur=FTW; mcd=3;sessionid=IGSCd7633938de9af2b141503ea1734c56eed1695f4815241dc3eb003b6c0b3af361%3AOA2cOIBFeqzOgr1XE4A2bLl9DeRrGFum%3A%7B%22_auth_user_id%22%3A1424909330%2C%22_auth_user_backend%22%3A%22accounts.backends.CaseInsensitiveModelBackend%22%2C%22_token%22%3A%221424909330%3AdCUSwo7s29u6SZY08JfSRvdACkayTD8W%3A6e1c535d1df119c1ae78b816b497225f4a54cf1bed5f6ddea3b2d489a26b6957%22%2C%22_platform%22%3A4%2C%22_remote_ip%22%3A%2267.209.184.179%22%2C%22_mid%22%3A%22Wt1qTwAEAAGYfR0jgiCguLenJSyF%22%2C%22_user_agent_md5%22%3A%228cbcc8c29147223f61dce1198d00ef94%22%2C%22_token_ver%22%3A2%2C%22last_refreshed%22%3A1525184942.0038893223%7D; urlgen="{\"time\": 1525184941\054 \"67.209.184.179\": 25820}:1fDXUr:ZZOesuAJXLtAeKPJT4PuAeQmv2E"';

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

