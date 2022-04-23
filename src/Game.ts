import p5 from "p5";
import { percentOf } from "./utils";

import { MainScreen } from "./modules/screens/MainScreen";
import { Screen } from "./modules/screens/Screen";
import { Player } from "./modules/sprites/Player";
import { Brick } from "./modules/sprites/Brick";

import TeaManImg from './assets/tea-man.png'
import BrickImg from './assets/brick.png'
import { Fly } from "./modules/flyweight/Fly";
import { Gravity } from "./modules/Gravity";

export class Game{
  private sketch: p5
  private screens: Screen[]
  private player: Player | undefined
  private bricks: Brick[]
  private gravity: Gravity
  private static SCREEN_WIDTH = 700
  private static SCREEN_HEIGHT = 700

  constructor(sketch: p5){
    this.sketch = sketch
    this.sketch.setup = this.setup
    this.sketch.draw = this.loop
    this.sketch.preload = this.preload
    this.screens = [new MainScreen({
      width: percentOf(Game.SCREEN_WIDTH, 1), 
      height: percentOf(Game.SCREEN_HEIGHT, 1), 
    })]
    this.bricks = []
    this.gravity = new Gravity(5)
  }
  
  input = (): void => {
    if(this.sketch.keyIsDown(this.sketch.RIGHT_ARROW)){
      if(this.player){
        this.player.walk_right()
      }
    }
    if(this.sketch.keyIsDown(this.sketch.LEFT_ARROW)){
      if(this.player){
        this.player.walk_left()
      }
    }
    if(this.sketch.keyIsDown(this.sketch.UP_ARROW)){
      if(this.player && this.player.onFloor){
        this.player.jump()
      }
    }
  }

  preload = (): void => {
    const brickFly = new Fly(BrickImg, this.sketch)
    const playerFly = new Fly(TeaManImg, this.sketch)
    this.player = new Player(
      { x: 0, y: percentOf(Game.SCREEN_HEIGHT, 1) - 145 }, 
      { width: 100, height: 100 }, 
      playerFly
    )
    for(let currentBrickIndex = 0; currentBrickIndex < 14; currentBrickIndex++){
      this.bricks.push(
        new Brick(
          { x: 50 * currentBrickIndex, y: percentOf(Game.SCREEN_HEIGHT, 1) - 50 }, 
          { width: 50, height: 50 }, 
          brickFly
        )
      )
    }
  }
  
  setup = (): void => {
    this.sketch.createCanvas(Game.SCREEN_WIDTH, Game.SCREEN_HEIGHT)
  }

  process = (): void => {
    this.player?.process()
  }

  draw = (): void => {
    if(this.player) this.gravity.apply(this.player)
    for(const screen of this.screens){
      screen.draw(this.sketch)
    }
    for(const brick of this.bricks){
      brick.draw(this.sketch)
    }
    this.player?.draw(this.sketch)
  }

  loop = (): void => {
    this.input()
    this.process()
    this.draw()
  }
} 