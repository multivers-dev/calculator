import { Component, signal } from '@angular/core';
@Component({
  standalone: true,
  imports: [],
  selector: 'calculator-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  result = signal(0)
  sign = signal('')
  lastAction = signal('')
  number = signal(0)

  

  
multiply(){
  // this.result.update((value) => value = value *value)
  this.sign.update(() => '*')
}
plus(){
  // this.result.update((value) => value = value + value)
  this.sign.update(() => '+')
}
minus(){
  this.sign.update(() => '-')
}
percent(){
  this.result.update((value) => value = value / 100)
}
updateNumber(n: number){
  this.number.update((value) => value = n)
}

equal(){
  this.result.update((value) => { 

    if (this.sign() === '-'){
      value = value - this.number()
    }
    else  if (this.sign() === '+'){
      value = value + this.number()
    }
    else  if (this.sign() === '*'){
      value = value * this.number()
    }
    return value
  })
}
reset() {
  this.result.set(0)
}

}
