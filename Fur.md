# 皮毛渲染

**2016-8-12**

皮毛的表面并非是平坦的，所以使用普通的方法很难将其表现出来。如何在 Unity 中实现皮毛的效果是我最近要解决的问题。通过查找资料，发现有两种方法可以较好的模拟出皮毛的效果。下面开始分别介绍这两种方法。

方法1：

> ![img](Fur/1.jpg =300x)

如上图所示，内层的实线圆为模型本身的轮廓，然后沿着法线一层层的往外层扩展，并且由于越往外层，毛就越稀疏，所以光的通透性就越好。在向外扩展的过程中部分像素会被剔除掉，这是为了表现出一丝丝的皮毛效果和长短差异，使用一张噪点（noise）纹理来控制。下面是主要的着色器代码：

	// vertex
	v.vertex.xyz += v.normal * _FurLength * FUR_DEPTH;
	
	// fragment
	half4 c = tex2D (_MainTex, IN.uv_MainTex);
	o.Albedo = c.rgb * _Color.rgb;
	half alpha = step(lerp(_Cutoff, _CutoffEnd, FUR_LAYER), c.a);
	o.Alpha = alpha * (1 - FUR_LAYER);
	
FUR_LAYER 表示当前是第几层。通过 _MainTex 的 Alpha 通道中的信息来控制皮毛的稀疏和长短。每一层都需要重复执行以上的着色器，只是 FUR_LAYER 会有所差异。

	// Fur Pass 1
	CGPROGRAM
	#pragma surface surf BlinnPhong vertex:vert alpha
	#define FUR_MULTIPLIER 0.05
	#include "MyFurInclude.cginc"
	ENDCG
	
	// Fur Pass 2
	CGPROGRAM
	#pragma surface surf BlinnPhong vertex:vert alpha
	#define FUR_MULTIPLIER 0.10
	#include "MyFurInclude.cginc"
	ENDCG
	
	// Other Passes

下面是效果图：

> ![img](Fur/2.jpg =300x)

方法2：

使用 Tessellation。下面是效果图：

> ![img](Fur/3.jpg =300x)

主要的着色器代码：

	#pragma surface surf BlinnPhong vertex:vert tessellate:tessEdge alpha:blend
	
	float4 tessEdge(appdata v0, appdata v1, appdata v2)
	{
		return UnityEdgeLengthBasedTess(v0.vertex, v1.vertex, v2.vertex, _EdgeLength);
	}
	
	void vert(inout appdata v)
	{
		float4 dispC = tex2Dlod(_DispTex, float4(v.texcoord.xy, 0, 0));
		float d = dispC.r * _Displacement;
		v.vertex.xyz += v.normal * d - dispC.g * v.normal * _Displacement2;
	}
	
总结：

在 vertex shader 阶段可以加上风力的影响，让皮毛产生随风摆动的效果。在 fragment shader 中加上各项异性的渲染，效果会更真实。

方法1主要的缺点是渲染的压力很大，因为有大量的 overdraw 和三角面数。优点是大部分移动设备都是支持的，用在某些特写镜头时提升表现效果还是不错的。

方法2在目前的移动设备上还不支持。但是今年的 [WWDC](https://developer.apple.com/videos/play/wwdc2016/604/) 中已经说明了，在最新的 IOS10 的 Metal 并且 A9 处理器中已经可以支持 Tessellation，所以以后在开发的时候，可以将其考虑进来。相信以后在 IOS 上的游戏将越来越多的看到 Tessellation 的应用。而在 Android 上，等 [Vulkan](Vulkan.html) 普及后应该也是值得期待的。


