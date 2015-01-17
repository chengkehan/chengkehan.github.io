A way to optimize return value in cpp

**Code block 1**

    ClassA getValue()
    {
        return ClassA();
    }

**not**

**Code block 2** 

    ClassA getValue()
    {
    	ClassA classA;
    	return classA; // A temp object by CopyConstructor
    }

Almost all compilers will optimize return value with Code block1.

But some compiler will still optimize return value with Code block2.

So we should wirte code like Code block1 to be sure compiler will optimize return value.