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

    createSpecialKey(classes: string[], text: string, value: string) {
        this.keyElement.classList.add(...classes);
        this.keyElement.innerHTML = text;
        this.keyElement.setAttribute('value', value);
        this.value = value;
    }
}

