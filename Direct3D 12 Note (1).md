Direct3D 12 提供了一个更低层的硬件抽象，它能让开发者显著的提高多线程CPU利用率。使用Direct3D 12 的时候，开发者需要自己进行内存管理。另外，使用Direct3D 12，还能够减少GPU开销，得益于**Command Queues and Lists**，**Descriptor Tables**，**Pipleline State Objects**这些功能。

Direct3D 12对于图形开发者来说主要提供了四个好处：极大地减少了CPU消耗，显著改善了电量消耗，提高了大约20%的GPU效率，适用于所有Windows10设备（PC，tablet，console，phone）。

Direct3D 12显然是需要更优秀的图形编程者，它需要一个更细致的控制和显卡专业知识。Direct3D 12被设计为充分利用多线程，细致的CPU/GPU同步，和传送复用资源。所有的技术都需要相当的内存级别的编程技能。

Direct3D 12 的另一个优点是更少的API。大约有200个方法，并且其中三分之一是常用的。这就意味着图形开发者就不需要去记忆大量的API调用。

Direct3D 12 并不是取代 Direct3D 11。Direct3D 12 的新的渲染功能在 Direct3D 11中同样可用。Direct3D 11.3 是一个底层的图形引擎API，Direct3D 12 更底层。

如果图形开发者懂得如何使用和重用资源，就能从最小化提交和复制资源中受益。这种性能的改善会是相当大的，节省了更多的CPU时间来增加DrawCall的数量，并且增加了更多的图形渲染。

可以选择只使用 Direct3D 11 或者 Direct3D 12。也可以通过交互技术来同时使用这两套API。