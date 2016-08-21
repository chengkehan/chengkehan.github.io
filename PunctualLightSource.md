# 精确光源 Punctual Light Source

**2016-8-21**

根据 BRDF 的定义：

\\[\begin{align}
f(l,v) &= { dL\_{o} \over dE\_{i} } \\\
f(l,v) &= { dL\_{o} \over L\_{i} cos\theta\_{i} d\omega\_{i} } \\\
dL\_{o} &= f(l,v) L\_{i} cos\theta\_{i} d\omega\_{i} \\\
L\_{o} &= \int\_{\Omega} f(l,v) L\_{i} cos\theta\_{i} d\omega\_{i} \tag{eq1}
\end{align}\\]

$$$ L\_{o} $$$ 就是出射辐射率(radiance)，也就是最终视觉感知到的量（渲染表现到像素颜色上的最终结果）。基本的 BRDF 都是基于精确光源（Punctual Light Sources）这个假设前提下的，所谓的精确光源是一个大小为无穷小且方向确定的光源。我们经常使用的方向光源（Directional Light）、点光源（Point Light）、聚光灯光源（Spotlight）是精确光源。有一点是需要注意的，当传播介质为真空时，辐射率（radiance）$$$ L\_{o} $$$ 是不会随着距离衰减的，在现实中表现为一个红色的物体不管距离你有多远，你看到的这个物体都是红色（忽略大气散射等因素）。而真正衰减的应该是辐照度（Irradiance），单位面积上的光通量：

\\[
E = { \Phi \over A }
\\]

设想一个点光源，随着光子一层层的向外扩散，$$$ A $$$ 也就越来越大，这就导致了辐照度（Irradiance）逐渐减小。如果把点光源想象成太阳，离太阳越远辐照度（Irradiance）越小就意味着，距离太阳越远能感受到的热能越小。但是因为辐射率（radiance）不会随着距离减小，所以并不会因为距离太阳的远近，而看到两种不同颜色的太阳（绝对真空的环境下）。

使用精确光源这个概念是为了将出射辐射率（radiance）的计算进行简化。从上面给出的计算 $$$ L\_{o} $$$ 的方程可以看到，有一个积分的计算，有了精确光源这个假设，就可以消除原本的积分计算部分。

我们使用 $$$ c\_{light} $$$ 表示光源的颜色，$$$ l\_{c} $$$ 表示光源的方向。$$$ c\_{light} $$$ 被定义为白色的 Lambertian 表面被平行于表面法线（$$$ l\_{c}=n $$$）的光照亮时的颜色。上文说了，精确光源的大小是无穷小的，无穷小也是有大小的，使用 $$$ \varepsilon $$$ 表示，意思是以 $$$ l\_{c} $$$ 为中心，精确光源为大小所形成的一个张角。根据 $$$ c\_{light} $$$ 的定义得到：

\\[
c\_{light} = { c\_{diff} \over \pi } \int\_{\Omega} L\_{i} cos\theta\_{i} d\omega\_{i}
\\]

积分外的 $$$ { c\_{diff} \over \pi } $$$ 是 Lambert 常量，由于是白色，所以 $$$ c\_{diff} $$$ 是 1。积分内的是反射方程，又由于 $$$ l\_{c}=n $$$，所以 $$$ cos\theta\_{i} = 1 $$$，所以：

\\[\begin{align}
c\_{light} &= { 1 \over \pi } \int\_{\Omega} L\_{i} d\omega\_{i} \\\
\pi c\_{light} &= \int\_{\Omega} L\_{i} d\omega\_{i} \tag{eq2}
\end{align}\\]

将 $$$ ep2 $$$ 代入 $$$ eq1 $$$：

\\[\begin{align}
L\_{o} &= \int\_{\Omega} f(l,v) L\_{i} cos\theta\_{i} d\omega\_{i} \\\
L\_{o} &= f(l,v) cos\theta\_{i} \int\_{\Omega} L\_{i} d\omega\_{i} \\\
L\_{o} &= f(l,v) cos\theta\_{i} \pi c\_{light} 
\end{align}\\]

更详细的介绍，可以查看 [Background: Physics and Math of Shading 的 Punctual Light Source 章节](http://blog.selfshadow.com/publications/s2013-shading-course/hoffman/s2013_pbs_physics_math_notes.pdf)。如果同时受到多个精确光源照射，只需要对每个光源重复执行上式，并将结果求和即可。

