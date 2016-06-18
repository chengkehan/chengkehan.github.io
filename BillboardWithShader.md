# 基于 Shader 的 Billboard

**2016-6-18**

Billboard，是一个面片，用来表现一些需要始终面向观察者方向的物体。使用程序代码实现，就是修改 transform.forward 或者调用其 LookAt 方法（引擎封装好的）。但是这样做有几点问题：

* 一般来说 CPU 的计算量是很大的，直接修改 transform.forward 或者调用 LookAt 方法会产生额外的计算量（引擎底层通过各种计算，生成新的矩阵），当 Billboard 的数量非常多时，这个计算量就很可观了。 
* 使用上面方法实现的 Billboard 无法享受到 Static Batching 带来的好处，也就是说会产生多个 DrawCall（当 Billboard 被 Static Batching 了之后就无法修改其 transform，如果想要修改其 transform，就不能 Static Batching）。也许你会说，大部分时候 Billboard 是简单的面片，所以 Unity 引擎会启动 Dynamic Batching，来让 DrawCall 合并起来。但是 Dynamic Batching 并不是免费的，它会在底层产生一个动态的 VBO，每一帧都要刷新这个 VBO，并将数据从 CPU 提交到 GPU（在 CPU 和 GPU 维护了两份内存，提交到 GPU 的过程也是大消耗）。所以我觉得 Dynamic Batching 还是少用为好，因为有的时候反而会产生反作用（DrawCall 降低了，但是消耗反而没减少或更大）。

所以，就需要将这部分的计算在 Shader 中实现，这样就可以同时解决上面所有的问题，而且其计算量对于 GPU 来说忽略不计。为了做到这一点，我们需要先了解一下所需的基础知识。在以前写过的一篇关于[相机空间矩阵](CameraSpace.html)的文章中介绍了，UNITY_MATRIX_V 这个矩阵中的前三行代表了相机空间坐标系三根基轴在世界坐标中的方向，我们可以使用这三根基轴来实现 Billboard 的功能。下面是主要的 Vertex Shader 的代码。

	v2f o;
	
	// 在 color 中标记了每个顶点的偏移方向（图1）
	// 由于 color 是在 0 到 1 之间的值，所以需要将其映射到 -1 到 1（类似于法线纹理）
	float2 bias = v.color.rg * 2 - 1;
	
	float4 vert = v.vertex;
	// 不管模型本身的顶点位置，统一重置为 0
	vert.xyz = 0;
	// 转换到世界坐标
	float4 wPos = mul(_Object2World, vert);
	// 沿着相机坐标系的基轴进行顶点位置的偏移
	wPos.xyz += normalize(UNITY_MATRIX_VP[0].xyz) * bias.r * _SizeW + normalize(UNITY_MATRIX_VP[1].xyz) * bias.g * _SizeH;
	
	// 下面就是常规的矩阵变换操作了
	// 由于 wPos 已经在世界坐标了，所以这里就不需要 object2world 的操作
	o.vertex = mul(UNITY_MATRIX_VP, wPos);
	o.uv = TRANSFORM_TEX(v.uv, _MainTex);

	return o;
	
> ![img](BillboardWithShader/1.jpg =200x)
>
> 图1：这是四个顶点组成的面片（两个三角形）。每个顶点中的颜色值表示的是该顶点沿着相机基轴偏移的方向。R通道1表示沿着相机x基轴正方向偏移，R通道0表示沿着相机x基轴负方向偏移，G通道1表示沿着相机y基轴正方向偏移，G通道0表示沿着相机y基轴负方向偏移。

以上实现的 Billboard是完全面向摄像机的，如果想做轴限制的 Billboard 也是很简单的，只需要在 UNITY_MATRIX_VP[0].xyz 以及 UNITY_MATRIX_VP[1].xyz 这两个值上做些处理就可以了。

实际在使用的时候，还有一点问题，引擎内部会做一个相机视锥体裁切操作，就是当模型的包围盒（bounds）在相机视锥体外部的时候，会直接不渲染该物体，所以当 Billboard 在屏幕边缘是，会看到 Billboard 会突然消失和出现。而这个 bounds 的尺寸由于是只读，无法直接通过代码修改。这里提供一个方法来解决这个问题，在使用三维软件制作 Billboard 面片的时候，Billboard 的尺寸尽可能的做成实际情况中可能出现的最大的尺寸，这是因为 Shader 中计算顶点偏移时，与顶点本身的位置是完全没有关系的，而和引擎裁切时所使用的包围盒（bounds）是有关系的。这样就可以避免 Billboard 在视口边缘闪现的问题了，有一点小副作用就是 Billboard 的相机视锥体裁切不精确，Billboard 已经完全出了视锥体范围可还是没被才切掉。但是这是不会影响最终的表现效果的，而且这点副作用根本不会影响到渲染性能。

PS：UNITY_MATRIX_VP 这个矩阵，在 Editor 中，引擎会根据在 Game 还是 Scene 窗口，传入两个不同的矩阵，这是正确的，因为在 Scene 窗口中，相机指的是当前的观察者（开发人员），而不是其中的某个 Camera 对象。所以以上代码如果要在 Editor 的 Scene 窗口中产生正确的效果，需要手动传入两个基轴的值，而不是使用 UNITY_MATRIX_VP[0] 和 UNITY_MATRIX_VP[1]。