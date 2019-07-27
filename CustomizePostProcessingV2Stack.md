# 自定义 Post-processing V2 Stack

**2019-7-28**

LWRP 中使用的是 Post-processing V2 Stack，而以前常用的 OnRenderImage 来处理后处理特效也变得失效了。如果要扩展自己的后处理效果，需要换种方式。这里就放一个模板，可以在此基础上进行扩展。

C# 代码（ImageEffectTemplatePP.cs）

	using System.Collections;
	using System.Collections.Generic;
	using UnityEngine;
	using UnityEngine.Rendering.PostProcessing;
	using System;
	
	#if UNITY_EDITOR
	using UnityEditor.Rendering.PostProcessing;
	#endif
	
	[Serializable]
	[PostProcess(typeof(ImageEffectTemplatePPRenderer), PostProcessEvent.BeforeStack, "Custom/ImageEffectTemplate")]
	public class ImageEffectTemplatePP : PostProcessEffectSettings
	{
	    [Range(0.0f, 2.0f), Tooltip("Lighting")]
	    public FloatParameter m_lighting = new FloatParameter { value = 1f };
	}
	
	public sealed class ImageEffectTemplatePPRenderer : PostProcessEffectRenderer<ImageEffectTemplatePP>
	{
	    Shader m_shader = Shader.Find("Hidden/ImageEffectTemplate");
	
	    public override void Render(PostProcessRenderContext iContext)
	    {
	        if (m_shader == null)
	            return;
	
	        var sheet = iContext.propertySheets.Get(m_shader);
	        sheet.properties.SetFloat("_Lighting", settings.m_lighting.value);
	        iContext.command.BlitFullscreenTriangle(iContext.source, iContext.destination, sheet, 0);
	    }
	}
	
	#if UNITY_EDITOR
	[PostProcessEditor(typeof(ImageEffectTemplatePP))]
	public class ImageEffectTemplatePPEditor : PostProcessEffectEditor<ImageEffectTemplatePP>
	{
	    SerializedParameterOverride m_lighting;
	
	    public override void OnEnable()
	    {
	        base.OnEnable();
	
	        m_lighting = FindParameterOverride(x => x.m_lighting);
	    }
	
	    public override void OnInspectorGUI()
	    {
	        base.OnInspectorGUI();
	
	        PropertyField(m_lighting);
	    }
	}
	#endif
	
Shader 代码（ImageEffectTemplate.shader）

	Shader "Hidden/ImageEffectTemplate"
	{
	    HLSLINCLUDE
	
	    #include "Packages/com.unity.postprocessing/PostProcessing/Shaders/StdLib.hlsl"
	
	    TEXTURE2D_SAMPLER2D(_MainTex, sampler_MainTex);
	
	    uniform float _Lighting;
	
	    float4 Frag(VaryingsDefault i) : SV_TARGET
	    {
	        float4 color = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.texcoord);
	        color.rgb = (1 - color.rgb) * _Lighting;
	        return color;
	    }
	
	    ENDHLSL
	
	    SubShader
	    {
	        Cull Off ZWrite Off ZTest Always
	
	        Pass
	        {
	            HLSLPROGRAM
	                #pragma vertex VertDefault
	                #pragma fragment Frag
	            ENDHLSL
	        }
	    }
	}

将代码复制到项目中，就可以在 Post Process Volume 上看到自定义的 ImageEffectTemplate 了。