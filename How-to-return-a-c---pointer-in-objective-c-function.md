[http://stackoverflow.com/questions/25819233/how-to-return-a-c-pointer-in-objective-c-function#](http://stackoverflow.com/questions/25819233/how-to-return-a-c-pointer-in-objective-c-function#)
#Question:
In .mm file

    #import "OCClass.h"
    #import "CPPClass.h"

    @interface OCClass()
    @property (nonatomic, readwrite) CPPClass* cppClass;
    @end
    
    @implementation OCClass
    -(void*)getObject
    {
        return cppClass;
    }
    @end
The getObject method is a public method, it is defined in the header, and I want to return the cppClass object with the type of CPPClass* instead of void*. But I can't include a cpp header in objective-c header. How should I do?

#Answer:
You can just forward declare the C++ class in your Objective-C .h file:

    // OCClass.h

    #import <Foundation/Foundation.h>
    
    class CPPClass;
    
    @interface OCClass : NSObject
    
    -(CPPClass*)getObject;
    
    @end
That way, you don't have to include the C++ .h file in your Objective-C .h file, and everything will still compile and work correctly. (Note that you can only #import this header file into a .mm file.) Also, your getObject method should either be:

    -(CPPClass*)getObject
    {
        return self.cppClass;
    }
or

    -(CPPClass*)getObject
    {
        return _cppClass;
    }
depending on whether you want to call the getter or not.
