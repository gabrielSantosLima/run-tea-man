import p5 from "p5";
import { percentOf } from "./utils";

import { MainScreen } from "./modules/screens/MainScreen";
import { Screen } from "./modules/screens/Screen";
import { Player } from "./modules/sprites/Player";
import { Brick } from "./modules/sprites/Brick";

import TeaManImg from './assets/tea-man.png'
import BrickImg from './assets/brick.png'
import { Fly } from "./modules/flyweight/Fly";

export class Game{
  private sketch: p5
  private screens: Screen[]
  private player: Player | undefined
  private bricks: Brick[]
  private static SCREEN_WIDTH = 700
  private static SCREEN_HEIGHT = 700

  constructor(sketch: p5){
    this.sketch = sketch
    this.sketch.setup = this.setup
    this.sketch.draw = this.draw
    this.sketch.preload = this.preload
    this.screens = [new MainScreen({
      width: percentOf(Game.SCREEN_WIDTH, 1), 
      height: percentOf(Game.SCREEN_HEIGHT, 1), 
    })]
    this.bricks = []
  }
  
  keyPressed = () => {
    if(this.sketch.keyIsDown(this.sketch.RIGHT_ARROW)){
      if(this.player){
        this.player.walk_right()
        this.player.currentFrame += 1
      }
    }
    if(this.sketch.keyIsDown(this.sketch.LEFT_ARROW)){
      if(this.player){
        this.player.walk_left()
        this.player.currentFrame -= 1
      }
    }
    if(this.sketch.keyIsDown(this.sketch.UP_ARROW)){
      if(this.player && this.player.onFloor){
        this.player.yAceleration = 10
        this.player.onFloor = false
      }
    }
  }

  preload = () => {
    const brickFly = new Fly(BrickImg, this.sketch)
    const playerFly = new Fly(TeaManImg, this.sketch)
  
    for(let currentBrickIndex = 0; currentBrickIndex < 22; currentBrickIndex++){
      this.bricks.push(
        new Brick(
          { x: 32 * currentBrickIndex, y: percentOf(Game.SCREEN_HEIGHT, 0.9) }, 
          { width: 32, height: 32 }, 
          brickFly
        )
      )
    }
    this.player = new Player({ x: 0, y: percentOf(Game.SCREEN_HEIGHT, 0.9) - 95 }, { width: 100, height: 100 }, playerFly)
  }

  setup = () => {
    this.sketch.createCanvas(Game.SCREEN_WIDTH, Game.SCREEN_HEIGHT)
  }

  draw = () => {
    this.keyPressed()
    for(const screen of this.screens){
      screen.draw(this.sketch)
    }
    for(const brick of this.bricks){
      brick.draw(this.sketch)
    }
    this.player?.draw(this.sketch)
  }
} 