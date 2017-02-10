# 战争迷雾

**2017-2-10**

要实现一个类似战争迷雾的效果，方法是生成一张 Texture（Mask） 对应覆盖整个场景，实时修改 Texture 中的像素来表示区域是否探索，场景中模型变换到世界坐标并映射到 Texture 上具体的像素点，获取像素信息（是否探索），叠加到模型本身的着色上。

主要的问题是如何实时修改 Texture，这个本身没有难点，最重要的是要保证运行效率。

这里提供两个方法，并简单说明：

### 绘制 RenderTexture

Texture 是一张 RenderTexture，使用类似如下的代码：

	RenderTexture.active = rt;
	Graphics.Draw...
	RenderTexture.active = null;
	
### 填充 Texture2D

代码如下:

	Color[] colorBuffer = texture.GetPixels();
	// modify colorBuffer
	texture.SetPixels(colorBuffer);
	texture.Apply();
	
很简单的实现，但是效率太低。所以改为多线程的方式，在子线程中向 colorBuffer 填充数据，在主线程中将填充完成的数据传到 GPU 中。这里的问题是如何让主线程知道子线程已经完成数据的填充，这一步非常关键，否则画面会出现撕裂的效果。很明显需要使用同步机制，我顺便参考了很多这方面的资料，找到[一个写的很不错的blog][link1]，其中的一系列文章对 C# 的多线程做了详细的介绍。最终经过不断测试，使用非阻止同步（Interlocked）的方式来实现（计数器递增），因为这样不会出现锁这种繁琐的东西，并且运行效率要远高于锁。当子线程完成任务后，计数器递增，主线程中检测计数器，判断是否所有任务都已经完成，然后将数据传递到 GPU 中。有一点小缺陷，子线程由于并非和主线程完全同步，所以子线程填充数据的帧率比主线程的帧率要慢，也就是说画面在显示上会比主线程慢几帧，好在这个完全无法察觉到。

[link1]: http://www.cnblogs.com/JimmyZheng/

至于使用几个子线程，这需要根据具体情况设置，并不是子线程越多越好，而是需要数据量和线程个数达到一个平衡。
	