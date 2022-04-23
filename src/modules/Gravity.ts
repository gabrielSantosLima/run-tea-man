import { MobileElement } from "./Element";

export class Gravity{
  constructor(public value: number){}

  apply(mobileElement: MobileElement): void{
    if(mobileElement.startCoordinate.y > mobileElement.coordinate.y){
      mobileElement.coordinate.y += this.value
    }
  }
}