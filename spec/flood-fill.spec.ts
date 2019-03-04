import { floodFill } from '../src/flood-fill';

describe("flood fill", () => {
  it("is defined", () => {
    expect(floodFill).toBeDefined();
  });

  it("can fill empty image", () => {
    var w = 5, h = 5;
    var pixels = new Array<number>(w * h);
    for (var i = 0; i < w * h; i++) pixels[i] = 0; // array fill not in es5

    var getColor = (x: number, y: number) => pixels[x + y * w];
    var setColor = (x: number, y: number, color: number) => pixels[x + y * w] = color;
    var isInBounds = (x: number, y: number) => x >= 0 && y >= 0 && x < w && y < h;
    var equals = (a: number, b: number) => a == b;

    expect(getColor(0, 0)).toEqual(0);

    floodFill(0, 0, 1, getColor, setColor, isInBounds, equals);

    var wereAllFilled = true;
    for (var i = 0; i < w * h; i++) {
      if (pixels[i] != 1) wereAllFilled = false;
    }
    expect(wereAllFilled).toEqual(true);
  });
});