import p5 from "p5";
import { Dimension } from "../Dimension";
import { ElementDrawable } from "../Element";

export abstract class Screen implements ElementDrawable{
  dimension: Dimension

  constructor(dimension: Dimension){
    this.dimension = dimension
  }
  
  abstract draw(sketch: p5): void
}