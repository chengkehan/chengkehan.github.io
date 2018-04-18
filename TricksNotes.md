# Tricks and Notes

**2018-4-18**

在 Surface Shader 中输出特定值到 alpha 的方法：关闭 alphatest:_Cutoff，使用 clip(c.a - _Cutoff) 并配合 keepalpha 关键字。

---

从 Unity5 开始，在 Android 上会多一步额外的 blit 操作，这步 blit 操作会因为 GPU 上的渲染分辨率不同而消耗相当的资源。之所以会多一步额外的 blit 是因为：

> It was done for various reasons (workaround for buggy compositors/allows alpha in frame buffer, workaround for buggy hardware scalers, better/working MSAA switching at runtime, multi-display, better match to Unity scripting APIs like Display, allows read access to backbuffer which is needed for some Unity scripting APIs).

从 2017.2 开始，Android 发布设置中多了一个选项，可以选择 Blit Type 是 Always 还是 Never。 可以通过选择 Never 来避免消耗，前提是你必须清楚这确实不会影响到渲染，因为 Unity 无法根据实际的渲染需要来 Fallback。

参考链接 [https://forum.unity.com/threads/big-performance-issue-with-unity5-on-android.338847/](https://forum.unity.com/threads/big-performance-issue-with-unity5-on-android.338847/)

---

使用了 ImageEffectOpaque 的后处理，会在所有不透明物体渲染完成后进行，完成 ImageEffectOpaque 后再渲染透明物体。但是通过测试，ImageEffectOpaque 在部分设备上有 bug，在 ImageEffectOpaque 完成后，depthbuffer 会被 clear，导致后续透明物体的深度错乱。

