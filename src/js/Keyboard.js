import { keyLayoutENG, SHIFT_CHANGE_SYMBOLS, SHIFT_CHANGED_SYMBOLS } from "./keyLayoutENG";
import { keyLayoutRUS } from "./keyLayoutRUS";
import { Key } from "./DefaultKey";

export class Keyboard {
    constructor() {
        this.main = "";
        this.keysContainer = "";
        this.keys = [];
        this.value = '';
        this.language = 'eng';
        this.capsLock = false;
        this.shift = false;
        this.oninput = null;
    }

    // INITIALIZE KEYBOARD
    init() {
        // Create main elements
        this.main = document.createElement('div');
        this.keysContainer = document.createElement('div');

        // Add classes to main elements
        this.main.classList.add('keyboard');
        this.keysContainer.classList.add('keyboard__keys');

        //Add keys to keysContainer
        this.keysContainer.append(this.createKeys());

        // Select all keys in keysContainer
        this.keys = this.keysContainer.querySelectorAll(".keyboard__key")

        // Add to DOM
        this.main.append(this.keysContainer);
        document.body.append(this.main);

        // Add use keyboard for elements
        this.onInput('', function (currentValue) {
            document.querySelector("textarea").value = currentValue;
        });
    }

    // CREATE KEYS
    createKeys() {
        const FRAGMENT = document.createDocumentFragment();
        let keyLayout = [];

        // Check language to choose correct keyLayout
        if (this.language == 'eng') {
            keyLayout = keyLayoutENG;
        } else if (this.language == 'rus') {
            keyLayout = keyLayoutRUS;
        }

        // Looping the keylayout
        keyLayout.forEach(key => {

            // create a key
            const KEY = new Key(key);
            KEY.init();

            const KEY_ELEMENT = KEY.keyElement;

            const INSERT_lINEBREAK = ["Backspace", "DEL", "ENTER", "ShiftRight", "&#9658;"].indexOf(key) !== -1;
  
            //Add effect of pressing a key on a physical keyboard highlights the key on the virtual keyboard

            // !!! оставлять CapsLock включенным

            // Add styles and listeners to keys
            switch (key) {
                // BACKSPACE
                case "Backspace":
                    KEY.createSpecialKey(["keyboard__key-special-wide"], "Backspace", "Backspace")

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.value = this.value.substring(0, this.value.length - 1);
                        this.triggerEvent(this.oninput);
                    });

                    break;

                // TAB
                case "Tab":
                    KEY.createSpecialKey(["keyboard__key-special"], "Tab", "Tab")

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.value += "    ";
                        this.triggerEvent(this.oninput);
                    });

                    break;

                // ADD EVENTLISTENER TO DELETE!!!
                case "Del":
                    KEY.createSpecialKey(["keyboard__key-special"], "Del", "Delete");

                    KEY_ELEMENT.addEventListener("click", () => {
                        // this.value = this.value.substring(0, this.properties.value - 1);
                        this.triggerEvent(this.oninput);
                    });

                    break;

                // CAPS LOCK
                case "Caps Lock":
                    KEY.createSpecialKey(["keyboard__key-special-wide"], "Caps Lock", "CapsLock");

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.toggleCapsLock();
                        console.log('PRESS', this.capsLock);
                    });

                    break;

                // ENTER
                case "Enter":
                    KEY.createSpecialKey(["keyboard__key-special-wide"], "ENTER", "Enter");

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.value += "\n";
                        this.triggerEvent(this.oninput);
                    });

                    break;

                // !!! ADD EVENTLISTENER TO SHIFT!!!
                case "ShiftRight":
                    KEY.createSpecialKey(["keyboard__key-special-wide"], "Shift", "ShiftRight");
                    
                    KEY_ELEMENT.addEventListener("mousedown", () => {
                        this.toggleShift();
                    });
                    KEY_ELEMENT.addEventListener("mouseup", () => {
                        this.toggleShift();
                    });

                    break;

                case "ShiftLeft":
                    KEY.createSpecialKey(["keyboard__key-special-wide"], "Shift", "ShiftLeft");

                    KEY_ELEMENT.addEventListener("mousedown", () => {
                        this.toggleShift();
                    });
                    KEY_ELEMENT.addEventListener("mouseup", () => {
                        this.toggleShift();
                    });

                    break;

                // SPACE
                case "Space":
                    KEY.createSpecialKey(["keyboard__key-space"], "", "Space");

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.value += ' ';
                        this.triggerEvent(this.oninput);
                    });

                    break;

                // ADD HANDLERS TO ARROW KEYS
                case "up":
                    KEY.createSpecialKey(["keyboard__key-special"], "&#9650", "ArrowUp");

                    KEY_ELEMENT.addEventListener("click", () => {
                        // KEY_ELEMENT.value += " ";
                    });

                    break;

                case "down":
                    KEY.createSpecialKey(["keyboard__key-special"], "&#9660", "ArrowDown");

                    KEY_ELEMENT.addEventListener("click", () => {
                        // KEY_ELEMENT.value += " ";
                    });

                    break;

                case "left":
                    KEY.createSpecialKey(["keyboard__key-special"], "&#9668", "ArrowLeft");

                    KEY_ELEMENT.addEventListener("click", () => {
                        // KEY_ELEMENT.value += " ";
                    });

                    break;

                case "right":
                    KEY.createSpecialKey(["keyboard__key-special"], "&#9658", "ArrowRight");

                    KEY_ELEMENT.addEventListener("click", () => {
                        // KEY_ELEMENT.value += " ";
                    });

                    break;

                // CTRL
                case "CtrlLeft":
                    KEY.createSpecialKey(["keyboard__key-special"], "ctrl", "ControlLeft");

                    break;
                    
                case "CtrlRight":
                    KEY.createSpecialKey(["keyboard__key-special"], "ctrl", "ControlRight");

                    break;
                
                // ALT
                case "AltLeft":
                    KEY.createSpecialKey(["keyboard__key-special"], "alt", "AltLeft");

                    break;

                case "AltRight":
                    KEY.createSpecialKey(["keyboard__key-special"], "alt", "AltRight");

                    break;

                case "Win":
                    KEY.createSpecialKey(["keyboard__key-special"], "win", "Meta");
                    break;

                // DEFAULT KEYS 
                default:
                    KEY.value = key.toLowerCase();
                    
                    KEY_ELEMENT.textContent = KEY.value;
                    KEY_ELEMENT.classList.add("changeCase");

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.value += this.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this.triggerEvent(this.oninput);
                    });

                    break;
            }

            // ПЕРЕДЕЛАТЬ НАЖАТИЕ КНОПОК!!!! ЧТОБЫ НЕ СРАБАТЫВАЛИ ВСЕ СРАЗУ!!!!

            window.addEventListener('keydown', (e) => {
                // console.log('Value: --', e);
                if (e.key == KEY.value || e.code == KEY.value) {
                    KEY.isActive();
                }

                if(e.key == 'CapsLock') {
                    this.toggleCapsLock();
                    console.log('CAPSLOCK--', this.capsLock);
                }

            })

            window.addEventListener('keyup', () => {
                if (KEY_ELEMENT.classList.contains('keyboard__key--active')) {
                    KEY.removeActive();
                }
            })


            // Add each keyElement to fragment
            FRAGMENT.append(KEY_ELEMENT);

            // Add line break after keyElement
            if (INSERT_lINEBREAK) {
                FRAGMENT.append(document.createElement("br"));
            }

        });

        return FRAGMENT;
    }



    // TRIGGER EVENT
    triggerEvent(handler) {
        if (typeof handler == "function") {
            handler(this.value);
        }
    }

    onInput(initialValue, currentValue) {
        this.value = initialValue || "";
        this.oninput = currentValue;
    }

    onChangeCase() {
        for (const key of this.keys) {
            if (key.classList.contains("changeCase")) {
                key.textContent = this.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    }

    // onShift() {
    //     for (const key of this.keys) {
    //         if (SHIFT_CHANGE_SYMBOLS.includes(key.textContent)) {
    //             key.textContent = SHIFT_CHANGED_SYMBOLS[SHIFT_CHANGE_SYMBOLS.indexOf(key.textContent)];
    //         }
    //     }
    // }

    // CAPSLOCK HANDLER
    toggleCapsLock() {
        this.capsLock = !this.capsLock;
        this.onChangeCase();
    }

    // SHIFT HANDLER
    // TODO!!! - to FINISH
    toggleShift() { 
        this.shift = !this.shift;
        this.toggleCapsLock();
    }

    switchLanguage() { }

}