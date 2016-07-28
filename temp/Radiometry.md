---

# 各种辐射测量量之间的关系：

\\[\begin(aligned)
\Phi &= \int\_{A} \int\_{\Omega} L(x \rightarrow \Theta) cos\theta d\omega\_{\Theta} dA\_{x} \\\
E(x) &= \int\_{Omega} L(x \leftarrow \Omega) cos\theta d\omega\_{\Theta} \\\
B(x) &= \int\_{Omega} L(x \rightarrow \Omega) cos\theta d\omega\_{\Theta}
\end(aligned)\\]

A：总的表面区域

$$$ \Omega $$$：立体角范围（一般为半球）

$$$ L(x \rightarrow \Theta) $$$：入射辐射率（radiance）

$$$ L(x \leftarrow \Theta) $$$：出射辐射率（radiance）

$$$ E(x) $$$：入射福照度（irradiance）

$$$ B(x) $$$：出射福照度（radiosity）

其它各种辐射测量量，通量（flux）、入射福照度（irradiance）、出射福照度（radiosity），都可以通过辐射率（radiance）推导出来。

---

# 辐射率（radiance）的属性

### 属性1：辐射率在真空中的直线方向上不会发生变化

\\[
L(x \rightarrow y) = L(y \leftarrow x)
\\]

这个公式表示的是，从 $$$ x $$$ 点射出且朝向 $$$ y $$$ 的辐射率，等同于，从到达 $$$ y $$$ 且从 $$$ x $$$方向来的辐射率。

![img](Radiometry/1.jpg =400x)

根据辐射率的定义：

\\[\begin(aligned)
L(x \rightarrow y) &= { d^2\Phi \over cos\theta\_{x} dA\_{x} d\_{\omega\_{x \leftarrow dA\_{y}}} } \\\
d^2\Phi &= L(x \rightarrow y) cos\theta\_{x} d\_{\omega\_{x \leftarrow dA\_{y}}} dA\_{x}
\end(aligned)\\]

\\[\begin(aligned)
L(y \leftarrow x) &= { d^2\Phi \over cos\theta\_{y} dA\_{y} d\_{\omega\_{y \leftarrow dA\_{x}}} } \\\
d^2\Phi &= L(y \leftarrow x) cos\theta\_{y} d\_{\omega\_{y \leftarrow dA\_{x}}} dA\_{y}
\end(aligned)\\]

微分立体角：

\\[\begin(aligned)
d\_{\omega\_{x \leftarrow dA\_{y}}} &= {cos\theta\_{y}dA\_{y} \over r\_{xy}^2} \\\
d\_{\omega\_{y \leftarrow dA\_{x}}} &= {cos\theta\_{x}dA\_{x} \over r\_{xy}^2}
\end(aligned)\\]

由于是在真空中，且根据能量守恒：

\\[\begin(aligned)
L(x \rightarrow y) cos\theta\_{x} d\_{\omega\_{x \leftarrow dA\_{y}}} dA\_{x} &= L(y \leftarrow x) cos\theta\_{y} d\_{\omega\_{y \leftarrow dA\_{x}}} dA\_{y} \\\
L(x \rightarrow y) cos\theta\_{x} {cos\theta\_{y}dA\_{y} \over r\_{xy}^2} dA\_{x} &= L(y \leftarrow x) cos\theta\_{y} {cos\theta\_{x}dA\_{x} \over r\_{xy}^2} dA\_{y}
\end(aligned)\\]

因此得到结论：

\\[
L(x \rightarrow y) = L(y \leftarrow x)
\\]

所以辐射率（radiance）在真空中的实现方向上不会发生变化，不会随着距离衰减。在三维空间的全局光照中，一旦表面点的入射辐射率（radiance）和出射辐射率（radiance）确定了，那么三维空间中所有点的辐射率也就确定了。物体表面点的辐射率（radiance）被称为表面辐射率（radiance），而三维空间中点的辐射率（radiance）被称为域辐射率（field radiance）。

### 属性2：传感器（相机、眼睛）是对辐射率（radiance）敏感的

传感器（相机、眼睛）的响应正比于入射到其上的辐射率。

总结：这两个属性解释了为什么对于某个物体的对颜色和亮度的感知不会随着距离产生变化（真空中）。所以辐射率（radiance）是全局光照中重要的计算并且是最终显示给观察者的量。