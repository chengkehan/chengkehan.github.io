# Entity 的层级关系

**2023-9-26**

两个物体的层级，可以使用 Parent 和 Child 这两个定义好的 IComponentData 来建立父子关系。在建立层级关系的时候，应该遵循从下到上的原则，也就是说我们只需要使用 Parent 自下而上的建立层级关系，而不需要关心 Child 关系的建立，因为 Parent 和 Child 是对应的，所以 TransformSystem 会根据 Parent，自动建立好 Child 的关系。

需要建立层级关系的 Entity，必须有 LocalToWorld 和 LocalTransform 组件，否则层级关系是无法建立的。

以上提到的几个概念， Parent、Child 隶属于 Transform，也就是为了控制物体的坐标、旋转、缩放而存在的。建立父子关系，是为了子物体会继承父物体的形变。

但是当我们删除父 Entity 时，会发现子 Entity 并没有被删除，而是仍然存在于 World 中。这和我们原来的认知有所不同。这时就需要用到 LinkedEntityGroup。我们需要使用 LinkedEntityGroup，将父 Entity 和 子 Entity 关联起来，这样当我们删除父 Entity 的时候，子 Entity 也会自动地从 World 中删除。

所以 Transform 只是仿射变换的父子层级继承, 并没有除此之外的连系。

在实际的开发中，这样的操作很容易出错，所以我们可以将建立父子层级关系时的 Parent、Child、LinkedEntityGroup 封装起来。当 SetParent 的时候，自动使用 LinkedEntityGroup 进行关联或断开连接，以此来达到符合正常人类认知的目的。

[https://docs.unity3d.com/Packages/com.unity.entities@1.1/manual/transforms-concepts.html]()
[https://docs.unity3d.com/Packages/com.unity.entities@1.0/api/Unity.Entities.LinkedEntityGroup.html]()





