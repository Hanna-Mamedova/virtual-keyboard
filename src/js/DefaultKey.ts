import { SHIFT_CHANGE_SYMBOLS_ENG, SHIFT_CHANGED_SYMBOLS_ENG } from './keyLayoutENG'

export class Key {
    keyElement: HTMLButtonElement;
    value: string;
    shift: boolean;

    constructor(value: string) {
        this.value = value;
    }

    init() {
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

    createSpecialKey(classes: string[], text: string, value: string) {
        this.keyElement.classList.add(...classes);
        this.keyElement.innerHTML = text;
        this.value = value;
    }
}

