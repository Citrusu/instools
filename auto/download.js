const fs = require('fs');
const download = require('download');

let InsDown = function(){
    this.list = null;
};

InsDown.prototype = {
    downBySrc: function(src, dist){
        download(src).then((data) => {
            console.log(data);
            fs.writeFileSync(dist + 'baidu1.jpg', data);
        });
    },
    downList: function(list, dist){
        list.forEach( n => {
            this.downBySrc(n, dist);
        })
    },
    downByJson: function(json, dist){
        this.list = json.data.user.edge_owner_to_timeline_media.edges.map(function(n, i){
            return n.node.display_url;
        });
        console.log(this.list);
        this.downList(this.list, dist);
    }
}

module.exports = InsDown;