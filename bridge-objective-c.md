id obj = [[NSObject alloc] init];

// convert a oc pointer to a c pointer, and increase the reference count

void* ptr = (__bridge_retained void*);

// convert a c pointer to a oc pointer, and decrease the reference count

id obj2 = (__bridge_transfer id)ptr;
