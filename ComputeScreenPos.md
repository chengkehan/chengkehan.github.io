#ComputeScreenPos 详解

**2016-3-6**

ComputeScreenPos 这个函数被定义在 UnityCG.cginc 里，作用是获得一个投影点对应的屏幕坐标点。

    inline float4 ComputeScreenPos (float4 pos) 
    {
	    float4 o = pos * 0.5f;
	    #if defined(UNITY_HALF_TEXEL_OFFSET)
	    o.xy = float2(o.x, o.y*_ProjectionParams.x) + o.w * _ScreenParams.zw;
	    #else
	    o.xy = float2(o.x, o.y*_ProjectionParams.x) + o.w;
	    #endif
	
	    #if defined(SHADER_API_FLASH)
	    o.xy *= unity_NPOTScale.xy;
	    #endif
	
	    o.zw = pos.zw;
	    return o;
    }
    
由于这个函数返回的坐标值并未除以其次坐标，所以如果直接使用函数的返回值的话，需要这样做。

    tex2Dproj(_ScreenTexture, uv.xyw);
    
也可以自己处理其次坐标

    tex2D(_ScreenTexture, uv.xy / uv.w);
    
下面来看一下 ComputeScreenPos 这个函数的具体实现。最初看到这些代码的时候，并不明白其实现原理。因为和我自己的实现代码差别很大，下面列出我自己的实现。

    // vertex
    o.screenuv.xy = o.pos.xy / o.pos.w * 0.5 + 0.5;
    
这是第一版实现，原理很简单，先除以其次坐标，再映射到 0 到 1 的范围内。这里所有的操作是在顶点阶段实现的，对于面数较低的模型可能会有插值不精确的问题，所以可以把除以其次坐标的步骤移动到像素阶段。下面是第二版

    // vertex
    // 每一项都乘以 o.pos.w
    // z 值没有用了，所以这里省略了
    o.screenuv.xy = o.pos.xy * 0.5 + 0.5 * o.pos.w;
    o.screenuv.w = o.pos.w;
    
    // fragment
    uv = i.screenuv.xy / i.screenuv.w;
    
还有一步，就是把 0.5 提取出来。

    o.screenuv.xy = o.pos.xy * 0.5 + 0.5 * o.pos.w;
    // 就变成了下面这样
    o.screenuv.xy = (o.pos.xy + o.pos.w) * 0.5;
    
到此为止，我们再把自己写的实现和 UnityCG.cginc 中的实现对比下，还是有点差距，但是似乎很接近了。下面我们把 UnityCG.cginc 的实现简化下，去除一些干扰因素。于是就变成了下面这样。

    inline float4 ComputeScreenPos (float4 pos) 
    {
	    float4 o = pos * 0.5f;
	    o.xy = float2(o.x, o.y) + o.w;
	    o.zw = pos.zw;
	    return o;
    }
    
是不是干净和很多，这样再来对比一下，虽然外形上有点差距，但是其实是一模一样了。至此分析就完成了，平时使用的时候还是推荐使用 Unity 定义好的工具函数，因为这样可以避免很多平台相关以及自己考虑不周的问题，但是作为学习还是可以自己实现一遍，这样更能加深理解。