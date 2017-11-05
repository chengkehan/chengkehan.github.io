# Shadow Volume 2

**2017-11-5**

### Shadow Volume 的两种实现方法及其优缺点

Shadow Volume 的原理就是在 Stencil Buffer 给阴影区域做上标记，特定标记的地方就是在阴影中的像素。在 Stencil Buffer 上做标记有两种方法，一种是 Z-Pass，一种是 Z-Fail。

Z-Pass 方法：

* 初始化 Stencil Buffer 为 0。
* 关闭 Depth Buffer 和 Color Buffer 的写入，绘制 Shadow Volume 的 Front Face，Stencil 递增。
* 关闭 Depth Buffer 和 Color Buffer 的写入，绘制 Shadow Volume 的 Back Face，Stencil 递减。
* 这时 Stencil Buffer 中不为 0 的部分则为阴影区域。

Z-Pass 方法的一个问题是，当相机位于 Shadow Volume 内部时就无法正确绘制阴影了，因为 Front Face 位于相机的后面，所以无法绘制一个完整的 Shadow Volume 了。

为了解决 Z-Pass 的这个问题，Z-Fail 方法出现了（Z-Fail 方法由 [John Carmack](https://en.wikipedia.org/wiki/John_Carmack) 发明）。其步骤为：

* 初始化 Stencil Buffer 为 0。
* 关闭 Depth Buffer 和 Color Buffer 的写入，绘制 Shadow Volume 的 Back Face，深度检测失败的话，Stencil 递增。
* 关闭 Depth Buffer 和 Color Buffer 的写入，绘制 Shadow Volume 的 Front Face，深度检测失败的话，Stencil 递减。
* 这时 Stencil Buffer 中不为 0 的部分则为阴影区域。

当然，从 Z-Pass 方法并不能无缝过渡到 Z-Fail 方法，其中有些注意点：

* 在 Z-Pass 方法中，Shadow Volume 并不需要是封闭的。由于 Shadow Volume 起始于物体的 Back Face，结束无无穷远处，所以 Shadow Volume 的两端由于深度测试永远失败，所以可以不考虑。而在 Z-Fail 方法中，Shadow Volume 必须是封闭的体，即 Shadow Volume 两端必须封闭，因为 Z-Fail 方法就是利用深度检测失败，所以不能忽略。
* Shadow Volume 一个比较大的渲染开销就是会消耗很多的填充率，而 Z-Fail 方法消耗的填充率会比 Z-Pass 方法的填充率多很多。因为 Z-Pass 方法在深度检测失败时就终止了，而 Z-Fail 方法由于利用了深度检测失败，所以也就造成了消耗更多的填充率。

上面介绍的 Z-Pass 和 Z-Fail 两种方法都需要使用两个 Pass 来绘制，每一个 Pass 分别对应 Cull Back 或 Cull Front。而使用 Two-Side Stencil 方法，可以在一个 Pass 中完成原来两个 Pass 的工作。即在绘制时，关闭背面裁切（Cull Off），分别指定 Front Face 和 Back Face 的 Stencil Operation。在使用这种优化方法的时候需要注意，需要将 Stencil Value 设置为 Wrap 模式，而不是 Saturate 模式，或者将 Stencil 值初始化为一个较为合理的中间值（比如 128，大多数情况够用，复杂的情况可能会出错）。

上文提到了 Z-Fail 方法避免了 Z-Pass 方法的一个弊端，就是相机的位于 Shadow Volume 内部的时候的一个 bug，也可以解释为 Front Face 被相机的 Near Clip Plane 裁掉了。但是 Z-Fail 同样有类似的问题，只是把问题转移到了 Far Clip Plane 上。使用 Z-Fail 方法时，Shadow Volume 必须是一个封闭体，且 Shadow Volume 的远端是在无穷远处，但是 Far Clip Plane 并不在无穷远处，这就造成了无穷远处的 Shadow Volume 由于被 Far Clip Plane 裁切到了，所以无法将值写入到 Stencil Buffer 中。这个问题一个最简单的解决办法是 Shadow Volume 远端不要投射到无穷远处，而是根据实际场景投射到足够远且保证在 Far Clip Plane 范围以内。还有一种方法是通过修改投影矩阵，来避免在齐次空间中被裁切掉。