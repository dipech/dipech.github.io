## Memoization

It's used to avoid executing the same task more than once.

The idea is to store the results of computation in a map, for instance.

It's often used to optimize recursive algorithms.

Without memoization:
```
int fib(int n) {
    if (n == 1) return 0;
    if (n == 2) return 1;
    return fib(n - 1) + fib(n - 2);
}
```

With memoization:
```
Map<Integer, Integer> memo = new HashMap<>();
int fib(int n) {
    if (memo.containsKey(n)) {
        return memo.get(n);
    }
    if (n == 1) return 0;
    if (n == 2) return 1;
    int result = fib(n - 1) + fib(n - 2);
    memo.put(n, result);
    return result;
}
```

## Pointers approach

It's especially often applied to sorted arrays.

Define pointers on both sides of the array and move pointers towards each other:
```
int pLeft = 0, pRight = array.length - 1;
while (pLeft < pRight) {
    // Do something, then move one or both pointers
    pLeft++;
    pRight--;
}
```

Note that it's better to go from outside to inside (approach 1):

```
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
     ^                          ^
   pLeft                      pRight
```

Rather than from inside to outside (approach 2):

```
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                 ^  ^
             pLeft  pRight
```

`Approach 1` is easier, because you don't need to calculate middle indices, and you don't need 
to handle edge cases on borders as well.

## Dynamic programming

This is an approach where you use iteratively calculate something based on previously calculated steps.

Typically, you would have an array with some precalculated basic values.

For instance, for Fibonacci numbers:
```
int fib(int n) {
    int[] data = new int[n + 3];
    data[0] = 0;
    data[1] = 1;
    data[2] = 1;
    for (int i = 3; i <= n; i++) {
        data[i] = data[i - 1] + data[i - 2];
    }
    return data[n];
}
```

## Calculating offset

In some questions it needs to find a new index based on the current index, and the given offset.
The problem is that the offset can be a large number, and a negative number as well.

```
int calcIndex(int arraySize, int index, int jump) {
    int nextIndex = (index + jump) % arraySize;
    return nextIndex >= 0 ? nextIndex : arraySize + nextIndex;
}
```

## Building a histogram

```
String text = "abbccc123";
Map<Character, Integer> charsHist = new HashMap<>();
for (int i = 0; i < text.length(); i++) {
    char ch = text.charAt(i);
    charsHist.putIfAbsent(ch, 0);
    charsHist.computeIfPresent(ch, (key, val) -> val + 1);
}
```

## Expand from the middle

In some questions you need to find a subarray in some bigger array. For instance, you need to find the longest 
palindrome in a string. Or the longest peak in a heightmap data.
The simplest way of doing it is to iterate over the array, find a peak/a middle of smth, then invoke expand function
to determine the length of the subarray.

For instance, we're given the array:
```
[3 1 0 5 10 12 13 15 18 17 4 2 1 0 -1 3]
```

Determine peaks ( O(N) ):
```
[3 1 0 5 10 8 12 13 15 18 17 4 2 1 0 -1 3 2]
         ^             ^                ^
```

Then call smth like `int length = calcLength(array, centerIndex);`

It does smth like that:
```
int pointerLeft = centerIndex, pointerRight = centerIndex;
while (canGoLeft(pointerLeft)) {
    pointerLeft--;
}
while (canGoRight(pointerRight)) {
    pointerRight++;
}
int length = pointerRight - pointerLeft;
```

The same approach can be used for determining the longest palindrome.
