**Data Structures** are a way of organizing and managing data. Any data structure consists of:
- Pieces of data.
- Relations between them.
- Operations you might perform on them.

Every algorithm represents a solution for some problem. Most problems can have more that one solution.
We analyze these solutions using **time** and **space** complexity analysis. It shows how fast is our solution, or 
how much memory a solution takes.

To measure time and space complexities we use Big O Notation. It shows how much execution time and consumable memory 
are affected by the input data size. We consider mostly the worst cases of the input data. It's obvious already 
sorted array "sorts" in linear time `O(N)` by almost any sorting algorithm.
In analysis, we consider only meaningful values. It means that `O(2N)` = `O(N)`, because `2` is meaningless next to `N`. 
The same way `O(100)` = `O(1)` because it finishes in constant time. 
Also, the same way we do with `N` if we have `N^2` for instance. `O(2N^2 + 999N + 3)` = `O(N^2)`, 
because if `N` tends to infinity, then `N^2` is the only meaningful value.

## Arrays

The most fundamental data structures at all. There're two types of arrays: static and dynamic.
Static arrays allocate a fixed amount of memory blocks in a row. Dynamic arrays do the same thing, but they preallocate
a bit more memory blocks in sake of having faster insertion of new elements (especially at the end of an array).
Once you exhaust all the memory have need allocated, the dynamic array reallocates another memory block (with copying) 
with more memory than the current size (let's say, twice as larger).

Operations:
- **init**: TS = `O(N)` 
- **get**: T = `O(1)`
- **set**: T = `O(1)`
- **add**:
  - **Static arrays**: T = `O(N)`, S = `O(1)`
  - **Dynamic arrays**: T = `O(1)`, S = `O(1)`
- **remove**: T = `O(N)`
- **traverse**: T = `O(N)`, S = `O(1)`
- **copy**: TS = `O(N)`

## Lists

Consists of nodes, each node contains a value, a pointer to the next node (singly or just linked list), and it also may have
a pointer to the previous node (doubly linked list). Nodes could be stored not back-to-back in memory.

Operations:
- **init**: TS = `O(N)` 
- **get**: T = `O(i)`
- **set**: T = `O(i)`
- **add***: TS = `O(1)`
- **remove***: T = `O(1)`
- **traverse**: T = `O(N)`, S = `O(1)`
- **copy**: TS = `O(N)`

Where `i` – the index of an element.\
`*` - keep in mind you must traverse to the target element at first. 

--------------------

## Hash Tables

Hash Table is a key-value storage, where every key is mapped to a value.
Key might be anything that can be transformed to a numeric value by using hash functions.
For instance, we want to store three key-value pairs: "abc"->1, "cba"->2, "efg"->3.
There is an array (inner array lets say) with linked lists under the hood. How can we get an index for a key?
By using this formula: `index = hash(key) % innerArray.length`. Why do we need linked lists inside innerArray?
Because of collisions. If some keys' hashes collide, then they stored in a linked list in a row.
To determine which node in linkedList is our target – each node has a reference to a key.
In most cases everything is going well, and we have constant time operations in average. 
In the worst case we have an array with only one filled linkedList (other are empty), and
we have linked lists time complexities of operations. But in almost all cases we don't need to worry of it,
because hash-functions are smart nowadays, they prevent from getting collisions very well.
Another important thing to know is resizing of inner arrays in hash tables. Size of an inner array isn't constant.
It increases when we have many items in hash table (and facing multiple collisions) and reduces when we have only few 
items int it, but it has a big size. During resizing all the items are going to be recalculated by the formula above and 
placed to a new array bigger or smaller size.   

Operations:
- **init**: TS = `O(N)` 
- **get**: T = `O(1)`
- **set**: T = `O(1)`
- **add***: TS = `O(1)`
- **remove***: T = `O(1)`
- **traverse**: T = `O(N)`, S = `O(1)`
- **copy**: TS = `O(N)`

--------------------

## Stacks

Stack is LIFO (Last In Fist Out). Imagine a toy for babies where you have circles different sizes, 
and a base (like Tower of Hanoi).

Operations:
- **push(add)**: TS = `O(1)`
- **pop(remove)**: TS = `O(1)`

> Other operations' complexities are depend on which data structure is used under the hood. Typically, it's linked list.

--------------------

## Queues

Queue is FIFO (First In First Out).

Operations:
- **enqueue(add)**: TS = `O(1)`
- **dequeue(remove)**: TS = `O(1)`

> Other operations' complexities are depend on which data structure is used under the hood. Typically, it's linked list.

--------------------

## Strings

> Not a data structure, but it's better to have deep understanding how does it work under the hood.

Each character in a string mapped to an integer value. There're many encoding standards, but the most famous is ASCII.
For instance, in ASCII, "a" = 97 and "A" = 65.
Strings can be mutable (like in C and C++), or immutable (like in Java and many other languages).
If you're appending a character to immutable string with length N, in fact you're creating brand-new string 
of length N+1, copies the original string (which causes traversing with O(N) time complexity) and adds the character.

Operations:
- **traverse**: T = `O(N)`, S = `O(1)`

--------------------

## Graphs

Graph is a collection of nodes that may or may not be connected to other nodes.

Every node is a **vertex** of a graph. Every connection is an **edge** of a graph. 
So, graph consists of vertices and edges.

Graphs can be connected or disconnected. In a disconnected graph, you cannot reach some nodes from some other nodes.
Graphs can be directed or not directed. In a not directed graph you can meet some nodes 
where you can go from one to another node in one direction, but cannot go back.
Graphs can have cycles (cyclic graph) or can have no cycles in it (acyclic graph).

Summarizing the most important graphs concepts:
- Connectivity.
- Directions.
- Cycles.

Operations:
- **init**: TS = `O(V + E)`
- **traverse**: T = `O(V + E)`

Where `V` is a number of vertices, `E` is a number of edges.

--------------------

## Trees

Tree is a kind of graph. It has a root node. Each node may or may not have children nodes. 
Each node can have only one parent. Also, trees cannot have cycles and cannot be disconnected.

There are many types of trees, but the most popular is binary tree. Binary tree is a tree where each node 
can have at most two children.

Leaf node is a node that doesn't have children.
Branch is a path from the root node of a tree to one of its leaf nodes. Trees have levels, level means how
far a node from the root node. We say that if tree is complete if every single level is filled up 
(except the final level which may or may not be filled up). We say that tree is full if all nodes have no children 
or exact amount of children depends on tree type (binary, ternary, etc). We say that the tree is a perfect tree
if its all leaf nodes lay on the same level. 

Operations:
- **init**: TS = `O(N)`
- **traverse**: T = `O(N)`
