/**
 * 遍历一个dom树
 */
// Element类型： nodeType = 1, nodeValue = null, nodeName（tagName） = 元素标签的名称
// 创建element元素： document.createElement("div");
 function traversal(node) {
     if(node && node.nodeType === 1) {  
         console.log(node.tagName);
     }
     for(var i=0; i< node.childNodes.length;i++) {
         if(node.childNodes[i].nodeType === 1) {
             traversal(node.childNodes[i]);
         }
     }
 }


 // Text 类型， nodeType = 3, nodeName = "#text", nodeValue = 节点所包含的文本的内容 , 没有childNodes
 // 创建文本元素  document.createTextNode("文本内容");

 // Comment类型（注释）： nodeType = 8, nodeValue = 注释的内容