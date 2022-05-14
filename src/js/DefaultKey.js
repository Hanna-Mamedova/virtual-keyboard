export class Key {
    constructor(value) {
        this.keyElement = '';
        this.value = value;
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

    onCapsLock(capsLock) {
        this.keyElement.classList.toggle('keyboard__key--active', capsLock);
    }
}

