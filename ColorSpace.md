#色彩空间

**2016-3-17**

关于 Gamma Correction 和 Linear Rendering，在[candycat的文章](http://blog.csdn.net/candycat1992/article/details/46228771)以及[Unity的官方文档](http://docs.unity3d.com/Manual/LinearLighting.html)，中已经说明的很清楚了。由于目前移动设备暂不支持 Linear Rendering，所以关于这一块的内容对于移动开发就没有经常得被提及。其实不管怎样，使用哪一种色彩空间，最终的原则就是最终显示出来的效果要和美术的效果一致，要和自己构想的效果一致，要完全清楚当前在做什么，要怎么做。能够做到这几点，你就能自如灵活运用了。

这里只说一下 Unity 纹理导入时的 `Bypass sRGB Sampling` 选项。一般情况下我们都不会去勾选，只有在纹理中的像素值有具体的含义时才需要勾选，比如遮罩纹理、查表纹理等。

当然如果当前是在 Gamma 色彩空间下，勾不勾选就没有区别了。这也是以前的一个疑惑点，在此记录下。

