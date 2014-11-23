using UnityEngine;
using System.Collections;

public class CheckWhetherInRendering : MonoBehaviour {

	public bool isRendering=false;
    private float lastTime=0;
    private float curtTime=0;

    void Update()
    {
	    isRendering=curtTime!=lastTime?true:false;
	    lastTime=curtTime;
    }

    void OnWillRenderObject()
    {
	    curtTime=Time.time;
    }

}
