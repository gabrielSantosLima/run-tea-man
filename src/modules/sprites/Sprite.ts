import { Coordinate } from "../Coordinate";
import { Dimension } from "../Dimension";
import { ElementDrawable } from "../Element";
import { Fly } from "../flyweight/Fly";

export class Sprite implements ElementDrawable{
  constructor(public coordinate: Coordinate, public dimension: Dimension, public fly: Fly){}

  draw(sketch: import("p5")): void {
    sketch.image(this.fly.getImage(), this.coordinate.x, this.coordinate.y)
  }

}