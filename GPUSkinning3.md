# GPUSkinning 3

**2017-3-6**

继续对 GPUSkinning 进行改进。这次增加了两个 feature，增加了 [GPU Instancing][link2]，以及 [Procedural Drawing][link3]

> ![img](GPUSkinning3/1.jpg =400x)

在使用了 GPU Instancing 后，绘制 400 个角色模型只用 4 个 Batches，而原来每绘制一个角色模型都会产生 1 个 Batch 的开销。
 
> ![img](GPUSkinning3/2.png =250x)![img](GPUSkinning3/3.png =250x)
>
> GPU 开销从 5.149 毫秒降低到了 3.546 毫秒。

增加了 Procedural Drawing 后，可以看到 fps 增加了，可以绘制更多的角色模型了。

> ![img](GPUSkinning3/4.jpg =x93)![img](GPUSkinning3/5.jpg =x93)
>
> 多绘制了一倍的角色模型，fps 反而增加很多，这说明 Procedural Drawing 更充分的利用了 GPU 的能力。图中 Unity 的 Statistics 窗口中无法统计到 Procedural 绘制的三角面。

对于 Procedural Drawing 还有一个问题有待解决，目前每个角色的坐标、旋转都是存储在 ComputeBuffer 中，当角色坐标、旋转发生改变的话就必须刷新 ComputeBuffer，这个操作的开销是非常大的。

[项目@github][link1]

[link1]: https://github.com/chengkehan/GPUSkinning

[link2]: https://docs.unity3d.com/Manual/GPUInstancing.html

[link3]: https://docs.unity3d.com/ScriptReference/Graphics.DrawProcedural.html

---

补充：新增 feature，通过 [CullingGroup][link4] 增加 LOD 功能。远处的角色使用减面后的模型进行渲染。

> ![img](GPUSkinning3/6.jpg =x130)![img](GPUSkinning3/7.jpg =x130)
>
> 开启 LOD 后，GPU 开销从 0.924 毫秒降低到了 0.512 毫秒。

> ![img](GPUSkinning3/8.jpg =x140)![img](GPUSkinning3/9.jpg =x140)
>
> 开启 LOD 后，在保证渲染效果的前提下，使用了更少的三角面，从原来的 100万 降低到了 29万。

以上测试为开启 GPU Instancing，并且仅有一层 LOD 时的效果。根据项目需要，可自己定制多层 LOD。 

[link4]: https://docs.unity3d.com/Manual/CullingGroupAPI.html