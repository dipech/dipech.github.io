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
