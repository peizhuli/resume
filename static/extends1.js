/**
 * Created by Y on 2019/4/11.
 */
// 1.new()实现
function newObj() {
    //创建一个新对象
    var obj = {};
    //获取构造函数名称
    var constructor = [].shift.call(arguments);
    //将对象原型链接到构造函数原型上
    obj.__proto__ = constructor.prototype;
    //将 this 指向新对象
    constructor.apply(obj,arguments);
    return obj;
    //返回对象
}


//继承
/* ==== 1.原型链继承 ===== */
function superType(name) {
    this.name = name;
}
function subType() {
    let arr = [1,2,3];
}
subType.prototype = new superType();    // 创建的子类 无法 向 父类传递参数；
subType.prototype.show = function() {}; // 给子类原型添加方法，必须在替换子类原型之后，否则实例对象无法访问

let type1 = new subType();  // type1.__prototype.constructor === superType //实例对象的原型上（__proto__）的constructor 被修改，指向了父类中继承的构造函数
let type2 = new subType();
type1.arr = [1,2];    //  type2.arr  // [1,2]  // 一个实例对象 对 引用类型的属性进行修改 会导致所有实例继承的引用类型的属性都被修改；

/* ==== 2.构造函数继承 ===== */
//在创建子类实例对象时，调用构造函数的父类。 缺点： 子类实例无法访问 构造函数的父类原型上的方法
// 使用父类的构造函数来增强子类实例，等同于复制父类的实例给子类（不使用原型），不会改变子类的构造函数
function superType(name) {
    this.name = name;
    this.arr = [1,2,3];
}
superType.prototype.say = function() {
    console.log('hello');
};
function subType(age) {
    this.age = age;
    superType.call(this, 'name');    // 调用父类的构造函数，可以给其传参
}
subType.prototype.show = function() {
    console.log('age');
};
let type1 = new subType(18);    // type1无法访问superTypw 原型上的 say()； type1.__proto__.constructor  ==  subType
type1.arr.push(4);
console.log(type1);// [1,2,3,4]

let type2 = new subType(16);
type2.arr = [3,4,5];
console.log(type2);   // [3,4,5]
console.log(type1);   // [1,2,3,4]  不会改变type1


/*===============  组合继承  ===========*/
// 使用原型链实现对原型方法的继承， 使用构造函数实现对实例属性的继承；两次调用父类构造函数，导致子类和实例对象上都有一份父类属性
function superType(name) {
    this.name = name;
    this.arr = [1,2,3];
}
superType.prototype.say = function() {
    console.log('hello');
};
function subType(age) {
    this.age = age;
    superType.call(this, 'name');    // 第二次调用父类构造函数， 实例对象便可具有 name,arr属性
}
subType.prototype = new superType();   // 第一次调用父类构造函数

superType.prototype.constructor = superType;    // 将构造函数指回自己， 实例对象便可访问其原型链上的方法 show()
superType.prototype.show = function() {};

let type1 = new subType(18);    // type1无法访问superTypw 原型上的 say()； type1.__proto__.constructor  ==  subType

/*===============  原型式继承  ===========*/
/*===============  寄生继承  ===========*/
/*===============  寄生组合式继承  ===========*/
//通过寄生式继承，继承父类原型，然后再将结果指定给子类的原型

function inherit(child, parent) {
    let prototype = Object.create(parent.prototype);    // 创建父类原型的副本
    prototype.constructor = child;       // 将副本原型的构造函数指向 子类
    child.prototype = prototype;    // 将副本赋给子类原型

}


/**
 * 经典题目
 */
function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}

// 请写出以下输出结果：
Foo.getName();  //2
// 直接调用 Foo的getName属性方法
getName();  // 4
// 执行全局作用域中的getName()函数。 根据变量提升和函数声明提升，getName的声明顺序为
// var getName;
// function getName() { slert(5) }    // 此时已有getName的定义， 直接将function赋值给它
// getName = function() { alert(4); }  // 声明后再执行赋值操作，覆盖了function getName() {}
Foo().getName();  //1
// 先执行 Foo() 方法，返回一个this,此时this指向window，再执行 window.getName(); 
// 执行完Foo()后，全局getName()被覆盖，
getName();  // 1   
// 执行全局getName(); 此时全局getName() 已经在上一步不重写，
new Foo.getName();   //2
// 运算符执行顺序 new Foo()  >> foo()  >>  new Foo
// 所以先执行 Foo.getName()， 再创建一个执行后的实例对象   
new Foo().getName();    // 3
// 先执行 new Foo(), 创建一个Foo实例对象，再执行实例对象的getName()方法，所以访问的是Foo原型中的getName方法
new new Foo().getName();  //3
// new (new Foo()) . getName()
// 创建一个 Foo实例，再创建一个实例的实例对象， 再调用getName方法