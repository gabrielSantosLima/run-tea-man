import './styles.css'
import p5 from 'p5'
import { Game } from './Game'

new p5((sketch: p5) => {
  new Game(sketch)  
})
