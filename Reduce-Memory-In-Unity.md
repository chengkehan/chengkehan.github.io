Reduce Memory and Package size in Unity3D
=========================================

TODO list:
 
   * Set the tangent option in model importer as none, if you never use tangent data. It will save you about 5MB memory in a complex scene and about 10MB package size with many models.

   * Set the pixel format of texture as a compress format.The best one is PVRTC, with perfect compress rate but only on IOS platform and some little defect. Another one is ECT, the most porpular format in Android but no alpha channel, instead you can use a black/white texture. And the RGB16 is also a good choose, it's supported by all platforms, performance and compress rate is nice but not the best. The last option is RGB32, it's true color, so it has the best pixels color, but baddest memory and package size.

   * If you use PVRTC to compress a texture, the texture will be scaled to squared. So the uv will not be correct if the atlas of NGUI isnot squared. Fortunately we can modify the source code of NGUI to fix the problem.
   
   * etc.