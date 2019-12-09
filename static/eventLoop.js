// JavaScript中有两种异步任务:
// 宏任务: script（整体代码）, setTimeout, setInterval, setImmediate, I/O, UI rendering
// 微任务: process.nextTick（Nodejs）, Promises, Object.observe, MutationObserver;
// 主线程执行完，先执行微任务，再执行宏任务。promise.then 为交替执行

/**
 * 事件监听
 */

 var eventUtil = {
     getEvent: function(event) {
         return event || window.event;
     },
     getTarget: function(event) {
         return event.target || event.srcElement;
     },
     on: function(ele, type, handler) {
         if(ele.addEventListener) {
             ele.addEventListener(type, handler, false);
             return handler;
         } else if(ele.attchEvent) {
             var eventHanler = function() {
                 var event = window.event;
                 var target = event.srcElement;
                 handler.call(ele, event);
             };
             ele.attchEvent('on' + type, eventHanler);
             return eventHanler;
         }
     },
     off: function(ele, type, handler) {
         if(ele.removeEventListener) {
             ele.removeEventListener(type, handler, false);
         } else if(ele.detachEvent) {
             ele.detachEvent('on' + type, handler);
         }
     },
     preventDefault: function(event) {
         if(event.preventDefault) {
             event.preventDefault();
         } else if('returnValue' in event) {
             event.returnValue = false;
         }
     },
     stopPropaga: function(event) {
         if(event.stopPropagation) {
             event.stopPropagation();
         } else if('cancelBubble' in event) {
             event.cancelBubble = true;
         }
     }
 };


 /**
  * 自定义事件
  */
 function EventTarget() {
     this.handlers = {};
 }

 EventTarget.prototype = {
     constructor: EventTarget,
     addHandler: function(type, hanlder) {
         if(typeof this.hanlders[type] === "undefined") {
             this.handlers[type] = [];
         }
         this.handlers[type].push(handler);
     },
     removeHanlder: function(type, hanlder) {
         if(this.handlers[type] instanceof Array) {
             const handlers = this.handlers[type];
             for(var i = 0;i < handlers.length; i++) {
                 if(handlers[type] === handler) {
                     break;
                 }
                 handlers.splice(i,1);
             }
         }
     },
     fire: function(event) {
         if(!event.target) {
             event.target = this;
         }
         if(this.handlers[event.type] instanceof Array) {
             const handlers = this.handlers[event.type];
             handlers.forEach(function(handler) {
                 handler(event);
             })
         }
     }
 };



 /**
  * 事件机制
  */
 // 1. HTML事件： 将事件直接绑定在HTML元素上 <input value="" onchange="func()" />
 // 2. DOM 1级事件： 将一个函数赋值给一个事件处理程序属性  
 var ele = docuemnt.getElementById('id');  
 ele.onclick = function() {};
ele.onclick = null;    // 删除事件
 // 3. DOM 2级事件: 定义了两个方法来 指定和删除事件处理程序； addEventLIstener , removeEventListener
 ele.addEventListener('click', function() {}, false);
 //  第一个参数 'click' 表示事件类型
 // 第二个参数是事件回调函数
 // 第三个参数表示 是否在事件捕获阶段处理程序， true: 事件捕获；false: 事件冒泡阶段处理程序（默认）

 // 通过addEventListener添加的事件只能通过removeEventListener来移除，且两者传入的参数必须相同，所以通过匿名函数方式作为参数的形式，无法移出事件监听器
 // 可通过将回调函数写在外部并命名的方式
 function handler() {};
 ele.addEventListener('click', handler, false);
 ele.removeEventListener('click', handler, false);

 // IE 8- 只支持事件冒泡机制，所以无法兼容 DOM 2级事件处理机制
 function handler() {};
 ele.attachEvent('onclick', handler);
 ele.detachEvent('onclick', handler);