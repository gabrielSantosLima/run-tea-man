import p5 from "p5";

export interface Element{
}

export interface ElementDrawable extends Element{
  draw(sketch: p5): void
}