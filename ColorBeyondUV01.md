# HDRP 的纹理采样

**2020-1-30**

最近在为 HDRP 写一些自定义的 PostProcess，官方文档上的示例是这么写的，我也就照这写了。虽然每个纹理都要多声明一个 _TexelSize，暂时就没管这些了，先实现效果再说。

	uint2 positionSS = input.texcoord * _ScreenSize.xy;
	float3 outColor = LOAD_TEXTURE2D_X(_InputTexture, positionSS).xyz;

可以看到采样时并没有使用 uv 坐标，而是使用的像素坐标。可当遇到需要在 uv 上叠加一个偏移量的时候就出问题了。当 uv 超出 01 范围时，计算后的到的像素坐标自然就超过了纹理的尺寸或是一个负数，得到的颜色是黑色。这显然不是想看到的，我检查了纹理的 warpmode，设置是正确的，clamp 或 repeat。多次尝试排查未果。

好在 HDRP 可以看到它的 HLSL，搜索后发现可以使用原来的纹理采样方式，即使用 uv 坐标。

	float3 outColor = SAMPLE_TEXTURE2D_X(_InputTexture, s_linear_clamp_sampler, uv);
	
这里需要手动指定一个 sampler，而 HDRP 已经为我们设定好了所有可用的 sampler。

	SAMPLER(s_point_clamp_sampler);
	SAMPLER(s_linear_clamp_sampler);
	SAMPLER(s_linear_repeat_sampler);
	SAMPLER(s_trilinear_clamp_sampler);
	SAMPLER(s_trilinear_repeat_sampler);
	SAMPLER_CMP(s_linear_clamp_compare_sampler);