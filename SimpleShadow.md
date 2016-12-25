# 整理并扩展一个阴影渲染的实现

**2016-12-25**

原始的实现只是 Hard Shadow：

> ![img](SimpleShadow/1.png =200x)

这次增加了局部 ShadowMap（非屏幕中所有物体，而只是需要渲染阴影的物体，这样可以避免深度导致的部分穿帮），以及 Soft Shadow：

> ![img](SimpleShadow/2.png =200x)

并且增加了 Fade Shadow（模拟多光源情况下的阴影淡化效果）：

> ![img](SimpleShadow/3.png =200x)

控制面板上的参数：

> ![img](SimpleShadow/4.png =200x)

[Github 项目地址][link1]。

[link1]: https://github.com/chengkehan/XKShadow