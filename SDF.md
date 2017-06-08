# Sign Distance Field

**2017-5-22**

Sign Distance Field 相关的学习资料：

* [SIGNED DISTANCE FIELD RENDERING JOURNEY PT.1][link1]
* [SIGNED DISTANCE FIELD RENDERING JOURNEY PT.2][link2]
* [free penumbra shadows for raymarching distance fields][link3]
* [Dynamic Occlusion with Signed Distance Fields][link4]
* [Fast Approximations for Global Illumination on Dynamic Scenes][link5]
* [Unreal Engine Source][link6]

[link1]: https://kosmonautblog.wordpress.com/2017/05/01/signed-distance-field-rendering-journey-pt-1/
[link2]: https://kosmonautblog.wordpress.com/2017/05/09/signed-distance-field-rendering-journey-pt-2/
[link3]: http://www.iquilezles.org/www/articles/rmshadows/rmshadows.htm
[link4]: http://advances.realtimerendering.com/s2015/DynamicOcclusionWithSignedDistanceFields.pdf
[link5]: http://www.chrisoat.com/papers/Course_26_SIGGRAPH_2006.pdf
[link6]: https://github.com/EpicGames/UnrealEngine

SDF 是一个非常值得研究的技术，可以做 AO、Penumbra Shadow、Sky Occlusion，这些都是基础应用，再开发一下脑洞的话，还有 Collision Detection、Indirect Lighting、Clothing 等等。

现在开始会逐步研究 SDF 相关的知识，并争取能先有个简单的 demo，然后看能否形成一个可以使用到实际项目的方案。当然，如果可以，我并不想使用 Computer Shader 和 Volume Texture，主要是因为会导致目前的大部分的移动平台无法使用该技术。随之而来的一个问题就是，不使用 Compute Shader 和 Volume Texture 在程序执行效率上会有所降低，使用限制会更多。这些都是初步设想，现在开始逐个解决难题。