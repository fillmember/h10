import Rectangle from "./Rectangle";

// QuadTree
// source: http://gamedevelopment.tutsplus.com/tutorials/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space--gamedev-374

const MAX_OBJECTS = 5;
const MAX_LEVELS = 5;

export default class QuadTree {
  level: number;
  objects: Rectangle[];
  bounds: Rectangle;
  nodes: [QuadTree?, QuadTree?, QuadTree?, QuadTree?];
  // QuadTree constructor (int pLevel , Rectangle pBound )
  // creates a new QuadTree instance.
  // pLevel : tell the instance which level it is in
  // pBound : tell the instance what its coordinates are
  constructor(pLevel: number, pBounds: Rectangle) {
    // Attributes
    this.level = pLevel;
    this.objects = [];
    this.bounds = pBounds;
    this.nodes = [undefined, undefined, undefined, undefined];
  }

  // void clear()
  // clears sub-quads & data.
  clear() {
    this.objects = [];
    this.nodes.forEach(node => {
      if (node instanceof QuadTree) {
        node.clear();
      }
    });
    this.nodes = [undefined, undefined, undefined, undefined];
  }

  // void split()
  // creates four little sub-quads in this quad.
  split() {
    const subWidth = this.bounds.width / 2;
    const subHeight = this.bounds.height / 2;
    const x = this.bounds.x;
    const y = this.bounds.y;

    this.nodes[0] = new QuadTree(
      this.level + 1,
      new Rectangle(x + subWidth, y, subWidth, subHeight)
    );
    this.nodes[1] = new QuadTree(
      this.level + 1,
      new Rectangle(x, y, subWidth, subHeight)
    );
    this.nodes[2] = new QuadTree(
      this.level + 1,
      new Rectangle(x, y + subHeight, subWidth, subHeight)
    );
    this.nodes[3] = new QuadTree(
      this.level + 1,
      new Rectangle(x + subWidth, y + subHeight, subWidth, subHeight)
    );
  }

  // int getIndex( Rectangle rect )
  // returns which quadrant the passed rect is in within this QuadTree instance
  // rect - the Rectangle instance to check.
  getIndex(rect: Rectangle): number {
    let index = -1;
    //
    const verticalMidPoint = this.bounds.x + this.bounds.width / 2;
    const horizontalMidPoint = this.bounds.y + this.bounds.height / 2;
    // object can completely fit within the top quadrants
    const topQuadrant =
      rect.y < horizontalMidPoint && rect.y + rect.height < horizontalMidPoint;
    // object can completely fit within the bottom quadrants
    const bottomQuadrant = rect.y > horizontalMidPoint;

    // object can completely fit within the left quadrant
    if (rect.x < verticalMidPoint && rect.x + rect.width < verticalMidPoint) {
      if (topQuadrant) {
        index = 1;
      } else if (bottomQuadrant) {
        index = 2;
      }
    }
    // object can completely fit within the right quadrant
    else if (rect.x > verticalMidPoint) {
      if (topQuadrant) {
        index = 0;
      } else if (bottomQuadrant) {
        index = 3;
      }
    }

    return index;
  }

  // void insert ( Rectangle rect )
  // inserts a rectangle as data into the QuadTree instance.
  // rect - the Rectangle to insert.
  insert(rect: Rectangle): void {
    let index;

    if (this.nodes[0]) {
      const node = this.nodes[this.getIndex(rect)];
      if (node) {
        return node.insert(rect);
      }
    }

    this.objects.push(rect);

    if (this.objects.length > MAX_OBJECTS && this.level < MAX_LEVELS) {
      if (!this.nodes[0]) {
        this.split();
      }

      let i = 0;

      while (i < this.objects.length) {
        const node = this.nodes[this.getIndex(this.objects[i])];
        if (node) {
          node.insert(this.objects.splice(i, 1)[0]);
        } else {
          i++;
        }
      }
    }
  }

  // Array retrieve ( Array arr , Rectangle rect )
  // returns an array of stored (Rectangle)objects in the QuadTree,
  // check recursively into sub-quads.
  // arr - the result container.
  // rect - the searching scope.
  retrieve(arr: any[], rect: Rectangle) {
    const node = this.nodes[this.getIndex(rect)];

    if (node) {
      arr = arr.concat(node.retrieve(arr, rect));
    }

    arr = arr.concat(this.objects);

    return arr;
  }
}
