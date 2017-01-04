# Unity 渲染时的平台差异小结

**2017-1-2**

DirectX-like（DirectX3D、Metal、Consoles） 和 OpenGL-like（OpenGL、OpenGL ES） 的纹理坐标系是不同的，DirectX-like 的 (0,0) 点位于左上角，OpenGL-like 的 (0,0) 点位于左下角。Unity 内部的处理是使用 OpenGL-like 标准来进行统一的，所以一般情况下我们不需要考虑到这个平台差异，除了两个特殊的情况。

--- 

当使用 ImageEffect 并且是 DirectX-like 平台下并且开启了 Anti-Aliasing，此时对于 Source RenderTexture uv，Unity 会为我们处理平台差异，但是不能拿这个 uv 直接对其它 RenderTexture 进行采样，因为 uv 是被翻转的（非 OpenGL-like），需要做一些处理：

	#if UNITY_UV_STARTS_AT_TOP
		if(_MainTex_TexelSize.y < 0)
			o.uv.y = 1 - o.uv.y;
	#endif

---

当渲染到 uv 空间时，同样要注意坐标翻转。所谓渲染到 uv 空间是，直接指定一个 NDC（Normalized Device Coordinates） 坐标作为 pos 输出，而非通过 unity 提供的矩阵变换作为 pos 输出。这时需要对坐标进行翻转：

	if(_ProjectionParams.x < 0)
		pos.y = 1 - pos.y;
	
---

对于 DrawScreenQuad：当渲染到屏幕时，不管 OpenGL-like 还是 DirectX-like 都是指定顺时针的四个顶点；当渲染到 RenderTexture 时，OpenGL-like 是顺时针的四个顶点，DirectX-like 是逆时针的四个顶点。

--- 

在齐次坐标空间下翻转坐标的方法：

	o.pos.y *= -1;

后续一般会规范到 uv 坐标下，再使用 tex2Dproj 进行纹理采样（比如GrabPass）。

---

在屏幕 uv 空间翻转坐标的方法：

	o.uv = o.pos.xy / o.pos.w * 0.5 + 0.5;
	o.uv.y = 1 - o.uv.y;
	
---

其实以上这些文档里大多都有说明，但是不真正遇到还真不会去仔细研究，特此记录。