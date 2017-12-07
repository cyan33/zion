## Appendix: Function Utils

In game development you will propably use some of the calculation / operation utilities that are provided by Zion:

```js
const _ = zion.createUtils();

_.getRandomInt(1, 6);  // range from 1 to 6
```

- `getRandomInt(min, max);`
- `removeMultiElementFromArray(arr, ...indexes);`
- `getDistance(x1, y1, x2, y2);`
- `calculateCenter(x, y, width, height);`: x and y is the left top origin of the box.
