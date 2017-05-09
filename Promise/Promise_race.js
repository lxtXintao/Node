Promise.race = race;
function race(iterable){
    var self = this;
    if(!isArray(iterable)){
        return this.reject(new TypeError('must be an array'));
    }

    var len = itrable.length;
    var called = false;
    if(!len){
        return this.resolve([]);
    }

    var i = -1;
    var promise = new this(INTERNAL);

    while(++i < len){
        resolve(itrable[i]);
    }
    return promise;
    function resolver(vlaue){
        self.resolve(value).then(function(response){
            if(!called){
                called = true;
                doResolve(promise,response);
            }
        },function (error){
            if(!called){
                called = true;
                doReject(promise,error);
            }
        });
    }
}
