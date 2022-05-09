export class Key {
    constructor(value) {
        this.keyElement = '';
        this.value = value;
        this.capsLock = false;
        this.shift = false;
        this.language = 'eng';
    }

    //Initialize a key
    init(){
        this.keyElement = document.createElement('button');
        this.keyElement.setAttribute("type", "button");
        this.keyElement.classList.add("keyboard__key");
        this.keyElement.textContent = this.value;
        }
        
    onClick() {
        this.keyElement.addEventListener('click', () => {
        this.value += this.capsLock ? this.value.toUpperCase() : this.value.toLowerCase();
        })
    }
        
    onKeyPress() {
        this.keyElement.addEventListener('keydown', () => {
        this.value += this.capsLock ? this.value.toUpperCase() : this.value.toLowerCase();
        })
    }
}
