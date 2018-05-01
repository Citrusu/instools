const toolsFunc = require('./tools');
const tools = new toolsFunc();

const request = require('superagent');
// extend with Request#proxy()
require('superagent-proxy')(request);

const config = require('./config');

class Net{
    constructor(){
    
    }
    //let src = 'https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"45290591","first":50}';
    getByProxy(src, errBack){
        return new Promise((resolve, reject) => {
            request
            .get(src)
            .proxy(config.proxy)
            .set(config.reqHeader)
            .set("Cookie",config.cookie)
            .end(onresponse);
    
            function onresponse (err, res) {
                if (err) {
                    tools.log(`${err}\n${src}`);
                    // return reject(err);
                    if(errBack && err.status != '404'){errBack()};
                } else {
                    resolve(res.body);
                }
            }
        })
    }
}

module.exports = Net;