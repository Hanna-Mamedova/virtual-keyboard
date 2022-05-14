export class Key {
    constructor() {
        this.keyElement = '';
        this.value = '';
        this.capsLock = false;
        this.shift = false;
    }

    //Initialize a key
    init(){
        this.keyElement = document.createElement('button');
        this.keyElement.setAttribute("type", "button");
        this.keyElement.classList.add("keyboard__key");
        }
    
    isActive() {
        this.keyElement.classList('keyboard__key--active');
        }

    removeActive() {
        this.keyElement.classList.remove('keyboard__key--active');
        }

    createSpecialKey(classes, text) {
        this.keyElement.classList.add(...classes);
        this.keyElement.innerHTML = text;
    }
}

