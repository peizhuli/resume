//名字（变量）的声明： 告诉js解释器存在这个名字，但不知道名字的具体内容

// 函数声明是写在单独的一个结构中，不写在任何 语句，逻辑判断等结构中
//函数声明：
// 首先让js解释器知道有这个名字，该阶段与名字声明一样； 然后告诉解释器这个名字对应的函数体
function func() {
    function func1() {};        // 函数声明
    if(true) {
        function func2() {};    //函数表达式
    }
    var f = function func3() {};    //函数表达式
    this.func4 = function() {};    //函数表达式
}


var num = 1;
function num() {};
num();   // Error: num is not a function;
console.log(num);    //1

/**  
 * 1. var num;
 * 2. function num() {};
 * 3. num = 1;
 * 4. num();
 */

if(true) {
    function f1() {               //这里当成是函数表达式，不会提升f1（）
        console.log(1);
    }
} else {
    function f1() {
        cosole.log(2);
    }
}
f1();    //1。 特殊：外部课访问表达式的名称 f1

// () 圆括号包裹的被当成是一个表达式（eval()的使用）， (function foo() {})
// 此时foo被当时一个表达式， 表达式的name（即foo）只能在内部访问,
// 执行 foo() 会报错， foo is not defined

var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();

// () 包裹的是一个函数表达式，定义的function名称只能在内部访问，相当于一个常量const；
// 严格模式下，对常量赋值会报错， 非严格模式下，赋值无效；
// 非严格模式下，b = function b() {}
/*======================*/


// 函数柯里化
let curry = func => {
    //返回一个函数g
    //判断当前传入的参数allArgs个数是否>= 柯里化函数func的初始参数个数
    //已经传入所有参数，直接执行func， 否则返回当前函数g，并传入当前参数
    let g = (...allArgs) => allArgs.length >= func.length ? func(...allArgs) : (...args) => g(...allArgs, ...args);
    return g;
}

