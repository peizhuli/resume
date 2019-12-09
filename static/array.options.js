/**
 * Created by Y on 2019/4/11.
 */
// 1.forEach
// 可改变引用类型的值，不可改变值类型的值， 不能终止或跳出forEach循环
let arr1 = [
    {
        name: 'abc',
        age: 18
    }
];
let arr2 = [1, 2, 3];

arr1.forEach((value,index, arr) => {
    console.log(this);    //  this指向arr2, 若没指定，则指向window
    value.age = 16;
},arr2);
console.log(arr1);         // 修改了原数组中的age（引用类型）
arr2.forEach((value, index, arr) => {
    value *= 2;
});
console.log(arr2);  // [1,2,3]  不修改原数组的值（值类型）

// 修改原数组中数值类型的值
arr2.forEach((value, index, arr) => {
    arr2[index] = value * 2;
});
console.log(arr2);    // [2,4,6]  修改了原数组的值


// 2.map    不修改原数组的值， 返回一个新的数组，原数组的每个元素都会执行一遍回调函数，最后需要return，返回的元素组成新的数组（包括undefied），  不能终止或跳出循环
// map只会在array中有值的元素上进行遍历操作，即会跳过那些undefied和空元素
let arrMap1 = ["1", "2", "3"];
arrMap1.map(item => {
    parseInt(item);        // [1, undefied, undefied];
});
// map() 调用时会传递三个参数， value, index, arrMap1
// 执行 parseInt(value, 进制数), index 被当成了进制数， 第三个参数会忽略


// 3.filter   不会修改原数组，对原数组每个元素进行过滤 并 返回一个使得callback函数值为 true 或近似 true 的值，组成新数组
let filterArr = [1,2,3,4,5];
filterArr.filter(v => {
    if(v > 3) {
        return v;
    }
});
// [4,5]
// filter实现数组去重
filterArr.filter((value, index) => {
    return filterArr.indexOf(value) === index;
})

// 4.sort  对数组进行排序操作， 改变原数组。 默认按字符unicode编码排序
// 可提供比较函数compareFunction(a,b)  若比较值小于0 ，则a 排在b前面； =0, a,b相对位置不变； >0 a排在b后面
let Users = [
    {name:'鸣人',age:16},
    {name:'卡卡西',age:28},
    {name:'自来也',age:50},
    {name:'佐助',age:17}
];
Users.sort((a,b)=> {
    return a.age - b.age
});

// 5.some 返回一个boolean类型值  找到数组中第一个符合条件的元素就直接返回true，跳出循环
// 6.every 返回一个boolean类型值， 全部符合条件才返回true, 否则返回false

//reduce
// reduce可接收两个参数，第二个参数可选
// @param {Function} callback 迭代数组时，求累计值的回调函数
// @param {Any} initVal 初始值，可选  如果传递了则作为acc传给callback，数组的第一项作为val当前遍历值；如果没传递，则数组第一项作为acc，第二项作为val

//第一个callback函数可接收四个参数，经处理后返回新的累计值，这个累计值作为新的acc传给下一个callback处理
// @param {Any} acc 累计值
// @param {Any} val 当前遍历的值
// @param {Number} key 当前遍历值的索引
// @param {Array} arr 当前遍历的数组

// reduce做数组去重
let reduceArr = [1,2,2,3,4,5,5,7,7,8];
let res = reduceArr.reduce((acc, val) => {
    if(acc.indexOf(val) < 0) {
        acc.push(val);
    }
    return acc;
}, []);

//
let res3 = reduceArr.sort().reduce((acc, val) => {
    if(acc.length === 0 || acc[acc.length - 1] !== val) {
        acc.push(val);
    }
    return acc;
}, []);

//reduce 统计数组元素出现次数
let res2 = reduceArr.reduce((acc, val) => {
    acc[val] === void 0 ? acc[val] = 1 : acc[val]++;
    return acc;
}, {});


// 使用reduce实现数组扁平化
let arr3 = [1, [2, 3], 4, [5, [6, 7]]];
let flatten = function(arr) {
    let result = arr.reduce(function (acc, val) {
         return acc.concat(Array.isArray(val) ? flatten(val) : val);
    }, []);
    return result;
}

// 数组驱虫，排序，扁平化
let arr4 =  [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
flatten(arr4).sort(function(a,b) {return a - b}).reduce(function(acc, val) {
    if(acc.indexOf(val) === -1) {
        acc.push(val);
    }
    return acc;
}, []);

/**
 * for in 和 for of
 */
// for in 循环遍历的是key; for of 循环遍历的是value
// for in 会遍历对象的自定义属性， for of不会
// for of 不适用于遍历普通对象， 只能遍历对象的value，不会遍历key
let arr = [1,2,3];
arr.name = 'arr';
for(let key in arr) {
    console.log(key);    // 0, 1, 2, name
}


/**
 * 解析url查询参数, search = ?param=1&...
 */
function parseUrl() {
    var query = location.search.substring(1);  // 去掉问号
    var obj = {};
    var arr = query.split('&');
    arr.forEach(function(item) {
        var items = item.split('=');
        var key = decodeURIComponent(items[0]);
        var value = decodeURIComponent(items[1]);
        obj[key] = value;
    });
    return obj;
}

// encodeURI 作用域整个uri， encodeURICompopnent 作用域某一段uri
// 主要用于对URI进行编码，有效的UIR中不包含某些特殊字符，例如空格（%20），而encodeUIR使用特殊的utf-8编码替换那些不合格的字符，使得浏览器能够理解URI
// 使用 decodeURIComponent 对URI进行解码操作

// eval ： 执行一个js字符串
// eval创建的任何变量和函数 的作用域 都不会被提升，解码的时候它们被包含在一个字符串汇总，只有在eval执行的时候才创建