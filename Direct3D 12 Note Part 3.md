#Direct3D 12 Note Part 3#

**2016-1-14**

###从 Direct3D 11 到 Direct3D 12 的一些重要的变化

Direct3D 12 和 Direct3D 11 的编程模型上有些显著的不同。Direct3D 12 让程序比以前能更接近地控制底层硬件。但是在你使用 Direct3D 12 提高 App 运行速度和效率的同时，比起 Direct3D 11 你需要自己处理更多地事情。

Direct3D 12 是一个底层的编程模型，它让你对你的游戏和应用中的图形元素有这更多地控制，下面就是来介绍这些新的特性：使用对象来表示管线的综合状态（state of the pipeline），使用 Command List 和 Bundles 来提交工作，使用 Descriptor Heaps 和 Tables 来存取资源。

###显示的同步（Explicit Synchronization）
在 Direct3D 12 中，CPU 和 GPU 之间的同步是应用程序的责任了，而不再是像 Direct3D11 那样，运行时会自动替你完成。这就意味着 Direct3D 12 不会自动的检测管线的不良状态。所以全都要靠应用程序自己了。

在 Direct3D 12 中，对管线的数据更新是应用程序的责任。就是说，Direct3D 11 中的 “Map/Lock-DISCARD” 模式，在 Direct3D 12 中必须手动处理。在 Direct3D 11 中，当你获取一块缓冲区时，如果这时 GPU 任然在使用这块缓冲区，运行时会返回一个指向新内存区域的指针。这就使得 GPU 可以继续使用这块缓冲区，而应用程序操作新的缓冲区。应用程序不需要进行额外的内存管理，使用过的缓冲区会自动的被重用或者销毁。

在 Direct3D 12 中，所有的动态更新（Dynamic Update）（包括 Constant Buffer， Dynamic Vertex Buffre，Dynamic Textures等等）都需要应用程序自己控制。所谓动态更新包括任何需要 GPU 同步或者缓冲（Fences or Buffering）。应用程序有责任来保持内存可用直到确实不在需要为止。

Direct3D 12 只在接口的生命周期使用 COM 形式的引用计数（通过使用 Direct3D 的若引用模型关联到设备的生命周期）。所有的资源和内存生命周期描述的维持时间都是应用程序的责任，不是引用计数。Direct3D 11 是使用引用计数来管理接口依赖的生命周期的。

###物理内存驻留管理（Physical Memory Residency Manager）
Direct3D 12 应用程序必须阻止多个队列（Queues），多个适配器（Adapters），多 CPU 线程之间的条件竞争。D3D12 不在同步 CPU 和 GPU，也不提供方便的机制来处理资源的重命名或者多缓冲区。必须使用 Fences 来避免多处理单元在其他处理单元还没有结束前复写内存。

Direct3D 12 应用程序必须确保数据驻留在内存中，当 GPU 读取的时候。当创建对象时，内存是驻留的。应用程序必须使用 Fences 来确保 GPU 不会存取已经被释放的对象。

Resource Barriers 是另一种同步的工具，用来同步 Resource 和 Subresource 过度（Transition），以颗粒的级别进行（应该指的是代价小）。

###**To Be Continued**