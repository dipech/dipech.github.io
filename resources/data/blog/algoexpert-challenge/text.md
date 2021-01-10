I've decided to improve my skills of solving algorithmic questions and writing code without an IDE.
I found many services like leetcode, but decided to stick with algoexpert.io.
Here I'm publishing my solutions of questions I faced there. Every solution I published is written 
before opening any tips, hints, ready solutions, etc.
So, my way of practicing looks like that:
- Pick a question.
- Read a prompt.
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

*P.S.* This solution isn't ideal, but it passes all the test cases. It won't work if we have twin numbers.
It's better to keep not only numbers, but indices too. So, here we need a map instead of a set. 
Then we can rewrite a condition like that: `map.containsKey(number2) && number1Idx != map.get(number2)`. 
  
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

_My thoughts:_ It needs to think more carefully, I did many mistakes with this task before I see green light. 
Check an algorithm step-by-step using a paper and a pencil. 

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

_My thoughts:_ I've never thought about a little optimization by remembering how many elements are in correct places 
(see `sortedCount` in my second solution).

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
| O(n)* | O(1) |

`*` – n / 2 actually...

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

_My thoughts:_ Their solution is really smart. Traversing a range in two directions is a good approach. 
I'm only traversing it from left to right. 

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

_My thoughts:_ Argh! How can I be so stupid? I was so close to this way of calculation a transformed `K`:
```int offset = Math.abs(k) % listSize```
