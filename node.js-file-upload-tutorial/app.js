/**
 * Module dependencies.
 * 服务端代码，用来处理文件上传请求
 */

// 从HTTP发出的所有请求都在req，你在res中编写响应结果

var express = require('express');
var  format = require('util').format;
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
//Directory to upload file
var uploadPath="upload";
// // 移动文件需要使用fs模块
var fs = require('fs');

var app = express();

// all environments

//下面是典型的Express.js应用程序默认配置：
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 中间件
// 中间件是一个传递参数，用于为请求添加某些有用的信息，比如req.body或req.cookie
app.use(express.favicon());
app.use(express.bodyParser({
				keepExtensions: true,
				limit: 10000000, // 10M limit
				uploadDir: __dirname +'/temp' }));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// 第一个路由基本上能搞定发送到主页的全部请求（http://localhost:3000/） 
// 第二个路由负责到 /users 的请求（http://localhost:3000/users）
app.get('/', routes.index);
app.get('/users', user.list);

app.post("/upload", function (req, res) { 
	//get the file name
	var filename=req.files.file.name;
	var extensionAllowed=[".docx",".doc"];
	var maxSizeOfFile=100;
	var msg="";
	var i = filename.lastIndexOf('.');//lastIndexOf() 方法可返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。
	
	// get the temporary location of the file(获得文件的临时路径)
    var tmp_path = req.files.file.path;
    
	// set where the file should actually exists - in this case it is in the "images" directory
	//( 指定文件上传后的目录 )
    var target_path = __dirname +'/upload/' + req.files.file.name;
	
    var file_extension= (i < 0) ? '' : filename.substr(i);//substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
	if((file_extension in oc(extensionAllowed))&&((req.files.file.size /1024 )< maxSizeOfFile)){
		// 移动文件
		fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
		//(删除临时文件)
			fs.unlink(tmp_path, function() {
				if (err) throw err; 
			});
		});
		msg="File uploaded sucessfully"
	}else{
	// delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
		fs.unlink(tmp_path, function(err) {
            if (err) throw err; 
        });
		msg="File upload failed.File extension not allowed and size must be less than "+maxSizeOfFile;
	}
	 res.end(msg);                                      
});   
function oc(a){
  var o = {};
  for(var i=0;i<a.length;i++)
  {
    o[a[i]]='';
  }
  return o;
}
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
