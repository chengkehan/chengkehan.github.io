# Shader 四元数旋转

**2019-7-27**

在 Shader 实现四元数旋转。

	#define Quaternion float4
	
	inline Quaternion SetAxisAngle(float3 axis, float radian)
	{
		float sinValue = 0;
		float cosValue = 0;
		sincos(radian * 0.5, sinValue, cosValue);
		Quaternion q = Quaternion(sinValue * axis.xyz, cosValue);
		return q;
	}
	
	inline float3 MultiplyQP(Quaternion rotation, float3 p)
	{
		float3 xyz = rotation.xyz * 2;
		float3 xx_yy_zz = rotation.xyz * xyz.xyz;
		float3 xy_xz_yz = rotation.xxy * xyz.yzz;
		float3 wx_wy_wz = rotation.www * xyz.xyz;

		float3 res;
		res.x = (1 - (xx_yy_zz.y + xx_yy_zz.z)) * p.x + (xy_xz_yz.x - wx_wy_wz.z) * p.y + (xy_xz_yz.y + wx_wy_wz.y) * p.z;
		res.y = (xy_xz_yz.x + wx_wy_wz.z) * p.x + (1 - (xx_yy_zz.x + xx_yy_zz.z)) * p.y + (xy_xz_yz.z - wx_wy_wz.x) * p.z;
		res.z = (xy_xz_yz.y - wx_wy_wz.y) * p.x + (xy_xz_yz.z + wx_wy_wz.x) * p.y + (1 - (xx_yy_zz.x + xx_yy_zz.y)) * p.z;
		return res;
	}
	
SetAxisAngle 创建一个四元数来表示旋转，绕着 axis 旋转 radian 弧度。

MultiplyQP 将旋转应用于点 p。