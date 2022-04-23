import p5 from "p5";
import { Coordinate } from "./Coordinate";
import { Dimension } from "./Dimension";
import { Speed } from "./Speed";

export interface Element{}

export interface DrawableElement extends Element{
  draw(sketch: p5): void
}

export interface MobileElement extends DrawableElement{
  xSpeed: Speed
  ySpeed: Speed
  coordinate: Coordinate
  startCoordinate: Coordinate
  dimension: Dimension
}