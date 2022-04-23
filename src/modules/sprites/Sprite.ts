import { Coordinate } from "../Coordinate";
import { Dimension } from "../Dimension";
import { DrawableElement } from "../Element";
import { Fly } from "../flyweight/Fly";

export class Sprite implements DrawableElement{
  private currentRow: number
  private currentColumn: number

  constructor(
    public coordinate: Coordinate, 
    public dimension: Dimension, 
    public fly: Fly,
    public rows: number,
    public columns: number,
    public frames: number
  ){
    this.currentRow = 1;
    this.currentColumn = 1;
  }

  nextFrame(): void{
    const currentFrames = (this.currentRow - 1 * this.columns) + this.currentColumn
    if(currentFrames === this.frames){
      this.currentColumn = 1
      this.currentRow = 1
      return
    }
    if(this.currentColumn === this.columns){
      this.currentColumn = 1
      
      if(this.currentRow === this.rows){
        this.currentRow = 1
      }else{
        this.currentRow += 1
      }
    }else{
      this.currentColumn += 1
    }
  }

  isColliding(target: Sprite): boolean{
    return (
      this.coordinate.x + this.dimension.width >= target.coordinate.x &&
      this.coordinate.x <= target.coordinate.x + target.dimension.width &&
      this.coordinate.y + this.dimension.height >= target.coordinate.y &&
      this.coordinate.y <= target.coordinate.y + target.dimension.height
    )
  }

  draw(sketch: import("p5")): void {
    sketch.image(
      this.fly.getImage(), 
      this.coordinate.x, 
      this.coordinate.y, 
      this.dimension.width,
      this.dimension.height,
      (this.currentColumn - 1) * this.dimension.width,
      (this.currentRow - 1) * this.dimension.height,
      this.dimension.width,
      this.dimension.height
    )
  }

}