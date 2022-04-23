import { Dimension } from "../Dimension";
import { Screen } from "./Screen";

export class MainScreen extends Screen{
  constructor(dimension: Dimension){
    super(dimension)
  }

  draw(sketch: import("p5")): void {
    sketch.background(0,0,0)
    sketch.fill(255)
    sketch.rect(0,0,this.dimension.width,this.dimension.height)
  }
}