**UPD:** I've finally done it! You can see my certificate at the portfolio page.

I've decided to improve my skills of solving algorithmic questions and writing code without an IDE.
I found many services like LeetCode, but decided to stick with algoexpert.io.
Here I publish my solutions for questions I faced there. Every solution I published is written 
before opening any tips, hints, ready solutions, etc.
My way of practicing looks like that:
- Pick a question.
- Read the prompt.
- Write one working solution.
- Write one or two other solutions with solving the task in different ways and trying to improve time and space complexities.
- Read hints, watch a video explanation, analyse their code.

--------------------

## [Easy] Nth Fibonacci

> Write a function that takes in an integer n and returns the nth Fibonacci number.

<details>
  <summary>Recursive solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(2^n) | O(n) |
  
```
import java.util.*;

class Program {
    public static int getNthFib(int n) {
        if (n == 1) {
            return 0;
        }
        if (n == 2) {
            return 1;
        }
        return getNthFib(n - 1) + getNthFib(n - 2);
    }
}
```

Time complexity is **O(2^n)**, because we need to calculate all the way down the call-tree:

Fib(N) = Fib(N - 1) + Fib(N - 2) = ( Fib(N - 2) + Fib(N - 3) ) + ( Fib(N - 3) + Fib(N - 4) ) = ... = 2^N operations

</details>

<details>
  <summary>Recursive solution with memoization</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(n) |
  
```
import java.util.*;

class Program {
    private static Map<Integer, Integer> memoize = new HashMap<>();
    public static int getNthFib(int n) {
        memoize.put(1, 0);
        memoize.put(2, 1);
        return doGetNthFib(n);
    }
    private static int doGetNthFib(int n) {
        if (!memoize.containsKey(n)) {
            memoize.put(n, doGetNthFib(n - 1) + doGetNthFib(n - 2));
        }
        return memoize.get(n);
    }
}
```
  
</details>

<details>
  <summary>Iterative solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(1) |
  
```
import java.util.*;

class Program {
    public static int getNthFib(int n) {
        int index = 1, prev2 = 0, prev = 1, current = 0;
        while (index < n) {
            prev2 = prev;
            prev = current;
            current = prev2 + prev;
            index++;
        }
        return current;
    }
}
```
  
</details>

--------------------

## [Easy] Sorted Squared Array

> Write a function that takes in a non-empty array of integers that are sorted in ascending order and 
> returns a new array of the same length with the squares of the original integers also sorted in ascending order.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(N) |

```
class Program {
    public int[] sortedSquaredArray(int[] array) {
        int[] result = new int[array.length];
        int resultIndex = array.length - 1;
        int pLeft = 0, pRight = array.length - 1;
        while (pLeft <= pRight) {
            if (pLeft == pRight) {
                result[0] = array[pLeft] * array[pLeft];
                break;
            }
            int left = array[pLeft] * array[pLeft];
            int right = array[pRight] * array[pRight];
            if (left > right) {
                result[resultIndex--] = left;
                pLeft++;
            } else {
                result[resultIndex--] = right;
                pRight--;
            }
        }
        return result;
    }
}
```

</details>

--------------------

## [Easy] Validate Subsequence

> Given two non-empty arrays of integers, write a function that determines whether the second array 
> is a subsequence of the first one.

<details>
  <summary>Queue-based solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(n) |

```
import java.util.*;

class Program {
    public static boolean isValidSubsequence(List<Integer> array, List<Integer> sequence) {
        Queue<Integer> queue = new LinkedList<>(sequence);
        for (int value : array) {
            if (queue.peek() == value) {
                queue.poll();
            }
            if (queue.size() == 0) {
                return true;
            }
        }
        return false;
    }
}
```

Note: It is possible to avoid using an additional collection (queue), but I wanted to avoid modifying an original list.
  
</details>

<details>
  <summary>Variable base solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(1) |

```
import java.util.*;

class Program {
    public static boolean isValidSubsequence(List<Integer> array, List<Integer> sequence) {
        int currSeqIndex = 0;
        for (int value : array) {
            if (sequence.get(currSeqIndex) == value) {
                currSeqIndex++;
            }
            if (currSeqIndex == sequence.size()) {
                return true;
            }
        }
        return false;
    }
}
```
  
</details>

--------------------

## [Easy] Two Number Sum

> Write a function that takes in a non-empty array of distinct integers, and an integer representing a target sum. 
> If any two numbers in the input array sum up to the target sum, the function should return them in an array, in any
> order. If no two numbers sum up to the target sum, the function should return an empty array.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(n) |

```
import java.util.*;

class Program {
    private static final Set<Integer> set = new HashSet<>();

    public static int[] twoNumberSum(int[] array, int targetSum) {
        set.clear();
        for (int number : array) {
            set.add(number);
        }
        for (int number1 : array) {
            int number2 = targetSum - number1;
            if (set.contains(number2) && number2 != number1) {
                return new int[]{number1, number2};
            }
        }
        return new int[0];
    }
}
```

</details>

--------------------

## [Easy] Find Closest Value in BST

> Write a function that takes in a Binary Search Tree (BST), and a target integer value and returns the closest value 
> to that target value contained in the BST.

<details>
  <summary>Solution</summary>

|                 | Time complexity | Space complexity |
| :-------------: | :-------------: | :--------------: |
|     Average     | O(log(n)) | O(1) |
|      Worst      | O(n) | O(1) |

```
class Program {
    public static int findClosestValueInBst(BST tree, int target) {
        BST curr = tree;
        int closest = curr.value;
        do {
            if (target < curr.value) {
                curr = curr.left;
            } else {
                curr = curr.right;
            }
            if (isCloser(curr, closest, target)) {
                closest = curr.value;
            }
        } while (curr != null);
        return closest;
    }

    private static boolean isCloser(BST node, int current, int target) {
        return node != null && Math.abs(target - node.value) < Math.abs(target - current);
    }

    static class BST {
        public int value;
        public BST left;
        public BST right;

        public BST(int value) {
            this.value = value;
        }
    }
}
```
  
</details>

--------------------

## [Easy] Branch Sums

> Write a function that takes in a Binary Tree and returns a list of its branch sums ordered from leftmost 
> branch sum to rightmost branch sum.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(n) |

Where `n` – binary tree's nodes count.

```
import java.util.*;

class Program {

    public static List<Integer> branchSums(BinaryTree root) {
        List<Integer> result = new ArrayList<>();
        Deque<BinaryTreeHolder> stack = new ArrayDeque<>();
        stack.addFirst(new BinaryTreeHolder(root, root.value));
        do {
            BinaryTreeHolder current = stack.removeFirst();
            BinaryTree right = current.node.right;
            BinaryTree left = current.node.left;
            boolean isFinal = right == null && left == null;
            if (isFinal) {
                result.add(current.sum);
            }
            if (right != null) {
                stack.addFirst(new BinaryTreeHolder(
                    right, current.sum + right.value
                ));
            }
            if (left != null) {
                stack.addFirst(new BinaryTreeHolder(
                    left, current.sum + left.value
                ));
            }
        } while (stack.size() > 0);
        return result;
    }

    public static class BinaryTreeHolder {
        public BinaryTree node;
        public int sum;

        BinaryTreeHolder(BinaryTree node, int sum) {
            this.node = node;
            this.sum = sum;
        }
    }

    public static class BinaryTree {
        int value;
        BinaryTree left;
        BinaryTree right;

        BinaryTree(int value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }

}
```
  
</details>

--------------------

## [Easy] Node Depths

> Write a function that takes in a Binary Tree and returns the sum of its nodes' depths.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(h) |

Where `n` – binary tree's nodes count, `h` – binary tree height.

```
class Program {
    private static int nodeDepths;

    public static int nodeDepths(BinaryTree root) {
        nodeDepths = 0;
        calcNodeDepths(root, 1);
        return nodeDepths;
    }

    private static void calcNodeDepths(BinaryTree node, int level) {
        if (node.left != null) {
            nodeDepths += level;
            calcNodeDepths(node.left, level + 1);
        }
        if (node.right != null) {
            nodeDepths += level;
            calcNodeDepths(node.right, level + 1);
        }
    }

    static class BinaryTree {
        int value;
        BinaryTree left;
        BinaryTree right;

        public BinaryTree(int value) {
            this.value = value;
            left = null;
            right = null;
        }
    }
}
```

</details>

--------------------

## [Easy] Depth-first Search

> Implement the `depthFirstSearch` method on the `Node` class, which takes in an empty array, traverses the tree
> using the Depth-first Search approach (specifically navigating the tree from left to right), stores all the 
> nodes' names in the input array, and returns it.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(v + e) | O(e) |

Where `v` – vertices count, `e` – edges count.

```
import java.util.*;

class Program {
    static class Node {
        String name;
        List<Node> children = new ArrayList<>();

        public Node(String name) {
            this.name = name;
        }

        public List<String> depthFirstSearch(List<String> array) {
            array.add(this.name);
            for (Node child : children) {
                child.depthFirstSearch(array);
            }
            return array;
        }

        public Node addChild(String name) {
            Node child = new Node(name);
            children.add(child);
            return this;
        }
    }
}
```

</details>

--------------------

## [Easy] Bubble Sort

> Write a function that takes in an array of integers and returns a sorted version of that array. 
> Use the Bubble Sort algorithm to sort the array.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n^2) | O(1) |

```
class Program {
    public static int[] bubbleSort(int[] array) {
        boolean isSorted;
        do {
            isSorted = true;
            for (int i = 0; i < array.length - 1; i++) {
                if (array[i] > array[i + 1]) {
                    int tmp = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = tmp;
                    isSorted = false;
                }
            }
        } while (!isSorted);
        return array;
    }
}
```

</details>

<details>
  <summary>More optimal solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n^2) | O(1) |

```
class Program {
    public static int[] bubbleSort(int[] array) {
        boolean isSorted;
        int sortedCount = 0;
        do {
            isSorted = true;
            for (int i = 0; i < array.length - 1 - sortedCount; i++) {
                if (array[i] > array[i + 1]) {
                    int tmp = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = tmp;
                    isSorted = false;
                }
            }
            sortedCount++;
        } while (!isSorted);
        return array;
    }
}
```

</details>

--------------------

## [Easy] Binary Search

> Write a function that takes in a sorted array of integers as well as a target integer. 
> The function should use the Binary Search algorithm to determine if the target integer is contained in the array 
> and should return its index if it is, otherwise -1.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(log(n)) | O(1) |

```
class Program {
    public static int binarySearch(int[] array, int target) {
        int leftIndex = 0, rightIndex = array.length - 1;
        do {
            int middleIndex = (leftIndex + rightIndex) / 2;
            int middle = array[middleIndex];
            if (target == middle) {
                return middleIndex;
            }
            if (target < middle) {
                rightIndex = middleIndex - 1;
            } else {
                leftIndex = middleIndex + 1;
            }
        } while (leftIndex <= rightIndex);
        return -1;
    }
}
```

</details>

--------------------

## [Easy] Product Sum

> Write a function that takes in a "special" array and returns its product sum. A "special" array is a non-empty array 
> that contains either integers or other "special" arrays. The product sum of a "special" array is the sum of 
> its elements, where "special" arrays inside it are summed themselves and then multiplied by their level of depth.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(a) |

Where `n` - total elements count (arrays, sub-arrays, sub-sub-... and its children included), `a` - total arrays count.

```
import java.util.*;

class Program {
    public static int productSum(List<Object> array) {
        return calcProductSum(array, 1);
    }

    private static int calcProductSum(List<Object> array, int level) {
        int result = 0;
        for (Object item : array) {
            if (isArray(item)) {
                result += level * calcProductSum((ArrayList) item, level + 1);
            } else {
                result += level * (int) item;
            }
        }
        return result;
    }

    private static boolean isArray(Object object) {
        return object instanceof ArrayList;
    }
}
```

</details>

--------------------

## [Easy] Find Three Largest Numbers

> Write a function that takes in an array of at least three integers and, without sorting the input array, returns 
> a sorted array of the three largest integers in the input array.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(1) |

```
import java.util.*;

class Program {
    private final static int MAX = 3;

    public static int[] findThreeLargestNumbers(int[] array) {
        List<Integer> largest = new ArrayList<>(MAX);
        for (int i = 0; i < MAX; i++) {
            largest.add(null);
        }
        for (int number : array) {
            addToLargestIfPossible(largest, number);
        }
        return new int[]{largest.get(0), largest.get(1), largest.get(2)};
    }

    private static void addToLargestIfPossible(List<Integer> largest, int number) {
        int index = MAX - 1;
        do {
            Integer current = largest.get(index);
            if (isGreaterOrEqual(number, current)) {
                shiftNumbersDown(largest, index);
                largest.set(index, number);
                return;
            }
            index--;
        } while (index >= 0);
    }

    private static boolean isGreaterOrEqual(int number, Integer current) {
        return current == null || number >= current;
    }

    private static void shiftNumbersDown(List<Integer> largest, int index) {
        for (int i = 1; i <= index; i++) {
            largest.set(i - 1, largest.get(i));
        }
        largest.set(index, null);
    }
}
```

</details>

--------------------

## [Easy] Insertion Sort

> Write a function that takes in an array of integers and returns a sorted version of that array. 
> Use the Insertion Sort algorithm to sort the array.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n^2) | O(1) |

```
class Program {
    public static int[] insertionSort(int[] array) {
        if (array.length < 2) {
            return array;
        }
        for (int i = 1; i < array.length; i++) {
            if (array[i - 1] < array[i]) {
                continue;
            }
            int index = i;
            do {
                swap(array, index, --index);
            } while (index > 0 && array[index - 1] > array[index]);
        }
        return array;
    }

    private static void swap(int[] array, int index1, int index2) {
        int tmp = array[index1];
        array[index1] = array[index2];
        array[index2] = tmp;
    }
}
```

</details>

--------------------

## [Easy] Selection Sort

> Write a function that takes in an array of integers and returns a sorted version of that array. 
> Use the Selection Sort algorithm to sort the array.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n^2) | O(1) |

```
class Program {
    public static int[] selectionSort(int[] array) {
        for (int i = 0; i < array.length; i++) {
            int smallest = array[i], smallestIndex = i;
            for (int j = i + 1; j < array.length; j++) {
                if (smallest > array[j]) {
                    smallest = array[j];
                    smallestIndex = j;
                }
            }
            if (smallestIndex != i) {
                swap(array, i, smallestIndex);
            }
        }
        return array;
    }

    private static void swap(int[] array, int index1, int index2) {
        int tmp = array[index1];
        array[index1] = array[index2];
        array[index2] = tmp;
    }
}
```

</details>

--------------------

## [Easy] Palindrome Check

> Write a function that takes in a non-empty string and that returns a boolean representing whether 
> the string is a palindrome.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(1) |

```
class Program {
    public static boolean isPalindrome(String str) {
        if (str.length() < 2) {
            return true;
        }
        for (int i = 0; i < str.length() / 2; i++) {
            if (str.charAt(i) != str.charAt(str.length() - 1 - i)) {
                return false;
            }
        }
        return true;
    }
}
```

</details>

--------------------

## [Easy] Caesar Cipher Encryptor

> Given a non-empty string of lowercase letters and a non-negative integer representing a key, write a function 
> that returns a new string obtained by shifting every letter in the input string by k positions in the alphabet, 
> where k is the key.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(n) |

```
import java.util.HashMap;
import java.util.Map;

class Program {
    private static Integer symbolsCount;
    private static Map<Character, Integer> symbolToIndex;
    private static Map<Integer, Character> indexToSymbol;

    public static String caesarCypherEncryptor(String str, int key) {
        init();
        if (key == 0 || shiftIndex(0, key) == 0) {
            return str;
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            int index = symbolToIndex.get(ch);
            int shiftedIndex = shiftIndex(index, key);
            char shiftedChar = indexToSymbol.get(shiftedIndex);
            sb.append(shiftedChar);
        }
        return sb.toString();
    }

    private static int shiftIndex(int index, int key) {
        int offset = calcOffset(key);
        return (index + offset) % symbolsCount;
    }

    private static int calcOffset(int key) {
        int offset = Math.abs(key) % symbolsCount;
        return key > 0 ? offset : symbolsCount - offset;
    }

    private static void init() {
        if (symbolsCount != null) {
            return;
        }
        symbolToIndex = new HashMap<>();
        indexToSymbol = new HashMap<>();
        char[] characters = new char[]{
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
            'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z'
        };
        symbolsCount = characters.length;
        for (int i = 0; i < symbolsCount; i++) {
            char ch = characters[i];
            symbolToIndex.put(ch, i);
            indexToSymbol.put(i, ch);
        }
    }
}
```

</details>

--------------------

## [Easy] Run-Length Encoding

> Write a function that takes in a non-empty string and returns its run-length encoding.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(1) |

```
class Program {
    public String runLengthEncoding(String string) {
        int accumulator = 0;
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < string.length(); i++) {
            boolean isLast = i == string.length() - 1;
            char current = string.charAt(i);
            accumulator++;
            boolean isEqualToNext = !isLast && current == string.charAt(i + 1);
            if (!isEqualToNext) {
                sb.append(encodeChar(current, accumulator));
                accumulator = 0;
            }
        }
        return sb.toString();
    }

    private static String encodeChar(char ch, int n) {
        StringBuilder sb = new StringBuilder();
        int nPrev;
        do {
            nPrev = n;
            if (n > 9) {
                sb.append(9);
                n -= 9;
            } else {
                sb.append(n);
            }
            sb.append(ch);
        } while (nPrev > 9);
        return sb.toString();
    }
}
```

</details>

--------------------

## [Easy] Minimum Waiting Time

> You're given a non-empty array of positive integers representing the amounts of time that specific queries take 
> to execute. Only one query can be executed at a time, but the queries can be executed in any order.
> Write a function that returns the minimum amount of total waiting time for all of the queries.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n * log(n)) | O(1) |

```
import java.util.Arrays;

class Program {

    public int minimumWaitingTime(int[] queries) {
        Arrays.sort(queries);
        int totalWaitingTime = 0, accumulator = 0;
        for (int i = 0; i < queries.length - 1; i++) {
            accumulator += queries[i];
            totalWaitingTime += accumulator;
        }
        return totalWaitingTime;
    }
    
}
```

</details>

--------------------

## [Easy] Remove Duplicates From Linked List

> You're given the head of a Singly Linked List whose nodes are in sorted order with respect to their values. 
> Write a function that returns a modified version of the Linked List that doesn't contain any nodes with duplicate values. 
> The Linked List should be modified in place (i.e., you shouldn't create a brand new list), and the modified
> Linked List should still have its nodes sorted with respect to their values.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(1) |

```
class Program {
    
    public static class LinkedList {
        public int value;
        public LinkedList next;

        public LinkedList(int value) {
            this.value = value;
            this.next = null;
        }
    }

    public LinkedList removeDuplicatesFromLinkedList(LinkedList linkedList) {
        LinkedList current = linkedList;
        do {
            LinkedList next = current.next;
            while (next != null && next.value == current.value) {
                next = next.next;
            }
            current.next = next;
            current = current.next;
        } while (current != null);
        return linkedList;
    }

}

```

</details>

--------------------

## [Easy] Generate Document

> You're given a string of available characters and a string representing a document that you need to generate. 
> Write a function that determines if you can generate the document using the available characters. 
> If you can generate the document, your function should return true; otherwise, it should return false.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(CH + DOC) | O(CH) |

Where CH is characters length and DOC is document length

```
import java.util.*;

class Program {
    public boolean generateDocument(String characters, String document) {
        Map<Character, Integer> chars = buildAvailableCharsMap(characters);
        for (int i = 0; i < document.length(); i++) {
            char ch = document.charAt(i);
            if (!chars.containsKey(ch)) {
                return false;
            }
            int available = chars.get(ch);
            if (available == 0) {
                return false;
            }
            chars.put(ch, available - 1);
        }
        return true;
    }

    private Map<Character, Integer> buildAvailableCharsMap(String characters) {
        Map<Character, Integer> chars = new HashMap<>();
        for (int i = 0; i < characters.length(); i++) {
            char ch = characters.charAt(i);
            chars.putIfAbsent(ch, 0);
            chars.computeIfPresent(ch, (key, val) -> val + 1);
        }
        return chars;
    }
}
```

</details>

--------------------

## [Easy] Tandem Bicycle

> A tandem bicycle is a bicycle that's operated by two people: person A and person B. Both people pedal the bicycle, 
> but the person that pedals faster dictates the speed of the bicycle. So if person A pedals at a speed of 5, and
> person B pedals at a speed of 4, the tandem bicycle moves at a speed of 5 (i.e., tandemSpeed = max(speedA, speedB)).
> You're given two lists of positive integers: one that contains the speeds of riders wearing red shirts and one
> that contains the speeds of riders wearing blue shirts. Each rider is represented by a single positive integer,
> which is the speed that they pedal a tandem bicycle at. Both lists have the same length, meaning that there are
> as many red-shirt riders as there are blue-shirt riders. Your goal is to pair every rider wearing a red shirt
> with a rider wearing a blue shirt to operate a tandem bicycle.
> Write a function that returns the maximum possible total speed or the minimum possible total speed of all of the
> tandem bicycles being ridden based on an input parameter, fastest. If fastest = true, your function should return
> the maximum possible total speed; otherwise it should return the minimum total speed.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N*log(N)) | O(1) |

```
import java.util.*;
import java.util.stream.*;

class Program {
    public int tandemBicycle(int[] redShirtSpeeds, int[] blueShirtSpeeds, boolean fastest) {
        // Let's assume we don't use extra memory here, because we got lists instead of arrays
        List<Integer> reds = Arrays.stream(redShirtSpeeds)
            .boxed()
            .sorted()
            .collect(Collectors.toList());
        List<Integer> blues = Arrays.stream(blueShirtSpeeds)
            .boxed()
            .collect(Collectors.toList());
        if (fastest) {
            Collections.sort(blues, Collections.reverseOrder());
        } else {
            Collections.sort(blues);
        }
        int result = 0;
        for (int i = 0; i < reds.size(); i++) {
            result += Math.max(reds.get(i), blues.get(i));
        }
        return result;
    }
}
```

</details>

--------------------

## [Easy] First Non-Repeating Character

> Write a function that takes in a string of lowercase English-alphabet letters and returns the index of the string's
> first non-repeating character.
> The first non-repeating character is the first character in a string that occurs only once.
> If the input string doesn't have any non-repeating characters, your function should return -1.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(1) |

> Space O(1) because we can't get a Map with more than 26 chars. 

```
import java.util.*;

class Program {
    public int firstNonRepeatingCharacter(String string) {
        Map<Character, Integer> hist = new HashMap<>();
        for (int i = 0; i < string.length(); i++) {
            char ch = string.charAt(i);
            hist.putIfAbsent(ch, 0);
            hist.computeIfPresent(ch, (key, val) -> val + 1);
        }
        for (int i = 0; i < string.length(); i++) {
            char ch = string.charAt(i);
            if (hist.get(ch) == 1) {
                return i;
            }
        }
        return -1;
    }
}

```

</details>

--------------------

## [Medium] River Sizes

> Write a function that returns an array of the sizes of all rivers represented in the input matrix.

<details>
  <summary>Recursive solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(w*h) | O(w*h) |

```
import java.util.*;

class Program {
    private static final Set<Integer> visited = new HashSet<>();
    private static int[][] matrix;
    private static int rowsCount;
    private static int colsCount;

    public static List<Integer> riverSizes(int[][] matrix) {
        visited.clear();
        Program.matrix = matrix;
        Program.rowsCount = matrix.length;
        Program.colsCount = matrix[0].length;
        return calcRiverSizes();
    }

    private static List<Integer> calcRiverSizes() {
        List<Integer> result = new ArrayList<>();
        for (int row = 0; row < rowsCount; row++) {
            for (int col = 0; col < colsCount; col++) {
                if (isRiver(row, col) && !isVisited(row, col)) {
                    result.add(calcRiverSizeAndMarkAsVisited(row, col));
                }
            }
        }
        return result;
    }

    private static int calcRiverSizeAndMarkAsVisited(int row, int col) {
        if (row < 0 || row >= rowsCount ||
            col < 0 || col >= colsCount ||
            !isRiver(row, col) ||
            isVisited(row, col)) {
            return 0;
        }
        markAsVisited(row, col);
        return 1
            + calcRiverSizeAndMarkAsVisited(row - 1, col)
            + calcRiverSizeAndMarkAsVisited(row + 1, col)
            + calcRiverSizeAndMarkAsVisited(row, col - 1)
            + calcRiverSizeAndMarkAsVisited(row, col + 1);
    }

    private static boolean isRiver(int row, int col) {
        return matrix[row][col] == 1;
    }

    private static boolean isVisited(int row, int col) {
        return visited.contains(calcOneDimIndex(row, col));
    }

    private static void markAsVisited(int row, int col) {
        visited.add(calcOneDimIndex(row, col));
    }

    private static int calcOneDimIndex(int row, int col) {
        return row * colsCount + col;
    }
}
```
  
</details>

<details>
  <summary>Iterative solution (queue-based)</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(w*h) | O(w*h) |

```
import java.util.*;

class Program {
    private static final Set<Integer> visited = new HashSet<>();
    private static int[][] matrix;
    private static int rowsCount;
    private static int colsCount;

    public static List<Integer> riverSizes(int[][] matrix) {
        visited.clear();
        Program.matrix = matrix;
        Program.rowsCount = matrix.length;
        Program.colsCount = matrix[0].length;
        return calcRiverSizes();
    }

    private static List<Integer> calcRiverSizes() {
        List<Integer> result = new ArrayList<>();
        for (int row = 0; row < rowsCount; row++) {
            for (int col = 0; col < colsCount; col++) {
                Coord coord = new Coord(row, col);
                if (isRiver(coord) && !isVisited(coord)) {
                    result.add(calcRiverSizeAndMarkAsVisited(coord));
                }
            }
        }
        return result;
    }

    private static int calcRiverSizeAndMarkAsVisited(Coord coord) {
        int counter = 0;
        Queue<Coord> queue = new LinkedList<>();
        queue.add(coord);
        do {
            Coord current = queue.remove();
            if (current.getRow() < 0 || current.getRow() >= rowsCount ||
                current.getCol() < 0 || current.getCol() >= colsCount ||
                !isRiver(current) ||
                isVisited(current)) {
                continue;
            }
            markAsVisited(current);
            counter++;
            queue.add(new Coord(current.getRow() - 1, current.getCol()));
            queue.add(new Coord(current.getRow() + 1, current.getCol()));
            queue.add(new Coord(current.getRow(), current.getCol() - 1));
            queue.add(new Coord(current.getRow(), current.getCol() + 1));
        } while (queue.size() > 0);
        return counter;
    }

    private static boolean isRiver(Coord coord) {
        return matrix[coord.getRow()][coord.getCol()] == 1;
    }

    private static boolean isVisited(Coord coord) {
        return visited.contains(calcOneDimIndex(coord));
    }

    private static void markAsVisited(Coord coord) {
        visited.add(calcOneDimIndex(coord));
    }

    private static int calcOneDimIndex(Coord coord) {
        return coord.getRow() * colsCount + coord.getCol();
    }

    private static class Coord {
        private final int row;
        private final int col;

        public Coord(int row, int col) {
            this.row = row;
            this.col = col;
        }

        public int getRow() {
            return row;
        }

        public int getCol() {
            return col;
        }
    }
}
```
  
</details>

--------------------

## [Medium] Spiral Traverse

> Write a function that takes in an n x m two-dimensional array (that can be square-shaped when n == m)
> and returns a one-dimensional array of all the array's elements in spiral order.

<details>
  <summary>Solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(w*h) | O(w*h) |

```
import java.util.*;

class Program {
    public static List<Integer> spiralTraverse(int[][] array) {
        List<Integer> result = new ArrayList<>();
        int rowCurrent = 0, colCurrent = 0;
        int rowMin = 0, colMin = 0, rowMax = array.length - 1, colMax = array[0].length - 1;
        do {
            // top left -> top right
            for (int col = colMin; col <= colMax; col++) {
                result.add(array[rowCurrent][col]);
            }
            rowMin++;
            colCurrent = colMax;
            if (isNeedToStop(rowMin, rowMax, colMin, colMax)) {
                break;
            }
            // top right -> bottom right
            for (int row = rowMin; row <= rowMax; row++) {
                result.add(array[row][colCurrent]);
            }
            colMax--;
            rowCurrent = rowMax;
            if (isNeedToStop(rowMin, rowMax, colMin, colMax)) {
                break;
            }
            // bottom right -> bottom left
            for (int col = colMax; col >= colMin; col--) {
                result.add(array[rowCurrent][col]);
            }
            rowMax--;
            colCurrent = colMin;
            if (isNeedToStop(rowMin, rowMax, colMin, colMax)) {
                break;
            }
            // bottom left -> top left
            for (int row = rowMax; row >= rowMin; row--) {
                result.add(array[row][colCurrent]);
            }
            colMin++;
            rowCurrent = rowMin;
            if (isNeedToStop(rowMin, rowMax, colMin, colMax)) {
                break;
            }
        } while (true);
        return result;
    }

    private static boolean isNeedToStop(int rowMin, int rowMax, int colMin, int colMax) {
        return rowMin > rowMax || colMin > colMax;
    }
}
```
  
</details>

--------------------

## [Medium] Move Element To End

> You're given an array of integers and an integer. Write a function that moves all instances of that integer 
> in the array to the end of the array and returns the array.

<details>
  <summary>Solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(1) |

```
import java.util.*;

class Program {
    public static List<Integer> moveElementToEnd(List<Integer> array, int toMove) {
        Integer minIndex = null, maxIndex = null;
        Boolean canBeSwapped = null;
        do {
            minIndex = targetNumberIndexFromLeft(array, toMove, minIndex);
            maxIndex = otherNumberIndexFromRight(array, toMove, maxIndex);
            canBeSwapped = minIndex != null && maxIndex != null && minIndex < maxIndex;
            if (canBeSwapped) {
                swap(array, minIndex, maxIndex);
                minIndex++;
                maxIndex--;
            }
        } while (canBeSwapped);
        return array;
    }

    private static Integer targetNumberIndexFromLeft(List<Integer> array, int target, Integer minIndex) {
        int min = minIndex != null ? minIndex : 0;
        for (int i = min; i < array.size(); i++) {
            if (array.get(i) == target) {
                return i;
            }
        }
        return null;
    }

    private static Integer otherNumberIndexFromRight(List<Integer> array, int target, Integer maxIndex) {
        int max = maxIndex != null ? maxIndex : array.size() - 1;
        for (int i = max; i >= 0; i--) {
            if (array.get(i) != target) {
                return i;
            }
        }
        return null;
    }

    private static void swap(List<Integer> array, int index1, int index2) {
        int tmp = array.get(index1);
        array.set(index1, array.get(index2));
        array.set(index2, tmp);
    }
}
```
  
</details>

--------------------

## [Medium] Invert Binary Tree

> Write a function that takes in a Binary Tree and inverts it. In other words, the function should swap every left 
> node in the tree for its corresponding right node.

<details>
  <summary>Solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(n) |

Where `n` - nodes count.

```
import java.util.*;

class Program {
    public static void invertBinaryTree(BinaryTree tree) {
        Queue<BinaryTree> queue = new LinkedList<>();
        queue.add(tree);
        do {
            BinaryTree node = queue.remove();
            swapLeftAndRight(node);
            if (node.left != null) {
                queue.add(node.left);
            }
            if (node.right != null) {
                queue.add(node.right);
            }
        } while (queue.size() > 0);
    }

    private static void swapLeftAndRight(BinaryTree node) {
        BinaryTree tmp = node.left;
        node.left = node.right;
        node.right = tmp;
    }

    static class BinaryTree {
        public int value;
        public BinaryTree left;
        public BinaryTree right;

        public BinaryTree(int value) {
            this.value = value;
        }
    }
}
```
  
</details>

--------------------

## [Medium] Breadth-first Search

> Implement the breadthFirstSearch method on the Node class, which takes in an empty array, traverses the tree
> using the Breadth-first Search approach (specifically navigating the tree from left to right), 
> stores all of the nodes' names in the input array, and returns it.

<details>
  <summary>Solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(n) |

Where `n` - nodes count.

```
import java.util.*;

class Program {
    static class Node {
        String name;
        List<Node> children = new ArrayList<>();

        public Node(String name) {
            this.name = name;
        }

        public List<String> breadthFirstSearch(List<String> array) {
            Queue<Node> queue = new LinkedList<>();
            queue.add(this);
            do {
                Node node = queue.remove();
                array.add(node.name);
                queue.addAll(node.children);
            } while (queue.size() > 0);
            return array;
        }

        public Node addChild(String name) {
            Node child = new Node(name);
            children.add(child);
            return this;
        }
    }
}
```
  
</details>

--------------------

## [Medium] Monotonic array

> Write a function that takes in an array of integers and returns a boolean representing whether the array is monotonic.
> An array is said to be monotonic if its elements, from left to right, are entirely non-increasing or entirely non-decreasing.
> Non-increasing elements aren't necessarily exclusively decreasing; they simply don't increase. 
> Similarly, non-decreasing elements aren't necessarily exclusively increasing; they simply don't decrease. 
> Note that empty arrays and arrays of one element are monotonic.

<details>
  <summary>Solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(1) |

```
import java.util.*;

class Program {
    public static boolean isMonotonic(int[] array) {
        if (array.length <= 1) {
            return true;
        }
        Boolean isIncrease = detectNumbersGrowDirection(array);
        if (isIncrease == null) {
            return true;
        }
        for (int i = 0; i < array.length - 1; i++) {
            int current = array[i];
            int next = array[i + 1];
            boolean badCase1 = isIncrease && current > next;
            boolean badCase2 = !isIncrease && current < next;
            if (badCase1 || badCase2) {
                return false;
            }
        }
        return true;
    }

    // true - numbers increase
    // false - numbers decrease
    // null - all numbers are the same value
    private static Boolean detectNumbersGrowDirection(int[] array) {
        int first = array[0];
        for (int i = 1; i < array.length; i++) {
            int next = array[i];
            if (next != first) {
                return next > first;
            }
        }
        return null;
    }
}
```

</details>

> Note: It is possible to solve this problem in one iteration over the array:
> 1) We can return an index (or null) of the first different element starting from index 1, then
>    determine if numbers decrease or increase, then iterate starting from that index till the end 
>    and check for monotonic.
> 2) We can use only one `for` loop.
>
> I left it as is, because it's more visually clean solution.

<details>
  <summary>Solution based on their solution (I was inspired by it, so elegant it was)</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(1) |

```
class Program {
    public static boolean isMonotonic(int[] array) {
        boolean isIncreasing = false;
        boolean isDecreasing = false;
        for (int i = 0; i < array.length - 1; i++) {
            if (array[i] < array[i + 1]) {
                isIncreasing = true;
            }
            if (array[i] > array[i + 1]) {
                isDecreasing = true;
            }
        }
        return !isIncreasing || !isDecreasing;
    }
}
```
  
</details>

--------------------

## [Medium] Validate BST

> Write a function that takes in a potentially invalid Binary Search Tree (BST) and returns a boolean representing 
> whether the BST is valid.

<details>
  <summary>Solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(n) |

Where `n` - nodes count.

```
import java.util.*;

class Program {
    public static boolean validateBst(BST tree) {
        return isValid(tree, null, null);
    }

    private static boolean isValid(BST current, BST leftParent, BST rightParent) {
        BST left = current.left;
        if (left != null) {
            boolean isValidForCurrent = left.value < current.value;
            boolean isValidForLeftParent = leftParent == null || left.value >= leftParent.value;
            if (!isValidForCurrent || !isValidForLeftParent || !isValid(left, leftParent, current)) {
                return false;
            }
        }
        BST right = current.right;
        if (right != null) {
            boolean isValidForCurrent = right.value >= current.value;
            boolean isValidForRightParent = rightParent == null || right.value < rightParent.value;
            if (!isValidForCurrent || !isValidForRightParent || !isValid(right, current, rightParent)) {
                return false;
            }
        }
        return true;
    }

    static class BST {
        public int value;
        public BST left;
        public BST right;

        public BST(int value) {
            this.value = value;
        }
    }
}
```
  
</details>

--------------------

## [Medium] The smallest Difference

> Write a function that takes in two non-empty arrays of integers, finds the pair of numbers (one from each array) 
> whose absolute difference is closest to zero, and returns an array containing these two numbers, with the number from
> the first array in the first position.

<details>
  <summary>Naive solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n*m) | O(1) |

```
class Program {
    public static int[] smallestDifference(int[] arrayOne, int[] arrayTwo) {
        if (arrayOne.length == 0 || arrayTwo.length == 0) {
            throw new RuntimeException("Invalid input");
        }
        Integer min = null, one = null, two = null;
        for (int i = 0; i < arrayOne.length; i++) {
            for (int j = 0; j < arrayTwo.length; j++) {
                int current = distance(arrayOne[i], arrayTwo[j]);
                if (min == null || current < min) {
                    min = current;
                    one = arrayOne[i];
                    two = arrayTwo[j];
                }
            }
        }
        return new int[]{one, two};
    }

    private static int distance(int a, int b) {
        return Math.abs(a - b);
    }
}
```
  
</details>

<details>
  <summary>More optimal solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n*log(n) + m*log(m)) | O(1) |

```
import java.util.*;

class Program {
    public static int[] smallestDifference(int[] arrayOne, int[] arrayTwo) {
        Arrays.sort(arrayOne);
        Arrays.sort(arrayTwo);
        int pointerOne = 0, pointerTwo = 0;
        Integer minDistance = null, resultValueOne = null, resultValueTwo = null;
        do {
            int valueOne = arrayOne[pointerOne];
            int valueTwo = arrayTwo[pointerTwo];
            int distance = distance(valueOne, valueTwo);
            if (minDistance == null || distance < minDistance) {
                minDistance = distance;
                resultValueOne = valueOne;
                resultValueTwo = valueTwo;
            }
            if (valueOne < valueTwo) {
                pointerOne++;
            } else {
                pointerTwo++;
            }
        } while (minDistance != 0 && pointerOne < arrayOne.length && pointerTwo < arrayTwo.length);
        return new int[]{resultValueOne, resultValueTwo};
    }

    private static int distance(int a, int b) {
        return Math.abs(a - b);
    }
}
```
  
</details>

--------------------

## [Medium] First duplicate value

> Given an array of integers between 1 and n, inclusive, where n is the length of the array, write a function 
> that returns the first integer that appears more than once (when the array is read from left to right).

<details>
  <summary>HashSet solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(n) |

```
import java.util.*;

class Program {

    public int firstDuplicateValue(int[] array) {
        Set<Integer> visited = new HashSet<>();
        for (int value : array) {
            if (visited.contains(value)) {
                return value;
            }
            visited.add(value);
        }
        return -1;
    }
    
}
```
  
</details>

<details>
  <summary>Optimal solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(1) |

```
import java.util.*;

class Program {

    public int firstDuplicateValue(int[] array) {
        for (int i = 0; i < array.length; i++) {
            int value = Math.abs(array[i]);
            int index = value - 1;
            if (array[index] < 0) {
                return value;
            }
            array[index] *= -1;
        }
        return -1;
    }
    
}
```
  
</details>

--------------------

## [Medium] Permutations

> Write a function that takes in an array of unique integers and returns an array of all permutations 
> of those integers in no particular order.

<details>
  <summary>My first solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n * n!) | O(n^2 * n!) |

```
import java.util.*;

class Program {

    public static List<List<Integer>> getPermutations(List<Integer> array) {
        if (array.size() == 0) {
            return new ArrayList<>();
        }
        if (array.size() == 1) {
            return Arrays.asList(Arrays.asList(array.get(0)));
        }
        return permutate(array);
    }

    private static List<List<Integer>> permutate(List<Integer> array) {
        List<List<Integer>> result = new ArrayList<>();
        if (array.size() == 2) {
            result.add(Arrays.asList(array.get(0), array.get(1)));
            result.add(Arrays.asList(array.get(1), array.get(0)));
        } else {
            for (int i = 0; i < array.size(); i++) {
                int value = array.get(i);
                List<Integer> exceptValue = getArrayExceptValue(array, i);
                for (List<Integer> permutated : permutate(exceptValue)) {
                    result.add(combineNumbers(value, permutated));
                }
            }
        }
        return result;
    }

    private static List<Integer> getArrayExceptValue(List<Integer> array, int index) {
        List<Integer> result = new ArrayList<>(array);
        result.remove(index);
        return result;
    }

    private static List<Integer> combineNumbers(int value, List<Integer> array) {
        List<Integer> result = new ArrayList<>();
        result.add(value);
        result.addAll(array);
        return result;
    }
    
}
```
  
</details>

<details>
  <summary>Optimal solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n * n!) | O(n * n!) |

```
import java.util.*;

class Program {
    
    public static List<List<Integer>> getPermutations(List<Integer> array) {
        if (array.size() == 0) {
            return new ArrayList<>();
        }
        if (array.size() == 1) {
            return Arrays.asList(Arrays.asList(array.get(0)));
        }
        List<List<Integer>> result = new ArrayList<>();
        permutate(0, array, result);
        return result;
    }

    private static void permutate(int index, List<Integer> array, List<List<Integer>> result) {
        if (index == array.size() - 1) {
            result.add(new ArrayList<>(array));
            return;
        }
        for (int i = index; i < array.size(); i++) {
            swap(array, i, index);
            permutate(index + 1, array, result);
            swap(array, i, index);
        }
    }

    private static void swap(List<Integer> array, int index1, int index2) {
        int tmp = array.get(index1);
        array.set(index1, array.get(index2));
        array.set(index2, tmp);
    }

}
```
  
</details>

--------------------

## [Medium] Three Number Sum

> Write a function that takes in a non-empty array of distinct integers and an integer representing a target sum.
> The function should find all triplets in the array that sum up to the target sum and return a two-dimensional
> array of all these triplets. The numbers in each triplet should be ordered in ascending order, and the triplets
> themselves should be ordered in ascending order with respect to the numbers they hold.
> If no three numbers sum up to the target sum, the function should return an empty array.

<details>
  <summary>My first solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N^4*log(N)) | O(N) |

```
import java.util.*;

class Program {

    public static List<Integer[]> threeNumberSum(int[] array, int targetSum) {
        Arrays.sort(array);
        List<Integer[]> result = new ArrayList<>();
        for (int i = 0; i < array.length; i++) {
            for (int j = 0; j < array.length; j++) {
                for (int k = 0; k < array.length; k++) {
                    if (i > j || j > k) {
                        continue;
                    }
                    if (array[i] == array[j] || array[j] == array[k]) {
                        continue;
                    }
                    if (array[i] + array[j] + array[k] == targetSum) {
                        result.add(new Integer[]{array[i], array[j], array[k]});
                    }
                }
            }
        }
        return result;
    }
}

```
  
</details>

<details>
  <summary>My second solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N^2*log(N)) | O(N) |

```
import java.util.*;

class Program {

    public static List<Integer[]> threeNumberSum(int[] array, int targetSum) {
        Arrays.sort(array);
        List<Integer[]> result = new ArrayList<>();
        for (int i = 0; i < array.length - 2; i++) {
            int pointer1 = i + 1, pointer2 = array.length - 1;
            do {
                int value1 = array[pointer1], value2 = array[pointer2];
                int sum = array[i] + value1 + value2;
                if (sum == targetSum) {
                    result.add(new Integer[]{array[i], value1, value2});
                    pointer1++;
                }
                if (sum < targetSum) {
                    pointer1++;
                } else {
                    pointer2--;
                }
            } while (pointer1 < pointer2);
        }
        return result;
    }
}

```
  
</details>

--------------------

## [Medium] Longest Peak

> Write a function that takes in an array of integers and returns the length of the longest peak in the array.
> A peak is defined as adjacent integers in the array that are strictly increasing until they reach a tip
> (the highest value in the peak), at which point they become strictly decreasing.
> At least three integers are required to form a peak.

<details>
  <summary>My first solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(1) |

```
class Program {

    public static int longestPeak(int[] array) {
        if (array.length < 3) {
            return 0;
        }
        int longest = 0;
        boolean isGoUp = true;
        Integer start = null, finish = null;
        int i = 0;
        do {
            boolean isLast = i == array.length - 1;
            boolean reset = false;
            if (start == null) {
                if (isLast || array[i] >= array[i + 1]) {
                    i++;
                    continue;
                }
                start = i;
                isGoUp = true;
            } else {
                if (isGoUp) {
                    if (isLast || array[i] == array[i + 1]) {
                        reset = true;
                    }
                    if (!isLast && array[i] > array[i + 1]) {
                        isGoUp = false;
                    }
                } else {
                    if (array[i - 1] > array[i]) {
                        finish = i;
                    }
                    if (!isLast && array[i] < array[i + 1]) {
                        reset = true;
                        i--;
                    }
                }
            }
            if (start != null && finish != null) {
                int current = finish - start + 1;
                longest = Math.max(longest, current);
            }
            if (reset) {
                isGoUp = true;
                start = finish = null;
            }
            i++;
        } while (i < array.length);
        return longest;
    }
}
```
  
</details>

<details>
  <summary>My second solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(1) |

```
class Program {

    public static int longestPeak(int[] array) {
        int longest = 0;
        for (int i = 1; i < array.length - 1; i++) {
            if (isPeakTop(array, i)) {
                longest = Math.max(longest, calcPeakLength(array, i));
            }
        }
        return longest;
    }

    private static boolean isPeakTop(int[] array, int index) {
        return array[index - 1] < array[index] && array[index] > array[index + 1];
    }

    private static int calcPeakLength(int[] array, int topIndex) {
        int start = topIndex - 1, finish = topIndex + 1;
        boolean canExpand = false;
        do {
            canExpand = false;
            if (start > 0 && array[start - 1] < array[start]) {
                start--;
                canExpand = true;
            }
            if (finish < array.length - 1 && array[finish] > array[finish + 1]) {
                finish++;
                canExpand = true;
            }
        } while (canExpand);
        return finish - start + 1;
    }
}

```
  
</details>

--------------------

## [Medium] Array Of Products

> Write a function that takes in a non-empty array of integers and returns an array of the same length,
> where each element in the output array is equal to the product of every other number in the input array.
> In other words, the value at output[i] is equal to the product of every number in the input array other than input[i].
> Note that you're expected to solve this problem without using division.

<details>
  <summary>Solution 1</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N^2) | O(N) |

```
class Program {

    public int[] arrayOfProducts(int[] array) {
        int[] result = new int[array.length];
        for (int i = 0; i < array.length; i++) {
            result[i] = 1;
            for (int j = 0; j < array.length; j++) {
                if (i != j) {
                    result[i] *= array[j];
                }
            }
        }
        return result;
    }
}
```
  
</details>

<details>
  <summary>Solution 2</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(N) |

```
class Program {

    public int[] arrayOfProducts(int[] array) {
        int[] result = new int[array.length];
        int total = 1, zeroesCount = 0;
        for (int i = 0; i < array.length; i++) {
            if (array[i] == 0) {
                zeroesCount++;
                continue;
            }
            total *= array[i];
        }
        for (int i = 0; i < array.length; i++) {
            int value = 0;
            if (zeroesCount == 0) {
                value = (int) (total * Math.pow(array[i], -1));
            } else if (zeroesCount == 1 && array[i] == 0) {
                value = total;
            }
            result[i] = value;
        }
        return result;
    }
}
```
  
</details>

<details>
  <summary>Solution 3</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(N) |

```
class Program {
    public int[] arrayOfProducts(int[] array) {
        int[] result = new int[array.length];
        int[] left = new int[array.length];
        int[] right = new int[array.length];
        fillLeftProducts(array, left);
        fillRightProducts(array, right);
        calcResult(result, left, right);
        return result;
    }

    private static void fillLeftProducts(int[] array, int[] left) {
        left[0] = 1;
        int sum = 1;
        for (int i = 0; i < array.length - 1; i++) {
            sum *= array[i];
            left[i + 1] = sum;
        }
    }

    private static void fillRightProducts(int[] array, int[] right) {
        right[array.length - 1] = 1;
        int sum = 1;
        for (int i = array.length - 1; i > 0; i--) {
            sum *= array[i];
            right[i - 1] = sum;
        }
    }

    private static void calcResult(int[] result, int[] left, int[] right) {
        for (int i = 0; i < result.length; i++) {
            result[i] = left[i] * right[i];
        }
    }
}
```
  
</details>

--------------------

## [Medium] BST Construction

> Write a BST class for a Binary Search Tree. The class should support:
> Inserting values with the insert method.
> Removing values with the remove method; this method should only remove the first instance of a given value.
> Searching for values with the contains method.

<details>
  <summary>Solution 1</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N*log(N)) | O(1) |

```
class Program {
    static class BST {
        public int value;
        public BST left;
        public BST right;

        public BST(int value) {
            this.value = value;
        }

        public BST insert(int value) {
            BST node = this;
            Boolean hasMore;
            do {
                hasMore = false;
                if (node.left != null && value < node.value) {
                    node = node.left;
                    hasMore = true;
                } else if (node.right != null && value >= node.value) {
                    node = node.right;
                    hasMore = true;
                }
            } while (hasMore);
            if (value < node.value) {
                node.left = new BST(value);
            } else {
                node.right = new BST(value);
            }
            return this;
        }

        public boolean contains(int value) {
            BST node = this;
            Boolean hasMore;
            do {
                if (value == node.value) {
                    return true;
                }
                hasMore = false;
                if (node.left != null && value < node.value) {
                    node = node.left;
                    hasMore = true;
                } else if (node.right != null && value > node.value) {
                    node = node.right;
                    hasMore = true;
                }
            } while (hasMore);
            return false;
        }

        public BST remove(int value) {
            BST node = this, parent = null;
            Boolean hasMore;
            do {
                if (value == node.value) {
                    doRemove(node, parent);
                }
                hasMore = false;
                parent = node;
                if (node.left != null && value < node.value) {
                    node = node.left;
                    hasMore = true;
                } else if (node.right != null && value > node.value) {
                    node = node.right;
                    hasMore = true;
                }
            } while (hasMore);
            return this;
        }

        private void doRemove(BST node, BST parent) {
            if (node.left == null && node.right == null) {
                if (parent != null) {
                    if (node.value < parent.value) {
                        parent.left = null;
                    } else {
                        parent.right = null;
                    }
                }
                return;
            }
            if (node.left != null && node.right == null) {
                node.value = node.left.value;
                node.left = node.left.left;
                return;
            }
            if (node.right != null && node.left == null) {
                node.value = node.right.value;
                node.right = node.right.right;
                return;
            }
            BST smallestParent = node;
            BST smallest = node.right;
            while (smallest.left != null) {
                smallestParent = smallest;
                smallest = smallest.left;
            }
            ;
            node.value = smallest.value;
            doRemove(smallest, smallestParent);
        }

    }
}
```
  
</details>

--------------------

## [Medium] BST Traversal

> Write three functions that take in a Binary Search Tree (BST) and an empty array, traverse the BST, 
> add its nodes' values to the input array, and return that array.
> The three functions should traverse the BST using the in-order, pre-order, and post-order
> tree-traversal techniques, respectively.
  
<details>
  <summary>Solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(N) |

```
import java.util.List;

class Program {
    public static List<Integer> inOrderTraverse(BST tree, List<Integer> array) {
        if (tree.left != null) {
            inOrderTraverse(tree.left, array);
        }
        array.add(tree.value);
        if (tree.right != null) {
            inOrderTraverse(tree.right, array);
        }
        return array;
    }

    public static List<Integer> preOrderTraverse(BST tree, List<Integer> array) {
        array.add(tree.value);
        if (tree.left != null) {
            preOrderTraverse(tree.left, array);
        }
        if (tree.right != null) {
            preOrderTraverse(tree.right, array);
        }
        return array;
    }

    public static List<Integer> postOrderTraverse(BST tree, List<Integer> array) {
        if (tree.left != null) {
            postOrderTraverse(tree.left, array);
        }
        if (tree.right != null) {
            postOrderTraverse(tree.right, array);
        }
        array.add(tree.value);
        return array;
    }

    static class BST {
        public int value;
        public BST left;
        public BST right;

        public BST(int value) {
            this.value = value;
        }
    }
}
```
  
</details>

--------------------

## [Medium] Min Height BST

> Write a function that takes in a non-empty sorted array of distinct integers, constructs a BST from the integers,
> and returns the root of the BST. The function should minimize the height of the BST.
  
<details>
  <summary>Solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(N) |

```
import java.util.List;

class Program {
    public static BST minHeightBst(List<Integer> array) {
        return build(array, 0, array.size() - 1);
    }

    private static BST build(List<Integer> array, int minIndex, int maxIndex) {
        if (minIndex == maxIndex) {
            return new BST(array.get(minIndex));
        }
        if (minIndex > maxIndex) {
            return null;
        }
        int middleIndex = (maxIndex + minIndex) / 2;
        BST node = new BST(array.get(middleIndex));
        node.left = build(array, minIndex, middleIndex - 1);
        node.right = build(array, middleIndex + 1, maxIndex);
        return node;
    }

    static class BST {
        public int value;
        public BST left;
        public BST right;

        public BST(int value) {
            this.value = value;
            left = null;
            right = null;
        }

        public void insert(int value) {
            if (value < this.value) {
                if (left == null) {
                    left = new BST(value);
                } else {
                    left.insert(value);
                }
            } else {
                if (right == null) {
                    right = new BST(value);
                } else {
                    right.insert(value);
                }
            }
        }
    }
}
```
  
</details>

--------------------

## [Medium] Binary Tree Diameter

> Write a function that takes in a Binary Tree and returns its diameter. The diameter of a binary tree is defined
> as the length of its longest path, even if that path doesn't pass through the root of the tree.
  
<details>
  <summary>Solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(h) |

Where `h` is the height of the tree.

```
import java.util.*;

class Program {
    // This is an input class. Do not edit.
    static class BinaryTree {
        public int value;
        public BinaryTree left = null;
        public BinaryTree right = null;

        public BinaryTree(int value) {
            this.value = value;
        }
    }

    public int binaryTreeDiameter(BinaryTree tree) {
        Queue<BinaryTree> queue = new LinkedList<>();
        queue.add(tree);
        boolean isRoot = true;
        int longest = 0;
        do {
            BinaryTree node = queue.remove();
            if ((node.left != null && node.right != null) || isRoot) {
                longest = Math.max(longest, calculateDiameter(node));
            }
            if (node.left != null) {
                queue.add(node.left);
            }
            if (node.right != null) {
                queue.add(node.right);
            }
            isRoot = false;
        } while (queue.size() > 0);
        return longest;
    }

    private int calculateDiameter(BinaryTree node) {
        int lengthLeft = node.left != null ? calcLongestPath(1, node.left) : 0;
        int lengthRight = node.right != null ? calcLongestPath(1, node.right) : 0;
        return lengthLeft + lengthRight;
    }

    private int calcLongestPath(int level, BinaryTree node) {
        int leftLevel = level;
        if (node.left != null) {
            leftLevel = calcLongestPath(level + 1, node.left);
        }
        int rightLevel = level;
        if (node.right != null) {
            rightLevel = calcLongestPath(level + 1, node.right);
        }
        return Math.max(leftLevel, rightLevel);
    }

}
```
  
</details>

--------------------

## [Medium] Find Successor

> Write a function that takes in a Binary Tree (where nodes have an additional pointer to their parent node)
> as well as a node contained in that tree and returns the given node's successor.
> A node's successor is the next node to be visited (immediately after the given node) when traversing its tree using
> the in-order tree-traversal technique. A node has no successor if it's the last node to be visited
> in the in-order traversal.
  
<details>
  <summary>Solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(N) |

```
class Program {
    // This is an input class. Do not edit.
    static class BinaryTree {
        public int value;
        public BinaryTree left = null;
        public BinaryTree right = null;
        public BinaryTree parent = null;

        public BinaryTree(int value) {
            this.value = value;
        }
    }

    private Boolean isSuccessorNext;
    private BinaryTree successor;

    public BinaryTree findSuccessor(BinaryTree tree, BinaryTree node) {
        isSuccessorNext = false;
        successor = null;
        doFindSuccessor(tree, node);
        return successor;
    }

    private void doFindSuccessor(BinaryTree node, BinaryTree target) {
        if (node == null) {
            return;
        }
        doFindSuccessor(node.left, target);
        if (isSuccessorNext) {
            successor = node;
            isSuccessorNext = false;
        } else if (node.equals(target)) {
            isSuccessorNext = true;
        }
        doFindSuccessor(node.right, target);
    }
}
```
  
</details>

--------------------

## [Medium] Max Subset Sum No Adjacent

> Write a function that takes in an array of positive integers and returns the maximum sum of non-adjacent elements
> in the array.
  
<details>
  <summary>Solution 1</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N*log(N)) | O(N) |

```
import java.util.*;

class Program {

    private static class Holder implements Comparable<Holder> {
        public int value;
        public int index;

        public Holder(int value, int index) {
            this.value = value;
            this.index = index;
        }

        public int compareTo(Holder holder) {
            return this.value - holder.value;
        }
    }

    public static int maxSubsetSumNoAdjacent(int[] array) {
        if (array.length == 0) {
            return 0;
        }
        if (array.length == 1) {
            return array[0];
        }
        if (array.length == 2) {
            return Math.max(array[0], array[1]);
        }
        List<Holder> holders = new ArrayList<>();
        for (int i = 0; i < array.length; i++) {
            holders.add(new Holder(array[i], i));
        }
        Collections.sort(holders, Collections.reverseOrder());
        return Math.max(
            calcTotalByStartingIndex(holders, 0),
            calcTotalByStartingIndex(holders, 1)
        );
    }

    private static int calcTotalByStartingIndex(List<Holder> holders, int minIndex) {
        int total = 0;
        Set<Integer> picked = new HashSet<>();
        for (int i = minIndex; i < holders.size(); i++) {
            Holder holder = holders.get(i);
            if (picked.contains(holder.index - 1) || picked.contains(holder.index + 1)) {
                continue;
            }
            picked.add(holder.index);
            total += holder.value;
        }
        return total;
    }
}
```
  
</details>
  
<details>
  <summary>Solution 2</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(1) |

```
class Program {

    public static int maxSubsetSumNoAdjacent(int[] array) {
        if (array.length == 0) {
            return 0;
        }
        if (array.length == 1) {
            return array[0];
        }
        if (array.length == 2) {
            return Math.max(array[0], array[1]);
        }
        return calculate(array);
    }

    private static int calculate(int[] array) {
        int result = 0;
        int sum1 = array[0], sum2 = Math.max(array[0], array[1]);
        for (int i = 2; i < array.length; i++) {
            int value = array[i];
            result = Math.max(value + sum1, sum2);
            sum1 = sum2;
            sum2 = result;
        }
        return result;
    }
}
```
  
</details>

--------------------

## [Medium] Single Cycle Check

> You're given an array of integers where each integer represents a jump of its value in the array. 
> For instance, the integer 2 represents a jump of two indices forward in the array; the integer -3 represents
> a jump of three indices backward in the array.
> If a jump spills past the array's bounds, it wraps over to the other side.
> For instance, a jump of -1 at index 0 brings us to the last index in the array. Similarly, a jump of 1 at
> the last index in the array brings us to index 0.
> Write a function that returns a boolean representing whether the jumps in the array form a single cycle.
> A single cycle occurs if, starting at any index in the array and following the jumps, every element in the array
> is visited exactly once before landing back on the starting index.

<details>
  <summary>Solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(1) |

```
class Program {

    public static boolean hasSingleCycle(int[] array) {
        int index = 0, counter = 0;
        while (counter < array.length) {
            if (counter > 0 && index == 0) {
                return false;
            }
            counter++;
            index = calcNextIndex(index, array);
        }
        return index == 0;
    }

    private static int calcNextIndex(int currentIndex, int[] array) {
        int jump = array[currentIndex];
        int newIndex = currentIndex + jump;
        int size = array.length;
        int shift = Math.abs(newIndex) % size;
        if (shift == 0) {
            return 0;
        }
        return newIndex >= 0 ? shift : size - shift;
    }

}
```
  
</details>

--------------------

## [Medium] Remove Islands

> You're given a two-dimensional array (a matrix) of potentially unequal height and width containing only 0s and 1s.
> The matrix represents a two-toned image, where each 1 represents black and each 0 represents white.
> An island is defined as any number of 1s that are horizontally or vertically adjacent (but not diagonally adjacent)
> and that don't touch the border of the image. In other words, a group of horizontally or vertically adjacent
> 1s isn't an island if any of those 1s are in the first row, last row, first column, or last column of the input matrix.
> Note that an island can twist. In other words, it doesn't have to be a straight vertical line or a straight
> horizontal line; it can be L-shaped, for example.
> You can think of islands as patches of black that don't touch the border of the two-toned image.
> Write a function that returns a modified version of the input matrix, where all of the islands are removed.
> You remove an island by replacing it with 0s.

<details>
  <summary>Solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(wh) | O(wh) |

```
class Program {

    public int[][] removeIslands(int[][] matrix) {
        replaceNonIslandsWithNumber(matrix, 1, 2);
        removeIsland(matrix);
        replaceNonIslandsWithNumber(matrix, 2, 1);
        return matrix;
    }

    private static void replaceNonIslandsWithNumber(int[][] matrix, int search, int replace) {
        int rowsCount = matrix.length;
        int colsCount = matrix[0].length;
        for (int row = 0; row < rowsCount; row++) {
            replaceAdjacentNumbers(matrix, row, 0, search, replace);
            replaceAdjacentNumbers(matrix, row, colsCount - 1, search, replace);
        }
        for (int col = 0; col < colsCount; col++) {
            replaceAdjacentNumbers(matrix, 0, col, search, replace);
            replaceAdjacentNumbers(matrix, rowsCount - 1, col, search, replace);
        }
    }

    private static void replaceAdjacentNumbers(int[][] matrix, int row, int col, int search, int replace) {
        if (!isInBounds(matrix, row, col) || matrix[row][col] != search) {
            return;
        }
        matrix[row][col] = replace;
        replaceAdjacentNumbers(matrix, row - 1, col, search, replace);
        replaceAdjacentNumbers(matrix, row + 1, col, search, replace);
        replaceAdjacentNumbers(matrix, row, col - 1, search, replace);
        replaceAdjacentNumbers(matrix, row, col + 1, search, replace);
    }

    private static boolean isInBounds(int[][] matrix, int row, int col) {
        return row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length;
    }

    private static void removeIsland(int[][] matrix) {
        for (int row = 1; row < matrix.length - 1; row++) {
            for (int col = 1; col < matrix[0].length - 1; col++) {
                if (matrix[row][col] == 1) {
                    matrix[row][col] = 0;
                }
            }
        }
    }

}
```
  
</details>

--------------------

## [Medium] Cycle In Graph

> You're given a list of edges representing an unweighted, directed graph with at least one node.
> Write a function that returns a boolean representing whether the given graph contains a cycle.

<details>
  <summary>Solution 1</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N^2) | O(N^2) |

```
import java.util.*;

class Program {

    public boolean cycleInGraph(int[][] edges) {
        for (int node = 0; node < edges.length; node++) {
            Set<Integer> visited = new HashSet<>();
            if (hasCycle(edges, node, visited)) {
                return true;
            }
        }
        return false;
    }

    private boolean hasCycle(int[][] edges, int node, Set<Integer> visited) {
        if (visited.contains(node)) {
            return true;
        }
        visited.add(node);
        for (int ref : edges[node]) {
            if (hasCycle(edges, ref, new HashSet<>(visited))) {
                return true;
            }
        }
        return false;
    }

}
```
  
</details>

<details>
  <summary>Solution 2</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(v + e) | O(v) |

```
import java.util.*;

class Program {

    private final static int WHITE = 0;
    private final static int GRAY = 1;
    private final static int BLACK = 2;

    public boolean cycleInGraph(int[][] edges) {
        int[] statuses = new int[edges.length];
        Arrays.fill(statuses, WHITE);
        for (int node = 0; node < edges.length; node++) {
            if (statuses[node] != WHITE) {
                continue;
            }
            if (hasCycle(edges, statuses, node)) {
                return true;
            }
        }
        return false;
    }

    private boolean hasCycle(int[][] edges, int[] statuses, int node) {
        if (statuses[node] == GRAY) {
            return true;
        }
        statuses[node] = GRAY;
        for (int ref : edges[node]) {
            if (hasCycle(edges, statuses, ref)) {
                return true;
            }
        }
        statuses[node] = BLACK;
        return false;
    }

}
```
  
</details>

--------------------

## [Medium] Remove Kth Node From End

> Write a function that takes in the head of a Singly Linked List and an integer k and removes the kth node from
> the end of the list.
> The removal should be done in place, meaning that the original data structure should be mutated
> (no new structure should be created).

<details>
  <summary>Solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(1) |

```
class Program {

    public static void removeKthNodeFromEnd(LinkedList head, int k) {
        int size = 0;
        LinkedList current = head;
        while (current != null) {
            size++;
            current = current.next;
        }
        int indexToRemove = size - k;
        if (indexToRemove == 0) {
            head.value = head.next.value;
            head.next = head.next.next;
            return;
        }
        LinkedList prev = head;
        for (int i = 0; i < indexToRemove - 1; i++) {
            prev = prev.next;
        }
        prev.next = prev.next.next;
    }

    static class LinkedList {
        int value;
        LinkedList next = null;

        public LinkedList(int value) {
            this.value = value;
        }
    }
}
```
  
</details>

--------------------

## [Medium] Min Max Stack Construction

> Write a MinMaxStack class for a Min Max Stack. The class should support:
> 1) Pushing and popping values on and off the stack.
> 2) Peeking at the value at the top of the stack.
> 3) Getting both the minimum and the maximum values in the stack at any given point in time.
> All class methods, when considered independently, should run in constant time and with constant space.

<details>
  <summary>Solution (not optimal for `pop` case)</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(1) |

```
class Program {

    private static class LinkedList {
        public int value;
        public LinkedList next = null;

        public LinkedList(int value) {
            this.value = value;
        }
    }

    static class MinMaxStack {

        private LinkedList head = null;
        private Integer min = null;
        private Integer max = null;

        public int peek() {
            ensureHasData();
            return head.value;
        }

        public int pop() {
            ensureHasData();
            int value = head.value;
            head = head.next;
            if (head == null) {
                min = max = null;
            } else {
                LinkedList current = head;
                min = max = current.value;
                do {
                    min = Math.min(min, current.value);
                    max = Math.max(max, current.value);
                    current = current.next;
                } while (current != null);
            }
            return value;
        }

        public void push(Integer number) {
            if (head == null) {
                head = new LinkedList(number);
            } else {
                LinkedList old = head;
                head = new LinkedList(number);
                head.next = old;
            }
            if (min == null || min > number) {
                min = number;
            }
            if (max == null || max < number) {
                max = number;
            }
        }

        public int getMin() {
            ensureHasData();
            return min;
        }

        public int getMax() {
            ensureHasData();
            return max;
        }

        private void ensureHasData() {
            if (head == null) {
                throw new RuntimeException("No data exists");
            }
        }
    }
}
```
  
</details>

<details>
  <summary>Optimal solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(1) | O(1) |

```
class Program {

    private static class LinkedList {
        public LinkedList next = null;
        public int value;
        public int min;
        public int max;

        public LinkedList(int value, int min, int max) {
            this.value = value;
            this.min = min;
            this.max = max;
        }
    }

    static class MinMaxStack {

        private LinkedList head = null;

        public int peek() {
            ensureHasData();
            return head.value;
        }

        public int pop() {
            ensureHasData();
            int value = head.value;
            head = head.next;
            return value;
        }

        public void push(Integer number) {
            if (head == null) {
                head = new LinkedList(number, number, number);
                return;
            }
            LinkedList old = head;
            int newMin = Math.min(number, old.min);
            int newMax = Math.max(number, old.max);
            head = new LinkedList(number, newMin, newMax);
            head.next = old;
        }

        public int getMin() {
            ensureHasData();
            return head.min;
        }

        public int getMax() {
            ensureHasData();
            return head.max;
        }

        private void ensureHasData() {
            if (head == null) {
                throw new RuntimeException("No data exists");
            }
        }
    }
}
```
  
</details>

--------------------

## [Medium] Balanced Brackets

> Write a function that takes in a string made up of brackets ((, [, {, ), ], and }) and other optional characters. 
> The function should return a boolean representing whether the string is balanced with regards to brackets.
 

<details>
  <summary>Solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(N) |

```
import java.util.*;

class Program {

    private static final List<Character> openingBrackets = Arrays.asList(
        '(', '[', '{'
    );

    private static final List<Character> closingBrackets = Arrays.asList(
        ')', ']', '}'
    );

    public static boolean balancedBrackets(String str) {
        Stack<Character> stack = new Stack<>();
        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            if (!isBracket(ch)) {
                continue;
            }
            if (isOpeningBracket(ch)) {
                stack.push(ch);
                continue;
            }
            if (stack.size() == 0) {
                return false;
            }
            char openingBracket = stack.pop();
            char closingBracket = getClosingBracket(openingBracket);
            if (ch != closingBracket) {
                return false;
            }
        }
        return stack.size() == 0;
    }

    private static boolean isBracket(char ch) {
        return isOpeningBracket(ch) || isClosingBracket(ch);
    }

    private static boolean isOpeningBracket(char ch) {
        return openingBrackets.stream().anyMatch(c -> c == ch);
    }

    private static boolean isClosingBracket(char ch) {
        return closingBrackets.stream().anyMatch(c -> c == ch);
    }

    private static char getClosingBracket(char ch) {
        for (int i = 0; i < openingBrackets.size(); i++) {
            if (openingBrackets.get(i) == ch) {
                return closingBrackets.get(i);
            }
        }
        throw new RuntimeException("Could not find closing bracket");
    }
}
```
  
</details>

--------------------

## [Medium] Longest Palindromic Substring

> Write a function that, given a string, returns its longest palindromic substring.
> A palindrome is defined as a string that's written the same forward and backward. 
> Note that single-character strings are palindromes.
> You can assume that there will only be one longest palindromic substring.

<details>
  <summary>Solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(N) |

```
class Program {

    public static String longestPalindromicSubstring(String str) {
        if (str.length() == 1) {
            return str;
        }
        String longest = "";
        for (int i = 0; i < str.length() - 1; i++) {
            if (str.charAt(i) == str.charAt(i + 1)) {
                String palindrom = expandPalindrom(str, i, i + 1);
                if (longest.length() < palindrom.length()) {
                    longest = palindrom;
                }
            }
            if (i > 0 && str.charAt(i - 1) == str.charAt(i + 1)) {
                String palindrom = expandPalindrom(str, i);
                if (longest.length() < palindrom.length()) {
                    longest = palindrom;
                }
            }
        }
        return longest;
    }

    // For instance: "yyyabcbaxxx", c - center
    private static String expandPalindrom(String str, int center) {
        return expandPalindrom(str, center - 1, center + 1);
    }

    // For instance: "yyyabccbaxxx", cc - left and right
    private static String expandPalindrom(String str, int left, int right) {
        while (
            left > 0 && right < str.length() - 1 &&
                str.charAt(left - 1) == str.charAt(right + 1)
        ) {
            left--;
            right++;
        }
        return str.substring(left, right + 1);
    }
}
```
  
</details>

--------------------

## [Medium] Group Anagrams

> Write a function that takes in an array of strings and groups anagrams together.
> Anagrams are strings made up of exactly the same letters, where order doesn't matter. 
> For example, "cinema" and "iceman" are anagrams; similarly, "foo" and "ofo" are anagrams.
> Your function should return a list of anagram groups in no particular order.

<details>
  <summary>Solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(W*L) | O(W*L) |

Where `W` is the words count, `L` is the length of the longest word.

```
import java.util.*;

class Program {

    public static List<List<String>> groupAnagrams(List<String> words) {
        Map<Integer, List<String>> result = new HashMap<>();
        words.forEach(word -> {
            int weight = calcWeight(word);
            result.putIfAbsent(weight, new ArrayList<>());
            result.get(weight).add(word);
        });
        return new ArrayList<>(result.values());
    }

    // It wouldn't work for super large words (because of integer overflow).
    // But it works for all the test cases, so it's fine.
    private static int calcWeight(String word) {
        int result = 1;
        for (int i = 0; i < word.length(); i++) {
            result *= (int) word.charAt(i);
        }
        return result;
    }

}
```
  
</details>

--------------------

## [Medium] Tournament Winner

> There's an algorithms tournament taking place in which teams of programmers compete against each other to solve
> algorithmic problems as fast as possible. Teams compete in a round robin, where each team faces off against
> all other teams. Only two teams compete against each other at a time, and for each competition, one team
> is designated the home team, while the other team is the away team. In each competition there's always one
> winner and one loser; there are no ties. A team receives 3 points if it wins and 0 points if it loses.
> The winner of the tournament is the team that receives the most amount of points.
> Given an array of pairs representing the teams that have competed against each other and an array containing
> the results of each competition, write a function that returns the winner of the tournament. The input arrays
> are named competitions and results, respectively. The competitions array has elements in the
> form of [homeTeam, awayTeam], where each team is a string of at most 30 characters representing the name of the team.
> The results array contains information about the winner of each corresponding competition in the competitions array.
> Specifically, results[i] denotes the winner of competitions[i], where a 1 in the results array means that the home
> team in the corresponding competition won and a 0 means that the away team won.
> It's guaranteed that exactly one team will win the tournament and that each team will compete against all other
> teams exactly once. It's also guaranteed that the tournament will always have at least two teams.

<details>
  <summary>Solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(C) | O(T) |

Where `T` - number of teams, `C` - number of competitions.

```
import java.util.*;

class Program {

    private static final int WIN_POINTS = 3;

    public String tournamentWinner(ArrayList<ArrayList<String>> competitions, ArrayList<Integer> results) {
        Map<String, Integer> scores = new HashMap<>();
        for (int i = 0; i < results.size(); i++) {
            int winnerIndex = 1 - results.get(i);
            String winner = competitions.get(i).get(winnerIndex);
            scores.putIfAbsent(winner, 0);
            scores.put(winner, scores.get(winner) + WIN_POINTS);
        }
        Integer highestScore = null;
        String winner = null;
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            if (highestScore == null || highestScore < entry.getValue()) {
                highestScore = entry.getValue();
                winner = entry.getKey();
            }
        }
        return winner;
    }
}
```
  
</details>

--------------------

## [Medium] Non-Constructible Change

> Given an array of positive integers representing the values of coins in your possession, write a function that
> returns the minimum amount of change (the minimum sum of money) that you cannot create. The given coins can have
> any positive integer value and aren't necessarily unique (i.e., you can have multiple coins of the same value).
> For example, if you're given coins = [1, 2, 5], the minimum amount of change that you can't create is 4.
> If you're given no coins, the minimum amount of change that you can't create is 1.

<details>
  <summary>Solution 1</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N^2*log(N)) | O(1) |

```
import java.util.*;

class Program {

    public int nonConstructibleChange(int[] coins) {
        if (coins.length == 0) {
            return 1;
        }
        int sum = 0;
        for (int i = 0; i < coins.length; i++) {
            sum += coins[i];
        }
        Arrays.sort(coins);
        for (int number = 1; number < sum; number++) {
            if (!isConstructible(number, coins)) {
                return number;
            }
        }
        return sum + 1;
    }

    // coins must be sorted
    private boolean isConstructible(int number, int[] coins) {
        for (int i = coins.length - 1; i > -1; i--) {
            int coin = coins[i];
            if (number < coin) {
                // This algorithm can be improved by applying binary search
                // for searching the starting coin
                continue;
            }
            number -= coin;
            if (number == 0) {
                return true;
            }
        }
        return false;
    }
}
```

</details>

<details>
  <summary>Solution 2</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N*log(N)) | O(1) |

```
import java.util.*;

class Program {

    public int nonConstructibleChange(int[] coins) {
        Arrays.sort(coins);
        int sum = 0;
        for (int coin : coins) {
            if (sum + 1 < coin) {
                return sum + 1;
            }
            sum += coin;
        }
        return sum + 1;
    }
}
```

</details>

--------------------

## [Medium] Class Photos

> It's photo day at the local school, and you're the photographer assigned to take class photos.
> The class that you'll be photographing has an even number of students, and all these students are wearing red
> or blue shirts. In fact, exactly half of the class is wearing red shirts, and the other half is wearing blue shirts.
> You're responsible for arranging the students in two rows before taking the photo. Each row should contain the
> same number of the students and should adhere to the following guidelines:
> All students wearing red shirts must be in the same row.
> All students wearing blue shirts must be in the same row.
> Each student in the back row must be strictly taller than the student directly in front of them in the front row.
> You're given two input arrays: one containing the heights of all the students with red shirts and another
> one containing the heights of all the students with blue shirts. These arrays will always have the same length,
> and each height will be a positive integer. Write a function that returns whether or not a class photo that follows
> the stated guidelines can be taken.
> Note: you can assume that each class has at least 2 students.

<details>
  <summary>Solution 1</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N*log(N)) | O(1) |

```
import java.util.*;

class Program {

    public boolean classPhotos(ArrayList<Integer> redShirtHeights, ArrayList<Integer> blueShirtHeights) {
        int size = redShirtHeights.size();
        int redMin = redShirtHeights.get(0);
        int blueMin = blueShirtHeights.get(0);
        for (int i = 1; i < size; i++) {
            redMin = Math.min(redMin, redShirtHeights.get(i));
            blueMin = Math.min(blueMin, blueShirtHeights.get(i));
        }
        if (redMin == blueMin) {
            return false;
        }
        ArrayList<Integer> taller = redMin > blueMin ? redShirtHeights : blueShirtHeights;
        ArrayList<Integer> shorter = redMin < blueMin ? redShirtHeights : blueShirtHeights;
        for (int t = 0; t < size; t++) {
            int tVal = taller.get(t);
            // Candidate is the tallest between shorter that smaller than tVal
            Integer sCandidate = null;
            for (int s = 0; s < size; s++) {
                int sVal = shorter.get(s);
                if (sVal == 0 || sVal >= tVal) {
                    continue;
                }
                if (sCandidate == null || shorter.get(sCandidate) < sVal) {
                    sCandidate = s;
                }
            }
            if (sCandidate == null) {
                return false;
            }
            shorter.set(sCandidate, 0);
        }
        return true;
    }
}
```

</details>

<details>
  <summary>Solution 2</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N*log(N)) | O(1) |

```
import java.util.*;

class Program {

    public boolean classPhotos(ArrayList<Integer> redShirtHeights,
                               ArrayList<Integer> blueShirtHeights) {
        Collections.sort(redShirtHeights);
        Collections.sort(blueShirtHeights);
        int redMin = redShirtHeights.get(0);
        int blueMin = blueShirtHeights.get(0);
        if (redMin == blueMin) {
            return false;
        }
        ArrayList<Integer> taller = redMin > blueMin ? redShirtHeights : blueShirtHeights;
        ArrayList<Integer> shorter = redMin < blueMin ? redShirtHeights : blueShirtHeights;
        int size = redShirtHeights.size();
        for (int i = 1; i < size; i++) {
            int t = taller.get(i);
            int s = shorter.get(i);
            if (t < s) {
                return false;
            }
        }
        return true;
    }
}
```

</details>

--------------------

## [Medium] Valid IP Addresses

> You're given a string of length 12 or smaller, containing only digits. Write a function that returns all the
> possible IP addresses that can be created by inserting three .s in the string.
> An IP address is a sequence of four positive integers that are separated by .s, where each individual integer
> is within the range 0 - 255, inclusive.
> An IP address isn't valid if any of the individual integers contains leading 0s. For example, "192.168.0.1" is a
> valid IP address, but "192.168.00.1" and "192.168.0.01" aren't, because they contain "00" and 01, respectively.
> Another example of a valid IP address is "99.1.1.10"; conversely, "991.1.1.0" isn't valid, because "991" is greater
> than 255. Your function should return the IP addresses in string format and in no particular order.
> If no valid IP addresses can be created from the string, your function should return an empty list.

<details>
  <summary>Solution</summary>
  
| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(1) | O(1) |

```
import java.util.*;

class Program {

    public ArrayList<String> validIPAddresses(String input) {
        if (!isInputValid(input)) {
            return new ArrayList<String>();
        }
        ArrayList<String> result = new ArrayList<String>();
        fill(result, input);
        return result;
    }

    private boolean isInputValid(String input) {
        return input.length() >= 4 && input.length() <= 12;
    }

    private void fill(List<String> result, String input) {
        int max = input.length();
        for (int p1 = 0; p1 < max - 3; p1++) {
            for (int p2 = 1; p2 < max - 2; p2++) {
                for (int p3 = 2; p3 < max - 1; p3++) {
                    if (p1 < p2 && p2 < p3) {
                        try {
                            result.add(makeIpAddress(input, p1, p2, p3));
                        } catch (RuntimeException e) {
                            System.out.println(e.getMessage());
                        }
                    }
                }
            }
        }
    }

    private String makeIpAddress(String input, int p1, int p2, int p3) {
        String seg1 = input.substring(0, p1 + 1);
        String seg2 = input.substring(p1 + 1, p2 + 1);
        String seg3 = input.substring(p2 + 1, p3 + 1);
        String seg4 = input.substring(p3 + 1);
        validateSegment(seg1);
        validateSegment(seg2);
        validateSegment(seg3);
        validateSegment(seg4);
        return seg1 + "." + seg2 + "." + seg3 + "." + seg4;
    }

    private void validateSegment(String segment) {
        if (segment.startsWith("0") && segment.length() > 1) {
            throw new RuntimeException("Wrong number");
        }
        int number = Integer.parseInt(segment);
        if (number > 255) {
            throw new RuntimeException("Large number");
        }
    }

}
```
  
</details>

--------------------

## [Medium] Number Of Ways To Make Change

> Given an array of distinct positive integers representing coin denominations and a single non-negative 
> integer n representing a target amount of money, write a function that returns the number of ways to make 
> change for that target amount using the given coin denominations.
> Note that an unlimited amount of coins is at your disposal.

<details>
  <summary>Solution 1</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N*C)) | O(N) |

```
import java.util.*;

class Program {
    public static int numberOfWaysToMakeChange(int n, int[] coins) {
        Arrays.sort(coins);
        int[] ways = new int[n + 1];
        Arrays.fill(ways, 0);
        ways[0] = 1;
        for (int coin : coins) {
            for (int number = 1; number <= n; number++) {
                if (number >= coin) {
                    ways[number] += ways[number - coin];
                }
            }
        }
        return ways[n];
    }
}
```

</details>

--------------------

## [Medium] Min Number Of Coins For Change

> Given an array of positive integers representing coin denominations and a single non-negative integer n 
> representing a target amount of money, write a function that returns the smallest number of coins needed to make 
> change for (to sum up to) that target amount using the given coin denominations.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N*D) | O(N) |

```
import java.util.*;

class Program {
    public static int minNumberOfCoinsForChange(int n, int[] denoms) {
        Arrays.sort(denoms);
        if (n == 0) {
            return 0;
        }
        if (n < denoms[0]) {
            return -1;
        }
        int[] minNumbers = new int[n + 1];
        Arrays.fill(minNumbers, 0);
        for (int denom : denoms) {
            for (int number = denom; number <= n; number++) {
                int currentMinNumber = minNumbers[number];
                int minNumberForNumber = minNumbers[number - denom];
                if (minNumberForNumber > 0 || number - denom == 0) {
                    minNumberForNumber++;
                }
                int resultMinNumber = 0;
                if (currentMinNumber > 0 && minNumberForNumber > 0) {
                    resultMinNumber = Math.min(currentMinNumber, minNumberForNumber);
                } else if (currentMinNumber > 0) {
                    resultMinNumber = currentMinNumber;
                } else if (minNumberForNumber > 0) {
                    resultMinNumber = minNumberForNumber;
                }
                minNumbers[number] = resultMinNumber;
            }
        }
        return minNumbers[n] > 0 ? minNumbers[n] : -1;
    }
}
```

</details>

--------------------

## [Medium] Youngest Common Ancestor

> You're given three inputs, all of which are instances of an AncestralTree class that have an ancestor property 
> pointing to their youngest ancestor. The first input is the top ancestor in an ancestral tree (i.e., the only 
> instance that has no ancestor--its ancestor property points to None / null), and the other two inputs are 
> descendants in the ancestral tree.
> Write a function that returns the youngest common ancestor to the two descendants.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(H) | O(H) |

Where H is the height of the tree.

```
import java.util.*;

class Program {

    private static Set<AncestralTree> ancestors = new HashSet<>();

    public static AncestralTree getYoungestCommonAncestor(
        AncestralTree topAncestor,
        AncestralTree descendantOne,
        AncestralTree descendantTwo
    ) {
        ancestors.clear();
        fillAncestors(descendantOne);
        return findYoungestCommonAncestor(descendantTwo);
    }

    private static void fillAncestors(AncestralTree node) {
        AncestralTree current = node;
        while (current != null) {
            ancestors.add(current);
            current = current.ancestor;
        }
    }

    private static AncestralTree findYoungestCommonAncestor(AncestralTree node) {
        if (ancestors.contains(node)) {
            return node;
        }
        AncestralTree current = node;
        while (!ancestors.contains(current)) {
            current = current.ancestor;
        }
        return current;
    }

    static class AncestralTree {
        public char name;
        public AncestralTree ancestor;

        AncestralTree(char name) {
            this.name = name;
            this.ancestor = null;
        }

        // This method is for testing only.
        void addAsAncestor(AncestralTree[] descendants) {
            for (AncestralTree descendant : descendants) {
                descendant.ancestor = this;
            }
        }
    }
}
```

</details>

--------------------

## [Medium] Min Heap Construction

> Implement a MinHeap class that supports:
> Building a Min Heap from an input array of integers.
> Inserting integers in the heap.
> Removing the heap's minimum / root value.
> Peeking at the heap's minimum / root value.
> Sifting integers up and down the heap, which is to be used when inserting and removing values.
> Note that the heap should be represented in the form of an array.

<details>
  <summary>Solution</summary>

```
import java.util.*;

class Program {

    // Note for readers:
    // This class is dumb, but the template of it was given to me by AlgoExpert.
    // I see no reason to pass "array" into "buildHeap" method as well as
    // I see no reason to pass "endIndex" and "heap" into siftDown method, etc.
    // But modifying this class leads us to fail compilation.

    static class MinHeap {
        List<Integer> heap = new ArrayList<Integer>();

        public MinHeap(List<Integer> array) {
            heap = buildHeap(array);
        }

        public List<Integer> buildHeap(List<Integer> array) {
            heap = array;
            doBuildHeap();
            return array;
        }

        // Space: O( 1 )
        // Time: O( N )

        private void doBuildHeap() {
            for (int index = heap.size() - 1; index > 0; index -= 2) {
                siftDown(getParentIndex(index), heap.size() - 1, heap);
            }
        }

        // Space: O( 1 )
        // Time: O( log(N) )

        public void siftDown(int currentIndex, int endIndex, List<Integer> heap) {
            int size = heap.size();
            int current = heap.get(currentIndex);
            int leftChildIndex = getLeftChildIndex(currentIndex);
            int rightChildIndex = getRightChildIndex(currentIndex);
            if (!hasIndex(leftChildIndex) && !hasIndex(rightChildIndex)) {
                return;
            }
            int leftChild = heap.get(leftChildIndex);
            if (!hasIndex(rightChildIndex)) {
                if (current > leftChild) {
                    swap(currentIndex, leftChildIndex);
                    siftDown(leftChildIndex, heap.size() - 1, heap);
                }
                return;
            }
            int rightChild = heap.get(rightChildIndex);
            if (current <= leftChild && current <= rightChild) {
                return;
            }
            if (leftChild < rightChild) {
                swap(leftChildIndex, currentIndex);
                siftDown(leftChildIndex, heap.size() - 1, heap);
                return;
            }
            swap(rightChildIndex, currentIndex);
            siftDown(rightChildIndex, heap.size() - 1, heap);
        }

        // Space: O( 1 )
        // Time: O( log(N) )

        public void siftUp(int currentIndex, List<Integer> heap) {
            if (currentIndex == 0) {
                return;
            }
            int parentIndex = getParentIndex(currentIndex);
            if (heap.get(parentIndex) <= heap.get(currentIndex)) {
                return;
            }
            swap(parentIndex, currentIndex);
            siftUp(parentIndex, heap);
        }

        // Space: O( 1 )
        // Time: O( 1 )

        public int peek() {
            return heap.get(0);
        }

        // Space: O( 1 )
        // Time: O( log(N) )

        public int remove() {
            swap(0, heap.size() - 1);
            int value = heap.remove(heap.size() - 1);
            siftDown(0, heap.size() - 1, heap);
            return value;
        }

        // Space: O( 1 )
        // Time: O( log(N) )

        public void insert(int value) {
            heap.add(value);
            siftUp(heap.size() - 1, heap);
        }

        private int getParentIndex(int index) {
            return (int) Math.floor((index - 1) / 2.0);
        }

        private int getLeftChildIndex(int index) {
            return 2 * index + 1;
        }

        private int getRightChildIndex(int index) {
            return getLeftChildIndex(index) + 1;
        }

        private void swap(int index1, int index2) {
            int tmp = heap.get(index1);
            heap.set(index1, heap.get(index2));
            heap.set(index2, tmp);
        }

        public boolean hasIndex(int index) {
            return index > -1 && index < heap.size();
        }

    }
}
```

</details>

--------------------

## [Medium] Linked List Construction

> Write a DoublyLinkedList class that has a head and a tail, both of which point to either a linked list 
> Node or None / null. The class should support:
> Setting the head and tail of the linked list.
> Inserting nodes before and after other nodes as well as at given positions (the position of the head node is 1).
> Removing given nodes and removing nodes with given values.
> Searching for nodes with given values.

<details>
  <summary>Solution</summary>

```
class Program {
    static class DoublyLinkedList {
        public Node head;
        public Node tail;

        // Space: O( 1 )
        // Time: O( 1 )

        public void setHead(Node node) {
            if (!isStandalone(node)) {
                remove(node);
            }
            node.next = head;
            if (head != null) {
                head.prev = node;
            }
            head = node;
            if (tail == null) {
                tail = head;
            }
        }

        // Space: O( 1 )
        // Time: O( 1 )

        public void setTail(Node node) {
            if (!isStandalone(node)) {
                remove(node);
            }
            node.prev = tail;
            if (tail != null) {
                tail.next = node;
            }
            tail = node;
            if (head == null) {
                head = tail;
            }
        }

        // Space: O( 1 )
        // Time: O( 1 )

        public void insertBefore(Node node, Node nodeToInsert) {
            if (!isStandalone(nodeToInsert)) {
                remove(nodeToInsert);
            }
            Node prev = node.prev;
            node.prev = nodeToInsert;
            nodeToInsert.next = node;
            nodeToInsert.prev = prev;
            if (prev != null) {
                prev.next = nodeToInsert;
            } else {
                head = nodeToInsert;
            }
        }

        // Space: O( 1 )
        // Time: O( 1 )

        public void insertAfter(Node node, Node nodeToInsert) {
            if (!isStandalone(nodeToInsert)) {
                remove(nodeToInsert);
            }
            Node next = node.next;
            node.next = nodeToInsert;
            nodeToInsert.prev = node;
            nodeToInsert.next = next;
            if (next != null) {
                next.prev = nodeToInsert;
            } else {
                tail = nodeToInsert;
            }
        }

        // Space: O( 1 )
        // Time: O( N )

        public void insertAtPosition(int position, Node nodeToInsert) {
            if (!isStandalone(nodeToInsert)) {
                remove(nodeToInsert);
                position = Math.max(1, position - 1);
            }
            if (head == null) {
                head = tail = nodeToInsert;
                return;
            }
            int counter = 1;
            Node current = head;
            while (current != null) {
                if (counter == position) {
                    insertBefore(current, nodeToInsert);
                    return;
                }
                current = current.next;
                counter++;
            }
            insertAfter(tail, nodeToInsert);
        }

        // Space: O( 1 )
        // Time: O( N )

        public void removeNodesWithValue(int value) {
            Node current = head;
            while (current != null) {
                if (current.value == value) {
                    Node tmp = current.next;
                    remove(current);
                    current = tmp;
                    continue;
                }
                current = current.next;
            }
        }

        // Space: O( 1 )
        // Time: O( 1 )

        public void remove(Node node) {
            Node prev = node.prev;
            Node next = node.next;
            if (prev != null) {
                prev.next = next;
            } else {
                head = next;
            }
            if (next != null) {
                next.prev = prev;
            } else {
                tail = prev;
            }
            node.next = node.prev = null;
        }

        // Space: O( 1 )
        // Time: O( N )

        public boolean containsNodeWithValue(int value) {
            Node current = head;
            while (current != null) {
                if (current.value == value) {
                    return true;
                }
                current = current.next;
            }
            return false;
        }

        private boolean isStandalone(Node node) {
            return node.prev == null && node.next == null;
        }

    }

    static class Node {
        public int value;
        public Node prev;
        public Node next;

        public Node(int value) {
            this.value = value;
        }
    }
}
```

</details>

--------------------

## [Medium] Sum of Linked Lists

> You're given two Linked Lists of potentially unequal length. Each Linked List represents a non-negative integer, 
> where each node in the Linked List is a digit of that integer, and the first node in each Linked List always 
> represents the least significant digit of the integer. Write a function that returns the head of a new Linked List 
> that represents the sum of the integers represented by the two input Linked Lists.
> Note: your function must create and return a new Linked List, and you're not allowed to modify either of the input 
> Linked Lists.

<details>
  <summary>Solution 1</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(MAX(LENGTH(LL1),LENGTH(LL2))) | O(MAX(LENGTH(LL1),LENGTH(LL2))) |

```
class Program {
    // This is an input class. Do not edit.
    public static class LinkedList {
        public int value;
        public LinkedList next;

        public LinkedList(int value) {
            this.value = value;
            this.next = null;
        }
    }

    public LinkedList sumOfLinkedLists(LinkedList linkedListOne, LinkedList linkedListTwo) {
        LinkedList a = linkedListOne;
        LinkedList b = linkedListTwo;
        LinkedList result = null, current = null;
        boolean isOverflow = false;
        while (a != null || b != null) {
            int sum = 0;
            if (a != null) {
                sum += a.value;
                a = a.next;
            }
            if (b != null) {
                sum += b.value;
                b = b.next;
            }
            if (isOverflow) {
                sum++;
                isOverflow = false;
            }
            if (sum > 9) {
                isOverflow = true;
                sum -= 10;
            }
            if (result == null) {
                result = new LinkedList(sum);
                current = result;
                continue;
            }
            current.next = new LinkedList(sum);
            current = current.next;
        }
        if (isOverflow) {
            current.next = new LinkedList(1);
        }
        return result;
    }
}
```

</details>

--------------------

## [Medium] Powerset

> Write a function that takes in an array of unique integers and returns its powerset. 
> The powerset P(X) of a set X is the set of all subsets of X. 
> For example, the powerset of [1,2] is [[], [1], [2], [1,2]]. 
> Note that the sets in the powerset do not need to be in any particular order.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N * 2^N) | O(N * 2^N) |

```
import java.util.*;

class Program {
    public static List<List<Integer>> powerset(List<Integer> array) {
        List<List<Integer>> result = new ArrayList<>();
        result.add(new ArrayList<>());
        for (int number : array) {
            List<List<Integer>> accum = new ArrayList<>();
            for (List<Integer> set : result) {
                List<Integer> newSet = new ArrayList<>(set);
                newSet.add(number);
                accum.add(newSet);
            }
            result.addAll(accum);
        }
        return result;
    }
}
```

</details>

--------------------

## [Medium] Staircase Traversal

> You're given two positive integers representing the height of a staircase and the maximum number of steps that you 
> can advance up the staircase at a time. Write a function that returns the number of ways in which you can 
> climb the staircase.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(H*MS) | O(H) |

```
import java.util.*;

class Program {
    private final Map<Integer, Integer> memo = new HashMap<>();

    public int staircaseTraversal(int height, int maxSteps) {
        memo.clear();
        return calc(height, maxSteps);
    }

    private int calc(int height, int maxSteps) {
        if (height <= 0) {
            return 0;
        }
        if (memo.containsKey(height)) {
            return memo.get(height);
        }
        if (height <= maxSteps) {
            int result = (int) Math.pow(2, height - 1);
            memo.put(height, result);
            return result;
        }
        int result = 0;
        for (int i = 1; i <= maxSteps; i++) {
            result += calc(height - i, maxSteps);
        }
        memo.put(height, result);
        return result;
    }
}
```

</details>

--------------------

## [Medium] Three Number Sort

> You're given an array of integers and another array of three distinct integers. The first array is guaranteed to only 
> contain integers that are in the second array, and the second array represents a desired order for the integers in the 
> first array. For example, a second array of [x, y, z] represents a desired order of [x, x, ..., x, y, y, ..., y, z, z, ..., z] in the first array.

Write a function that sorts the first array according to the desired order in the second array.

<details>
  <summary>Solution 1</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(1) |

```
class Program {

    public int[] threeNumberSort(int[] array, int[] order) {
        moveNumbersToHead(array, order[0]);
        moveNumbersToTail(array, order[2]);
        return array;
    }

    private void moveNumbersToHead(int[] array, int number) {
        int pointer = 0;
        while (pointer < array.length - 1) {
            if (array[pointer] == number) {
                pointer++;
                continue;
            }
            Integer targetPointer = null;
            for (int i = pointer + 1; i < array.length; i++) {
                if (array[i] == number) {
                    targetPointer = i;
                    break;
                }
            }
            if (targetPointer == null) {
                return;
            }
            swap(array, pointer, targetPointer);
            pointer++;
        }
    }

    private void moveNumbersToTail(int[] array, int number) {
        int pointer = array.length - 1;
        while (pointer > 0) {
            if (array[pointer] == number) {
                pointer--;
                continue;
            }
            Integer targetPointer = null;
            for (int i = pointer - 1; i >= 0; i--) {
                if (array[i] == number) {
                    targetPointer = i;
                    break;
                }
            }
            if (targetPointer == null) {
                return;
            }
            swap(array, pointer, targetPointer);
            pointer--;
        }
    }

    private void swap(int[] array, int i1, int i2) {
        int tmp = array[i1];
        array[i1] = array[i2];
        array[i2] = tmp;
    }

}
```

</details>

--------------------

## [Medium] Reverse Words In String

> Write a function that takes in a string of words separated by one or more whitespaces and returns a string that has 
> these words in reverse order. For example, given the string "tim is great", 
> your function should return "great is tim".

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(N) |

```
class Program {
    public String reverseWordsInString(String string) {
        if (string.length() == 0) {
            return string;
        }
        char[] input = string.toCharArray();
        char[] output = new char[string.length()];
        reverseWords(input, output);
        return String.valueOf(output);
    }

    private void reverseWords(char[] input, char[] output) {
        int inputPointer = 0;
        while (inputPointer < input.length) {
            int wordLength = calcLength(input, inputPointer);
            int outputPointer = input.length - inputPointer - wordLength;
            System.arraycopy(input, inputPointer, output, outputPointer, wordLength);
            inputPointer += wordLength;
        }
    }

    private int calcLength(char[] input, int start) {
        boolean isWhitespace = isWhitespace(input, start);
        int finish = start;
        while (finish + 1 < input.length && isSameKind(input, start, finish + 1)) {
            finish++;
        }
        return finish - start + 1;
    }

    private boolean isSameKind(char[] input, int index1, int index2) {
        boolean isWs1 = isWhitespace(input, index1);
        boolean isWs2 = isWhitespace(input, index2);
        return (isWs1 && isWs2) || (!isWs1 && !isWs2);
    }

    private boolean isWhitespace(char[] input, int index) {
        return input[index] == ' ';
    }
}
```

</details>

--------------------

## [Medium] Merge Overlapping Intervals

> Write a function that takes in a non-empty array of arbitrary intervals, merges any overlapping intervals, 
> and returns the new intervals in no particular order.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N*log(N)) | O(N) |

```
import java.util.*;

class Program {
    public int[][] mergeOverlappingIntervals(int[][] intervals) {
        if (intervals.length <= 1) {
            return intervals;
        }
        List<Interval> parsedIntervals = parseFromArrays(intervals);
        List<Interval> mergedIntervals = mergeIntervals(parsedIntervals);
        return convertToArrays(mergedIntervals);
    }

    private List<Interval> mergeIntervals(List<Interval> intervals) {
        Collections.sort(intervals);
        List<Interval> result = new ArrayList<>();
        Interval curr = intervals.get(0);
        for (int i = 1; i < intervals.size(); i++) {
            Interval next = intervals.get(i);
            if (isOverlapped(curr, next)) {
                curr = merge(curr, next);
            } else {
                result.add(curr);
                curr = next;
            }
            if (i == intervals.size() - 1) {
                result.add(curr);
            }
        }
        return result;
    }

    private boolean isOverlapped(Interval i1, Interval i2) {
        boolean i1IsFirst = i1.compareTo(i2) <= 0;
        Interval first = i1IsFirst ? i1 : i2;
        Interval second = i1IsFirst ? i2 : i1;
        return first.finish >= second.start;
    }

    private Interval merge(Interval i1, Interval i2) {
        return new Interval(
            Math.min(i1.start, i2.start),
            Math.max(i1.finish, i2.finish)
        );
    }

    private List<Interval> parseFromArrays(int[][] intervals) {
        List<Interval> result = new ArrayList<>();
        for (int i = 0; i < intervals.length; i++) {
            result.add(new Interval(intervals[i][0], intervals[i][1]));
        }
        return result;
    }

    private int[][] convertToArrays(List<Interval> intervals) {
        int[][] result = new int[intervals.size()][2];
        for (int i = 0; i < intervals.size(); i++) {
            result[i][0] = intervals.get(i).start;
            result[i][1] = intervals.get(i).finish;
        }
        return result;
    }

    public class Interval implements Comparable<Interval> {
        public int start;
        public int finish;

        public Interval(int start, int finish) {
            this.start = start;
            this.finish = finish;
        }

        public int compareTo(Interval o) {
            return start - o.start;
        }
    }
}
```

</details>

--------------------

## [Medium] Find Kth Largest Value In BST

> Write a function that takes in a Binary Search Tree (BST) and a positive integer k and returns the kth largest
> integer contained in the BST.
> You can assume that there will only be integer values in the BST and that k is less than or equal to the number
> of nodes in the tree.
> Also, for the purpose of this question, duplicate integers will be treated as distinct values. In other words,
> the second largest value in a BST containing values {5, 7, 7} will be 7—not 5.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(H) | O(H+K) |

```
class Program {
    private static int target = 0;
    private static int counter = 0;
    private static Integer result = null;

    public int findKthLargestValueInBst(BST tree, int k) {
        counter = 0;
        target = k;
        result = null;
        find(tree);
        return result;
    }

    private void find(BST node) {
        if (result != null) {
            return;
        }
        if (node.right != null) {
            find(node.right);
        }
        counter++;
        if (counter == target) {
            result = node.value;
            return;
        }
        if (node.left != null) {
            find(node.left);
        }
    }

    static class BST {
        public int value;
        public BST left = null;
        public BST right = null;

        public BST(int value) {
            this.value = value;
        }
    }
}
```

</details>

--------------------

## [Medium] Reconstruct BST

> Given a non-empty array of integers representing the pre-order traversal of a Binary Search Tree (BST),
> write a function that creates the relevant BST and returns its root node.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N^2) | O(H) |

```
import java.util.*;

class Program {

    public BST reconstructBst(ArrayList<Integer> values) {
        if (values.size() == 0) {
            throw new RuntimeException("Values array is empty");
        }
        int root = values.get(0);
        BST node = new BST(root);
        if (values.size() == 1) {
            return node;
        }
        reconstruct(node, values, 1, values.size() - 1);
        return node;
    }

    private void reconstruct(BST node, ArrayList<Integer> values,
                             int startIndex, int endIndex) {
        boolean hasLeftChild = startIndex < values.size() && values.get(startIndex) < node.value;
        Integer leftChildIndex = hasLeftChild ? startIndex : null;
        Integer rightChildIndex = findRightChildIndex(node, values, startIndex, endIndex);
        if (leftChildIndex == null && rightChildIndex == null) {
            return;
        }
        if (leftChildIndex != null && rightChildIndex != null) {
            node.left = new BST(values.get(leftChildIndex));
            reconstruct(node.left, values, leftChildIndex + 1, rightChildIndex - 1);
            node.right = new BST(values.get(rightChildIndex));
            reconstruct(node.right, values, rightChildIndex + 1, endIndex);
            return;
        }
        if (leftChildIndex != null) {
            node.left = new BST(values.get(leftChildIndex));
            reconstruct(node.left, values, leftChildIndex + 1, endIndex);
        }
        if (rightChildIndex != null) {
            node.right = new BST(values.get(rightChildIndex));
            reconstruct(node.right, values, rightChildIndex + 1, endIndex);
        }
    }

    private Integer findRightChildIndex(BST node, ArrayList<Integer> values,
                                        int startIndex, int endIndex) {
        for (int i = startIndex; i <= endIndex; i++) {
            if (node.value <= values.get(i)) {
                return i;
            }
        }
        return null;
    }

    static class BST {
        public int value;
        public BST left = null;
        public BST right = null;

        public BST(int value) {
            this.value = value;
        }
    }

}
```

</details>

--------------------

## [Medium] Height Balanced Binary Tree

> You're given the root node of a Binary Tree. Write a function that returns true if this Binary Tree is height
> balanced and false if it isn't.
> A Binary Tree is height balanced if for each node in the tree, the difference between the height of its left
> subtree and the height of its right subtree is at most 1.

<details>
  <summary>Solution 1</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N^2) | O(H) |

```
import java.util.*;

class Program {

    public boolean heightBalancedBinaryTree(BinaryTree tree) {
        return isHeightBalanced(tree);
    }

    private boolean isHeightBalanced(BinaryTree node) {
        int leftHeight = calcHeight(node.left);
        int rightHeight = calcHeight(node.right);
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        }
        if (node.left != null && !isHeightBalanced(node.left)) {
            return false;
        }
        if (node.right != null && !isHeightBalanced(node.right)) {
            return false;
        }
        return true;
    }

    private int calcHeight(BinaryTree node) {
        if (node == null) {
            return -1;
        }
        int maxHeight = 0;
        Queue<TreeInfo> queue = new LinkedList<>();
        queue.add(new TreeInfo(node, 0));
        do {
            TreeInfo ti = queue.remove();
            if (maxHeight < ti.height) {
                maxHeight = ti.height;
            }
            if (ti.tree.left != null) {
                queue.add(new TreeInfo(ti.tree.left, ti.height + 1));
            }
            if (ti.tree.right != null) {
                queue.add(new TreeInfo(ti.tree.right, ti.height + 1));
            }
        } while (queue.size() > 0);
        return maxHeight;
    }

    public static class TreeInfo {
        public BinaryTree tree;
        public int height;

        public TreeInfo(BinaryTree tree, int height) {
            this.tree = tree;
            this.height = height;
        }
    }

    static class BinaryTree {
        public int value;
        public BinaryTree left = null;
        public BinaryTree right = null;

        public BinaryTree(int value) {
            this.value = value;
        }
    }
}
```

</details>

<details>
  <summary>Solution 2</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(N) |

```
class Program {

    public boolean heightBalancedBinaryTree(BinaryTree tree) {
        return getTreeInfo(tree).isBalanced;
    }

    private BinaryTreeInfo getTreeInfo(BinaryTree node) {
        if (node == null) {
            return new BinaryTreeInfo(node, -1, true);
        }
        BinaryTreeInfo leftInfo = getTreeInfo(node.left);
        BinaryTreeInfo rightInfo = getTreeInfo(node.right);
        int height = Math.max(leftInfo.height, rightInfo.height) + 1;
        boolean isBalanced = leftInfo.isBalanced && rightInfo.isBalanced &&
            Math.abs(leftInfo.height - rightInfo.height) < 2;
        return new BinaryTreeInfo(node, height, isBalanced);
    }

    static class BinaryTree {
        public int value;
        public BinaryTree left = null;
        public BinaryTree right = null;

        public BinaryTree(int value) {
            this.value = value;
        }
    }

    static class BinaryTreeInfo {
        public BinaryTree tree;
        public boolean isBalanced;
        public int height;

        public BinaryTreeInfo(BinaryTree tree, int height, boolean isBalanced) {
            this.tree = tree;
            this.height = height;
            this.isBalanced = isBalanced;
        }
    }
}
```

</details>

--------------------

## [Medium] Number Of Ways To Traverse Graph

> You're given two positive integers representing the width and height of a grid-shaped, rectangular graph.
> Write a function that returns the number of ways to reach the bottom right corner of the graph when starting
> at the top left corner. Each move you take must either go down or right. In other words, you can never
> move up or left in the graph.

<details>
  <summary>Solution 1</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(WH) | O(WH) |

```
class Program {
    public int numberOfWaysToTraverseGraph(int rows, int cols) {
        int[][] ways = new int[rows][cols];
        ways[0][0] = 1;
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (row == 0 && col == 0) {
                    continue;
                }
                int way = 0;
                boolean canGoFromLeft = col > 0;
                if (canGoFromLeft) {
                    way += ways[row][col - 1];
                }
                boolean canGoFromTop = row > 0;
                if (canGoFromTop) {
                    way += ways[row - 1][col];
                }
                ways[row][col] = way;
            }
        }
        return ways[rows - 1][cols - 1];
    }
}
```

</details>

--------------------

## [Medium] Kadane's Algorithm

> Write a function that takes in a non-empty array of integers and returns the maximum sum that can be obtained
> by summing up all of the integers in a non-empty subarray of the input array. A subarray must only contain
> adjacent numbers (numbers next to each other in the input array).

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(1) |

```
class Program {
    public static int kadanesAlgorithm(int[] array) {
        int sum = array[0], maxSum = sum;
        for (int i = 1; i < array.length; i++) {
            int number = array[i];
            int keepSummingSum = sum + number;
            int startOverSum = number;
            sum = Math.max(keepSummingSum, startOverSum);
            maxSum = Math.max(maxSum, sum);
        }
        return maxSum;
    }
}

```

</details>

--------------------

## [Medium] Task Assignment

> You're given an integer k representing a number of workers and an array of positive integers representing durations
> of tasks that must be completed by the workers. Specifically, each worker must complete two unique tasks and can
> only work on one task at a time. The number of tasks will always be equal to 2k such that each worker always has
> exactly two tasks to complete. All tasks are independent of one another and can be completed in any order.
> Workers will complete their assigned tasks in parallel, and the time taken to complete all tasks will be equal to
> the time taken to complete the longest pair of tasks (see the sample output for an explanation).
> Write a function that returns the optimal assignment of tasks to each worker such that the tasks are completed as
> fast as possible. Your function should return a list of pairs, where each pair stores the indices of the tasks that
> should be completed by one worker. The pairs should be in the following format: [task1, task2], where the order of
> task1 and task2 doesn't matter. Your function can return the pairs in any order. If multiple optimal assignments
> exist, any correct answer will be accepted.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N*log(N)) | O(N) |

```
import java.util.*;

class Program {
    public ArrayList<ArrayList<Integer>> taskAssignment(int k, ArrayList<Integer> tasks) {
        List<TaskInfo> tasksInfo = new ArrayList<>(tasks.size());
        for (int i = 0; i < tasks.size(); i++) {
            tasksInfo.add(new TaskInfo(i, tasks.get(i)));
        }
        Collections.sort(tasksInfo);
        ArrayList<ArrayList<Integer>> result = new ArrayList<>();
        for (int i = 0; i < k; i++) {
            ArrayList<Integer> pairs = new ArrayList<>();
            pairs.add(tasksInfo.get(i).index);
            pairs.add(tasksInfo.get(tasks.size() - 1 - i).index);
            result.add(pairs);
        }
        return result;
    }

    public class TaskInfo implements Comparable<TaskInfo> {
        public int index;
        public int duration;

        public TaskInfo(int index, int duration) {
            this.index = index;
            this.duration = duration;
        }

        public int compareTo(TaskInfo ti) {
            return duration - ti.duration;
        }
    }
}
```

</details>

--------------------

## [Medium] Valid Starting City

> Imagine you have a set of cities that are laid out in a circle, connected by a circular road that runs clockwise.
> Each city has a gas station that provides gallons of fuel, and each city is some distance away from the next city.
> You have a car that can drive some number of miles per gallon of fuel, and your goal is to pick a starting city
> such that you can fill up your car with that city's fuel, drive to the next city, refill up your car with that 
> city's fuel, drive to the next city, and so on and so forth until you return back to the starting city with 0
> or more gallons of fuel left.
> This city is called a valid starting city, and it's guaranteed that there will always be exactly one valid starting city.
> For the actual problem, you'll be given an array of distances such that city i is distances[i] away from city i + 1.
> Since the cities are connected via a circular road, the last city is connected to the first city. In other words,
> the last distance in the distances array is equal to the distance from the last city to the first city.
> You'll also be given an array of fuel available at each city, where fuel[i] is equal to the fuel available at city i.
> The total amount of fuel available (from all cities combined) is exactly enough to travel to all cities.
> Your fuel tank always starts out empty, and you're given a positive integer value for the number of miles
> that your car can travel per gallon of fuel (miles per gallon, or MPG). You can assume that you will always
> be given at least two cities.
> Write a function that returns the index of the valid starting city.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(1) |

```
class Program {
    public int validStartingCity(int[] distances, int[] fuel, int mpg) {
        int remainingMiles = 0, minRemainingMiles = 0, validCityIndex = 0;
        for (int i = 1; i < distances.length; i++) {
            remainingMiles += fuel[i - 1] * mpg - distances[i - 1];
            if (minRemainingMiles > remainingMiles) {
                minRemainingMiles = remainingMiles;
                validCityIndex = i;
            }
        }
        return validCityIndex;
    }
}
```

</details>

--------------------

## [Medium] Phone Number Mnemonics

> Almost every digit is associated with some letters in the alphabet; this allows certain phone numbers to spell out
> actual words. For example, the phone number 8464747328 can be written as timisgreat; similarly, the phone number
> 2686463 can be written as antoine or as ant6463.
> It's important to note that a phone number doesn't represent a single sequence of letters, but rather multiple
> combinations of letters. For instance, the digit 2 can represent three different letters (a, b, and c).
> A mnemonic is defined as a pattern of letters, ideas, or associations that assist in remembering something.
> Companies oftentimes use a mnemonic for their phone number to make it easier to remember.
> Given a stringified phone number of any non-zero length, write a function that returns all mnemonics
> for this phone number, in any order.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N * 4^N) | O(N * 4^N) |

```
import java.util.*;

class Program {
    private static Map<Character, List<String>> assocs = null;

    public ArrayList<String> phoneNumberMnemonics(String phoneNumber) {
        ensureAssocsIsFilled();
        ArrayList<String> result = new ArrayList<>();
        for (int i = 0; i < phoneNumber.length(); i++) {
            char digit = phoneNumber.charAt(i);
            List<String> charsToAdd = assocs.get(digit);
            ArrayList<String> resultNew = new ArrayList<>(result.size() * charsToAdd.size());
            if (result.size() == 0) {
                resultNew.addAll(charsToAdd);
            } else {
                for (String item : result) {
                    for (String charToAdd : charsToAdd) {
                        resultNew.add(item + charToAdd);
                    }
                }
            }
            result.clear();
            result = resultNew;
        }
        return result;
    }

    private void ensureAssocsIsFilled() {
        if (assocs != null) {
            return;
        }
        fillAssocs();
    }

    private void fillAssocs() {
        assocs = new HashMap<>();
        assocs.put('0', Arrays.asList("0"));
        assocs.put('1', Arrays.asList("1"));
        assocs.put('2', Arrays.asList("a", "b", "c"));
        assocs.put('3', Arrays.asList("d", "e", "f"));
        assocs.put('4', Arrays.asList("g", "h", "i"));
        assocs.put('5', Arrays.asList("j", "k", "l"));
        assocs.put('6', Arrays.asList("m", "n", "o"));
        assocs.put('7', Arrays.asList("p", "q", "r", "s"));
        assocs.put('8', Arrays.asList("t", "u", "v"));
        assocs.put('9', Arrays.asList("w", "x", "y", "z"));
    }
}
```

</details>

--------------------

## [Medium] Search In Sorted Matrix

> You're given a two-dimensional array (a matrix) of distinct integers and a target integer. Each row in the matrix 
> is sorted, and each column is also sorted; the matrix doesn't necessarily have the same height and width.
> Write a function that returns an array of the row and column indices of the target integer if it's contained in
> the matrix, otherwise [-1, -1].

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(W+H) | O(1) |

```
class Program {
    public static int[] searchInSortedMatrix(int[][] matrix, int target) {
        int row = 0, col = matrix[0].length - 1;
        do {
            int value = matrix[row][col];
            if (value == target) {
                return new int[]{row, col};
            }
            if (value < target) {
                row++;
            } else {
                col--;
            }
        } while (row < matrix.length && col >= 0);
        return new int[]{-1, -1};
    }
}
```

</details>

--------------------

## [Medium] Sunset Views

> Given an array of buildings and a direction that all of the buildings face, return an array of the indices of the
> buildings that can see the sunset.
> A building can see the sunset if it's strictly taller than all of the buildings that come after it in the direction
> that it faces.
> The input array named buildings contains positive, non-zero integers representing the heights of the buildings.
> A building at index i thus has a height denoted by buildings[i]. All of the buildings face the same direction,
> and this direction is either east or west, denoted by the input string named direction, which will always
> be equal to either "EAST" or "WEST". In relation to the input array, you can interpret these directions as right
> for east and left for west.
> Important note: the indices in the ouput array should be sorted in ascending order.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(N) |

```
import java.util.*;

class Program {
    private int size;
    private String direction;

    public ArrayList<Integer> sunsetViews(int[] buildings, String direction) {
        size = buildings.length;
        if (size == 0) {
            return new ArrayList<>();
        }
        this.direction = direction;
        ArrayList<Integer> result = new ArrayList<>();
        int maxHeight = buildings[getIndex(0)];
        result.add(getIndex(0));
        if (size == 1) {
            return result;
        }
        for (int i = 1; i < size; i++) {
            int height = buildings[getIndex(i)];
            if (maxHeight < height) {
                maxHeight = height;
                result.add(getIndex(i));
            }
        }
        if (direction.equals("EAST")) {
            Collections.reverse(result);
        }
        return result;
    }

    private int getIndex(int index) {
        // direct order (SUN => ###)
        if (direction.equals("WEST")) {
            return index;
        }
        // reverse order (### <= SUN)
        return size - 1 - index;
    }
}
```

</details>

--------------------

## [Medium] Sort Stack

> Write a function that takes in an array of integers representing a stack, recursively sorts the stack in place
> (i.e., doesn't create a brand new array), and returns it.
> The array must be treated as a stack, with the end of the array as the top of the stack. Therefore, you're only allowed to
> Pop elements from the top of the stack by removing elements from the end of the array using the built-in .pop()
> method in your programming language of choice.
> Push elements to the top of the stack by appending elements to the end of the array using the built-in .append()
> method in your programming language of choice.
> Peek at the element on top of the stack by accessing the last element in the array.
> You're not allowed to perform any other operations on the input array, including accessing elements
> (except for the last element), moving elements, etc... You're also not allowed to use any other data structures,
> and your solution must be recursive.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N^2) | O(N^2) |

```
import java.util.*;

class Program {

    public ArrayList<Integer> sortStack(ArrayList<Integer> array) {
        if (array.size() < 2) {
            return array;
        }
        for (int i = 0; i < array.size(); i++) {
            int head = pop(array);
            sort(array, head);
        }
        return array;
    }

    private void sort(ArrayList<Integer> array, int prevHead) {
        if (array.size() == 0) {
            append(array, prevHead);
            return;
        }
        int currHead = pop(array);
        if (array.size() > 0) {
            int nextHead = pop(array);
            sort(array, nextHead);
        }
        if (prevHead < currHead) {
            append(array, prevHead);
            append(array, currHead);
        } else {
            append(array, currHead);
            append(array, prevHead);
        }
    }

    private Integer pop(ArrayList<Integer> array) {
        int lastIndex = array.size() - 1;
        int value = array.get(lastIndex);
        array.remove(lastIndex);
        return value;
    }

    private void append(ArrayList<Integer> array, int value) {
        array.add(value);
    }
}
```

</details>

--------------------

## [Medium] Suffix Trie Construction

> Write a SuffixTrie class for a Suffix-Trie-like data structure. The class should have a root property set to be the
> root node of the trie and should support:
> Creating the trie from a string; this will be done by calling the populateSuffixTrieFrom method upon class
> instantiation, which should populate the root of the class.
> Searching for strings in the trie.
> Note that every string added to the trie should end with the special endSymbol character: "*".

<details>
  <summary>Solution</summary>

```
import java.util.*;

class Program {

    static class SuffixTrie {
        TrieNode root = new TrieNode();
        char endSymbol = '*';

        public SuffixTrie(String str) {
            populateSuffixTrieFrom(str);
        }

        // Space: O(N^2)
        // Time: O(N^2)

        public void populateSuffixTrieFrom(String str) {
            for (int cut = 0; cut < str.length(); cut++) {
                TrieNode node = root;
                for (int i = 0 + cut; i < str.length(); i++) {
                    char ch = str.charAt(i);
                    if (!node.children.containsKey(ch)) {
                        node.children.put(ch, new TrieNode());
                    }
                    node = node.children.get(ch);
                    if (i == str.length() - 1) {
                        node.children.put(endSymbol, null);
                    }
                }
            }
        }

        // Space: O(1)
        // Time: O(N)

        public boolean contains(String str) {
            TrieNode node = root;
            for (int i = 0; i < str.length(); i++) {
                char ch = str.charAt(i);
                if (!node.children.containsKey(ch)) {
                    return false;
                }
                node = node.children.get(ch);
            }
            return node.children.containsKey(endSymbol);
        }
    }

    static class TrieNode {
        Map<Character, TrieNode> children = new HashMap<Character, TrieNode>();
    }
}
```

</details>

--------------------

## [Hard] Largest Range

> Write a function that takes in an array of integers and returns an array of length 2 representing the largest range 
> of integers contained in that array.

<details>
  <summary>A dirty solution using sorting (not a good solution)</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n*log(n)) | O(n) |

```
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

class Program {
    public static int[] largestRange(int[] array) {
        if (array.length == 1) {
            return new int[]{array[0], array[0]};
        }
        // O(n*log(n)), can I do it better?
        List<Integer> sorted = IntStream.of(array).boxed().sorted().collect(Collectors.toList());
        int rangeStart = sorted.get(0);
        int rangeFinish = rangeStart;
        int largestRangeStart = 0, largestRangeFinish = 0;
        for (int index = 1; index < sorted.size(); index++) {
            int current = sorted.get(index);
            boolean isRangeKeeped = current == rangeFinish || current == rangeFinish + 1;
            if (isRangeKeeped) {
                rangeFinish = current;
            }
            if (calcRangeLength(rangeStart, rangeFinish) >
                calcRangeLength(largestRangeStart, largestRangeFinish)) {
                largestRangeStart = rangeStart;
                largestRangeFinish = rangeFinish;
            }
            if (!isRangeKeeped) {
                rangeStart = rangeFinish = current;
            }
        }
        return new int[]{largestRangeStart, largestRangeFinish};
    }

    private static int calcRangeLength(int rangeStart, int rangeFinish) {
        return rangeFinish - rangeStart;
    }
}
```

</details>

<details>
  <summary>A far better solution with using a hashmap of visited numbers</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(n) |

```
import java.util.HashMap;
import java.util.Map;

class Program {
    private static final Map<Integer, Boolean> numbers = new HashMap<>();

    public static int[] largestRange(int[] array) {
        numbers.clear();
        int maxNumber = array[0];
        for (int number : array) {
            numbers.put(number, false);
            if (maxNumber < number) {
                maxNumber = number;
            }
        }
        Integer first = null, last = null;
        for (int number : numbers.keySet()) {
            if (isVisited(number)) {
                continue;
            }
            int currFirst = number, currLast = number;
            for (int i = number + 1; i <= maxNumber; i++) {
                if (hasNumber(i)) {
                    currLast = i;
                    visitNumber(i);
                } else {
                    break;
                }
            }
            if (first == null || rangeSize(currFirst, currLast) >
                rangeSize(first, last)) {
                first = currFirst;
                last = currLast;
            }
        }
        return new int[]{first, last};
    }

    private static boolean hasNumber(int number) {
        return numbers.containsKey(number);
    }

    private static boolean isVisited(int number) {
        return numbers.containsKey(number) && numbers.get(number);
    }

    private static void visitNumber(int number) {
        if (numbers.containsKey(number)) {
            numbers.put(number, true);
        }
    }

    private static int rangeSize(int first, int last) {
        return last - first;
    }
}
```
  
</details>

--------------------

## [Hard] Shift Linked List

> Write a function that takes in the head of a Singly Linked List and an integer `k`, 
> shifts the list in place (i.e., doesn't create a brand-new list) by `k` positions, and returns its new head.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(n) | O(1) |

```
import java.util.*;
import java.lang.Math;

class Program {
    public static LinkedList shiftLinkedList(LinkedList head, int k) {
        int listSize = 1;
        LinkedList tail = head;
        while (tail.next != null) {
            tail = tail.next;
            listSize++;
        }
        int realK = transformK(k, listSize);
        if (realK == 0 || realK == listSize) {
            return head;
        }
        tail.next = head;
        LinkedList newTail = head;
        for (int i = 0; i < listSize - realK - 1; i++) {
            newTail = newTail.next;
        }
        LinkedList newHead = newTail.next;
        newTail.next = null;
        return newHead;
    }

    // Transform negative K values into positive values.
    // Also transform these values to be in a range [0 ; listSize - 1].
    private static int transformK(int k, int listSize) {
        boolean isPositive = k > 0;
        int sign = isPositive ? -1 : 1;
        int scaleFactor = (int) Math.abs(Math.floor(k / (float) listSize));
        int scaledK = k + sign * listSize * scaleFactor;
        return isPositive ? scaledK : scaledK + listSize;
    }

    static class LinkedList {
        public int value;
        public LinkedList next;

        public LinkedList(int value) {
            this.value = value;
            next = null;
        }
    }
}
```

</details>

_P.S.:_ Argh! How can I be so stupid? I was so close to this way of calculation a transformed `K`:
```int offset = Math.abs(k) % listSize```

--------------------

## [Hard] Reverse Linked List

> Write a function that takes in the head of a Singly Linked List, reverses the list in place 
> (i.e., doesn't create a brand new list), and returns its new head.
> Each LinkedList node has an integer value as well as a next node pointing to the next node in the list or to 
> None / null if it's the tail of the list. 
> You can assume that the input Linked List will always have at least one node; in other words, the head will 
> never be None / null.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(1) |

```
class Program {
    public static LinkedList reverseLinkedList(LinkedList head) {
        LinkedList curr = head, prev = null;
        while (curr != null) {
            LinkedList next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }

    static class LinkedList {
        int value;
        LinkedList next = null;

        public LinkedList(int value) {
            this.value = value;
        }
    }
}
```

</details>

--------------------

## [Hard] Quick Sort

> Write a function that takes in an array of integers and returns a sorted version of that array. 
> Use the Quick Sort algorithm to sort the array.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N*Log(N)) | O(N*Log(N)) |

```
class Program {
    public static int[] quickSort(int[] array) {
        sort(array, 0, array.length - 1);
        return array;
    }

    private static void sort(int[] array, int left, int right) {
        if (right <= left) {
            return;
        }
        int pivot = left, val = array[pivot];
        int ptrLeft = left + 1, ptrRight = right;
        while (ptrLeft <= ptrRight) {
            if (array[ptrLeft] > val && array[ptrRight] < val) {
                swap(array, ptrLeft, ptrRight);
            }
            if (array[ptrLeft] <= val) {
                ptrLeft++;
            }
            if (array[ptrRight] >= val) {
                ptrRight--;
            }
        }
        swap(array, pivot, ptrRight);
        // Sort shorter subarray first
        if (ptrRight - left < right - ptrRight) {
            sort(array, left, ptrRight - 1);
            sort(array, ptrRight + 1, right);
        } else {
            sort(array, ptrRight + 1, right);
            sort(array, left, ptrRight - 1);
        }
    }

    private static void swap(int[] array, int i, int j) {
        int tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }
}
```

</details>

--------------------

## [Hard] Heap Sort

> Write a function that takes in an array of integers and returns a sorted version of that array. 
> Use the Heap Sort algorithm to sort the array.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N*log(N)) | O(1) |

```
class Program {
    private static Integer heapSize = null;

    public static int[] heapSort(int[] array) {
        if (array.length == 1) {
            return array;
        }
        heapSize = array.length;
        buildHeap(array);
        while (heapSize > 2) {
            swap(array, 0, heapSize - 1);
            heapSize--;
            siftDown(array, 0);
        }
        swap(array, 0, 1);
        return array;
    }

    private static void buildHeap(int[] array) {
        int firstParentFromEndIndex = (array.length - 2) / 2;
        for (int i = firstParentFromEndIndex; i >= 0; i--) {
            siftDown(array, i);
        }
    }

    private static void siftDown(int[] array, int index) {
        int current = array[index];
        int leftChildIndex = getLeftChild(index);
        int rightChildIndex = getRightChild(index);
        if (!hasIndex(leftChildIndex) && !hasIndex(rightChildIndex)) {
            return;
        }
        int left = array[leftChildIndex];
        if (!hasIndex(rightChildIndex)) {
            if (left > current) {
                swap(array, index, leftChildIndex);
                siftDown(array, leftChildIndex);
            }
            return;
        }
        int right = array[rightChildIndex];
        if (current > left && current > right) {
            return;
        }
        if (left > right) {
            swap(array, index, leftChildIndex);
            siftDown(array, leftChildIndex);
            return;
        }
        swap(array, index, rightChildIndex);
        siftDown(array, rightChildIndex);
    }

    private static void swap(int[] array, int i, int j) {
        int tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }

    private static int getLeftChild(int index) {
        return 2 * index + 1;
    }

    private static int getRightChild(int index) {
        return getLeftChild(index) + 1;
    }

    private static boolean hasIndex(int index) {
        return index > -1 && index < heapSize;
    }
}
```

</details>

--------------------

## [Hard] Subarray Sort

> Write a function that takes in an array of at least two integers and that returns an array of the starting and
> ending indices of the smallest subarray in the input array that needs to be sorted in place in order for the entire
> input array to be sorted (in ascending order).
> If the input array is already sorted, the function should return [-1, -1].

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N*log(N)) | O(N) |

```
import java.util.*;

class Program {
    public static int[] subarraySort(int[] array) {
        int[] copy = makeCopy(array);
        Arrays.sort(copy);
        int firstDiffValueIndex = -1;
        for (int i = 0; i < array.length; i++) {
            if (array[i] != copy[i]) {
                firstDiffValueIndex = i;
                break;
            }
        }
        if (firstDiffValueIndex == -1) {
            return new int[]{-1, -1};
        }
        int lastDiffValueIndex = -1;
        for (int i = array.length - 1; i >= 0; i--) {
            if (array[i] != copy[i]) {
                lastDiffValueIndex = i;
                break;
            }
        }
        return new int[]{firstDiffValueIndex, lastDiffValueIndex};
    }

    private static int[] makeCopy(int[] array) {
        int[] result = new int[array.length];
        for (int i = 0; i < array.length; i++) {
            result[i] = array[i];
        }
        return result;
    }
}
```

</details>

--------------------

## [Hard] Zigzag Traverse

> Write a function that takes in an n x m two-dimensional array (that can be square-shaped when n == m) and returns
> a one-dimensional array of all the array's elements in zigzag order.
> Zigzag order starts at the top left corner of the two-dimensional array, goes down by one element, and proceeds
> in a zigzag pattern all the way to the bottom right corner.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(W*H) | O(1) |

```
import java.util.*;

class Program {
    private static int rows;
    private static int cols;

    public static List<Integer> zigzagTraverse(List<List<Integer>> array) {
        rows = array.size();
        if (rows == 0) {
            return new ArrayList<>();
        }
        cols = array.get(0).size();
        if (rows == 1) {
            return array.get(0);
        }
        if (cols == 1) {
            List<Integer> result = new ArrayList<>(rows);
            for (int i = 0; i < rows; i++) {
                result.add(array.get(i).get(0));
            }
            return result;
        }
        List<Integer> result = new ArrayList<>(rows * cols);
        fill(result, array);
        return result;
    }

    private static void fill(List<Integer> result, List<List<Integer>> array) {
        int row = 0, col = 0;
        boolean isGoUp = false;
        while (row < rows && col < cols) {
            int value = array.get(row).get(col);
            result.add(value);
            if (isGoUp) {
                if (row == 0 || col == cols - 1) {
                    if (col == cols - 1) {
                        row++;
                    } else {
                        col++;
                    }
                    isGoUp = false;
                } else {
                    row--;
                    col++;
                }
            } else {
                if (col == 0 || row == rows - 1) {
                    if (row == rows - 1) {
                        col++;
                    } else {
                        row++;
                    }
                    isGoUp = true;
                } else {
                    row++;
                    col--;
                }
            }
        }
    }
}
```

</details>

--------------------

## [Hard] Validate Three Nodes

> You're given three nodes that are contained in the same Binary Search Tree: nodeOne, nodeTwo, and nodeThree. 
> Write a function that returns a boolean representing whether one of nodeOne or nodeThree is an ancestor of nodeTwo
> and the other node is a descendant of nodeTwo. For example, if your function determines that nodeOne is an ancestor
> of nodeTwo, then it needs to see if nodeThree is a descendant of nodeTwo. If your function determines that nodeThree
> is an ancestor, then it needs to see if nodeOne is a descendant.
> A descendant of a node N is defined as a node contained in the tree rooted at N. A node N is an ancestor of another
> node M if M is a descendant of N.
> It isn't guaranteed that nodeOne or nodeThree will be ancestors or descendants of nodeTwo, but it is guaranteed
> that all three nodes will be unique and will never be None / null. In other words, you'll be given valid input nodes.

<details>
  <summary>Solution 1</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(H) | O(H) |

```
import java.util.*;

class Program {
    static class BST {
        public int value;
        public BST left = null;
        public BST right = null;

        public BST(int value) {
            this.value = value;
        }
    }

    public boolean validateThreeNodes(BST nodeOne, BST nodeTwo, BST nodeThree) {
        BST descendant = findDescendant(nodeTwo, nodeOne, nodeThree);
        if (descendant == null) {
            return false;
        }
        BST ancestor = descendant.equals(nodeThree) ? nodeOne : nodeThree;
        return findDescendant(ancestor, nodeTwo) != null;
    }

    private BST findDescendant(BST root, BST... children) {
        Queue<BST> queue = new LinkedList<>();
        queue.add(root);
        do {
            BST node = queue.remove();
            for (BST child : children) {
                if (node.equals(child)) {
                    return child;
                }
            }
            if (node.left != null) {
                queue.add(node.left);
            }
            if (node.right != null) {
                queue.add(node.right);
            }
        } while (queue.size() > 0);
        return null;
    }
}
```

</details>

--------------------

## [Hard] Find Nodes Distance K

> You're given the root node of a Binary Tree, a target value of a node that's contained in the tree, and a positive
> integer k. Write a function that returns the values of all the nodes that are exactly distance k from the node
> with target value.
> The distance between two nodes is defined as the number of edges that must be traversed to go from one node to the other.
> For example, the distance between a node and its immediate left or right child is 1. The same holds in reverse:
> the distance between a node and its parent is 1. In a tree of three nodes where the root node has a left
> and right child, the left and right children are distance 2 from each other.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N+K) | O(N) |

```
import java.util.*;

class Program {
    private final Map<Integer, List<Integer>> paths = new HashMap<>();
    private final ArrayList<Integer> result = new ArrayList<>();

    public ArrayList<Integer> findNodesDistanceK(BinaryTree tree, int target, int k) {
        fillPaths(tree);
        fillResult(target, k);
        return result;
    }

    private void fillPaths(BinaryTree node) {
        paths.clear();
        fillPaths(node, null);
    }

    private void fillPaths(BinaryTree node, BinaryTree parent) {
        paths.putIfAbsent(node.value, new ArrayList<>());
        if (parent != null) {
            paths.get(node.value).add(parent.value);
        }
        if (node.left != null) {
            paths.get(node.value).add(node.left.value);
            fillPaths(node.left, node);
        }
        if (node.right != null) {
            paths.get(node.value).add(node.right.value);
            fillPaths(node.right, node);
        }
    }

    private void fillResult(int target, int k) {
        result.clear();
        doFillResult(target, null, 0, k);
    }

    private void doFillResult(Integer node, Integer prevNode, int currentLevel, int targetLevel) {
        if (currentLevel == targetLevel) {
            result.add(node);
            return;
        }
        for (Integer nextNode : paths.get(node)) {
            if (nextNode == prevNode) {
                continue;
            }
            doFillResult(nextNode, node, currentLevel + 1, targetLevel);
        }
    }

    static class BinaryTree {
        public int value;
        public BinaryTree left = null;
        public BinaryTree right = null;

        public BinaryTree(int value) {
            this.value = value;
        }
    }
}
```

</details>

--------------------

## [Hard] Maximum Sum Submatrix

> You're given a two-dimensional array (a matrix) of potentially unequal height and width that's filled with integers.
> You're also given a positive integer size. Write a function that returns the maximum sum that can be generated from
> a submatrix with dimensions size * size.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(W*H) | O(W*H) |

```
class Program {
    private int rows;
    private int cols;
    private int[][] sums;

    public int maximumSumSubmatrix(int[][] matrix, int size) {
        rows = matrix.length;
        cols = matrix[0].length;
        sums = new int[rows][cols];
        fillSums(matrix);
        return findMaxSumSubmatrix(matrix, size);
    }

    private int findMaxSumSubmatrix(int[][] matrix, int size) {
        Integer maxSum = null;
        for (int row = 0; row <= rows - size; row++) {
            for (int col = 0; col <= cols - size; col++) {
                int sum = calcSubmatrixSum(matrix, size, row, col);
                if (maxSum == null || maxSum < sum) {
                    maxSum = sum;
                }
            }
        }
        return maxSum;
    }

    private int calcSubmatrixSum(int[][] matrix, int size, int row, int col) {
        int allSum = sums[row + size - 1][col + size - 1];
        int leftColSum = col - 1 >= 0 ? sums[row + size - 1][col - 1] : 0;
        int topColSum = row - 1 >= 0 ? sums[row - 1][col + size - 1] : 0;
        int leftTopSum = (col - 1 >= 0 && row - 1 >= 0) ? sums[row - 1][col - 1] : 0;
        return allSum - leftColSum - topColSum + leftTopSum;
    }

    private void fillSums(int[][] matrix) {
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (row == 0 && col == 0) {
                    sums[row][col] = matrix[row][col];
                    continue;
                }
                int sum = matrix[row][col];
                if (row - 1 >= 0) {
                    sum += sums[row - 1][col];
                }
                if (col - 1 >= 0) {
                    sum += sums[row][col - 1];
                }
                if (row - 1 >= 0 && col - 1 >= 0) {
                    sum -= sums[row - 1][col - 1];
                }
                sums[row][col] = sum;
            }
        }
    }
}
```

</details>

--------------------

## [Hard] Boggle Board

> You're given a two-dimensional array (a matrix) of potentially unequal height and width containing letters;
> this matrix represents a boggle board. You're also given a list of words.
> Write a function that returns an array of all the words contained in the boggle board. The final words don't
> need to be in any particular order.
> A word is constructed in the boggle board by connecting adjacent (horizontally, vertically, or diagonally)
> letters, without using any single letter at a given position more than once; while a word can of course have
> repeated letters, those repeated letters must come from different positions in the boggle board in order for
> the word to be contained in the board. Note that two or more words are allowed to overlap and use the same letters
> in the boggle board.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(W*H*8^LONGEST_WORD + WORDS*LONGEST_WORD) | O(WORDS*LONGEST_WORD) |

```
import java.util.*;

class Program {
    private static BoggleBoard board;

    public static List<String> boggleBoard(char[][] chars, String[] words) {
        board = new BoggleBoard(chars);
        Map<Character, Set<String>> firstLetterToWords = new HashMap<>();
        for (String word : words) {
            firstLetterToWords.putIfAbsent(word.charAt(0), new HashSet<>());
            firstLetterToWords.get(word.charAt(0)).add(word);
        }
        List<String> presentedWords = new ArrayList<>();
        for (int row = 0; row < board.rows(); row++) {
            for (int col = 0; col < board.cols(); col++) {
                if (firstLetterToWords.size() == 0) {
                    return presentedWords;
                }
                char currentChar = board.chars[row][col];
                if (!firstLetterToWords.containsKey(currentChar)) {
                    continue;
                }
                Set<String> setOfWords = firstLetterToWords.get(currentChar);
                Iterator<String> iterator = setOfWords.iterator();
                while (iterator.hasNext()) {
                    String word = iterator.next();
                    if (!isWordPresented(word, row, col)) {
                        continue;
                    }
                    presentedWords.add(word);
                    iterator.remove();
                    if (setOfWords.size() == 0) {
                        firstLetterToWords.remove(currentChar);
                    }
                }
            }
        }
        return presentedWords;
    }

    private static boolean isWordPresented(String wordToFind, int row, int col) {
        if (board.chars[row][col] != wordToFind.charAt(0)) {
            return false;
        }
        BoggleBoardWord startingWord = new BoggleBoardWord(wordToFind);
        startingWord.addChar(new BoggleBoardChar(row, col));
        return isWordPresented(startingWord);
    }

    private static boolean isWordPresented(BoggleBoardWord startingWord) {
        Queue<BoggleBoardWord> queue = new LinkedList<>();
        queue.add(startingWord);
        do {
            BoggleBoardWord word = queue.remove();
            if (word.isConstructed()) {
                return true;
            }
            BoggleBoardChar bbchar = word.getLastChar();
            checkCharAndAddExtendedWordIntoQueue(bbchar.row + 1, bbchar.col, word, queue);
            checkCharAndAddExtendedWordIntoQueue(bbchar.row - 1, bbchar.col, word, queue);
            checkCharAndAddExtendedWordIntoQueue(bbchar.row, bbchar.col + 1, word, queue);
            checkCharAndAddExtendedWordIntoQueue(bbchar.row, bbchar.col - 1, word, queue);
            checkCharAndAddExtendedWordIntoQueue(bbchar.row + 1, bbchar.col + 1, word, queue);
            checkCharAndAddExtendedWordIntoQueue(bbchar.row + 1, bbchar.col - 1, word, queue);
            checkCharAndAddExtendedWordIntoQueue(bbchar.row - 1, bbchar.col + 1, word, queue);
            checkCharAndAddExtendedWordIntoQueue(bbchar.row - 1, bbchar.col - 1, word, queue);
        } while (queue.size() > 0);
        return false;
    }

    private static void checkCharAndAddExtendedWordIntoQueue(
        int row, int col, BoggleBoardWord word, Queue<BoggleBoardWord> queue
    ) {
        if (row < 0 || row >= board.rows() || col < 0 || col >= board.cols()) {
            return;
        }
        char currentChar = board.chars[row][col];
        if (currentChar != word.getNextChar()) {
            return;
        }
        BoggleBoardChar bbchar = new BoggleBoardChar(row, col);
        if (!word.canUseChar(bbchar)) {
            return;
        }
        queue.add(new BoggleBoardWord(word, bbchar));
    }

    private static class BoggleBoard {
        public char[][] chars;

        public BoggleBoard(char[][] chars) {
            this.chars = chars;
        }

        public int rows() {
            return chars.length;
        }

        public int cols() {
            return chars[0].length;
        }
    }

    private static class BoggleBoardWord {
        public String word;
        public List<BoggleBoardChar> chars;
        public Set<Integer> charsCoords;

        public BoggleBoardWord(String word) {
            this.word = word;
            this.chars = new ArrayList<>();
            this.charsCoords = new HashSet<>();
        }

        public BoggleBoardWord(BoggleBoardWord bbword, BoggleBoardChar bbchar) {
            this.word = bbword.word;
            this.chars = new ArrayList<>(bbword.chars);
            this.charsCoords = new HashSet<>(bbword.charsCoords);
            addChar(bbchar);
        }

        public BoggleBoardChar getLastChar() {
            return chars.get(chars.size() - 1);
        }

        public void addChar(BoggleBoardChar bbchar) {
            chars.add(bbchar);
            charsCoords.add(bbchar.getCoord());
        }

        public boolean isConstructed() {
            if (chars.size() != word.length()) {
                return false;
            }
            for (int i = 0; i < chars.size(); i++) {
                BoggleBoardChar bbchar = chars.get(i);
                char ch = board.chars[bbchar.row][bbchar.col];
                if (ch != word.charAt(i)) {
                    return false;
                }
            }
            return true;
        }

        public Character getNextChar() {
            if (isConstructed()) {
                return null;
            }
            return word.charAt(chars.size());
        }

        public boolean canUseChar(BoggleBoardChar bbchar) {
            return !charsCoords.contains(bbchar.getCoord());
        }
    }

    private static class BoggleBoardChar {
        public int row;
        public int col;

        public BoggleBoardChar(int row, int col) {
            this.row = row;
            this.col = col;
        }

        public int getCoord() {
            return row * board.cols() + col;
        }
    }
}
```

</details>

--------------------

## [Hard] Find Loop

> Write a function that takes in the head of a Singly Linked List that contains a loop
> (in other words, the list's tail node points to some node in the list instead of None / null).
> The function should return the node (the actual node--not just its value) from which the loop originates
> in constant space.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(1) |

```
class Program {
    public static LinkedList findLoop(LinkedList head) {
        LinkedList first = head;
        LinkedList second = head;
        do {
            first = first.next;
            second = second.next.next;
        } while (!first.equals(second));
        first = head;
        while (!first.equals(second)) {
            first = first.next;
            second = second.next;
        }
        return first;
    }

    static class LinkedList {
        int value;
        LinkedList next = null;

        public LinkedList(int value) {
            this.value = value;
        }
    }
}
```

</details>

--------------------

## [Hard] Merge Linked Lists

> Write a function that takes in the heads of two Singly Linked Lists that are in sorted order, respectively.
> The function should merge the lists in place (i.e., it shouldn't create a brand new list) and return the head of
> the merged list; the merged list should be in sorted order.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(F+S) | O(1) |

```
class Program {
    public static LinkedList mergeLinkedLists(LinkedList headOne, LinkedList headTwo) {
        LinkedList first = null, second = null;
        if (headOne.value < headTwo.value) {
            first = headOne;
            second = headTwo;
        } else {
            first = headTwo;
            second = headOne;
        }
        merge(first, second);
        return first;
    }

    private static void merge(LinkedList first, LinkedList second) {
        while (second != null) {
            while (first.value <= second.value && first.next != null &&
                first.next.value <= second.value) {
                first = first.next;
            }
            LinkedList secondNext = second.next;
            LinkedList firstNext = first.next;
            second.next = firstNext;
            first.next = second;
            first = second;
            second = secondNext;
        }
    }

    public static class LinkedList {
        int value;
        LinkedList next;

        LinkedList(int value) {
            this.value = value;
            this.next = null;
        }
    }
}
```

</details>

--------------------

## [Hard] Interweaving Strings

> Write a function that takes in three strings and returns a boolean representing whether the third string can be
> formed by interweaving the first two strings.
> To interweave strings means to merge them by alternating their letters without any specific pattern. For instance,
> the strings "abc" and "123" can be interwoven as "a1b2c3", as "abc123", and as "ab1c23" (this list is nonexhaustive).
> Letters within a string must maintain their relative ordering in the interwoven string.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(LS) | O(LS) |

Where `LS` is the longest string.

```
class Program {
    public static boolean interweavingStrings(String s1, String s2, String s3) {
        if (s1.length() + s2.length() != s3.length()) {
            return false;
        }
        return check(s1, s2, s3, 0, 0, 0);
    }

    private static boolean check(String s1, String s2, String s3, int p1, int p2, int p3) {
        while (true) {
            Character ch1 = p1 < s1.length() ? s1.charAt(p1) : null;
            Character ch2 = p2 < s2.length() ? s2.charAt(p2) : null;
            char ch3 = s3.charAt(p3);
            if (ch1 == null && ch2 == null) {
                return false;
            }
            if (ch1 == ch2 && ch1 == ch3) {
                if (check(s1, s2, s3, p1 + 1, p2, p3 + 1)) {
                    return true;
                }
                return check(s1, s2, s3, p1, p2 + 1, p3 + 1);
            }
            if (ch1 != null && ch1 == ch3) {
                p1++;
                p3++;
            } else if (ch2 != null && ch2 == ch3) {
                p2++;
                p3++;
            } else {
                p1++;
                p2++;
            }
            if (p3 == s3.length()) {
                return true;
            }
        }
    }
}
```

</details>

--------------------

## [Hard] Quickselect

> Write a function that takes in an array of distinct integers as well as an integer k and that returns the
> kth smallest integer in that array.
> The function should do this in linear time, on average.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N*K) | O(K) |

```
import java.util.*;

class Program {
    private static int size;

    public static int quickselect(int[] array, int k) {
        size = array.length;
        if (k > size) {
            throw new RuntimeException("Parameter \"k\" is too large");
        }
        int middleIndex = (int) Math.ceil(size / 2.0);
        if (k <= middleIndex) {
            return findKValue(array, k, true);
        }
        return findKValue(array, size - k + 1, false);
    }

    private static int findKValue(int[] array, int k, boolean isSmallest) {
        Set<Integer> usedIndices = new HashSet<>();
        Integer targetValueIndex = null;
        for (int counter = 0; counter < k; counter++) {
            targetValueIndex = null;
            for (int i = 0; i < size; i++) {
                if (usedIndices.contains(i)) {
                    continue;
                }
                if (targetValueIndex == null) {
                    targetValueIndex = i;
                    continue;
                }
                int value = array[i];
                int targetValue = array[targetValueIndex];
                if (isSmallest) {
                    if (targetValue > value) {
                        targetValueIndex = i;
                    }
                } else {
                    if (targetValue < value) {
                        targetValueIndex = i;
                    }
                }
            }
            usedIndices.add(targetValueIndex);
        }
        return array[targetValueIndex];
    }
}
```

</details>

--------------------

## [Hard] Index Equals Value

> Write a function that takes in a sorted array of distinct integers and returns the first index in the array that
> is equal to the value at that index. In other words, your function should return the minimum index where index == array[index].
> If there is no such index, your function should return -1.

<details>
  <summary>Solution 1</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(1) |

```
class Program {
    public int indexEqualsValue(int[] array) {
        for (int i = 0; i < array.length; i++) {
            if (i == array[i]) {
                return i;
            }
        }
        return -1;
    }
}
```

</details>

<details>
  <summary>Solution 2</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(log(N) on avg) | O(1) |

```
class Program {
    public int indexEqualsValue(int[] array) {
        int leftIndex = 0, rightIndex = array.length - 1;
        while (leftIndex <= rightIndex) {
            int middleIndex = (rightIndex + leftIndex) / 2;
            if (middleIndex == array[middleIndex]) {
                int targetIndex = middleIndex;
                do {
                    int prevIndex = targetIndex - 1;
                    if (prevIndex < 0 || prevIndex != array[prevIndex]) {
                        break;
                    }
                    targetIndex = prevIndex;
                } while (true);
                return targetIndex;
            }
            if (middleIndex > array[middleIndex]) {
                leftIndex = middleIndex + 1;
            } else {
                rightIndex = middleIndex - 1;
            }
        }
        return -1;
    }
}
```

</details>

<details>
  <summary>Solution 3</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(log(N)) | O(1) |

```
class Program {
    public int indexEqualsValue(int[] array) {
        int leftIndex = 0, rightIndex = array.length - 1;
        while (leftIndex <= rightIndex) {
            int middleIndex = (rightIndex + leftIndex) / 2;
            if (middleIndex == array[middleIndex]) {
                if (middleIndex - 1 >= 0 && middleIndex - 1 == array[middleIndex - 1]) {
                    rightIndex = middleIndex - 1;
                    continue;
                }
                return middleIndex;
            }
            if (middleIndex > array[middleIndex]) {
                leftIndex = middleIndex + 1;
            } else {
                rightIndex = middleIndex - 1;
            }
        }
        return -1;
    }
}
```

</details>

--------------------

## [Very Hard] Iterative In-order Traversal

> Write a function that takes in a Binary Tree (where nodes have an additional pointer to their parent node) and
> traverses it iteratively using the in-order tree-traversal technique; the traversal should specifically not
> use recursion. As the tree is being traversed, a callback function passed in as an argument to the main function
> should be called on each node (i.e., callback(currentNode)).

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(H) |

```
import java.util.Stack;
import java.util.function.Function;

class Program {
    public static void iterativeInOrderTraversal(
        BinaryTree tree, Function<BinaryTree, Void> callback) {
        Stack<BinaryTreeHolder> stack = new Stack<>();
        stack.push(new BinaryTreeHolder(tree));
        do {
            BinaryTreeHolder holder = stack.peek();
            if (holder.isLeftVisited && holder.isCallbackApplied && holder.isRightVisited) {
                stack.pop();
                continue;
            }
            if (!holder.isLeftVisited) {
                holder.isLeftVisited = true;
                if (holder.tree.left != null) {
                    stack.push(new BinaryTreeHolder(holder.tree.left));
                    continue;
                }
            }
            if (!holder.isCallbackApplied) {
                holder.isCallbackApplied = true;
                callback.apply(holder.tree);
            }
            if (!holder.isRightVisited) {
                holder.isRightVisited = true;
                if (holder.tree.right != null) {
                    stack.push(new BinaryTreeHolder(holder.tree.right));
                    continue;
                }
            }
        } while (!stack.empty());
    }

    static class BinaryTreeHolder {
        public BinaryTree tree;
        public boolean isCallbackApplied = false;
        public boolean isLeftVisited = false;
        public boolean isRightVisited = false;

        public BinaryTreeHolder(BinaryTree tree) {
            this.tree = tree;
        }
    }

    static class BinaryTree {
        public int value;
        public BinaryTree left;
        public BinaryTree right;
        public BinaryTree parent;

        public BinaryTree(int value) {
            this.value = value;
        }

        public BinaryTree(int value, BinaryTree parent) {
            this.value = value;
            this.parent = parent;
        }
    }
}
```

</details>

--------------------

## [Very Hard] Square of Zeroes

> Write a function that takes in a square-shaped n x n two-dimensional array of only 1s and 0s and returns a boolean
> representing whether the input matrix contains a square whose borders are made up of only 0s. 
> Note that a 1 x 1 square doesn't count as a valid square for the purpose of this question. In other words,
> a singular 0 in the input matrix doesn't constitute a square whose borders are made up of only 0s; a square
> of zeroes has to be at least 2 x 2.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N^4) | O(1) |

```
import java.util.*;

class Program {
    private static List<List<Integer>> matrix;

    public static boolean squareOfZeroes(List<List<Integer>> matrix) {
        Program.matrix = matrix;
        int rows = matrix.size();
        int cols = matrix.get(0).size();
        int maxSide = Math.max(rows, cols);
        for (int row = 0; row < rows - 1; row++) {
            for (int col = 0; col < cols - 1; col++) {
                for (int i = 1; i < maxSide; i++) {
                    int top = row, left = col;
                    int bottom = top + i, right = left + i;
                    if (bottom >= rows || right >= cols) {
                        break;
                    }
                    if (isSquareOfZeroes(top, left, bottom, right)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    private static boolean isSquareOfZeroes(
        int top, int left, int bottom, int right
    ) {
        int size = bottom - top + 1;
        try {
            for (int i = 0; i < size - 1; i++) {
                // TopLeft => TopRight
                checkBorderCell(top, left + i);
                // TopRight => BottomRight
                checkBorderCell(top + i, right);
                // BottomRight => BottomLeft
                checkBorderCell(bottom, right - i);
                // BottomLeft => TopLeft
                checkBorderCell(bottom - i, left);
            }
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    private static void checkBorderCell(int row, int col) {
        if (get(row, col) == 1) {
            throw new RuntimeException("Border cannot contain \"1\"");
        }
    }

    private static int get(int row, int col) {
        return matrix.get(row).get(col);
    }
}
```

</details>

--------------------

## [Very Hard] Merge Sorted Arrays

> Write a function that takes in a non-empty list of non-empty sorted arrays of integers and returns a merged list
> of all of those arrays.
> The integers in the merged list should be in sorted order.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(NUM_OF_ARRAYS * MAX_ARR_LENGTH) | O(NUM_OF_ARRAYS) |

```
import java.util.*;

class Program {
    public static List<Integer> mergeSortedArrays(List<List<Integer>> arrays) {
        List<Integer> result = new ArrayList<Integer>();
        merge(arrays, result);
        return result;
    }

    private static void merge(List<List<Integer>> arrays, List<Integer> result) {
        int size = arrays.size();
        int[] pointers = new int[size];
        Arrays.fill(pointers, 0);
        Boolean done = null;
        do {
            done = true;
            Integer lowestValue = null, lowestValuePointerIndex = null;
            for (int i = 0; i < size; i++) {
                int pointer = pointers[i];
                List<Integer> array = arrays.get(i);
                boolean isPointerValid = pointer < array.size();
                if (!isPointerValid) {
                    continue;
                }
                done = false;
                int value = array.get(pointer);
                if (lowestValue == null || value < lowestValue) {
                    lowestValue = value;
                    lowestValuePointerIndex = i;
                }
            }
            if (lowestValue != null) {
                result.add(lowestValue);
                pointers[lowestValuePointerIndex]++;
            }
        } while (!done);
    }
}
```

</details>

--------------------

## [Very Hard] Rearrange Linked List

> Write a function that takes in the head of a Singly Linked List and an integer k, rearranges the list in place
> (i.e., doesn't create a brand new list) around nodes with value k, and returns its new head.
> Rearranging a Linked List around nodes with value k means moving all nodes with a value smaller than k before
> all nodes with value k and moving all nodes with a value greater than k after all nodes with value k.
> All moved nodes should maintain their original relative ordering if possible.
> Note that the linked list should be rearranged even if it doesn't have any nodes with value k.

<details>
  <summary>Solution 1</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(1) |

```
class Program {
    public static LinkedList rearrangeLinkedList(LinkedList head, int k) {
        LinkedList tmpHead = new LinkedList(Integer.MIN_VALUE);
        tmpHead.next = head;
        LinkedList left = tmpHead, prev = left, curr = head;
        while (curr != null) {
            if (curr.value <= k) {
                if (left == prev) {
                    if (curr.value != k) {
                        left = curr;
                    }
                    prev = curr;
                    curr = curr.next;
                    continue;
                }
                prev.next = curr.next;
                curr.next = left.next;
                left.next = curr;
                if (curr.value != k) {
                    left = left.next;
                }
                curr = prev.next;
            } else {
                prev = curr;
                curr = curr.next;
            }
        }
        return tmpHead.next;
    }

    static class LinkedList {
        public int value;
        public LinkedList next;

        public LinkedList(int value) {
            this.value = value;
            next = null;
        }
    }
}
```

</details>

--------------------

## [Very Hard] Linked List Palindrome

> Write a function that takes in the head of a Singly Linked List and returns a boolean representing whether
> the linked list's nodes form a palindrome. Your function shouldn't make use of any auxiliary data structure.
> A palindrome is usually defined as a string that's written the same forward and backward.
> For a linked list's nodes to form a palindrome, their values must be the same when read from left to right and
> from right to left. Note that single-character strings are palindromes, which means that single-node linked
> lists form palindromes.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(N) |

```
class Program {
    private int length = 0;
    private boolean isPalindrome = true;
    private LinkedList opposite = null;

    public boolean linkedListPalindrome(LinkedList head) {
        if (head.next == null) {
            return true;
        }
        if (head.next.next == null) {
            return head.value == head.next.value;
        }
        length = calcLength(head);
        isPalindrome = true;
        check(head, 0, (length / 2) - 1);
        return isPalindrome;
    }

    private int calcLength(LinkedList head) {
        int counter = 0;
        while (head != null) {
            counter++;
            head = head.next;
        }
        return counter;
    }

    private void check(LinkedList node, int index, int startingIndex) {
        if (index != startingIndex) {
            check(node.next, index + 1, startingIndex);
        } else {
            opposite = length % 2 == 0 ? node.next : node.next.next;
        }
        if (!isPalindrome) {
            return;
        }
        if (node.value != opposite.value) {
            isPalindrome = false;
        }
        opposite = opposite.next;
    }

    public static class LinkedList {
        public int value;
        public LinkedList next;

        public LinkedList(int value) {
            this.value = value;
            this.next = null;
        }
    }
}
```

</details>

--------------------

## [Very Hard] Node Swap

> Write a function that takes in the head of a Singly Linked List, swaps every pair of adjacent nodes in place
> (i.e., doesn't create a brand new list), and returns its new head.
> If the input Linked List has an odd number of nodes, its final node should remain the same.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N) | O(1) |

```
class Program {
    public LinkedList nodeSwap(LinkedList head) {
        if (head.next == null) {
            return head;
        }
        LinkedList newHead = head.next;
        LinkedList prev = null, curr = head, next = curr.next;
        while (curr != null && next != null) {
            if (prev != null) {
                prev.next = next;
            }
            curr.next = next.next;
            next.next = curr;

            prev = curr;
            curr = curr.next;
            next = curr != null ? curr.next : null;
        }
        return newHead;
    }

    public static class LinkedList {
        public int value;
        public LinkedList next;

        public LinkedList(int value) {
            this.value = value;
            this.next = null;
        }
    }
}
```

</details>

--------------------

## [Very Hard] Non-Attacking Queens

> Write a function that takes in a positive integer n and returns the number of non-attacking placements of n queens
> on an n x n chessboard.
> A non-attacking placement is one where no queen can attack another queen in a single turn. In other words,
> it's a placement where no queen can move to the same position as another queen in a single turn.
> In chess, queens can move any number of squares horizontally, vertically, or diagonally in a single turn.
> The chessboard above is an example of a non-attacking placement of 4 queens on a 4x4 chessboard.
> For reference, there are only 2 non-attacking placements of 4 queens on a 4x4 chessboard.

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N!) | O(N) |

```
import java.util.HashMap;
import java.util.Map;

class Program {
    private int counter = 0;
    private int size = 0;

    public int nonAttackingQueens(int n) {
        counter = 0;
        size = n;
        for (int col = 0; col < size; col++) {
            Map<Integer, Integer> queens = new HashMap<>();
            setQueen(queens, 0, col);
            placeQueens(queens, 1);
        }
        return counter;
    }

    private void placeQueens(Map<Integer, Integer> queens, int row) {
        if (row >= size) {
            counter++;
            return;
        }
        for (int col = 0; col < size; col++) {
            if (canPlaceQueen(queens, row, col)) {
                Map<Integer, Integer> queensCopy = copy(queens);
                setQueen(queensCopy, row, col);
                placeQueens(queensCopy, row + 1);
            }
        }
    }

    private boolean canPlaceQueen(Map<Integer, Integer> queens, int row, int col) {
        if (queens.containsValue(col)) {
            return false;
        }
        boolean isLeftDiagonalClean = isTopDiagonalClean(queens, row, col, true);
        boolean isRightDiagonalClean = isTopDiagonalClean(queens, row, col, false);
        return isLeftDiagonalClean && isRightDiagonalClean;
    }

    private boolean isTopDiagonalClean(
        Map<Integer, Integer> queens,
        int row, int col, boolean isGoLeft
    ) {
        while (row >= 0 && (col >= 0 || col < size)) {
            if (hasQueen(queens, row, col)) {
                return false;
            }
            row--;
            col = isGoLeft ? (col - 1) : (col + 1);
        }
        return true;
    }

    private void setQueen(Map<Integer, Integer> queens, int row, int col) {
        queens.put(row, col);
    }

    private boolean hasQueen(Map<Integer, Integer> queens, int row, int col) {
        return queens.containsKey(row) && queens.get(row) == col;
    }

    private Map<Integer, Integer> copy(Map<Integer, Integer> map) {
        return new HashMap<>(map);
    }
}
```

</details>

--------------------

## [Very Hard] Zip Linked List

> You're given the head of a Singly Linked List of arbitrary length k. Write a function that zips the Linked List
> in place (i.e., doesn't create a brand new list) and returns its head.
> A Linked List is zipped if its nodes are in the following order, where k is the length of the Linked List:
> 1st node -> kth node -> 2nd node -> (k - 1)th node -> 3rd node -> (k - 2)th node -> ...

<details>
  <summary>Solution</summary>

| Time complexity | Space complexity |
| :-------------: | :--------------: |
| O(N^2) | O(1) |

```
class Program {
    public static class LinkedList {
        public int value;
        public LinkedList next;

        public LinkedList(int value) {
            this.value = value;
            this.next = null;
        }
    }

    public static class LinkedListPair {
        public LinkedList prev;
        public LinkedList curr;

        public LinkedListPair(LinkedList prev, LinkedList curr) {
            this.prev = prev;
            this.curr = curr;
        }
    }

    public LinkedList zipLinkedList(LinkedList head) {
        LinkedList curr = head;
        while (curr.next != null) {
            LinkedListPair lastInfo = getLastInfo(curr);
            LinkedList last = lastInfo.curr;
            LinkedList lastPrev = lastInfo.prev;
            if (curr == lastPrev) {
                break;
            }
            LinkedList currNext = curr.next;
            last.next = curr.next;
            curr.next = last;
            lastPrev.next = null;
            curr = currNext;
        }
        return head;
    }

    private LinkedListPair getLastInfo(LinkedList node) {
        LinkedList prev = null, curr = node;
        while (curr.next != null) {
            prev = curr;
            curr = curr.next;
        }
        return new LinkedListPair(prev, curr);
    }
}
```

</details>
