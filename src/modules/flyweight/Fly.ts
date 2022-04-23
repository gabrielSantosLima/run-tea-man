import p5 from "p5";

export class Fly{
  private image: p5.Image

  constructor(imagePath: string, sketch: p5){
    this.image = sketch.loadImage(imagePath)
  }

  getImage(): p5.Image{
    return this.image
  }
}