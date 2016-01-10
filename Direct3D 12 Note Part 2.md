#Direct3D 12 Note Part 2#

**2016-1-10**

一个基础的 Direct3D 12 程序的流程

* Initialize（初始化）
* Repeat（不断重复下面两个步骤）
    * Update（更新） 
    * Render（渲染）
* Destroy（销毁）

Initialize（初始化）

* Initialize the pipeline 初始化管线
    * 启用 Debug Layer（调试）
    * 创建设备（Device）
    * 创建命令队列（Command Queue）
    * 创建交换链（Swap Chain）
    * 创建 Render Target View Descriptor Heap
        * 一个 Descriptor Heap 可以认为是一个 Descriptor 数组。每一个 Descriptor 都对 GPU 描述了一个对象。
    * 创建帧资源（Frame Resources）。每一帧渲染需要的Render Target View。
    * 创建命令分配器（Command Allocator）
        * 命令分配器（Command Allocator）为命令队列（Command List）和命令束（Command Bundles）管理其下的所有存储。
* 初始化资源（Initialize The Assets）
    * 创建一个空的根签名（Root Signature）
        * 一个图形根签名定义了何种类型的资源被关联到了图形管线（Graphics Pipeline）
    * 编译 Shaders
    * 创建定点输入格式布局（Vertex Input Layout）
    * 创建管线状态对象（Pipeline State Object）描述。
        * 管线状态对象时维护着所有当前 Shaders 的状态，以及某种固定管线状态对象（比如Input Assembler,tesselator,rasterizer和output merger）。
    * 创建命令队列（Command List）。
    * 关闭命令队列（Command List）。
    * 创建加载顶点缓冲（Vertex Buffers）。
    * 创建 Vertex Buffer Views。
    * 创建 Fence
        * Fence 是用来同步 CPU 和 GPU的。
    * 创建事件句柄（Event Handle）。
    * 等待 GPU 完成。
        * 检测 Fence。
    
Update（更新）

* 更新这一帧需要更新的所有东西（程序业务逻辑以及显示相关的）


Render（渲染）

* 填充命令列表（Command List）
    * 重置命令列表分配器（Command List Allocator）
        * 重用命令分配器（Command Allocator）已经分配的内存。
    * 重置命令列表（Command List）
    * 设置图形根签名（Graphics Root Signature）
    * 设置视口（Viewport）和裁切矩形（Scissor Rectangle）
    * 设置一个 Resource Barrier，指示 Back Buffer 被用来作为渲染目标（Render Target）
        * Resource Barriers 是用来管理资源过度？（Resource Transitions）
    * 将命令记录到命令列表中（Command List）
    * 指示在命令列表（Command List）执行完成后， Back Buffer 将会被用来显示。
        * 需要设置Resource Barrier（Another call to set resouces barrier）。
    * 关闭命令列表（Command List）
* 执行命令列表（Command List）
* 显示一帧
* 等待 GPU 完成
    * 等待并且检测 Fence
    
Destroy（销毁）

* 清理关闭应用程序
    * 等待 GPU 完成（检测 Fence）
    * 关闭事件句柄（Event Handle）  