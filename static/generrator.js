// generator 生成器器，是一个函数，可以用来生成 迭代器
// 生成器和普通函数不一样，普通函数一旦调用就会立即执行， 生成器函数调用后不会立刻执行，必须显示调用next()执行，并且执行过程中可以暂停再继续执行后续代码

function *go() {
    console.log('start');
    let b = yield "第一个输出";
    console.log(b,',第二次执行');  // bbb,第二次执行
    let c = yield "第二个输出";
    console.log(c);   // ccc
    return c;
}

let l = go();
// 生成器函数调用后不会立刻执行， 而是返回此生成器的 迭代器， 迭代器是一个对象， 每调用一次next() 就可以返回一个值对象
let a = l.next(); // {value: "第一次输出", done: false}
// 此时执行到第一个 yield停止，b 为此次停止后 下次执行next() 的一个输入值， 即next(b);
// 并不是 yield 的返回值 赋值给 b，
let b = l.next("bbb"); // {value: "第二个输出", done: false} 
let c= l.next('ccc');  // {value: "cccc", done: true}  // 若生成器没有返回值，则为undefined


let fs = require('fs');
function readFile(filename) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, 'utf-8', function(data, err) {
            err ? reject(err) : resolve(data);
        })
    });
} 

/**
 * 
 */
function *read() {
    let a = yield readFile('1.txt');  // 1
    console.log(a);
    let b = yield readFile('1.txt');
    console.log(b);
    let c = yield readFile('1.txt');
    console.log(c);
    return c;
}

let it = read();
let r1 = it.next();
console.log(r1);  // { value: promise<pending> , done: false}
r1.then(function(data) {
    let r2 = it.next(data); //a : { value: 1, done: false }
});


/**
 * co 库， 自执行generator
 */
let co = require('co')
// 执行
co(read).then(function(res) {
    console.log(res);   // read 的返回值
});

// 实现从库

function co(gen) {
    let it = gen(); // 执行生成器
    // 返回一个
    return new Promise(function(resolve, reject) {
        !function next(lastValue) {
            let {value, done} = it.next(lastValue);  // 将上一个promise的结果作为next的参数
            if(done) {
                resolve(value);
            } else {
                value.then(next, reject);    // 将value promise的结果继续执行
            }
        }()
    })
}











