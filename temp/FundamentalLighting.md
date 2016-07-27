# 光照基础

**2016-7-?**

读书笔记：《Real-Time Rendering》 3rd Chapter5(5.1-5.5)

---

光传播过程

* 光从太阳或其他光源（自然光源、或人工光源）发射出来。
* 光于场景中的物体产生交互。部分被吸收，部分被散射到新的方向上。
* 最终，光被传感器（肉眼、电子传感器或胶片）吸收。

---

光模型

* 几何射线
* 电磁波
* 光量子

不管是以上任意一种模型，光都可以被认为是一种电磁辐射能量。

---

平行光源发射出的光可以这样被量化：光通过垂直于传播方向 $$$ l $$$ 的单位表面区域时产生的功率(Power)。这个量被称为辐照度（irradiance）

---

照射到表面上的辐照度是垂直于光方向 $$$ l $$$ 单位面积的辐照度乘以 $$$ l $$$ 和 $$$ n $$$ 夹角的 $$$ cosine $$$ 值。

> ![img](VisualAppearance/1.jpg =450x)

---

$$$ E $$$ 表示垂直于 $$$ n $$$ 的单位面积的辐照度，$$$ E\_L $$$ 表示垂直于 $$$ l $$$ 的单位面积的辐照度。

\\[
E = E\_L \overline{cos} \theta\_i \\\
E = E\_L max(n \cdot l, 0)
\\]

辐照度是叠加的，所以：

\\[
E = \sum\_{k=1}^n E\_{L\_{k}} \overline{cos} \theta\_{i\_{k}}
\\]

---

所有的光物质交互，都表现为两种现象：散射和吸收。

散射发生在光学非连续的物质上，散射不会改变光的数量，只会改变方向。

吸收发生在物质的内部，导致光被转换成另一种形式的能量。吸收会减少光的数量，但不改变光的方向。

---

> ![img](VisualAppearance/2.jpg =450x)

通常将着色方程分成两项。镜面反射项（specular term），表示光在表面的反射。漫反射项（diffuse term），表示光受到的传送、吸收和散射。

---

我们用表面辐照度（irradiance）来表示入射光，使用出射度（exitance）表示离开的光，用 $$$ M $$$ 表示。

光物质的交互式线性的，双倍的辐照度对应双倍的出射度。

出射度除以辐照度就是材质的特性属性。如果材质没有自发光，这个比率是在 0 到 1 之间。

---

表面颜色（surface color） $$$ c $$$ 通常被分为两个独立的部分，镜面反射颜色（specular color）$$$ c\_{spec} $$$ 和漫反射颜色（diffuse color）$$$ c\_{diff} $$$。这两个独立的部分加起来就是表面颜色。

---

漫反射方程

\\[
M\_{diff} = c\_{diff} \otimes E\_{L} \overline{cos} \theta\_{i}
\\]

$$$ M\_{diff} $$$ 表示出射度
$$$ E\_{L} $$$ 表示光源的辐照度

由于射出的漫反射光是在所有半球方向上平均分布的，所以辐射度（radiance）是：

\\[
L\_{diff} = { M\_{diff} \over \pi }
\\]

这两个方程结合起来：

\\[
L\_{diff} = { c\_{diff} \otimes E\_{L} \overline{cos} \theta\_{i} \over \pi }
\\]

这种类型的漫反射着色被称为 Lambertian（遵循 Lambert 定律）。

对于以前接触过基础着色方程的人来说，上面的方程中除了 $$$ \pi $$$ 项，其它各部分都是十分熟悉的。$$$ \pi $$$ 项通常都会被整合到 $$$ E\_{L} $$$ 中，所以一般着色方程中我们可能会看不到这一项的。

---

镜面反射出射度

\\[
M\_{spec} = c\_{spec} \otimes E\_{L} \overline{cos} \theta\_{i}
\\]

镜面反射项比漫反射项更复杂，因为它是方向依赖的。

镜面反射辐射度（radiance）是：

\\[
L\_{spec}(v) = { m+8 \over 8 \pi } \overline{cos}^{m} \theta\_{h} M\_{spec}
\\]

其中 $$$ \theta\_{h} $$$ 是 $$$ h $$$ 和 $$$ n $$$ 的夹角。$$$ h $$$ 是 $$$ l $$$ 和 $$$ v $$$ 的半角向量。

将上面两个方程整合在一起：

\\[
L\_{spec}(v) = { m+8 \over 8 \pi } \overline{cos}^{m} \theta\_{h} c\_{spec} \otimes E\_{L} \overline{cos} \theta\_{i}
\\]

---

结合漫反射辐射度（radiance）和镜面反射辐射度（radiance）：

\\[
L\_{o}(v) = L\_{diff}(v) + L\_{spec}(v) \\\
L\_{o}(v) = \left( { c\_{diff} \over \pi } + { m+8 \over 8 \pi} \overline{cos}^{m} \theta\_{h} c\_{spec} \right) \otimes E\_{L} \overline{cos} \theta\_{i}
\\]

上式类似于 Blinn-Phong，而更多看到的 Blinn-Phong 方程是类似下面这样的：

\\[
L\_{o}(v) = \left( \overline{cos} \theta\_{i} c\_{diff} + \overline{cos}^{m} \theta\_{h} c\_{spec} \right) \otimes B\_{L}
\\]

我们可以认为 $$$ B\_{L} = { E\_{L} \over \pi } $$$。而第二个方程和第一个方程的差异是少了 $$$ { m+8 \over 8 } $$$ 以及没有和 $$$ \overline{cos} \theta\_{i} $$$ 相乘。

---

最终的多光源光照方程

\\[
L\_{o}(v) = \sum\_{k=1}^{n} \bigg( \left( { c\_{diff} \over \pi} + { m+8 \over 8 \pi } \overline{cos}^{m} \theta\_{h\_{k}} c\_{spec} \right) \otimes E\_{L\_{k}} \overline{cos} \theta\_{i\_{k}} \bigg)
\\]


\\[
L\_{o}(v) = \sum\_{k=1}^{n} \Big( \left( K\_{d} + K\_{s} \overline{cos}^{m} \theta\_{h\_{k}} \right) \otimes E\_{L\_{k}} \overline{cos} \theta\_{i\_{k}} \Big)
\\]

其中 :

\\[
K\_{d} = { c\_{diff} \over \pi } \\\
K\_{s} = { m+8 \over 8 \pi } c\_{spec}
\\]

对于一些简陋的材质而言，$$$ K\_{s} $$$ 和 $$$ K\_{d} $$$ 都可以在应用程序中计算出来，然后传入着色器。当然也可以在着色器中采样纹理，作为 $$$ c\_{diff} $$$ 和 $$$ c\_{spec} $$$ 的值，这样有更多的细节。