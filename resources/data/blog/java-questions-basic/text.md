## 1. Methods in `Object` class.

```
public boolean equals(Object obj);
```

This method is used to determine equality of two objects. By default, it compares values of references (is a given object the same). 
Should be overridden in most cases.

```
public native int hashCode();
```

Returns a number (a hash code value) for an object. Widely used in collections, `HashMap` including.

```
protected native Object clone() throws CloneNotSupportedException;
```

Creates and returns a copy of this object.
**Warning:** it doesn't really clone non-primitive types, it just copies a reference value. You may want to override this method and implement a real copying of non-primitive types.

```
public String toString();
```

Returns a string representation of the object.

```
protected void finalize() throws Throwable;
```

Called by the garbage collector on an object when garbage collection determines that there are no more references to the object.
It is supposed to remove some objects here, but it isn't recommended using this method, because it is a work entirely for GC.

**There are some other methods in `Object`:**
- `registerNatives`: Registers native functions for class Object whatever it means. It can be useful for giving custom names for native functions which will be registered.
- `notify`, `notifyAll`, `wait`: These've lost their actuality since Java 1.5 because now we have simpler and more powerful synchronization abstractions.

--------------------

## 2. Is Java pass-by-reference or pass-by-value?

Java is always pass-by-value. Though there is a tricky point:
- For primitive types, values are copied.
- For non-primitive types, values of references to objects inside a heap are copied.

--------------------

## 3. What is JDK, JRE, JVM? What is a compiler?

- **JDK** (*Java Development Kit*): A bunch of tools forms an environment for developing java applications. It includes **JRE**, compiler javac, jar archiver, javadoc generator, and so on and so forth.
- **JRE** (*Java Runtime Environment*): Consists of **JVM** and java libraries, which are required for running programs written in java.
- **JVM** (*Java Development Kit*): This is a virtual machine which able to execute java programs by running their bytecode instructions.
- **Compiler**: This is a tool which compiles java source code into a bytecode.

--------------------

## 4. Contracts between `equals` and `hashCode`.

```java
public boolean equals(Object obj);
```

Checks if two objects are equal. It compares objects' references by default (do these variables point to the same object in heap?).
It often needs to override this method to achieve expected behavior. 

```java
public native int hashCode();
```

Returns a number (a hash) for this object. It has `int` type (2^32 possible values). This method must return exact the same hash for the same object, but it's allowed to have the same hash for different objects.

_Again:_
- If hashes of two objects are different, that means that these objects **are different**.
- If hashes of two objects are equal, that means that these objects **maybe different**, but **maybe not**.

**`equals` contracts**:

- `x.equals(null) == false`.
- `x.equals(x) == true`.
- `x.equals(y) == x.equals(y)` (always the same result for the same object).
- `x.equals(y) == y.equals(x)`.
- IF `x.equals(y)` AND `y.equals(z)` THEN `x.equals(z)`.

**`hashCode` contracts**:

- `x.hashCode() == x.hashCode()` (always the same result for the same object):
- IF `x.equals(y)` THEN `x.hashCode() == y.hashCode()`.

--------------------

## 5. How can I get access for private fields and methods?

You cannot do it directly, of course. But you can use Reflection API to achieve it (it's better to avoid it).

--------------------

## 6. When doesn't `finally` block execute?

`finally` always executes, but there are some exceptions:
- `System.exit()` has been called inside `try` or `catch`.
- Caught fatal error like `OutOfMemoryError` or `StackOverflowError`.

P.S. Yes, `finally` executes even if we have `throw` inside `catch` block.

--------------------

## 7. `final`, `finallize`, `finally`. Describe these keywords.

To be done.

--------------------

## 8. What're the differences between interfaces and abstract classes?

**Abstract class** is a class which may have one or more not implemented methods. **Interface** is like an abstract 
class which have only not implemented methods, all them are public, and there aren't any fields.
You can implement multiple interfaces, but cannot extend multiple abstract classes at once.

--------------------

## 9. Explain `super` and `this`.

`this` is a keyword you can use to point to fields and methods of a current class.
`super` is a keyword you can use to point to fields and methods of a superclass.

**Additional details:**
- You cannot refer it in a static context.
- Can be used inside constructors to call other constructors.
- They're final, you cannot modify it.

--------------------

## 10. Can we handle `Error` exceptions?

**Error** is a class of exceptions which used when your program faced with unmanageable failures like `StackOverflowError` or `OutOfMemoryError`.
You can handle it, but your program behavior is undefined, so you shouldn't do that. 

**P.S.** Some libraries handle `LinkageError`, but in most cases, you don't need it.

--------------------

## 11. Explain `overload` and `override`.

Overloading is all about creating a new method with the same name and the same return type of some another menthod,
but with different set of input parameters.

```java
public class Test {

    private String test;

    public Test(String test) {
        this.test = test;
    }

    public Test() {
        this("default");
    }

}
```

Overriding is reimplementing a method of base class in current class to have different behaviour.

```java
public class Test {

    private String test;

    // Overriding Object::toString()
    @Override
    public String toString() {
        return "test=" + test;
    }

}
```

--------------------

## 12. Explain `String`, `StringBuilder`, `StringBuffer`, `StringPool`.

`String` is a set of characters. Strings are immutable in Java, so concatenating strings is ineffective because 
it causes creating a brand-new string by copying original strings, it is `O(N)` operation.

There're at least two classes provide ways to work with strings effectively:
- `StringBuilder`: Faster than `StringBuffer`, but thread-unsafe.
- `StringBuffer`: Slower than `StringBuilder`, but thread-safe.

**StringPool** is a set of strings stored in Heap and used to optimize work with strings.
It used by Java in this way:
- If you create a string by using quotes, Java lookup the StringPool at first. If we already have such string 
then Java just returns this object to you. If not then it creates a new object in Heap inside StringPool 
then returns it to you.
- This optimization doesn't work with strings created using `new` operator.
- To force using this optimization use `String::intern`.

--------------------

## 13. Explain static and dynamic linking.

**Static linking** is a process in compile time when a linked content is copied into the primary binary and 
becomes a single binary.
**Dynamic linking** is a process in runtime when a linked content is loaded. This technic allows upgrading 
linked binary without recompiling a primary one, and allows to have a single shared copy.

JVM always do dynamic linking, there is no static linking.

--------------------

## 14. JVM memory model.

Java memory model consists of:
- Stacks (one for each thread).
- Heap.
- PermGen (<1.8) или Metaspace (since 1.8).

### 14.1. Stack

Each thread has his own stack. Stack is LIFO and contains methods calls, variables of primitive types, 
references' values of objects in Heap.

### 14.2. Heap

This is a memory space where objects live in. Heap is periodically cleaned by Garbage Collector.
Heap consists of several spaces:
- New generation:
    - Eden (where new objects live).
    - Survivor (where objects, which "survived" after garbage collection, live).
- Old generation (where long-lived objects live).
- StringPool (where strings live).
- PermGen/Metaspace (where meta information about an application live).

### 14.3. PermGen (< 1.8)

This is a part of Heap where metadata lives. It consists of information about classes and their methods, constants pool,
static methods, references to static objects. It has a fixed size.

### 14.4. Metaspace (since 1.8)

Metaspace is almost identical to PermGem, but it has dynamic size which is better.
Garbage collector now cleans the data about unused classes if metaspace reach max size.

--------------------

## 15. How does Garbage collector work?

- **Stack:** LIFO, each thread has a stack where references to objects in heap live.
- **Heap:** Objects are living here. There in stacks can be references to these objects.
- There are **Old Generation**, **New Generation** (**Eden** and **Survivor**) spaces in Heap, read about it in 14.2

Garbage collector looks for objects without references in Eden. If there are such objects then GC removes it.
The same way GC does with Survivor and Old Gen but with less frequency.
If no heap space is available then `OutOfMemoryException` will be thrown.

--------------------

## 16. What are annotations and how does it work?

Annotations allow you to add meta information into code. We can add annotations to classes, methods, fields 
or even to variables (it's a very seldom case though).
It's used for code analysis, during compilation time or runtime.

An annotation can be configured by using there annotations:
- `@Target`: Where the annotation can be applied, like `TYPE`, `FIELD`, `METHOD`, `PARAMETER`, `LOCAL_VARIABLE`, etc.
- `@Retention`: When you able to use the annotation, like at compile time (`CLASS`) or at runtime (`RUNTIME`).

Common scheme: `public @interface AnnotationName`

```
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Test {
    Class expected();
}
```

Next, you need to write code for parsing using `Reflection`. Example:

```java
public class TestAnnotationAnalyzer {
    public void parse(Class<?> clazz) throws Exception {
        Method[] methods = clazz.getMethods();
        int pass = 0;
        int fail = 0;
        for (Method method : methods) {
            if (method.isAnnotationPresent(Test.class)) {
                try {
                    method.invoke(null);
                    pass++;
                } catch (Exception e) {
                    fail++;
                }
            }
        }
    }
}
```

--------------------

## 17. How many singleton instances can be in JVM?

You can have one singleton instance per classloader. You can have multiple classloaders.

--------------------

## 18. What is lambda function?

Lambdas are just a short-form of anonymous functions.

```java
(int a, int b) -> {  return a + b; }
() -> System.out.println("Hello World");
(String s) -> { System.out.println(s); }
() -> 42
() -> { return 3.1415 };
```

Each lambda could be mapped to suitable functional interface:

```java
Runnable runnable = () -> System.out.println("hello world");
BiConsumer<Integer, String> biConsumer = (Integer x, String y) -> System.out.println(x + " : " + y);
```

--------------------

## 19. Stream API.

This is a way of manipulating data in a functional manner. Available since 1.8.
Often used to work with collections.

Compare examples:

```
Integer oddSum = 0; 
for (Integer value : valuesCollection) {
	if (value % 2 != 0) {
		oddSum += value;
	}
}

// or

Integer oddSum = valuesCollection.stream()
    .filter(v -> v % 2 != 0)
    .reduce((v1, v2) -> v1 + v2)
    .orElse(0);
```

It also possible to run this code in parallel streams by replacing `stream()` with `parallelStream()`.

All the methods in Stream API can accumulate changes or terminate (performing of accumulated changes):

- Accumulate: filter, skip, limit, sorted** (returns `Stream`).
- Terminate: collect, count, min/max, forEach, toArray, reduce (returns some result or performs some actions).

Examples:
```
List<String> collection = Arrays.asList("a1", "a2", "a3", "a1");

collection.stream().filter(«a1»::equals).count(); // 2

collection.stream().skip(collection.size() - 1).findAny().orElse("empty"); // "a1"

collection.stream().filter("a3"::equals).findFirst().get(); // "a3"
```

--------------------

## 20. Multiple Inheritance.

Multiple Inheritance is a feature of object oriented concept, where a class can inherit properties of more than one 
parent class. There is no multiple classes inheritance in Java, but there is multiple interfaces inheritance.

--------------------

## 21. Fields initialization order.

```java
public class Example {
    static int field1 = 1;
    static int field2;
    static {
        field2 = 2;
    }
    int field3 = 3;
    int field4;
    public Example() {
        field4 = 4;
    }
    int field5;
    {
        field5 = 5;
    }
}
```

--------------------

## 22. Functional interfaces.

Functional interfaces are interfaces with only one method in it. There are several predefined functional interfaces in Java.

```
public interface Runnable {
    public void run();
}

...

() -> System.out.println("Echo from Runnable!")
```

```
public interface Predicate<T> {
    boolean test(T t);
}

...

(o) -> return o.isOk()
```

```
public interface Function<T, R> {
    R apply(T t);
}

...

(intVal) -> return String.valueOf(intVal)
```

```
public interface Consumer<T> {
    void accept(T t);
}

...

(obj) -> System.out.println(obj)
```

```
public interface Supplier<T> {
    T get();
}

...

() -> return new Integer(random.nextInt());
```

```
public interface BinaryOperator<T> {
    T apply(T t1, T t2);
}

...

(o1, o2) -> return o1 + o2
```

```
public interface UnaryOperator<T> {
    T apply(T t);
}

...

(val) -> return val * val
```

--------------------

## 23. Exceptions: checked, unchecked.

- **checked** exceptions are exceptions inherited from `Exception`. These exceptions must be handled or 
passed up through by `throws` method signature.
- **unchecked** exceptions are exceptions inherited from `RuntimeException`, `Throwable` or `Error`. 
You can leave these exceptions unhandled, you may write no `throws` keyword either.

**checked** exceptions examples:
- *IOException* (for instance: file not found).
- *SQLException* (for instance: no connection).

**unchecked** exceptions examples:
- *ArithmeticException* (for instance: division by zero).
- *IndexOutOfBoundsException*.
- *StackOverflowError*.

![](/resources/data/blog/java-questions-basic/exceptions-tree.png)

--------------------

## 24. List access modifiers.

- **public**: Any class has access to the current class.
- **protected**: The current class and inheritors have access.
- **default**: The current class and inheritors from the same package have access.
- **private**: Only the current class has access.

![](/resources/data/blog/java-questions-basic/access-modifiers.jpg)

--------------------

## 25. Can we manage Garbage Collector?

Execute `System.gc();` but it doesn't guarantee you that **GC** will be invoked.

--------------------

## 26. How can we avoid lack of default parameters in Java?

We can achieve it by using **Builder** pattern and by methods and constructors overloading.

```java
Random random = new Random();

int sum(int a, int b) {
    return a + b;
}

int sum(int a) {
    return sum(a, random.nextInt());
}

int sum() {
    return sum(random.nextInt(), random.nextInt());
}
```

--------------------

## 27. What are the differences between static and non-static inner classes?

Inner non static class can access all the methods and fields of a containing class.
Inner static class can access only static methods and fields of a containing class.

--------------------

## 28. What are generics?

Gererics are parameterised types. You can use a parameter (`T`, `K`, `ANY` literally any) 
instead of a concrete type (`String`, `Integer`, `SomeClass`, etc). You can use it for interfaces, classes, 
their methods (I/O variables' types), fields. 
It provides type safety.

```
class Example<T> { ... }
...
Example<String> example = new Example<>();
```
