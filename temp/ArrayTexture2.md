# Texture2DArray(2)

**2016-12-1**

补充之前一篇介绍 [ArrayTexture 的文章][link1]。

[link1]: ArrayTexture.html

离线生成 ArrayTexture 的方法：

	Texture2DArray t = new Texture2DArray(256, 256, textures.Length, TextureFormat.ETC_RGB4, false);
	for(int i = 0; i < textures.Length; ++i)
	{
		Graphics.CopyTexture(textures[i], 0, 0, t, i, 0);
	}
	t.Apply();
	AssetDatabase.CreateAsset(t, "Assets/texarr.asset");
	
上面代码中，生成的 ArrayTexture 是 ETC 这种压缩格式，注意 textures 数组里每张纹理也都必须是对应的格式。那么问题就来了，普通的纹理格式 Unity 提供了一个方便的方式来设置不同平台下的压缩格式，可是 ArrayTexture 却没有，不同平台之间的格式管理就很困难了。


	