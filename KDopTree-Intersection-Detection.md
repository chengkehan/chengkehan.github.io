# KDopTree-Intersection-Detection

**2017-8-4**

> <img src='KDopTree-Intersection-Detection/1.png' width='250'/>

在基本理解了 [UE4 中的基于 KDopTree 的相交检测后][link1]，参照其方法在 Unity 中实现了一个版本，从运行效率上来看还是不错的，非常适合静态网格（非 SkinnedMesh）。由于没有像 UE4 中那样使用 [SIMD][link2]，所以性能还不是最好的。

完整代码可以从 [KDopTree-Intersection-Detection@github][link3] 获取。 

[link1]: kDopTreeInUE4.html
[link2]: SIMD.html
[link3]: https://github.com/chengkehan/KDopTree-Intersection-Detection