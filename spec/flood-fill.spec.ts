import { floodFill } from '../src/flood-fill';

class TestCanvas {
  pixels: number[];

  constructor(public w: number, public h: number) {
    this.pixels = new Array<number>(this.w * this.h);
    for (var i = 0; i < this.w * this.h; i++) this.pixels[i] = 0; // array fill not in es5
  }

  getColor = (x: number, y: number) => this.pixels[x + y * this.w];
  setColor = (x: number, y: number, color: number) => this.pixels[x + y * this.w] = color;
  isInBounds = (x: number, y: number) => x >= 0 && y >= 0 && x < this.w && y < this.h;
  equals = (a: number, b: number) => a == b;
}

describe("flood fill", () => {
  it("is defined", () => {
    expect(floodFill).toBeDefined();
  });

  it("can fill empty image", () => {
    var buffer = new TestCanvas(5, 5);

    expect(buffer.getColor(0, 0)).toEqual(0);

    floodFill(
      0, 0,
      1,
      buffer.getColor.bind(buffer),
      buffer.setColor.bind(buffer),
      buffer.isInBounds.bind(buffer),
      buffer.equals.bind(buffer)
    );

    var wereAllFilled = true;
    for (var i = 0; i < buffer.w * buffer.h; i++) {
      if (buffer.pixels[i] != 1) wereAllFilled = false;
    }
    expect(wereAllFilled).toEqual(true);
  });
});