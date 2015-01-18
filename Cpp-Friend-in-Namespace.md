Compile successfully

	// ClassA.h
	namespace myNS
	{
		class ClassA
		{
			private:
				int value;

				friend int getValue(const ClassA& classA)
				{
					return classA.value;
				}
		};
	}

===========================================================

Compile failed

	// ClassA.h
	namespace myNS
	{
		class ClassA
		{
			private:
				int value;

				friend int getValue(const ClassA& classA);
		};
	}

	// ClassA.cpp
	using namespace myNS

	int getValue(const ClassA& classA)
	{
		return classA.value; // Error:value is private member
	}

	// Fix the problem
	namespace myNS
	{
		int getValue(const ClassA& classA)
		{
			return classA.value;
		}
	}

Reference:<a href="http://stackoverflow.com/questions/15731414/c-friend-function-cant-access-private-members">c-friend-function-cant-access-private-members</a>




