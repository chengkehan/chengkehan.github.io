# RenderTextureFormat.ShadowMap

**2017-2-14**

RenderTextureFormat.ShadowMap 对应一种硬件可直接读取的 RenderTexture 格式，使用这种格式的好处是硬件对于这种格式可以自行进行 PCF（Percentage Closer Filter），不需要我们在着色器中实现 PCF，优势是硬件内置的 PCF 比自己在着色器中实现性能要好。

示例代码：

	// App
	RenderTexture rt = new RenderTexture(width, height, 24/*depth*/, RenderTextureFormat.Shadowmap, RenderTextureReadWrite.Linear);
	rt.useMipMap = false;
	rt.filterMode = FilterMode.Bilinear;
	Shader.SetGlobalTexture("_Shadowmap", rt);
	
	// Shader
	Texture2D _Shadowmap; 
	SamplerComparisonState sampler_Shadowmap;
	
	float objDepth = ...;
	float shadow = _Shadowmap.SampleCmpLevelZero(sampler_Shadowmap, uv, objDepth);

要得到正确的 pcf，filterMode 必须是 Bilinear，而不能是 Point。SampleCmpLevelZero 是将采样到的值与 objDepth 进行比较，未通过 shadowmap 比较返回 0，通过 shadowmap 比较后，根据纹理过滤模式对周围点进行采样比较并进行混合，最终返回一个 0 到 1 的值。

上面的代码中只进行了一次 pcf，所以软阴影效果不明显，但是比锯齿状的硬边好很多了，如果需要更软的阴影，需要更多的纹理采样和 PCF。最后注意 RenderTextureFormat.ShadowMap 这种格式不是所有硬件都支持的。