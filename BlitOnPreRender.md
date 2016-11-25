# 记录一个奇异的问题

**2016-11-25**

    public class NewBehaviourScript : MonoBehaviour
    {
        private void OnPreRender()
        {
            RenderTexture tempRT0 = RenderTexture.GetTemporary(512, 512, 0, RenderTextureFormat.ARGB32);
            RenderTexture tempRT1 = RenderTexture.GetTemporary(512, 512, 0, RenderTextureFormat.ARGB32);
            Graphics.Blit(tempRT0, tempRT1);
            Graphics.Blit(tempRT1, tempRT0);
            RenderTexture.ReleaseTemporary(tempRT0);
            RenderTexture.ReleaseTemporary(tempRT1);
        }
    }
    
新建一个空场景，在主相机上挂载这段代码，然后运行，渲染结果是一片黑屏，只在特定项目的工程中会出现，Unity 版本是 4.7 的。然后尝试修复，对以上代码进行修改：

	private void OnPreRender()
	{
		RenderTexture currRT = RenderTexture.active;
		// ...
		RenderTexture.active = currRT;
	}
	
上面代码中维护了一个当前活动的 RenderTexture，修复了上述的问题。具体是什么底层的原因还是未知。