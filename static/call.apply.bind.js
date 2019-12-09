//1.call  改变this指向，执行函数并可以传参
//将函数设置为对象的属性
//执行函数
//删除函数
Function.prototype.call = function(context) {
    context = context ? cotext : window;
     context.fn = this;
     var args = [];
     for(var i=1;i<arguments.length;i++) {
         args.push('arguments[' + i + ']');
     }
     args = args.join(",");
     var result = eval("context.fn(" + args + ")");
     delete context.fn;
     return result;
}

Function.prototype.apply = function(context, arr) {
    context = context ? context : window;
    context.fn = this;
    if(!arr) return context.fn();
    //if([].prototype.tostring.call(arr) !== "[Objext Array]") throw new Error("arr is not Array");
    var args = [];
    for(var i=1;i<arguments.length;i++) {
        args.push("arguments[" + i + "]");
    }
    var result = eval("context.fn(" + args + ")");
    delete contxt.fn;
    return result;
}

//3.bind  生成一个新函数，第一个参数作为 ，将this指向它， 第二个及以后的参数作为函数参数 在剩余参数之前执行
//返回新函数
Function.prototype.bind = function(context) {
    if(typeof this !== "function") throw new Error("this is not a function");
    context = context ? context : window;
    var target = this;
    var resultFun;
    var tempFun = function() {};
    var args = [].slice.call(arguments,1);
    resultFun = function() {
        var restArr = [].slice.call(arguments,1);
        args = args.concat(restArr);
        target.apply(typeof this === resultFun ? this : context, args);
    }
    tempFun.prototype = target.prototype;
    resultFun.prototype = new tempFun();
    // var prototype = target.prototype;
    // prototype.constructor = resultFun;
    // resultFun.prototype = prototype;
    return resultFun;
}