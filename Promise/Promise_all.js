Promise.all = all;
function all(iterable){
  var self = this;
  if(!isArray(iterable)){
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if(!len){
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);


  while(++i < len){
    allResolved(iterable[i],i);
  }
  return promise;
  function allResolved(value,i){
    self.resolve(value).then(resolveFromAll,function(error){
      if(!called){
        called = true;
        doReject(promise,error);
      }
    });
    function resolveFromAll(outValue){
      value[i] = outValue;
      if(++resolved === len && !called){
        called = true;
        doResolve(promise,values);
      }
    }
  }
}
