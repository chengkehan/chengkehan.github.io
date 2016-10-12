# 优化平面法线贴图

**2016-10-12**

Shader的优化一般重点都是减少指令的数量，尤其是 Fragment Shader。对于光栅化后会产生大量 Framgnet 的三角面更是重点观察对象。目前法线贴图在手游中已经成为标配，而为了获得好的效果，光照计算就必须在 Fragment Shader 中进行，而且存在切线空间的转换（即矩阵向量相乘）。

场景中的地面，由于其会占用大面积的屏幕像素（大量的 Fragment），所以在编写地面的 Shader 的时候尤其要注意，每个 Fragment 增加一个计算指令，整体的渲染压力就会增加很多。而对于场景中的地面大多都是平坦的或者有轻微起伏的，对于这种情况，其实切线空间的转换是可以省略的。

常规的写法：

	// Vertex Shader
	float3 binormal = cross( normalize(v.normal), normalize(v.tangent.xyz) ) * v.tangent.w;
	// 模型空间转换到切线空间的矩阵
	float3x3 rotation = float3x3( v.tangent.xyz, binormal, v.normal );
	// 世界空间转换到切线空间的矩阵
	float3x3 WtoT = mul(rotation, (float3x3)unity_WorldToObject); 
	o.TtoW0 = WtoT[0].xyz;
	o.TtoW1 = WtoT[1].xyz;
	o.TtoW2 = WtoT[2].xyz;
	
	// Fragment Shader
	// 这里将 norm 和 切线空间转到世界空间矩阵 的逆的转置矩阵做相乘，确保法线转换正确
	fixed3 norm = UnpackNormal(tex2D(_Bump, i.uv));
	half3 worldNormal = normalize(half3(dot(i.TtoW0.xyz, norm), dot(i.TtoW1.xyz, norm), dot(i.TtoW2.xyz, norm)));
	
优化后的写法：

	// Vertex Shader
	// Do nothing
	
	// Fragment Shader
	fixed3 norm = UnpackNormal(tex2D(_Bump, i.uv));
	half3 worldNormal = norm.xzy * float3(-1, 1, -1);
	
对比两种方法，可以看到优化，指令数量大大减少了。如果 Fragment 中使用了多张法线贴图，那么将会减少更多的指令。使用在像地面这种占用大量 Fragment 的物体，性能会有一定的提升。当然这种方法只能试用于平坦的平面或者有轻微起伏的面上，因为其原理就是假设面的 normal 都是朝上的。

还有一种优化的方法，就是可以尝试下模型空间下的法线贴图，同样可以减少一定的计算量。得到了指令数量减少的好处，就得失去一些东西，就是没有常规的法线贴图那么通用了。斟酌利弊吧。

其实只有当需要表现类似高光效果的时候，才需要在 Fragment Shader 中采样 _BumpMap，如果只是想表现出地面的凹凸，可以直接将光照效果烘焙到 _DiffuseTex 中。至于这种方法在以后会进行介绍。 