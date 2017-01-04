# 记录问题一则

**2017-1-3**

最近在编写着色器的时候，一致无法得到想要的效果，由于其中的算法比较复杂，再加上本身对实现细节就没有把握，所以就一遍一遍的检查并验证每一步是否有错误，将近一天的时间都在做这个事情，最终可以完全确认，算法的实现是没有问题的，那么问题出在哪儿了呢。于是再回到基本的输入上，检查输入的参数是否有异常，果然问题出在了这里，这时已经是精疲力竭了，用尽最后一口气查到了问题所在：

	struct v2f
	{
		float2 uv : TEXCOORD0;
		float4 vertex : SV_POSITION;
	};
	
	v2f vert (appdata v)
	{
		v2f o;
		o.vertex = mul(UNITY_MATRIX_MVP, v.vertex);
		o.uv = TRANSFORM_TEX(v.uv, _MainTex);
		return o;
	}
	
	fixed4 frag (v2f i) : SV_Target
	{
		float4 pos = i.vertex;
		// 使用 pos 进行相关计算

		return ...;
	}
	
看似没什么问题，其实问题就出在这里。如果想要在 fragment shader 中获取齐次空间坐标（i.vertex）的话，不能使用被标记为 SV_POSITION 语义的值，而必须重新定义一个，像下面这样：

	struct v2f
	{
		float2 uv : TEXCOORD0;
		float4 vertex : SV_POSITION;
		float4 pos : TEXCOORD1;
	};
	
	v2f vert (appdata v)
	{
		v2f o;
		o.vertex = mul(UNITY_MATRIX_MVP, v.vertex);
		o.pos = o.vertex;
		o.uv = TRANSFORM_TEX(v.uv, _MainTex);
		return o;
	}
	
	fixed4 frag (v2f i) : SV_Target
	{
		float4 pos = i.pos;
		// 使用 pos 进行相关计算

		return ...;
	}
	
vertex 被标记为 SV_POSITION 语义后，其值已经因为某种原因被修改了（并非正常的插值或转换到了 NDC 坐标空间），目前还不清楚是什么原因。