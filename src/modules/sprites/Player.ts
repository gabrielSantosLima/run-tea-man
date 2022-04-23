import { Coordinate } from "../Coordinate";
import { Dimension } from "../Dimension";
import { Fly } from "../flyweight/Fly";
import { Sprite } from "./Sprite";

export class Player extends Sprite{
  currentFrame: number
  gravity: number
  yStart: number
  ySpeed: number
  yAceleration: number
  onFloor: boolean

  constructor(coordinate: Coordinate, dimension: Dimension, fly: Fly){
    super(coordinate, dimension, fly)
    this.currentFrame = 1
    this.gravity = 1
    this.yStart = coordinate.y
    this.ySpeed = 1
    this.yAceleration = 0
    this.onFloor = true
  }

  walk_right(){
    this.coordinate.x += 1
  }

  walk_left(){
    this.coordinate.x += -1
  }

  draw(sketch: import("p5")): void {
    if(this.currentFrame > 12){
      this.currentFrame = 1
    }else if(this.currentFrame < 1){
      this.currentFrame = 12
    }

    if(this.yAceleration > 0){
      this.yAceleration += -1
    }
    
    this.coordinate.y -= this.ySpeed * this.yAceleration 
    
    if(this.coordinate.y < this.yStart ){
      this.coordinate.y += this.gravity
    }
    
    this.onFloor = this.coordinate.y === this.yStart

    sketch.image(
      this.fly.getImage(), 
      this.coordinate.x, 
      this.coordinate.y, 
      this.dimension.width,
      this.dimension.height,
      this.currentFrame * this.dimension.width,
      0,
      this.dimension.width,
      this.dimension.height
    )
  }

}