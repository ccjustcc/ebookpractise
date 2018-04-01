Function.prototype.before = function( beforefn ){
 var __self = this; // 保存原函数的引用
 return function(){ // 返回包含了原函数和新函数的"代理"函数
 beforefn.apply( this, arguments ); // 执行新函数，修正 this
 return __self.apply( this, arguments ); // 执行原函数
 }
};
Function.prototype.after = function( afterfn ){
 var __self = this;
 return function(){ var ret = __self.apply( this, arguments );
 afterfn.apply( this, arguments );
 return ret;
 }
};
var func = function(){
 console.log( 2 );
};
func = func.before(function(){
 console.log( 1 );
}).after(function(){
 console.log( 3 );
});
func(); 



var x = 10;

function foo() {
  console.log(arguments)
  alert(x);
}

(function (funArg) {

  var x = 20;

  // 变量"x"在foo中静态保存的，在该函数创建的时候就保存了
  funArg(x); // 10, 而不是20

})(foo);


