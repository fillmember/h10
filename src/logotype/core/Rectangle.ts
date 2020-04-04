export default class Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  reference: any;
  constructor(x: number, y: number, w: number, h: number, ref?: any) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.reference = ref;
  }
}
