# Maya 使用 Mel 批量修改模型属性

**2018-10-1**

目前的需求是需要将特定的几根骨骼叠加一个旋转角度以及偏移量，以符合制作上的需要。我最先想到的是使用 Animation Layer，这是 3DMax 中的概念，以前略有接触过，而现在使用的是 Maya，于是搜索了一下似乎也有类似的概念，由于需要改的量很大，且作为程序员又想尝试下 Maya 的脚本，所以这里就使用 Mel（Maya 中有两种脚本语言 Mel 和 Python，任选其一就可以了）。

写这种脚本比较痛苦的地方是查找[文档](http://help.autodesk.com/cloudhelp/2015/CHS/Maya-Tech-Docs/Commands/index.html)，这么多函数要找到满足要求的可不容易，所以我的方法是先 Google 类似的解决方案，然后再在同一类的函数里找。经过定位后我们要用到的函数都在 General 这一类中。

下面就是拼拼凑凑后得到的满足需求的主要代码，其实逻辑很简单，再加上窗体和按钮并使用 UI 将参数可调整就是一个简单的 Maya 插件了。

	for($i = 0; $i < 40; $i++)
	{
		currentTime $i;
		select Bone01_bip01;
		$objs = `ls -selection`;
		float $objT[] = `xform -q -t $objs[0]`;
		float $objR[] = `xform -q -ro $objs[0]`;
		float $ty = $objT[1] * -1.0;
		float $rz = $objR[2] + 180.0;
		xform -t $objT[0] $ty $objT[2] $objs[0];
		xform -ro $objR[0] $objR[1] $rz $objs[0];
	}