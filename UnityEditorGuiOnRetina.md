# Unity Editor GUI 在 Retina 屏幕的坐标

**2020-5-3**

最近把在以前 Windows 上写的 Editor GUI 插件放到 Mac 上用了下，Editor GUI 的坐标计算总是有一些错误。应该不会是计算错误，因为这些 Editor GUI 代码以前都是跑的好好的。那会不会是 Unity 版本升级后 Editor API 的行为差异呢，有部分 Editor GUI 的代码是从 Unity5 迁移到 Unity2019 的，仔细复查了一边，排除了这种假设。

尝试了许久后，终于从一个地方找到了突破口。

	public Vector3 GetCollisionPoint(SceneView sv, Event currentEvent)
	{
		Vector3 mousePos = currentEvent.mousePosition;
		Ray ray = sv.camera.ScreenPointToRay(mousePos);
		......
		
这是从 SceneView 的相机到鼠标位置发射一条射线，把 mousePos 输出后发现，总是比实际值小了一半。比如屏幕宽800像素，把鼠标移动到屏幕最右，mousePosition 也只有400像素，问题就出在这里。mousePosition 返回值的坐标单位并不是像素，而是 Unity 中的点位置。Unity 中的点位置是用来定位 Editor GUI 坐标的，但是并不是说一个点就对应一个像素，在 Retina 屏幕上，一个点对应两个像素。可用通过 EditorGUIUtility.pixelsPerPoint 这个 API 来获得点和像素的对应比例。这样代码就改成了：

	Vector3 mousePixelPos = currentEvent.mousePosition * EditorGUIUtility.pixelsPerPoint;
	Ray ray = sv.camera.ScreenPointToRay(mousePixelPos);
	
这样就能得到正确的计算结果了。