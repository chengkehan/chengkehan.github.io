If you mark a gameobject as static, but they are still not be combined by unity. The following reasons maybe.

1.There is a mono script attach on the gameobject.

2.The Queue tag in the shader is Transparent.

3.The mesh is not marked as read-write-enabled.