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
  replacementColor: T,
  getColor: (x: number, y: number) => T,
  setColor: (x: number, y: number, color: T) => void,
  isInBounds: (x: number, y: number) => boolean,
  equals: (a: T, b: T) => boolean
) {

  var pos = new Vec(x, y);

  var targetColor = getColor(x, y);;

  if (!targetColor) { return; }

  if (equals(targetColor, replacementColor)) { return; }

  setColor(x, y, replacementColor);


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
        var newNodeColor = getColor(newPos.x, newPos.y);
        if (!newNodeColor) { continue; }
        if (equals(newNodeColor, targetColor)) {
          setColor(newPos.x, newPos.y, replacementColor);
          queue.push(newPos);
        }
      }
    }
  }
}