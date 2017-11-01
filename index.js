var fs = require('fs');
var file = require('./1.json');

var text = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>maria_domark</title>
    <style>
        img{
            width: 100px;
        }
    </style>
</head>
<body>`;

var urlList = file.data.user.edge_owner_to_timeline_media.edges.map(function(n, i){
    // if(i < 1){
        text += `\n <img src="${n.node.display_url}" alt="">`;
        return n.node.display_url;
    // }
});


text += `</body>
</html>`;

let dirFile = './index.html';

fs.writeFile(dirFile, text, function(err){
    if(err){
        return console.log(err);
    }
});
