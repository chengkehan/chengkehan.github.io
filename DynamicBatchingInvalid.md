# Dynamic Batching 失效

**2018-2-7**

Unity 的 Dynamic Batching 在一定的条件下才会被触发，在文档中有详细的说明。最近又遇到一种情况，会导致 Dynamic Batching 失效。Shader 中没有使用应用程序传入的顶点坐标，也会导致 Dynamic Batching 失效，比如下面的 billboard 代码。

	struct appdata
	{
		float4 vertex : POSITION;
		float2 uv : TEXCOORD0;
		float4 uv2 : TEXCOORD1;
		float4 uv3 : TEXCOORD2;
		half4 color : COLOR;
	};

	struct v2f
	{
		float2 uv : TEXCOORD0;
		float4 vertex : SV_POSITION;
	};

	v2f vert (appdata v)
	{
		v2f o;
		UNITY_INITIALIZE_OUTPUT(v2f, o);
		
		float4 wPos = float4(v.uv2.xyz, 1);
		float offsetZ = v.uv2.w;
		float offsetScale = v.uv3.y;

		float3 forward = normalize(_MainCamWPos - wPos.xyz);
		float3 up = _MainCamUp;
		float3 right = cross(forward, up);

		float2 bias = v.color.rg * 2 - 1;
		bias *= v.color.ba;
		wPos.xyz += right * bias.r * offsetScale + up * bias.g  * offsetScale + forward * offsetZ;
		// v.vertex.xyz = wPos; 注释掉这行

		o.vertex = mul(UNITY_MATRIX_VP, wPos);
		// o.vertex = mul(UNITY_MATRIX_VP, v.vertex); 注释掉这行
		o.uv = v.uv;
		
		return o;
	}

上面的代码中没有使用到 v.vertex，因为顶点坐标是使用其它方式计算出来的，这就导致多个 billboard 无法被 Dynamic Batching，而当打开注释后，Dynamic Batching 就生效了。可能是引擎检测到顶点坐标没有使用，所以在 CPU 端就不触发 Dynamic Batching 了。