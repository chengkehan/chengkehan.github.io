#Direct3D 12 Note Part 3

**2016-1-21**

##Command Queues 和 Command List 的设计哲学

为了实现重用渲染工作和多线程，Direct3D 应用程序需要在如何提交渲染到GPU上做出根本性的改变。在 Direct3D 12 中，提交渲染的过程和以往有着三点重要的区别：

* 移除了立即上下文。这个使得多线程成为可能。
* 应用程序现在能够控制渲染如何被组合起来的。应用程序决定是否重用。
* 应用程序明确的控制何时提交数据到 GPU 上。

###移除立即上下文（The Immediate Context）

Direct3D 11 到 Direct3D 12 的一个最大的变化是不在有一个关联到设备的立即上下文。现在想要渲染，应用程序要创建一个 Command List。立即上下文里包含了绘制图元或者改变渲染状态的工作项，Command List 也包含了类似的东西。然而，多个 Command List 可以并行的工作，这样就能获得多核处理器带来的好处了。

### GPU 工作项的组合

除了 Command List，Direct3D 12 通过增加一个二级 Command List 来充分利用硬件的优势，这个二级 Command List 叫做 Bundles。为了区分这两种类型的 Command List，一级 Command List 通常称为 Direct Command List。Bundles 的目的是，允许应用程序将几个 API 命令组合到一起，在 Direct Command List 里重复执行。在创建 Bundle 的时候，驱动会尽可能多的进行预处理，来使得执行的时候更有效率。Bundles 可以在多个 Command List 中执行，也可以在同一个 Command List 中执行多次。

重用 Bundles 对于单 CPU 线程来说可以明显的提高效率。因为 Bundles 是被预处理的，可以被多次提交。有一些限制，就是什么样的操作可以被组合到一个 Bundle 里，这个以后会讲到。

### GPU 工作提交

要在 GPU 上执行任务，应用程序必须明确的提交 Command List 到 Command Queue 中， Command Queue 是关联到 Direct3D Device的。一个 Direct Command List 在提交后可以被执行多次，但是，应用程序有责任来确保 Direct Command List 再次被提交前，已经完成了上次所有工作。Bundles 没有并行使用限制，可以同时被多个 Command List 执行多次，但是 Bundles 不能被直接提交到 Command Queue 中。

任何时候任何线程都可以提交 Command List 到 Command Queue，运行时会自动按照提交的顺序来序列化数据。