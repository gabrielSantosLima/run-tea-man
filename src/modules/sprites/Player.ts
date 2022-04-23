import { Coordinate } from "../Coordinate";
import { Dimension } from "../Dimension";
import { MobileElement } from "../Element";
import { Fly } from "../flyweight/Fly";
import { Speed } from "../Speed";
import { Sprite } from "./Sprite";

export class Player extends Sprite implements MobileElement{
  currentFrame: number
  onFloor: boolean
  startCoordinate: Coordinate
  xSpeed: Speed
  ySpeed: Speed

  constructor(coordinate: Coordinate, dimension: Dimension, fly: Fly){
    super(coordinate, dimension, fly, 1, 13, 13)
    this.currentFrame = 1
    this.startCoordinate = { x: coordinate.x, y: coordinate.y }
    this.xSpeed = { velocity: 0, aceleration: 0 }
    this.ySpeed = { velocity: 1, aceleration: 1 }
    this.onFloor = true
  }

  walk_right(): void{
    this.coordinate.x += 1
    this.nextFrame()
  }
  
  walk_left(): void{
    this.coordinate.x += -1
    this.nextFrame()
  }

  jump(): void{
    this.ySpeed.aceleration = 20
    this.onFloor = false
  }

  process(): void{
    if(this.ySpeed.aceleration > 0){
      this.ySpeed.aceleration += -1
    }else if(!this.onFloor){
      this.ySpeed.aceleration = 0
    }
    this.coordinate.y -= this.ySpeed.velocity * this.ySpeed.aceleration 
    this.onFloor = this.coordinate.y >= this.startCoordinate.y
  }

}