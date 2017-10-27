# Vector Normalize

**2017-10-27**
	
Unity 归一化向量，当向量的长度小于一个很小的值时，会直接返回零，不知道这样的设计是为了什么。

	public static Vector3 Normalize (Vector3 value)
	{
		float num = Vector3.Magnitude (value);
		Vector3 result;
		if (num > 1E-05) {
			result = value / num;
		}
		else {
			result = Vector3.zero;
		}
		return result;
	}

今天使用一个模型的三角面的三个顶点计算法线时，就遇到了这个问题。因为三角形在模型空间坐标系中的坐标值很小，所以计算出来的法线也是一个长度很小的向量，而经过 Unity 的 Normalize 归一化后就直接变成零了，显然这是不希望得到的。所以这个时候就不能直接调用 Unity 的 Normalize 方法了，需要自己写一个：

	private Vector3 VNormalize(Vector3 n)
	{
	    float m = n.magnitude;
	    n /= m;
	    return n;
	}

同样在 UE4 中也有同样的设计：
	
	FORCEINLINE FVector FVector::GetSafeNormal(float Tolerance) const
	{
		const float SquareSum = X*X + Y*Y + Z*Z;

		// Not sure if it's safe to add tolerance in there. Might introduce too many errors
		if(SquareSum == 1.f)
		{
			return *this;
		}		
		else if(SquareSum < Tolerance)
		{
			return FVector::ZeroVector;
		}
		const float Scale = FMath::InvSqrt(SquareSum);
		return FVector(X*Scale, Y*Scale, Z*Scale);
	}