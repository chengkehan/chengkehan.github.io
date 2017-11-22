# C-Sharp 的线程本地对象

**2017-11-22**

现在有这样一种情况，有一个工具类，这个工具类中的算法会被非常平凡的调用到，在算法的运行过程中，会对类成员变量进行赋值和读取，所以这个工具类就是非线程安全的。当多个线程对其进行调用时，就会出现资源竞争的情况。一种简单的解决方法是对资源（类成员变量）加锁，或者对整个算法加锁（当工具类源码无法修改时），这样可以做到线程安全。对于为数不多的调用次数，加锁就可以了，但是对于大量的调用次数，加锁会导致程序性能的急剧降低。

因此，另一种方法就是不加锁，让每一个线程都持有工具类的一个实例对象。我们可以使用线程 ID 和工具类实例对象组成一个映射的关系，当线程需要工具类对象的时候，使用线程 ID 从映射表中获取即可。

在 C-Sharp 中 [ThreadStatic][link1] 和 [LocalDataStoreSlot][link2] 应该就是类似的实现方式。但是这两种方法有点不好的地方，ThreadStatic 只能作用于 static 成员变量，而 LocalDataStoreSlot 是弱类型维护时不方便容易出错，并且这两种方法都无法提供默认值，使用上也不是很直接，需要进行二次封装。

从 .NET 4.0 起提供了一种新的解决方案，[ThreadLocal][link3]。ThreadLocal 可以非常优雅的解决以上遇到的问题。下面举一个具体的例子。

[link1]: [https://msdn.microsoft.com/en-us/library/system.threadstaticattribute(v=vs.110).aspx]
[link2]: [https://msdn.microsoft.com/zh-cn/library/system.localdatastoreslot.aspx]
[link3]: [https://msdn.microsoft.com/zh-cn/library/dd642243.aspx]

我会在一个运算量非常大的方法中平凡的生成很多随机数（使用的是 System.Random），由于在一帧中完成所有的计算会导致非常严重的卡顿，所以我将这个大运算量的方法拆分到多个子线程中。这时遇到的问题就是 System.Random 并不是线程安全的。一种解决方法是加锁（上文中提到了），由于生成的随机数非常多，加锁就导致程序性能下降严重。另一种解决方法是保证每一个线程持有独立的 Random 对象，避免资源竞争，于是就可以使用像下面的代码（[correct-way-to-use-random-in-multithread-application][link4]）：

	public static class StaticRandom
	{
	    static int seed = Environment.TickCount;

	    static readonly ThreadLocal<Random> random =
	        new ThreadLocal<Random>(() => new Random(Interlocked.Increment(ref seed)));

	    public static int Rand()
	    {
	        return random.Value.Next();
	    }
	}

[link4]: [https://stackoverflow.com/questions/19270507/correct-way-to-use-random-in-multithread-application]

经过这样的修改，在我的代码测试中，相比加锁，程序运行时间减少了 50% 以上。

