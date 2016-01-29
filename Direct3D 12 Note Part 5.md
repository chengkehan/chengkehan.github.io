#Direct3D 12 Note Part 5

**2016-1-29**

##Direct3D 12 的图形管线状态（Graphics Pipeline State）

当几何体被提交到 GPU 进行渲染的时候，有大量的硬件设置来说明这些输入的数据如何被硬件所理解，以及硬件如何进行渲染的。总的来说，这些设置被称作图形管线状态，包括一些常见的设置，比如光栅状态（Rasterizer State），混合状态（Blend State），深度模板状态（Depth and Stencil State），提交的集合体的图源拓扑类型（Primitive Topology Type），着色器。在 Direct3D 12 中，大多数图形管线状态是通过管线状态对象（Pipeline State Objects，简称 PSO）来设置的。应用程序可以创建任意数量的 PSO，一般都是在初始化的时候创建。在渲染的时候，Command Lists 可以在 Direct Command List 或 Bundle 中快速的切换多个管线状态，来指定激活哪个 PSO。

在 Direct3D 11 中，图形管线状态被设计为大的粗糙的颗粒，比如说 Blend State 当渲染的时候在立即上下文（Immediate Context）被创建和设置。这么做是为了 GPU 可以在设置一些相关联的设置时能够提高效率。然而，如今的图形硬件，在不同的硬件单元（Hardware Units）之间存在依赖。例如，硬件 Blend State 也许和渲染状态之间存在依赖。Direct3D 12 的 PSO，允许 GPU 在初始化时预处理所有的依赖，这样就能让运行时尽可能的提高效率。

需要注意的是，大多数管线状态是使用 PSO 进行设置的，还有一些状态设置是其他特定接口（ID3D12GraphicsCommandList）设置的。图形管线状态在被继承和延续到 Direct Command List，Bundles 存在着差异。

###图形管线状态（使用PSO来设置）

* 着色器（Vertex，Pixel，Domain，Hull，Geometry）
* 输入的顶点格式
* 图源拓扑类型（Primitive Topology Type）
* 混合状态（Blend State），光栅状态（Rasterizer State），深度模板状态（Depth Stencil State）
* 深度模板格式，渲染目标（Render Target）格式，渲染目标的数量
* 多重采样（Multi-sampling）参数
* 输出流缓冲（A Streaming Output Buffer）
* 根签名

###图形管线状态（非PSO设置）

* 资源绑定（Resource Bindings）
* 视口（Viewports）
* 裁切矩形（Scissor Rects）
* 混合银子（Blend Factor）
* 深度模板引用值（Depth Stencil Reference Value）
* The input-assembler primitive topology order and adjacency type

###图形管线状态继承

由于 Direct Command List 通常只会使用一次，而 Bundles 是被并发的多次使用，所以对于 Direct Command List 和 Bundles 的继承图形管线状态会有不同的规则。

对于使用 PSO 来设置的图形管线状态，这些状态都不会被 Direct Command List 和 Bundles 所继承。Direct Command List 和 Bundles 的初始图形管线状态是在创建的时候决定的。如果创建的时候没有指定 PSO，那么会使用默认的状态。也可以有接口来改变 Command List 内部的当前 PSO。

对于不是使用 PSO 来设置的图形管线状态，都会被 Bundles 所继承，除了图源拓扑类型。

在 Command List 和 Bundles 中设置的资源绑定是持续存在的。
