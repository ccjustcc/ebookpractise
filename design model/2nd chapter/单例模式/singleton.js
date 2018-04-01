//1.实现单例模式的两种简单方式

var Singleton = function( name ){
 this.name = name;
 this.instance = null;
};
Singleton.prototype.getName = function(){
 alert ( this.name );
};
Singleton.getInstance = function( name ){
 if ( !this.instance ){
  this.instance = new Singleton( name );
 }
 return this.instance;
};
var a = Singleton.getInstance( 'sven1' );
var b = Singleton.getInstance( 'sven2' );
alert ( a === b ); // true

//2.更加透明的实现单例模式，其实就是直接 new
var CreateDiv = function( html ){
 this.html = html;
 this.init();
};
CreateDiv.prototype.init = function(){
 var div = document.createElement( 'div' );
 div.innerHTML = this.html;
 document.body.appendChild( div );
};
接下来引入代理类 proxySingletonCreateDiv ：
var ProxySingletonCreateDiv = (function(){
 var instance;
 return function( html ){
  if ( !instance ){
   instance = new CreateDiv( html );
  }
  return instance;
 }
})();
var a = new ProxySingletonCreateDiv( 'sven1' );
var b = new ProxySingletonCreateDiv( 'sven2' );
alert ( a === b );


//3.命名空间防止过多全局变量 污染
var MyApp = {};
MyApp.namespace = function( name ){
 var parts = name.split( '.' );
 var current = MyApp;
 for ( var i in parts ){
  if ( !current[ parts[ i ] ] ){
   current[ parts[ i ] ] = {};
  }
  current = current[ parts[ i ] ];
 }
};
MyApp.namespace( 'event' );
MyApp.namespace( 'dom.style' );
console.dir( MyApp );