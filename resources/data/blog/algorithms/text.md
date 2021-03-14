## Sorted arrays

### Pointers approach

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
