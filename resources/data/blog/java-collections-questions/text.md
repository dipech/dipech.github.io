## 1. Describe main interfaces and classes.

`List` is a set of elements which can be accessible by their index.

Main implementations:
- `ArrayList**.
- `LinkedList**.
- `Vector` (Deprecated). 
- `Stack` (LIFO).

`Set` is an unordered set of elements. There could be only one element with `null` value.

Main implementations:
- `HashSet` - Hash-table based implementation. The main feature is speed – *O(1)*. Elements order isn't guaranteed.
- `LinkedHashSet` - Like `HashSet` but keeps track of elements order. The main feature is insertion order. 
Elements order is guaranteed.
- `TreeSet` - Binary tree based implementation. The main feature is sorting. Doesn't allow null values. 
Slower than other - *O(logN)*. Elements order is guaranteed.

`Queue`, `Deque` are collections which store items in a specific order. `Deque` is a double-ended queue.

- **FIFO:** ```Queue<Integer> queue = new LinkedList<>();```
- **LIFO:** ```Queue<Integer> queue = Collections.asLifoQueue(new ArrayDeque<>());```

`Map` maps one set of values (keys) to another set of values. Keys must be unique, values may not be unique. 

Основные реализации:
- **HashMap** - Реализация на основе хэш-таблицы. Быстро - O(logN), порядок не определен.
- **LinkedHashMap** - Как HashMap, но гарантирует порядок элементов. Производительность между HashMap и TreeMap.
- **TreeMap** - Реализация на основе красно-чёрного дерева (время добавления/поиска/удаления элемента — O(logN)), порядок определен.
- **Hashtable** - Deprecated.

![](/resources/data/blog/java-collections-questions/collection-classes.png)

--------------------

## 2. `ArrayList` vs `LinkedList`.

`ArrayList` is built on top of an array. Elements are placed back to back, each element has his own index.
`ArrayList` automatically expands when it needs. You may manually allocate enough space for elements by using
`ensureCapacity(int minCapacity)` method. If there are a lot less elements than array's capacity 
then you may want to rebalance the array by using `trimToSize()` method.

`LinkedList` is built on top of a list. Each element has a reference to previous and next elements.
`ArrayList` consumes more memory to store the same amount of elements (because of stored references).

The key difference is in the complexity of operations you may want to perform on these data structures.

There're some recommendations:
- Use `ArrayList` if:
  - You frequently access elements in a random manner.
  - You add new elements mostly in the end of the array (inserting in the beginning causes O(N) time complexity).
  - Less size does matter for some particular cases.
- Use `LinkedList` if:
  - You add elements mostly in the beginning of the array (these operations).
  - You delete elements in case you already have references to them (to not to lose time traversing the list).

--------------------

## 3. `HashMap` vs `HashSet`.

**HashMap** имеет внутри себя **хэш-таблицу** - массив определённого размера, каждый элемент которого содержит **LinkedList** в которые располагаются значения **Map** после вычисления **HashCode** на основании ключа **Map** (смотри картинку во вложении).

Если для очередного ключа хэш-функция вернула индекс, по которому уже лежит объект, то новый объект добавится в конец списка (или заменит один из объектов в LinkedList, см. примечание в конце).

**!!!Важно, чтобы выполнялся контракт Equals и HashCode!!!** (смотри вложения)

Данные в **HashMap** хранятся без сортировки.

Если наш Map заполняется больше определенного коэффициента **loadFactor**, то происходит **перебалансировка Map**: увеличивается размер хэш-таблицы, объекты перераспределяются по ячейкам, коллизий становится меньше. При этом размер таблицы считается как **2^N**, т.е. увеличивается в 2 раза. Изначальное значение *N=4*, т.е. изначальный размер таблицы - 16 ячеек.

**hashCode** - используется хэш-функцией для поиска индекса в хэш-таблице, а **equals** - для сравнения объектов в *LinkedList*, лежащем по найденному индексу в хэш-таблице. Если *equals* вернуло *true* - *объект заменяется новым, иначе - объект добавляется в конец списка.

**HashSet** устроен аналогичным образом, только в качестве **ключа** используется само **значение**.

<details>
  <summary>HashMap internal structure image</summary>
  
  ![](/resources/data/blog/java-collections-questions/hashmap.png)
  
</details>

<details>
  <summary>HashSet internal structure image</summary>
  
  ![](/resources/data/blog/java-collections-questions/hashset.png)
  
</details>

--------------------

## 4. `List` vs `Set` vs `Map`.

- **List** - это упорядоченная коллекция данных, в которой каждый элемент имеет индекс, начинающийся с нуля. Может содержать одинаковые объекты.
- **Set** - это неупорядоченная коллекция данных, которая содержит уникальный набор данных. Не может содержать одинаковые объекты.
- **Map** - это неупорядоченная коллекция данных, которая содержит набор данных, за каждым закреплен уникальный ключ.

--------------------

## 5. `HashMap` vs `TreeMap`.

**Differences:**
- **HashMap** работает быстрее **TreeMap**.
- **TreeMap** построен на основе красно-черного дерева. Время добавления/поиска/удаления элемента в среднем *O(logN)*.
- **HashMap** построен на основе хэш-таблицы. Время доступа к отдельному элементу в среднем *O(1)*.

**Recommendations:**
- Если нужна упорядоченность, или нужно работать с вещественными числами – TreeMap. 
- Для всех остальных случаев – HashMap.

> Естественно, надо индивидуально рассматривать каждый сценарий отдельно, выявлять тонкости и нюансы, какие операции будут использоваться чаще и в каких сценариях.

--------------------

## 6. How to remove an element from a collection?

- Через **Collection.remove**, но нельзя это делать в цикле, т.к. иначе получим исключение **ConcurrentModificationException** (попытка модифицировать коллекцию, пока с ней происходит какая-то работа, например, чтение).
- Через итератор **Collection.iterator**, метод **Iterator.remove()**, можно использовать в процессе итерации.

--------------------

## 7. How to remove duplicates from a collection?

Use `Set`, don't use cycles (this is a common mistake):

```java
List<Integer> valuesWithDuplicates = List.of(1, 2, 2, 3, 3, 3);
Set<Integer> uniqueValues = new HashSet(valuesWithDuplicates);
```
