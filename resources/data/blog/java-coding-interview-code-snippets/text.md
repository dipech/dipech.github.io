## Strings

```
String string = "abcdef";
int length = string.length();
char ch = string.charAt(3);
Set<Character> chars = new HashSet<>();
chars.add(ch);
int charCode = (int) string.charAt(3);
char[] charArr = string.toCharArray();
```

## Arrays

```
int[] array = new int[10];
int length = array.length;
for (int value : array) { ... }
char[] chars = new char[]{ 'a', 'b', 'c' };
Arrays.sort(array);
int[] data = new int[10];
Arrays.fill(data, 0);
```

## Collections

### Common

```
int size = collection.size();
Collections.sort(collection);
```

### Set

```
Set<Integer> set = new HashSet<>();
set.add(1);
if (set.contains(1)) { ... }
```

### Map

```
Map<String, Integer> map = new HashMap<>();
map.put("a", 1);
int value = map.get("a");
if (map.containsKey("a")) { ... }
map.putIfAbsent("b", 2);
map.computeIfPresent("b", (key, value) -> value + 1);
map.computeIfAbsent("c", key -> 4);
```

### Queue

```
Queue<Integer> queue = new LinkedList<>();
queue.add(1);
int element = queue.element();
int elementRemoved = queue.remove();
```

```
Deque<Integer> deque = new LinkedList<>();
queue.addFirst(1);
int first = queue.getFirst();
int firstRemoved = queue.removeFirst();
queue.addLast(2);
int last = queue.getLast();
int lastRemoved = queue.removeLast();
int itemHasBeenRemoved = queue.remove();
```

### Stack

```
Stack<Integer> stack = new Stack<>();
stack.push(1);
int value = stack.peek();
int valueRemoved = stack.pop();
if (stack.empty()) { ... }
```
