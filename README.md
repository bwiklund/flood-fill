# flood-fill

A generic flood fill algorithm that works on arbitrary 2d data.

## Features

This library makes as few assumptions about your data set as possible, and requires you to implement a few simple methods to adapt the algorithm to it.

## Usage

```ts
floodFill<T>(
  // start coordindates
  x, y,

  // color or value to replace with
  replacementColor,

  // method that returns color at coordinates
  (x, y) => foo.myGetColor(x, y),

  // method that set color at coordinates.
  // NOTE: the color passed in will be the same object
  // instance as `replacementColor`, so clone it or read
  // its parameters appropriately
  (x, y, c) => foo.mySetColor(x, y, c),

  // bounds check
  (x, y) => foo.myIsInBounds(x, y),

  // equality check, since can operate on basic types as well as objects
  (a, b) => a == b
);
```