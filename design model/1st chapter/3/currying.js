//函数柯里化
//把数值存起来到（ 通过闭包的形式 ） ，待到需要计算的时候一次性计算




//柯里化函数
var currying = function( fn ){
 var args = [];
 return function(){
  if ( arguments.length === 0 ){
   return fn.apply( this, args );
  }else{
   [].push.apply( args, arguments );
   return arguments.callee;
  }
 }
};
//无柯里化
var cost = (function(){
 var args = [];
 return function(){
  if ( arguments.length === 0 ){
   var money = 0;
   for ( var i = 0, l = args.length; i < l; i++ ){
    money += args[ i ];
   }
   return money;
  }else{
   [].push.apply( args, arguments );
  }
 }
})();
cost( 100 ); // 未真正求值
cost( 200 ); // 未真正求值
cost( 300 ); // 未真正求值
console.log( cost() ); 


//被柯里化的函数
var cost = (function(){
 var money = 0;
 return function(){
  for ( var i = 0, l = arguments.length; i < l; i++ ){
   money += arguments[ i ];
  }
  return money;
 }
})();
var cost = currying( cost ); // 转化成 currying 函数
console.log (cost( 100 )); // 未真正求值
cost( 200 ); // 未真正求值
cost( 300 ); // 未真正求值
alert ( cost() ); // 求值并输出：600

//uncurrying
Function.prototype.uncurrying = function () {
 var self = this;
 return function() {
  var obj = Array.prototype.shift.call( arguments );
  return self.apply( obj, arguments );
 };
};

var push = Array.prototype.push.uncurrying();
(function(){
 push( arguments, 4 );
console.log( arguments ); // 输出：[1, 2, 3, 4]
})( 1, 2, 3 );

//函数节流
var throttle = function ( fn, interval ) {
var __self = fn, // 保存需要被延迟执行的函数引用
timer, // 定时器
firstTime = true; // 是否是第一次调用
return function () {
 var args = arguments,
 __me = this;
if ( firstTime ) { // 如果是第一次调用，不需延迟执行
 __self.apply(__me, args);
 return firstTime = false;
}
if ( timer ) { // 如果定时器还在，说明前一次延迟执行还没有完成
 return false;
}
timer = setTimeout(function () { // 延迟一段时间执行
 clearTimeout(timer);
 timer = null;
 __self.apply(__me, args);
}, interval || 500 );
};
};
window.onresize = throttle(function(){
 console.log( 1 );
}, 500 );

//分时函数
var timeChunk = function( ary, fn, count ){
 var obj,
 t;
 var len = ary.length;
 var start = function(){
  for ( var i = 0; i < Math.min( count || 1, ary.length ); i++ ){
   var obj = ary.shift();
   fn( obj );
  }
 };
 return function(){
  t = setInterval(function(){
if ( ary.length === 0 ){ // 如果全部节点都已经被创建好
 return clearInterval( t );
}
start();
}, 200 ); // 分批执行的时间间隔，也可以用参数的形式传入
 };
};

var ary = [];
for ( var i = 1; i <= 1000; i++ ){
 ary.push( i );
};
var renderFriendList = timeChunk( ary, function( n ){
 var div = document.createElement( 'div' );
 div.innerHTML = n;
 document.body.appendChild( div );
}, 8 );
renderFriendList();
