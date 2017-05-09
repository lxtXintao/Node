// nodejs模块中的exports对象，你可以用它创建你的模块
// 其实，Module.exports才是真正的接口，exports只不过是它的一个辅助工具。　最终返回给调用的是Module.exports而不是exports。
// 所有的exports收集到的属性和方法，都赋值给了Module.exports。当然，这有个前提，就是Module.exports本身不具备任何属性和方法。
// 如果，Module.exports已经具备一些属性和方法，那么exports收集来的信息将被忽略。
// require()回传的是module.exports而不是exports
exports.create = function(req,res){
    nano.db.create(req.body.dbname,function(){
        //create a new datebase
        if(err){
            res.send("Error creating Database "+req.body.dbname);
            return;
        }
        res.send("Database "+req.body.dbname+"was created sucessfully");
    });
};
