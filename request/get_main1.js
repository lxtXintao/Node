var http = require('http');
var util = require('util');
var url = require('url');

http.createServer(function(req,res){
res.writeHead(200,{'Content-Type':'text/plain'});

//解析url参数
var params = url.parse(req.url,true).query;
res.write("网站名："+params.name);
res.write("\n");
res.write("网站URL:"+params.url);
res.end();
}).listen(3000);
