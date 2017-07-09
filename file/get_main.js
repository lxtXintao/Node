var http = require('http');
var util = require('util');
var url = require('url');

http.createServer(function(req,res){
res.writeHead(200,{'Content-Type': 'text/plain; charset=utf-8'});
res.end(util.inspect(url.parse(req.url,true)));
}).listen(3000);
