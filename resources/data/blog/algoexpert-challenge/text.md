## [#1][Easy] Nth Fibonacci

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

## [#16][Medium] River Sizes

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
