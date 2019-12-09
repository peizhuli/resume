import { isObject } from "util";

function newFun() {
    var obj = {};    //创建一个新对象
    var constructor = [].shift.call(arguments);       //获取当前的构造函数
    obj.__proto__ = constructor.prototype;             //将对象的原型连接到构造函数原型上
    constructor.apply(obj,arguments);                 //将this指向对象
    return obj;                                       //返回当前对象
}


//深拷贝
function deepCopy(source) {
    if(!isObject(source)) return source;    //非对象则返回自身
    var target = Array.isArray(source) ? [] : {};
    for(var key in source) {
        if(Object.prototype.hasOwnProperty.call(source[key])) {
            //判断item是否为引用类型
            if(typeof source[key] === 'object') {
                target[key] = deepCopy(source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }
        
    return target;
}



//自定义类型继承
function customClass() {}
customClass.prototype = [];   //继承数组方法
// customClass.prototype = Array.prototype;    //数组原型赋值给自定义类型的原型，如果在自定义原型上添加方法，则会影响到数组原型，给数组原型也添加了该方法。
customClass.prototype.func = function() {};

/* Object.create 兼容写法 */
function inherit(obj) {
    if(Object.create) {
        return Object.create(obj);
    } else {
        var tempFunc = function() {};    // tempFunc不存在constructor
        tempFunc.prototype = obj;
        return new tempFunc();
    }
}

var arr = inherit([]);    // [] 也不存在constructor, 再到[]的原型上查找， arr.constructor = Array;


/**
 * 继承方式
 */
// 1.将父类实例对象赋值给子类的原型对象 实现继承
child.prototype = new Father();
// 此时子类没有自己的constructor属性，而是指向父类constructor
child.prototype.constructor === Father.prototype.constructor === Father;
// 当原型进行属性和方法的改动时，对所有继承者及时生效
// 缺点：父类构造函数属性，被子类原型拥有后，由所有子类实例对象共享，任何一个子类实例对象对其属性进行修改，会影响所有子类实例对象的属性。
// 在创建继承关系时（new Father()），无法传递参数； 无法实现多继承。

//2、借用构造函数实现继承：在子类构造函数中，调用父类构造函数方法实现继承，
//抛开父类原型，直接在子类构造函数中调用父类构造函数来增强子类构造函数，子类构造函数的实例将继承父类和子类定义的实例属性和方法。
function father(param) {
    this.param = param;
    this.arr = [1,2,3];
}
function child() {
    father.call(this, 'param');
}
var son = new child();

// 优点：由父类构造函数定义的属性，被子类实例对象继承后，仍然是独立的实例属性；（如 arr）;
// 子类实例对象对父类继承属性（arr）的修改，不会影响其他子类实例继承的属性；
// 可以传递参数，可以实现多继承（子类构造函数中可以调用多个父类构造函数）；

// 缺点： 子类实例无法继承 父类原型上的方法； 子类实例与父类构造函数的继承关系无法判断，只能判断子类实例与子类构造函数之间的继承关系；
// 父类构造函数发生改动时，可能会影响子类构造函数和子类实例，但是这种改动不会影响 改动之前 已经声明的实例对象。
// 方法都定义在构造函数内部，无法实现方法复用。


//3.组合式继承 ： 利用原型链实现对父类构造函数方法的继承，利用构造函数实现父类实例属性的继承
function father() {
    var arr= [1,2,3];
}
father,prototype.func = function() {};
function child() {
    father.call(this);    // 第二次调用父类构造函数
} 
child.prototype = new father();    // 第一次调用父类构造函数
child.prototype.constructor = child;    // 将构造函数指回子类自身；
var son = new child();

// 缺点： 调用两次父类构造函数， 子类原型 和子类实例中都复制了一份父类的属性方法，子类实例中继承的父类的属性 覆盖了 子类原型中继承的实例属性


// 4.原型式继承： 创建一个空的构造函数作为桥梁，将一个对象原型作为构造函数创建新实例，这样实例对象都可以通过原型链共享这个对象的属性和方法
function object(o) {
    function F() {};
    F.prototype = o;
    return new F();
}
// 缺点： 由于引用属性是共享的，对引用属性的修改 会影响所有实例对象


// 5.寄生式继承： 在原型继承的基础上，对返回的原型进行了增强
function createAnother(obj) {
    var clone = create(obj);
    clone.attr1 = [1, 2];
    clone.func = function() {};
    return clone;
}
// 新增的属性和方法是独立的，实例对象对其进行修改，不会影响其他实例对象
// 新增的属性和方法写在函数内部，无法实现复用


// 6.组合式寄生： 父类构造函数定义的实例属性 通过构造函数方式来继承， 父类构造函数原型上定义的共享属性通过寄生方式实现继承
// 基本思路：不必为了指定 子类型的原型 而去调用 父类的构造函数，所以需要的是 父类的原型 的一个副本。 
// 本质是使用寄生式继承 来继承父类的prototype， 再将结果赋给子类的prototype
function object(o) {
    function F() { }
    F.prototype = o;
    return new F();
  }
function inferif(subType, superType) {
    var prototype = object(superType.prototype);  // 获取父类原型副本
    prototype.constructor = subType;    // 将constructor指向子类，以继承父类实例属性
    subType.prototype = prototype;    // 将父类原型赋值给子类原型 实现继承
}

function father(name) {
    this.name = name;
    this.arr = [1,2,3];
}
father.prototype.func = function() {};
function child() {
    father.call(this, 'name');
}



