# GPUSkinning 2

**2017-2-15**

补充以前的一篇 [GPUSkinning][link1] 的实现，从最终的效果图可以看到，所有角色的动作都是同步的，这里进行了改进，不再使用 [uniform array][link2] 的方式来传递数据，而是将骨骼动画数据存储到了纹理中，并加以一定的差异化，避免了所有角色的动作完全同步的问题。

> ![img](GPUSkinning2/1.gif =280x)

[项目@github][link3]

[link1]: GPUSkinning.html

[link2]: https://docs.unity3d.com/ScriptReference/Material.SetMatrixArray.html

[link3]: https://github.com/chengkehan/GPUSkinning