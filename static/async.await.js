/**
 *  是 generator 和promise 的语法糖
 *  可以很好的处理异步，捕获错误等。
 */
let fs = require('fs');
function readFile(filename) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, 'utf-8', function(data, err) {
            err ? reject(err) : resolve(data);
        })
    });
} 

async function read() {
    let a = await readFile('1.txt');
    console.log(a);
    let b= await readFile('1.txt');
    console.log(b);
    let c = await readFile('1.txt');
    console.log(c);
}

read.then(function(res) {
    console.log(res);  // c
});