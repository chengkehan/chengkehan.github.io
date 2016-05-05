#解析 XML 数据

**2016-5-5**

在几个月前我有做过[这样的记录](XmlToCodeToDo.html)，其目的是避免解析 XML 时手工编写太多的代码，造成重复的体力劳动。后来经过一番资料的查找，我发现其实并没有必要做这样的工具，因为 C# 已经为我们提供了更好的解决方案了，就是使用 `Attribute` 和 `XmlSerializer`。比如说有下面这样的 XML。

	<?xml version="1.0" encoding="us-ascii"?>
	<cats>
	    <item animType="Loop" color="White">
	      <saying>I am a white cat</saying>
	    </item>
	    <item animType="Wrap" color="Black">
	      <saying>I am a black cat</saying>
	    </item>
	</cats>

以前在游戏中使用这个 XML 的时候都是手工解析的，伪代码如下。

	XmlDocument doc = new XmlDocument();
	doc.Load(xmlStr);
	
	XmlNodeList itemNodes = doc.SelectNodes("cats/item");
	CatCollection cats = new CatCollection();
	foreach(var itemNode in itemNodes)
	{
		Cat cat = new Cat();
		// 读取节点数据赋值给 cat
	}
	
每一张 XML 数据表都需要手工写这样的代码，非常耗时，而且还容易出错。但是使用 `Attribute` 和 `XmlSerializer`，就不需要自己编写解析 XML 数据的代码了，只需要定义好 XML 数据表对应的 Class 即可。

	[XmlRoot("cats")]
	public class CatCollection
	{
		[XmlElement("item")]
		public Cat[] Cats { get; set; }
	}

	[XmlRoot("cat")]
	public class Cat
	{
		[XmlAttribute("color")]
		public string Color { get; set; }
		
		[XmlElement("saying")]
		public string Saying { get; set; }

		[XmlAttribute("animType")]
		public AnimationType animationType;
	}
	
然后像下面这样编写解析 XML 的代码。

	XmlSerializer serializer = new XmlSerializer(typeof(CatCollection));
	CatCollection cc = serializer.Deserialize(xmlStr) as CatCollection;
	
如果将上面代码利用泛型封装好，我们所有的 XML 解析代码都可以统一成一个函数，再也不费时费力手动解析了。至于如何生成带有 Attribute 的 Class，应该也有很多办法，似乎 XSD 就可以（我没有测试过），实在不行自己写工具也不是难事。

最后我使用了三种加载 XML 的方式对一张大型的 XML 数据表（977kb），在 IOS 设备上进行了性能测试。测试设备 Iphone6S，从一个空场景启动，并开始解析 XML。

解析方式 | 内存（Mono） | 耗时（Mono） | 内存（IL2CPP）| 耗时（IL2CPP）
------------ | ------------- | ------------ | ------------ 
XmlDocument | 45MB  | 700ms | 60MB | 2350ms
XmlSerializer | 37MB  | 550ms | 41MB | 1680ms
TinyBinaryXml | 33MB  | 80ms | 37MB | 202ms

可以看出使用 `XmlSerializer` 比起我们自己手工解析 XML 数据反而有一定的优势，而且使用起来更方便快捷。奇怪的是 IL2CPP 不管从内存还是耗时上都要差于 Mono。至于 [TinyBinaryXml](https://github.com/chengkehan/unityLab/tree/master/TinyBinaryXml) 是什么，它是一个将 XML 文本序列化成字节流的工具，这样只需要处理字节流即可，免去了分析字符串的过程（任何语言处理字符串都是又慢又耗内存的）,一般只是在最后优化时才使用，因为毕竟开发的时候使用文本文件才是最方便的。
