# 矩阵基础3

**2016-10-22**

使用三个基轴构建矩阵的技巧在 [矩阵基础 2][link1] 和 [相机空间矩阵][link2] 中已经介绍过了，这里补充一点。

[link1]: MatrixBase2.html

[link2]: CameraSpace.html

构造一个从 A 空间转换到 B 空间的矩阵实际是将 A 空间三个基轴转换到 B 空间中，由此得到的新的三个向量来构造矩阵。

比如 A 空间的三个基轴是 $$$ i, j, k $$$，将其转换到 B 空间后得到三个新的向量 $$$ l, m, n $$$，使用 $$$ l, m, n $$$ 构造出的矩阵为(忽略平移)：

\\[
\begin{bmatrix}
l\_{x} & m\_{x} & n\_{x} & 0 \\\
l\_{y} & m\_{y} & n\_{y} & 0 \\\
l\_{z} & m\_{z} & n\_{z} & 0 \\\
0 & 0 & 0 & 1
\end{bmatrix}
\\]

这种方法思考上更自然直接，还有另一种方法。如果 B 空间的三个基轴是 $$$ i, j, k $$$，转换到 A 空间后得到三个新的向量 $$$ l, m, n $$$，使用这三个新的向量也可构造矩阵：

\\[
\begin{bmatrix}
l\_{x} & l\_{x} & l\_{x} & 0 \\\
m\_{y} & m\_{y} & m\_{y} & 0 \\\
n\_{z} & n\_{z} & n\_{z} & 0 \\\
0 & 0 & 0 & 1
\end{bmatrix}
\\]

可以看到并没有使用列主序的方式，因为如果那么做了，构造出来的矩阵就表示 B 空间转换到 A 空间（$$$ B \rightarrow A $$$），这不是想要的，我们要的是 $$$ A \rightarrow B $$$。所以对列主序构造出的矩阵进行转置。这个转置意味着什么，对于 $$$ A \rightarrow B $$$ 和 $$$ B \rightarrow A $$$ 这两个矩阵，它们互为逆矩阵，并且 A、B 两个空间的基轴都是正交轴，我们知道在这种情况下，矩阵的逆等于其转置，这就是转置的意义了。将 $$$ B \rightarrow A $$$ 矩阵进行转置得到 $$$ A \rightarrow B $$$ 矩阵（这个矩阵正是我们要求的）。

第二种方法虽然没有第一种方法来的直接，但还是会经常用到的哦，接触最多的就是在用法线贴图时切线空间的转换了：

	float3 binormal = cross( normalize(v.normal), normalize(v.tangent.xyz) ) * v.tangent.w;
	float3x3 rotation = float3x3( v.tangent.xyz, binormal, v.normal ); // Object to tangent
	float3x3 WtoT = mul(rotation, (float3x3)_World2Object); // The transpose is tangent to world.
	
弄清楚其中的细节，使用时思路就更清晰了。