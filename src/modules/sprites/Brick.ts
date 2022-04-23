import { Coordinate } from "../Coordinate";
import { Dimension } from "../Dimension";
import { Fly } from "../flyweight/Fly";
import { Sprite } from "./Sprite";

export class Brick extends Sprite{
  constructor(coordinate: Coordinate, dimension: Dimension, fly: Fly){
    super(coordinate, dimension, fly, 1, 1, 1)
  }
}