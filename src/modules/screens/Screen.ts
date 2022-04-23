import p5 from "p5";
import { Dimension } from "../Dimension";
import { DrawableElement } from "../Element";

export abstract class Screen implements DrawableElement{
  dimension: Dimension

  constructor(dimension: Dimension){
    this.dimension = dimension
  }
  
  abstract draw(sketch: p5): void
}