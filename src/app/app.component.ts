import {Component, signal, WritableSignal} from '@angular/core';
import {DecimalPipe, NgIf} from "@angular/common";

@Component({
    standalone: true,
    imports: [
        NgIf],
    selector: 'calculator-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    result = signal('0')
    sign = signal('')
    lastAction = signal('')
    number = signal('0')

    operate(signe : string) {
        let setResultToZero = true
        /*
        * If we have a signe and a number and a lastAction and a result
        * We need to calculate the result before doing the next operation
         */
        if(this.sign() !== '' && this.number() !== '0' && this.lastAction() !== '' && this.result() !== '0') {
            this.equal()
            setResultToZero = false
        }
        switch (signe) {
            case '+':
                this.sign.update(() => '+')
                break
            case '-':
                this.sign.update(() => '-')
                break
            case '*':
                this.sign.update(() => '*')
                break
            case '/':
                this.sign.update(() => '/')
                break
            default:
                break
        }
        this.lastAction.set(this.result())
        if (setResultToZero) {
            this.result.set('0')
        }
        this.number.set('0')
    }


    percent() {
         this.result.update((value) => value = (Number(value) / 100).toString())
         this.number.update((value) => value = (Number(value) / 100).toString())
    }

    updateNumber(n: number) {

        if (this.number() === '0') {
            this.number.update((value) => value = n.toString())
            this.result.update((value) => value = n.toString())
            return
        }
        this.number.update((value) => value = value + n.toString())
        this.result.update((value) => value = value + n.toString())

    }

    changeSigne() {
        this.number.update((value) => value = (Number(value) * -1).toString())
        this.result.update((value) => value = (Number(value) * -1).toString())
    }

    addDot() {
        if (this.number().includes('.')) {
            return
        }
        if (this.number() === '0') {
            this.number.update((value) => value = '0.')
            this.result.update((value) => value = '0.')
            return
        }
        this.number.update((value) => value = value + '.')
        this.result.update((value) => value = value + '.')
    }

    equal() {
        let result = 0
        switch (this.sign()) {
            case '+':
                result = Number(this.lastAction()) + Number(this.number())
                break
            case '-':
                result = Number(this.lastAction()) - Number(this.number())
                break
            case '*':
                result = Number(this.lastAction()) * Number(this.number())
                break
            case '/':
                result = Number(this.lastAction()) / Number(this.number())
                break
            default:
                break
        }
        this.result.set(result.toString())
        this.lastAction.set(result.toString())
    }

    reset() {
        this.result.set('0')
        this.sign.set('')
        this.lastAction.set('')
        this.number.set('0')
    }

}
