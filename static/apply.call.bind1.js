/**
 * Created by Y on 2019/4/11.
 */
// 1.call ：可改变this指向，可传入参数，立即执行
Function.prototype.call = function(context) {
  var context = context || window;     //将 fn作为对象属性
  context.fn = this;      //将this指向调用对象
  var args = [];          // 获取除调用对象外的剩余参数
  for(var i=1;i<arguments.length;i++) {
      args.push("arguments[" + i + "]");   // 不这么做的话，会导致字符串引号被去掉，变成数值，导致报错
  }
  args.join(",");
  // 将参数传入并执行函数
  var result = eval("context.fn(" + args + ")");    //相当于执行 context.fn(arguments[1], arguments[2]，...)
  delete context.fn;        //删除fn属性
  return result;            // 返回结果
};

// 2.apply
Function.prototype.apply = function(context, arr) {
    context = context || window;
    context.fn = this;
    var args = [];
    var result;
    if(!arr) {
       result = context.fn();
    } else {
        for(var i=1;i<arguments.length;i++) {
            args.push("arr[" + i + "]");
        }
        result = eval("context.fn(" + args + ")");
    }
    delete context.fn;
    return result;
};

// 3.bind
// bind方法会创建一个新的函数，当bind方法执行时，传入的第一个参数会作为运行时的this，剩余的一系列参数会在  传递的参数前  传入作为它的参数
Function.prototype.bind = function(context) {
    if(typeof this !== 'function') {
        throw Error('this is npt a function');
    }
  var newFun = function() {};
  var currentObj = this;
  var currentArg = [].slice.call(arguments,1);     // 传递的参数

  var resultFun =  function () {
      var restArg = [].slice.call(arguments);    //剩余的一系列参数
      var newArg = currentArg.concat(restArg);  //会在传递的参数前传入作为它的参数
      // currentObj.apply(context, newArg);
      // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
      // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
      // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
      currentObj.apply(typeof this == resultFun ? this : context, newArg);
  };

  // 返回的函数也具备函数特性，可以使用new创建新的对象，使用new创建对象后，会改变this的指向，所以需要将返回函数的原型指向this原型
    // 直接将this原型指向返回函数原型，会造成 修改返回函数原型时 也修改了this原型，所以需要创建一个空函数来达到继承效果
  newFun.prototype = currentObj.prototype;
  resultFun.prototype = new newFun();
  return resultFun;          // 返回一个函数
};