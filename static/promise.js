/**
 * Created by Y on 2019/4/11.
 */
// promise有三个状态， 状态一经变化便不可再改变
// pending，异步任务正在进行。
// resolved (也可以叫fulfilled)，异步任务执行成功。
// rejected，异步任务执行失败。

// Promise在初始化时，传入的函数是同步执行的（即传入promise的函数被立即执行），然后注册 then 回调。
// 注册完之后，继续往下执行同步代码，在这之前，then 中回调不会执行。
//同步代码块执行完毕后，才会在事件循环中检测是否有可用的 promise 回调，
// 如果有，那么执行，如果没有，继续下一个事件循环。

// Promise 是一个构造函数， new Promise 返回一个 promise对象 接收一个excutor执行函数作为参数, excutor有两个函数类型形参resolve reject
// 实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
// 一个 promise 必须提供一个 then 方法以访问其当前值、终值和据因。promise 的 then 方法接受两个参数：
//多个promise实例的then回调会交替执行,这是由then回调的异步性决定的

//promise的三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

//第一步：列出三大块 this.then , resolve/reject  fn(resolve/reject)
//第二步， this.then负责注册所有函数(then需要返回一个新的promise)，resolve/reject负责执行所有函数
//第三步，resolve/reject 方法里需要加上setTimeout，防止还没进行then注册，就执行了resolve/reject
//第四步，resolve/reject 要返回一个this，这样就可以进行链式调用了
//第五步，三个状态的管理：pending, fulfilled, rejected
function Promise(excutor) {
    let _this =this;
    _this.status = PENDING;
    _this.resovlveVal = undefined;
    _this.rejectErr = undefined;
    _this.resolveCallbackArr = [];
    _this.rejectedCallBackArr = [];

    function resolve(value) {
        //1. value是一个thenable对象，返回的promise会跟随这个thenable对象，采用它的最终状态
        //2. value是一个 promise对象，那么promise.resolve将不做任何修改，原封不动的返回这个对象
        //3. 其他情况，直接返回以该值为成功状态的promise对象
        if(value instanceof Promise) {
            return value.then(resolve, reject);
        }


        setTimeout(() => {
            // 判断状态是否改变，状态从pending改变后不做任何操作， 如果是初始状态（pending），则将状态改为成功状态
            if(_this.status === PENDING) {
                _this.status = FULFILLED;
                _this.value = value;    // 成功后会得到一个值，这个值不能更改
                // 执行成功回调
                _this.resolveCallbackArr.each(cb => cb(_this.value));
            }
        });
    }

    function reject(rejectErr) {
        setTimeout(() => {
            // 判断状态是否已经改变，没改变则将状态转为 失败状态
            if(_this.status === PENDING) {
                _this.status = REJECTED;
                _this.rejectErr = rejectErr;
                _this.rejectedCallBackArr.each(cb => cb(_this.rejectErr));
            }
        })
    }

    try {
        excutor(resolve, reject);
    } catch(e) {
        reject(e);
    }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
    let _this = this;
    let newPromise;
    // onFulfilled, onRejected 为可选参数
    // 如果成功和失败的回调没有传， 则表示这个then没有任何逻辑，会只直接把值往后抛（return），
    // 相当于把promise的返回值传给下一个then方法， 值的穿透
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;    // 若果onFulfilled 不是函数，就自定义一个函数，返回resolve的值
    onRejected = typeof onRejected === "function" ? onRejected : err => { throw err };

    newPromise = new Promise((resolve, reject) => {
        {
            try {
                if(_this.status === FULFILLED) {
                    // promise 属于异步方法（微任务），必须在执行栈执行完后再取promise的值，所以需要包装一层setTimeout
                    setTimeout(() => {                       
                        try {
                            let x = _this.onFulfilled(_this.resovlveVal);    // x为当前promise（newPromise） then返回的结果
                            resolvePromise(newPromise, x, resolve, reject);  // 调用resolvePromise获取then的结果
                        } catch(e) {
                            reject(e);
                        }
                    });
                }
                if(_this.status === REJECTED) {
                    setTimeout(() => {
                        try {
                            let x = _this.onRejected(_this.rejectErr);
                            resolvePromise(newPromise, x, resolve, reject);
                        } catch(e) {
                            reject(e);
                        }
                    });
                }
                if(_this.status === PENDING) {
                    // 如果状态为pending， 则将resolve 和 reject 分别放进 成功回调队列onFulfilled和失败回调队列onRejected，等待状态改变后调用相应回调
                    _this.onFulfilled.push(
                        setTimeout(() => {
                            try {
                                let x = _this.onFulfilled(_this.resovlveVal);
                                resolvePromise(newPromise, x, resolve, reject);
                            } catch(e) {
                                reject(e);
                            }
                        })
                    );
                    _this.onRejected.push(
                        setTimeout(() => {
                            try {
                                let x = _this.onRejected(_this.rejectErr);
                                resolvePromise(newPromise, x, resolve, reject);
                            } catch(e) {
                                reject(e);
                            }
                        })
                    );
                }
            } catch(e) {
                
            }
        }
    });
    return newPromise;      // then方法返回一个promise
}

// promise.then 可以返回任何值（一个值或者一个promise）, 如果是一个promise对象，就需要先将其拆解，再获取它的值
function resolvePromise(newPromise, x, resolve, reject) {
    // x是promise.then 的结果（一个promise对象），在创建时，调用了 resolvePromise(newPromise, x, resolve, rejecf)，
    // 如果x == newPromise， 即是一个promise， 就需要循环调用resolvePromise() 去获取它的值。此时，x还在等待状态，又需要执行它的then方法，就会陷入循环等待中
    // newPromise永远是pending状态，不会死循环。相当于 let p2 = p1.then(function(res) { retur p2 }); 没有调用resolve也没有调用reject
    if(newPromise === x) {   
        throw new Error('循环引用！');
    }
    if(x && typeof x === "object" || typeof x === "function") {
        let used = false;      // 判断resolvePromise 是否已经执行，即状态是否已经变为fulfilled 或 rejected，状态改变后则不需要再执行
        try {
            let then = x.then;     // 判断x 是否是一个 promise
            if(typeof then === "function") {    // 如果then是一个函数，则x是一个promise对象，递归拆解
                then.call(x, (y) => {
                    if(used) return;
                    used = true;
                    resolvePromise(newPromise, y, resolve, reject);
                }, (err) => {
                    if(used) return;
                    used = true;
                    reject(err);
                })
            } else {
                if(used) return; 
                used = true;
                resolve(x);     //x不是promise对象，直接返回它的值
            }
        } catch(e) {
            if(used) return;
            used = true;
            reject(e);
        }
    } else {
        resolve(x);    // 不是promise 直接返回
    }
}

Promise.all = function(promises) {
    return new Promise((resolve, reject) => {
        let index = 0;
        let result = [];
        if(promises.length === 0) {
            resolve(result);
        } else {
            function processValue(i, data) {
                result[i] = data;
                if(++index === promises.length) {
                    resolve(result);
                }
            }

            for(let i=0;i<promises.length;i++) {
                Promise.resolve(promises[i].then((data) => {
                    processValue(i, data);
                }, (err) => {
                    reject(err);
                    return;
                }));
            }
        }
    })
}










/**
 * async await
 */
// await后面可以是一个promise对象，也可以是一个原始类型的值
// async 返回的是一个promise对象