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

let cookie = 'mcd=3; mid=W1VLdgAEAAFHqXF6nWnWa1VO5wGD; rur=FTW; datr=ilFVWys4DBW5DtB2D60YrqJ4; csrftoken=B6VEZpChsn4hmDJZEfDKTPGfDCVuJdKS; ds_user_id=1424909330; shbid=7933; sessionid=IGSCa2f972112fccab8d58a5f7351f1240f733961e7cecb26cf30abe554d5148434a%3Am7D9L3NB5kCD6fOcktfWrr4cQ5HZMP9v%3A%7B%22_auth_user_id%22%3A1424909330%2C%22_auth_user_backend%22%3A%22accounts.backends.CaseInsensitiveModelBackend%22%2C%22_auth_user_hash%22%3A%22%22%2C%22_platform%22%3A4%2C%22_token_ver%22%3A2%2C%22_token%22%3A%221424909330%3AAjHP9Q989CVVDislQeZORR9f5qPHXoyx%3Aceb74fac0d1fcc2e394e74219377438e75fc68e23a3221fb8b838186a3fb402b%22%2C%22last_refreshed%22%3A1533005821.055711031%7D; shbts=1533017722.1125379; urlgen="{\"time\": 1533005820\054 \"67.209.184.179\": 25820}:1fkNwN:kaEORhd7sWrQqcYAcggIz-Ceqz8"';

//export http_proxy=http://127.0.0.1:1087;export https_proxy=http://127.0.0.1:1087;

// HTTP, HTTPS, or SOCKS proxy to use
let proxy = 'http://127.0.0.1:1087';

const config = {
    collectList: collectList,
    // dist: './dist/',//基础路径
    dist: '/Users/citrus/Pictures/insdownload/',//基础路径
    logDist: './log/',
    // requestUrl: 'https://www.instagram.com/graphql/query/?query_id=17888483320059182',
    requestUrl: 'https://www.instagram.com/graphql/query/?query_hash=472f257a40c653c64c666ce877d59d2b',//  query_hash=472f257a40c653c64c666ce877d59d2b
    pageNum: 12, //每页数量
    requestId: '1424909330',//查询的账户id
    cookie: cookie,
    reqHeader: reqHeader,
    proxy: proxy,
    taskMax: 12,
    writeMax: 50
};

module.exports = config;

