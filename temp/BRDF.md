假设前提1：光入射到表面上，并且以相同的波长同一时间点射出。这就是说忽略类似荧光（ﬂuorescence、phosphorescence）的现象。

假设前提2：光入射到表面上的点和出射点在同一个位置上。如果入射点和出射点在不同位置上，一般是用来表现次表面散射的效果（subsurface scattering），这里不考虑次表面散射。

> ![img](BRDF/1.jpg)

表面的反射属性是通过一个反射方程来描述的，这个反射方程称为 BRDF（bidirectional reflectance distribution function）。BRDF被定义为，出射方向 $$$ \Theta $$$ 的微分辐射率（radiance）和入射微分立体角 $$$ d\omega\_{\Psi} $$$ 的微分辐照度（irradiance）的比值。BRDF 的使用符号 $$$ f\_{r}(x,\Psi \rightarrow \Theta) $$$ 表示。

\\[\begin(aligned)
f\_{r}(x,\Psi \rightarrow \Theta) &= {dL(x \rightarrow \Theta) \over dE(x \leftarrow \Psi)} \\\
&= {dL(x \rightarrow \Theta) \over L(x \leftarrow \Psi) cos(N\_{x},\Psi) d\omega\_{\Psi}}
\end(aligned)\\]

BRDF 的属性：
* BRDF 可以是任意的正数（而非 0 到 1 之间）。
* BEDF 是一个四维函数，其中二维对应入射方向，另二维对应出射方向。BRDF 分为各向异性（anisotropic）和各项同性（isotropic）。
* 互反律（Reciprocity）。如果入射方向和出射方向互换，BRDF 的值保持不变。这个属性称为 Helmholtz reciprocity。

\\[
f\_{r}(x,\Psi \rightarrow \Theta) = f\_{r}(x,\Theta \rightarrow \Psi)
\\]

* 入射辐射率(radiance)和反射辐射率(radiance)的关系。特定入射方向的 BRDF 值并不依赖于其他入射角度上可能存在的辐照度。因此 BRDF 对于所有入射方向来说是一个线性函数。

\\[\begin(aligned)
dL(x \rightarrow \Theta) &= f\_{r}(x,\Psi \rightarrow \Theta)dE(x \leftarrow \Psi) \\\
L(x \rightarrow \Theta) &= \int\_{\Omega\_{x}} f\_{r}(x,\Psi \rightarrow \Theta) dE(x \leftarrow \Psi) \\\
L(x \rightarrow \Theta) &= \int\_{\Omega\_{x}} f\_{r}(x,\Psi \rightarrow \Theta) cos(N\_{x},\Psi)d\omega\_{\Psi}
\end(aligned)\\]

* 能量守恒。能量守恒定律要求所有方向上反射的能量必须小于或等于入射的能量（部分能量转化为热能或其他形式的能量）。