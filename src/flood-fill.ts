// internal vec class
class Vec {
  constructor(public x: number, public y: number) { }

  add(v: Vec) {
    return new Vec(this.x + v.x, this.y + v.y);
  }
}

export function floodFill<T>(
  x: number,
  y: number,
  replacementValue: T,
  getValue: (x: number, y: number) => T,
  setValue: (x: number, y: number, color: T) => void,
  isInBounds: (x: number, y: number) => boolean,
  equals: (a: T, b: T) => boolean
) {
  // cast x and y to ints
  x = ~~x;
  y = ~~y;

  if (!isInBounds(x, y)) { return; }

  var pos = new Vec(x, y);

  var targetValue = getValue(x, y);

  if (equals(targetValue, replacementValue)) { return; }

  setValue(x, y, replacementValue);

  var queue: Vec[] = [];
  queue.push(pos);

  while (queue.length > 0) {

    var nodePos = queue.shift()!;
    var directions = [
      nodePos.add(new Vec(0, -1)),
      nodePos.add(new Vec(1, 0)),
      nodePos.add(new Vec(0, 1)),
      nodePos.add(new Vec(-1, 0))
    ];

    for (var i = 0; i < directions.length; i++) {
      var newPos = directions[i];
      if (isInBounds(newPos.x, newPos.y)) {
        var newNodeValue = getValue(newPos.x, newPos.y);
        if (equals(newNodeValue, targetValue)) {
          setValue(newPos.x, newPos.y, replacementValue);
          queue.push(newPos);
        }
      }
    }
  }
}