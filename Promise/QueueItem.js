function QueueItem(promise,onFulfilled,onRejected){
    this.promise = promise;
    this.callFulfilled = function(value){
        doResolve(this.promise,value);
    };
    this.callRejected = function(error){
        doReject(this.promise,error);
    };
    if(isFunction(onFulfilled)){
        this.callFulfilled = function(value){
            unwrap(this.promise,onFulfilled,value);
        };
    }
    if(isFunction(onRejected)){
        this.callRejected = function(error){
            unwrap(this.promise,onRejected,error);
        };
    }
}
