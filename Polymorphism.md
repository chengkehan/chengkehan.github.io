# 多态和 ref out 关键字

**2017-4-4**

多态（polymorphism）作为 [OOP][link1] 的根基，已经是不能再熟悉了。最简单的代码像是下面这样：

[link1]: https://en.wikipedia.org/wiki/Object-oriented_programming

	class A {}
	class B : A {}
	
	void Func(A a) {}
	
	B b = new B();
	Func(b);
	
类似这样的代码，是一种很常用的写法。下面对代码做些改动：

	class A {}
	class B : A {}
	
	void Func(ref A a) {}
	
	B b = new B();
	Func(ref b);
	
逻辑上没有任何变化，唯一区别是增加了 ref 关键字，这时候就会得到一个编译错误，大致的意思是无法将 ref B 类型转换为 ref A 类型。对于这个编译错误，一开始我并不是很理解，为什么编译器会阻止这样的操作，后来 google 了[相关的资料][link2]后发现，编译器这样做确实是有其道理的，在这里通过一段代码来演示下：

	class A {}
	class B : A {}
	class C : A {}
	
	void Func(ref A a) { a = new C(); }
	
	B b = new B();
	Func(ref b);
	
这段代码中，很明显有严重的问题，在 Func 函数被调用前，变量 b 指向的是 B 类型的对象，而在 Func 函数内，由于 ref 的关系，变量 b 又指向了 C 类型的对象，这就相当于：

	B b = new C();
	
明显是错误的。这也就是当有 ref 关键字时，无法像以前那样使用多态的原因了，同样的还有 out 关键字。

[link2]: http://stackoverflow.com/questions/1207144/why-doesnt-ref-and-out-support-polymorphism/1207302#1207302