## [#1][Easy] Nth Fibonacci

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
