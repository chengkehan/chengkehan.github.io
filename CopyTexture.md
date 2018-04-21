# CopyTexture 注意事项

**2018-4-21**

Graphics.CopyTexture 可以把纹理的像素复制到另一张纹理，由于是 GPU 端的元数据拷贝，所以即使是压缩格式，只要格式大小一致就可以进行。

然而有一点需要注意的是，CopyTexture 后是不能调用 Apply 的，以前在 SetPixels 操作后习惯性的调用这个 API，以确保 CPU 端数据提交到 GPU。而 CopyTexture 不同，它是直接在 GPU 端拷贝数据，如果调用 Apply，会导致 CPU 端的 undefined 数据被提交到 GPU，产生未定义的结果。其实文档中早已提及这点，还是看文档不仔细导致的。我这里的情况是 PC 端效果正确，而移动设备上效果错误。

对于这个排查了很长时间的问题，在此记录下。