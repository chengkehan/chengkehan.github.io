#自动解析、生成XML数据结构对应的代码

**2016-2-28**

游戏开发中经常会用到 XML 来存储配置数据，在游戏运行时，会加载 XML 文件并且解析其中的内容，以便在游戏中使用。以前我都是手工编写解析 XML 的代码，而且 XML 数据结构对应的代码也都是手工编写的。

比如有个这样的 XML

    <root>
    	<node name="a" width="100" height="200"></object>
    	<node name="b" width="300" height="400"></object>
    </root>
    
那么就需要手工写一个类
    
    class Node
    {
    	string name;
    	int width;
    	int height;
    }
    
还需要手工写一段解析 XML 的代码

    XmlParser parser = new XmlParser(xmlStr);
    List nodes = parser.doc.Nodes("root/node");
    foreach(var node in nodes)
    {
    	// 解析每一个node，并获取存储其属性
    }

如果需要处理的 XML 文件非常多的时候，就需要手工编写很多类似的代码。这些代码的功能都是重复而且单一的，造成了时间上的浪费，而且还很容易出错，需要额外的调试时间。那么如果能把这部分时间节省下来，就能提高很多开发效率。

于是，就有了编写一个能够自动解析、生成 XML 数据结构对应的代码的想法。主要的功能是，能够自动生成所有的数据结构代码，并且能够自动解析完成，并且将读取的数据填充到生成的数据结构代码中。下面会逐步开始设计这个功能，并应用到项目中。
