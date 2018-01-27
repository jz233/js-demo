function myFunction(){
  document.getElementById('demo').innerHTML = 'demo';
  document.getElementById('myDiv').innerHTML = 'myDiv';
}

//重新声明 JavaScript 变量
// 如果重新声明 JavaScript 变量，该变量的值不会丢失：
// 在以下两条语句执行后，变量 carname 的值依然是 "Volvo"：
var carname="Volvo";
var carname;

//两种对象创建方式
function Demo1(){
  var obj = new Object();
  obj.name = "DouJ";
  obj.age = 21;
  obj.firstF = function(){};
  obj.secondF = function(){};

  return obj;
}
var one = new Demo1();
// alert(one.age);

function Demo2() {
  this.name = "DouJ";
  this.age = 21;
  this.firstF = function(){};
  this.secondF = function(){};

  // 不需要 return this; this已经直接可以在作用域中获取
}
var two = new Demo2;
// alert(two.name);

var person = {
    firstName: 'Jason',
    lastName: 'Zhang',
    age: 27,
    gender: 'male',
    fullName: function(){
      return this.firstName + ' ' + this.lastName
    }
}

// alert(person.name + '\r\n'
// + person['name']);
// alert(person.fullName)
// alert(person.fullName())
//字符串定义
var s1 = "John";
var s2 = new String("John");
// alert(typeof s1 + "\r" + typeof s2);  //string类型 和 object类型
// alert(s1 == s2) //true值相同
// alert(s1 === s2)  //false类型不同
alert(s1.constructor) //返回创建字符串属性的函数
