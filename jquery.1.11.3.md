# core/init.js


jQuery.fn.init = function( selector, context ) {}

selector 接收三种类型的参数： string, HTML DOM 元素对象, function; 并且对每一种类型进行不同的处理；

jQuery.parseHTML: 将html字符串模板转化为dom list;
jQuery.merge: 将两个NodeList合并成一个NodeList 或者 是array;
jQuery.isPlainObject: 是否为普通对象
jQuery.find: 查找子元素
jQuery.isFunction: 判断是否是方法function
jQuery.type: 返回数据类型
jQuery.makeArray: 转化成jquery数组