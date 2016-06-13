#迎接 Vulkan

**2016-6-13**

![img](Vulkan/1.png =600x)

[Vulkan](https://www.khronos.org/vulkan/)作为新一代的图形 API 看来已经势不可挡了，多家硬件厂商的驱动已经支持了 Vulkan，Unreal Engine 已经集成了 Vulkan，而 [Unity](http://unity3d.com/cn/unity/roadmap/) 也将其列入了规划蓝图中，Google 也明确声明，支持 Vulkan 在 Android 上运行，并成为其核心图形 API。这些都表明了，Vulkan 来了。既然这样我们就来大概了解下 Vulkan。

首先我们要知道 Vulkan 的出现是为了解决什么问题，Vulkan 就是为了代替 OpenGL（OpenGL ES）。不是为了解决什么问题，不是为了和 Metal 和 DirectX 竞争，所以拿 Vulkan 和 Metal、DirectX 的比较只能是相对的。总的来说 Vulkan 的设计理念和 Metal、DirectX 12 是十分相似的。

为什么 Apple 会使用 Metal 代替 OpenGL ES（同理，为什么 Microsoft 会设计出 DirectX 12）其根本的原因就是为了提高程序运行的效率。OpenGL 已经有至少 20 年的历史了，也就是说 OpenGL 是在 20 年前的硬件架构上设计出来的，虽然经过这些年不断的进化得到了长足的发展，但是由于历史问题，内部的设计总是限制着 OpenGL，不可能抛弃所有的过往，从根本上得到质进化。OpenGL 在使用上非常方便，开发者调用对应的 API，驱动程序会进行很多底层的操作，比如内存管理；状态的检测；检测 API 是否被合适的调用了，参数是否传递正确了，如果出现任何异常都要做出相应的反馈；单线程的渲染队列。这些都影响了 OpenGL 底层的运行效率。因为这些原因，Apple 开发出了 Metal，用来代替 OpenGL ES。取而代之的是驱动不再做这些检测操作了；可以自己在多个线程中创建渲染队列，最后进行整合提交到 GPU。

可是 Android 怎么办，以前我们只能使用 OpenGL ES，而现在有了 Vulkan，这就可能让我们更充分的利用硬件资源。当然得到好处的同时也需要付出代价，那就是必须手动管理资源，因为开发者自己最清楚什么是需要的，什么是不需要的，我们自己对状态进行检测，不要让驱动为我们包办，因为驱动并不知道我们到底在做什么，所以它会对所有可能的情况都做处理，造成了资源的浪费。驱动不做了，我们自己来做，这就需要我们自己对底层有很好的认识，值得高兴的是图形引擎会帮我们做好这些。

至于使用 Vulkan 能提高多少性能，这根据应用程序而定。如果你的应用程序是因为渲染导致的 CPU 瓶颈的话，那么会有很大的提升。

值得注意的是，能够支持 Vulkan 的硬件至少要能够支持 OpenGL ES 3.1 或 OpenGL 4.5。从这一点看来，目前很多 Android 设备都不具备这个要求。虽然这需要时间，但是这一天终将到来。

学习起来吧：

[Vulkan Overview @ https://www.khronos.org/assets/uploads/developers/library/overview/vulkan-overview.pdf](https://www.khronos.org/assets/uploads/developers/library/overview/vulkan-overview.pdf)

[Vulkan Resources @ https://github.com/KhronosGroup/Khronosdotorg/blob/master/api/vulkan/resources.md](https://github.com/KhronosGroup/Khronosdotorg/blob/master/api/vulkan/resources.md)

[Vulkan Homepage @ https://www.khronos.org/vulkan/](https://www.khronos.org/vulkan/)
