#Direct3D 12 Note Part 6

**2016-1-31**

##资源风险（Resource Hazards）

Resource Barriers 的应用。

所谓风险就是在资源变换的时候，比如说从 Render Target 变换到 Texture。在游戏中实时渲染了一张环境贴图，然后想作为 Texture 来使用。运行时和驱动会追踪这个资源，把它作为一个 Render Target 或者 一个 Texture。在任何时候将其设定为其中任何一种类型，都会解除旧的设置并且添加新的设置。应用程序就是这样根据需要进行切换。另外，驱动必须刷新（Flush） GPU 管线来使得可以把 Render Target 作为 Texture 使用。如果不做刷新的操作，在像素退出 GPU 之前就行读取操作，状态会变得不一致。所以为了避免资源风险，不要 GPU 做额外的工作。上面提到的一种情况只是举例，还有很多其他的情况。

Direct3D 12 通过将资源转换的控制权交给应用程序来减少消耗。应用程序在明确的时候讲 Render Target 转换成 Texture，每帧转换一次或者按照一定的频率。这样应用程序就完全可控制了。
