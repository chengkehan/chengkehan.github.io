# 传递数组到 Shader

**2016-7-10**

今天无意中看到了一篇文章，[Vertex Constants Instancing](http://http.developer.nvidia.com/GPUGems2/gpugems2_chapter03.html)，其中用到的技巧我在去年就打算在项目中使用了，但经过同事提醒后对其进行了测试，发现在性能方面还是有所欠缺的，主要是由于当设置大量的 uniform 时，会造成很多的 Graphics API 以及引擎 API 的开销，Unity 不真正支持 uniform 数组。如果要在 Unity 中使用数组，需要这么写：

	// application
	for(int i = 0; i < 10; ++i)
	{
		material.SetFloat(“_Value” + i, value);
	}
	
	// shader
	// declaration
	uniform float _Value[10];
	// vertex
	float value = _Value[index];

编译器实际上会将 _Value[10] 翻译成 _Value0, _Value1, _Value2, ..., _Value9，十个独立的 uniform 值，但是在着色器中你还是可以通过索引来获取其值。因为是十个独立的值，也就意味着你必须分别为它们赋值，而无法一次性的为其赋值，但是如果是真正的数组，一次赋值即可达到目的。这就造成了很多的 Graphics API 和引擎 API 的消耗。

在 Unity 官方论坛上同样可以看到这方面的疑问，[Passing-Arrays-to-shaders](https://community.unity.com/t5/Shaders/Passing-Arrays-to-shaders/td-p/1376123)。在讨论的最后，一个激动人心的消息是，Unity 5.4 会支持传递数组到 Shader 的功能。Unity 5.4 目前还处于 Beta 版，我准备在其发布正式版之后，对这个 API 进行测试。在此之前先来看看其 API 吧：）

[Shader.SetGlobalFloatArray Shader.SetGlobalMatrixArray Shader.SetGlobalVectorArray](http://docs.unity3d.com/540/Documentation/ScriptReference/Shader.html)

[MaterialPropertyBlock.SetGlobalFloatArray MaterialPropertyBlock.SetGlobalMatrixArray MaterialPropertyBlock.SetGlobalVectorArray](http://docs.unity3d.com/540/Documentation/ScriptReference/MaterialPropertyBlock.html)