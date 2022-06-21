import { SHIFT_CHANGE_SYMBOLS, SHIFT_CHANGED_SYMBOLS } from './keyLayoutENG'

export class Key {
    constructor(value) {
        this.keyElement = '';
        this.value = value;
        this.shift = 'false';
    }

    //Initialize a key
    init(){
        this.keyElement = document.createElement('button');
        this.keyElement.setAttribute("type", "button");
        this.keyElement.classList.add("keyboard__key");
        }
    
    isActive() {
        this.keyElement.classList.add('keyboard__key--active');
        }

    removeActive() {
        this.keyElement.classList.remove('keyboard__key--active');
        }

    createSpecialKey(classes, text, value) {
        this.keyElement.classList.add(...classes);
        this.keyElement.innerHTML = text;
        this.value = value;
    }

    onShift() {
        this.shift = !this.shift;
        if (SHIFT_CHANGE_SYMBOLS.includes(this.value)) {
            this.keyElement.textContent = SHIFT_CHANGED_SYMBOLS[SHIFT_CHANGE_SYMBOLS.indexOf(this.keyElement.textContent)];
        }
    }

}

