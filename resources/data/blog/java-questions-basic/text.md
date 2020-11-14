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

Извне класса напрямую нет, только если через **Reflection** поменять модификатор поля или метода, что, конечно же, **абсолютно не рекомендуется делать**, т.к. это нарушает основной принцип **ООП** - **инкапсуляцию**.

--------------------

## 6. When doesn't `finally` block execute?

Блок **finally никогда не выполнится** только в этих ситуациях:

- В коде до блока **finally** будет вызван **System.exit()** (например: в блоке **try** или **catch**).
- Критическая ошибка JVM (**OutOfMemoryError**, **StackOverflowError**).

Во всех остальных случаях блок `finally` выполнится всегда!

Блок `finally` всё равно выполнится, например, даже если в блоке `catch` будет выброшено исключение.

--------------------

## 7. `final`, `finallize`, `finally`. Describe these keywords.

To be done.

--------------------

## 8. What're the differences between interfaces and abstract classes?

**Абстрактный класс** - это класс, у которого не реализован один или несколько методов.

**Интерфейс** - это абстрактный класс, у которого ни один метод не реализован, все они публичные и нет переменных класса.

**Абстрактный класс нужен**, когда нужно семейство классов, у которых есть много общего. Конечно, можно применить и интерфейс, но тогда нужно будет писать много идентичного кода.

**Интерфейс нужен** обычно когда описывается только интерфейс (sic!). Например, один класс хочет дать другому возможность доступа к некоторым своим методам, но не хочет себя «раскрывать». По-этому он просто реализует интерфейс.

--------------------

## 9. Explain `super` and `this`.

**this** - ключевое слово, при помощи которого можно ссылаться на поля и методы текущего класса.
**super** - ключевое слово, при помощи которого можно ссылаться на поля и методы суперкласса.

**Особенности:**

- Это не статические переменные, их нельзя использовать в статическом контексте.
- Могут использоваться внутри конструкторов для вызова других конструкторов.
- Нельзя присвоить новое значение, потому что **final**.

--------------------

## 10. Can we handle `Error` exceptions?

**Error** – класс исключений, связанных с неуправляемыми сбоями в работе программы. Например: **StackOverflowError** или **OutOfMemoryError**.

**Хэндлить их не нужно, т.к. не гарантируется работа программы,  произошел неуправляемый программный сбой.**
Но вроде как можно.

**P.S.** Вроде как какие-то либы хэндлят **LinkageErrors**, это одно из Error-исключений, которое можно перехватить.

--------------------

## 11. Explain `overload` and `override`.

**Overload** – создание метода с **тем же именем** и **тем же возвращаемым значением**, но с **другим набором входящих параметров**.

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

**Override** – переопределение уже **существующего метода** (в родительском классе).

```java
public class Test {

    private String test;

    @Override
    public String toString() {
        return "test=" + test;
    }

}
```

В данном примере мы переопределяем метод `Object::toString`. Все классы неявно наследуют класс `Object`.

--------------------

## 12. Explain `String`, `StringBuilder`, `StringBuffer`, `StringPool`.

**Строка является неизменной и финализированной в Java, поэтому все наши манипуляции со строкой всегда будут создавать новую строку.**

Для более эффективной манипуляции со строками есть 2 класса:

- **StringBuilder:** Быстрее чем *StringBuffer*, используется в однопоточном окружении, т.к. **потоконебезопасен**.
- **StringBuffer:** Медленнее чем *StringBuilder*, но зато **потокобезопасен**.

**StringPool** – это **набор строк, хранимый в Heap**, позволяющий **оптимизировать** работу со строками. Это возможно только благодаря неизменяемости строк в Java.

Т.к. строки неизменяемы, то при создании новой строки при помощи кавычек будет искаться такая же строка в пуле. Если строка будет найдена - будет возвращена ссылка на объект в пуле, иначе строка будет сначала занесена в пул. При этом, чтобы сработала эта оптимизация, не нужно создавать строки через оператор new. Или нужно использовать метод **String::intern**, чтобы форсировать поиск и использование уже существующего в StringPool объекта с таким же значением строки.

--------------------

## 13. Explain static and dynamic linking.

**Раннее (статическое) связывание** – это когда компилятор на этапе компиляции может определить какой метод какого класса он должен вызвать. В примере выше **заранее известно**, что `cat` является объектом класса `Cat`, соответственно, вызов будет привязан к методу `Cat.voice`.

```java
Cat cat = new Cat();
cat.voice();
```

**Позднее (динамическое) связывание** – это когда компилятор на этапе компиляции не в состоянии определить какой метод какого класса он должен вызвать. В примере выше переменная `animal` может быть объектом или `Animal` или `Cat`, соответственно, **JVM** будет на лету **определять какой метод нужно вызвать**.

```java
Animal animal = new Cat();
animal.voice();
```

--------------------

## 14. JVM memory model.

**Память состоит из:**

- Стека (на каждый поток).
- Кучи.
- PermGen (до java8) или Metaspace (java 8+).

### 14.1. Stack

На каждый поток выделяется свой стек. Стек работает по схеме LIFO.
В стеке хранятся вызовы методов и значения примитивных типов данных и значения ссылок на объектвы в куче.

### 14.2. Heap

Память, в которой хранятся объекты. Эту память периодически подчищает сборщик мусора, удаляет неиспользуемые объекты.
Область делится на несколько частей с целью оптимизации работы сборщика мусора: Eden (новые объекты), Survivor (те объекты, что пережили хотя бы 1 сбор мусора), Old (долгоживущие объекты).
В куче также хранится *StringPool*.

### 14.3. PermGen (< 1.8)

Особая область кучи, хранящаяся отдельно от основной памяти кучи.
Память, где хранится метаинформация: информация о классах (и их методах), пул констант, статические методы, переменные примитивных типов и ссылки на статические объекты.
Также тут хранится данные о байт-коде и JIT-информация.

### 14.4. Metaspace (since 1.8)

Основное отличие в том, что Metaspace автоматически увеличивается в размере по мере необходимости, а PermGen имеет фиксированный размер.
Также сборщик мусора теперь автоматически очищает данные о неиспользуемых классах при достижении указанного максимального размера Metaspace.

--------------------

## 15. How does Garbage collector work?

- **Stack:** LIFO, создается по одному на поток, содержит переменные – ссылки на объекты в куче.
- **Heap:** Здесь создаются объекты в памяти, на них ссылаются ссылки из *Stack*. Делится на несколько частей – **Old Generation** и **New Generation**. **New Generation** делится на 2 части – **Eden** и **Survivor**.
- **Eden:** Здесь живут новые объекты.
- **Survivor:** Здесь живут объекты, хотя бы 1 раз пережившие сбор мусора.
- **Old Generation**: Сюда перемещаются объекты,  живущие какое-то время в **Survivor**.

Сборщик мусора смотрит на объекты в **Eden**. Те объекты, на которые нет ссылок - удаляет, а те, на которые есть - переносит в **Survivor**.
Тоже самое происходит и с **Survivor** и **Old Gen**, только реже и при достижении каких-либо условий.
Если в процессе сбора мусора будет не хватать памяти - будет выброшено исключение **OutOfMemoryException**.

--------------------

## 16. What are annotations and how does it work?

**Annotation** – возможность языка добавлять метаданные в код.

Используются для анализа кода, компиляции или выполнения.
Аннотированы могут быть классы, отдельные методы или поля, и даже переменные.

**Аннотацию можно настраивать аннотациями:**

- **@Target:** Где можно применять аннотации (класс, метод, поле, переменная, и т.д.).
- **@Retention:** Когда будет доступна аннотация (этап компиляции или рантайм, и т.д.).

Общая схема: `public @interface AnnotationName`

```
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Test {
    Class expected();
}
```

Необходимо написать анализатор, который через Reflection вытягивает нужную информацию и выполяет нужную логику.

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

В каждом **classloader** может быть свой собственный инстанс **Singletone**.

--------------------

## 18. What is lambda function?

Лямбда-выражение – это анонимная функция.

```java
(int a, int b) -> {  return a + b; }
() -> System.out.println("Hello World");
(String s) -> { System.out.println(s); }
() -> 42
() -> { return 3.1415 };
```

Каждую лямбду можно сопоставить подходящему функциональному интерфейсу:

```java
Runnable runnable = () -> System.out.println("hello world");
BiConsumer<Integer, String> biConsumer = (Integer x, String y) -> System.out.println(x + " : " + y);
```

--------------------

## 19. Stream API.

**Stream API** - это новый способ работать со структурами данных в функциональном стиле. Чаще всего с помощью **stream** работают с коллекциями, но на самом деле этот механизм может использоваться для самых различных данных.

Например, суммирование всех нечётных чисел без помощи Stream API:

```
Integer oddSum = 0; 
for (Integer value : valuesCollection) {
	if (value % 2 != 0) {
		oddSum += value;
	}
}
```

При помощи Stream API:

```java
Integer oddSum = valuesCollection.stream()
    .filter(v -> v % 2 != 0)
    .reduce((v1, v2) -> v1 + v2)
    .orElse(0);
```

Одно из преимуществ, что такой код теперь можно просто распараллелить, заменив `stream()` на `parallelStream()`.

В Stream API все методы делятся на 2 типа:

- **Конвеерные:** Работают также, как паттерн Builder - накапливают изменения. Возвращают измененный stream. Примеры: **filter**, **skip**, **limit**, **sorted**.
- **Терминальные:** Только после вызова терминального метода происходит выполнение всех операций. Возвращает уже данные (не stream). Примеры: **collect**, **count**, **min/max**, **forEach**, **toArray**, **reduce**.

Examples:
```
List<String> collection = Arrays.asList(
    "a1", "a2", "a3", "a1");

// Вернуть количество вхождений объекта «a1»
collection.stream().filter(«a1»::equals).count(); // 2

// Вернуть последний элемент коллекции или "empty", 
// если коллекция пуста
collection.stream().skip(collection.size() - 1).findAny()
    .orElse("empty"); // "a1"

// Найти элемент в коллекции равный "a3" или кинуть ошибку
collection.stream().filter("a3"::equals)
    .findFirst().get(); // "a3"
```

--------------------

## 20. Multiple Inheritance.

Multiple Inheritance is a feature of object oriented concept, where a class can inherit properties of more than one parent class.

В Java нет множественного наследования классов, однако есть множественное наследование интерфейсов.

--------------------

## 21. Fields initialization order.

1. Статические элементы родителя
2. Статические элементы наследника
3. Глобальные переменные родителя
4. Конструктор родителя
5. Глобальные переменные наследника
6. Конструктор наследника

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

**Функциональный интерфейс** – это интерфейс, содержащий только один метод. 
There are predefined functional interfaces in Java. Let's take a look at a part of these.

Runnable - Выполняет что-то, не принимая и не возвращая аргументов
```
public interface Runnable {
    public void run();
}
...
() -> System.out.println("Echo from Runnable!")
```

Predicate - Проверяет некоторое условие по операнду
```
public interface Predicate<T> {
    boolean test(T t);
}

...

(o) -> return o.isOk()
```

Function<T,R> - Преобразует операнд и возвращает значение другого типа
```
public interface Function<T, R> {
    R apply(T t);
}

...

(intVal) -> return String.valueOf(intVal)
```

Consumer<T> - Выполняет действие над объектом, ничего не возвращая
```
public interface Consumer<T> {
    void accept(T t);
}

...

(obj) -> System.out.println(obj)
```

Supplier<T> - Не принимает ничего, но возвращает объект
```
public interface Supplier<T> {
    T get();
}

...

() -> return new Integer(random.nextInt());
```

BinaryOperator - выполняет операции над двумя операндами
```
public interface BinaryOperator<T> {
    T apply(T t1, T t2);
}

...

(o1, o2) -> return o1 + o2
```

UnaryOperator - Выполняет операции над одним операндом
```
public interface UnaryOperator<T> {
    T apply(T t);
}

...

(val) -> return val * val
```

--------------------

## 23. Exceptions: checked, unchecked.

- **checked (проверяемые):** - это исключения, которые должны быть обработаны блоком *catch* или должны описываться в сигнатуре метода, иначе программа не скомпилируется. **Наследуются от Exception** (см. вложение).
- **unchecked (непроверяемые):** - это исключения, которые могут необрабатываться и быть неописанными в сигнатуре метода. **Наследуются от Throwable, Error и RuntimeException** (см. вложение).

К **checked** относятся исключения:
- *IOException* (Например: файл не найден).
- *SQLException* (Например: соединения нет).
- И другие.

К **unchecked** относятся исключения:
- *ArithmeticException* (Например: деление на ноль).
- *IndexOutOfBoundsException* (Например: выход за границы массива).
- *StackOverflowError* (стек переполнен).
- И другие.

Как уже было сказано, обработка данных исключений не обязательная, в том числе потому, что это достаточно частые операции (каждый раз оборачивать в `try { ... } catch { ... }` любой код обращения к массиву, например), и в таком случае код стал бы нечитаемый.

![](/resources/data/blog/java-questions-basic/exceptions-tree.png)

--------------------

## 24. List access modifiers.

- **public**: Доступно всем классам из всех пакетов.
- **protected**: Доступно текущему классу и его наследникам из всех пакетов.
- **default**: Доступно текущему классу и его наследникам из текущего пакета.
- **private**: Доступны только в рамках текущего класса.

![](/resources/data/blog/java-questions-basic/access-modifiers.jpg)

--------------------

## 25. Can we manage Garbage Collector?

Просто вызывай **System.gc();**.
Однако, JVM не гарантирует реальный вызов GC.

--------------------

## 26. How can we avoid lack of default parameters in Java?

В Java нет параметров по-умолчанию. Для **конструирования объектов** используется паттерн **Builder**, а для **методов** используются методы, вызывающие друг-друга:

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

Внутренний **не статический класс** имеет доступ **ко всем** полям и методам внешнего класса (не статическим и статическим).
Внутренний **статический класс** имеет доступ к **статическим** полям и методам внешнего класса.
Внутренний статический класс имеет смысл использовать тогда, когда нам не нужен доступ к полям внешнего класса, однако по смыслу внутренний класс должен быть внутри внешнего.

--------------------

## 28. What are generics?

**Дженерики** - это параметризованные типы. С их помощью можно объявлять классы, интерфейсы и методы, где тип данных указан в виде параметра.

```
class Example<T> { ... }

...

Example<String> example = new Example<>();
```

**Используются для написания логики, при этом не привязываясь к конкретным типам.**
Например, можно определить базовый абстрактный класс **Storage<T>**, и определить операции над классом. 
Параметром будет являться ключ доступа к элементу хранилища (тип параметра определяем в наследниках). 
Ключом может быть *Integer*, *String*, *File*, или даже объект бизнес-логики, который мы храним в этом самом *Storage*.
