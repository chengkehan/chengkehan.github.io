# Tricks and Notes 2

**2018-5-12**

在 Unity 的 shader 中加上 `#pragma multi_compile_fog ` 后，会自动在 shader 中加入三种雾的变体，但是别被 `#pragma multi_compile_fog ` 这个名字给欺骗了，虽然同为 `multi_compile` 系，但是默认情况下，如果没有使用到是不会被打到安装包里的，如同 `shader_feature` 一样。特别是打 AssetBundle 资源包的时候就会发现 `multi_compile_fog` 变体都丢失了。所以解决办法是在 Graphics Settings 中的 Shader Stripping Fog Modes 里勾选上，这样 `multi_compile_fog` 才是真正的 `multi_compile`。

---

在 Compute Shader 中，常常会定义一个 struct 数组，然后使用一个索引值从数组中获取和写入数据，如果这个索引值是 float 类型就需要注意了，必须保证不会发生 `index out of bounds`。这在以往的 cpu 代码编程中很容易被发现，但是 shader 中却不那么容易，因为往往即使发生了错误也没有任何错误提示（或者提示文字完全无法让你联想到时这个问题）。而对于这个问题，不同的设备表现出的现象还不一样，有的正常运行，而有的渲染错误。类似的错误提示：
	
	Execution of the command buffer was aborted due to an error during execution. 
	Ignored (for causing prior/excessive GPU errors) (IOAF code 4)

