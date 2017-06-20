# 线段、三角形的相交检测

**2017-6-20**

在 [UE4][link1] 的 [kDopTree][link5] 相关代码中有实现了线段和三角形的相交检测。但是由于其为了加速相交检测（同时对一条线段和四个三角形做相交检测），使用了 [SIMD][link3] 相关的指令，导致代码比较晦涩（相关的代码位于 kDop.h 文件中的 appLineCheckTriangleSOA 函数中）。我这里用更易懂的代码实现了一遍，原理和 UE4 的完全相同，只是由于不用为了 [SIMD][link3] 去凑寄存器，所以看上去思路会更清晰一点。方便以后查阅。

[工程@github][link4]

[link1]: https://github.com/EpicGames/UnrealEngine
[link3]: https://en.wikipedia.org/wiki/SIMD
[link4]: https://github.com/chengkehan/Line-Triangle-Intersection
[link5]: kDopTreeInUE4.html