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
