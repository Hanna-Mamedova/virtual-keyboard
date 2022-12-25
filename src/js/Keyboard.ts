import { keyLayoutENG, SHIFT_CHANGE_SYMBOLS_ENG, SHIFT_CHANGED_SYMBOLS_ENG } from "./keyLayoutENG";
import { keyLayoutRUS } from "./keyLayoutRUS";
import { Key } from "./DefaultKey";

const LANGUAGE = {
    eng: 'eng',
    rus: 'rus',
}

const initialTextAreaValue = '';

export class Keyboard {
    keys: NodeListOf<Element>;
    value: string;
    language: string;
    keyLayout: string[];
    capsLockOn: boolean;
    shiftOn: boolean;
    oninput: (currentValue: string) => void;

    constructor() {
        this.value = '';
        this.language = LANGUAGE.eng;
        this.capsLockOn = false;
        this.shiftOn = false;
    }

    // INITIALIZE KEYBOARD
    init() {
        // Create main elements
        const main = document.createElement('div');
        const keysContainer = document.createElement('div');

        // Add classes to main elements
        main.classList.add('keyboard');
        keysContainer.classList.add('keyboard__keys');

        //Add keys to keysContainer
        keysContainer.append(this.createKeys());

        // Select all keys in keysContainer
        this.keys = keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        main.append(keysContainer);
        document.body.append(main);

        // Add use keyboard for elements
        this.onInput(initialTextAreaValue, (currentValue: string) => {
            console.log('currentValue', currentValue);
            const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
            textarea.value = currentValue;
            textarea.focus();
        });
    }

    // CREATE KEYS
    createKeys() {
        const FRAGMENT = document.createDocumentFragment();

        // Check language to choose correct keyLayout
        this.keyLayout = this.language === LANGUAGE.rus ? keyLayoutRUS : keyLayoutENG;

        // Looping the keylayout
        this.keyLayout.forEach(key => {

            // create a key
            const KEY = new Key(key);
            KEY.init();

            const KEY_ELEMENT = KEY.keyElement;

            const INSERT_lINEBREAK = ["Backspace", "DEL", "ENTER", "ShiftRight", "&#9658;"].indexOf(key) !== -1;

            // Add styles and listeners to keys
            switch (key) {
                // BACKSPACE READY
                case "Backspace":
                    KEY.createSpecialKey(["keyboard__key-special-wide"], "Backspace", "Backspace");

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.deleteBackSpace();
                    });

                    break;

                // TAB READY
                case "Tab":
                    KEY.createSpecialKey(["keyboard__key-special"], "Tab", "Tab")

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.tab();
                    });

                    break;

                // DELETE READY
                case "Del":
                    KEY.createSpecialKey(["keyboard__key-special"], "Del", "Delete");

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.delDelete();
                    });

                    break;

                // CAPS LOCK READY
                case "Caps Lock":
                    KEY.createSpecialKey(["keyboard__key-special-wide"], "Caps Lock", "CapsLock");
                    KEY_ELEMENT.addEventListener("click", () => {
                        this.capsLock(KEY);
                    });
                    break;

                // ENTER READY
                case "Enter":
                    KEY.createSpecialKey(["keyboard__key-special-wide"], "ENTER", "Enter");
                    KEY_ELEMENT.addEventListener("click", () => {
                        this.enter();
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
                        this.value += this.capsLockOn ? key.toUpperCase() : key.toLowerCase();
                        this.triggerEvent(this.oninput);
                    });

                    break;
            }

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
    triggerEvent(handler: (currentValue: string) => void) {
        if (typeof handler == "function") {
            handler(this.value);
        }
    }

    onInput(initialValue: string, currentValue: (currentValue: string) => void) {
        this.value = initialValue || initialTextAreaValue;
        this.oninput = currentValue;
    }

    //BUTTONS ACTIONS

    //READY
    deleteBackSpace() {
        const textarea = document.querySelector("textarea");
        const caretPosition = textarea.selectionStart;
        this.value = this.value.slice(0, caretPosition - 1) + this.value.slice(caretPosition);
        this.triggerEvent(this.oninput);
        textarea.selectionEnd = caretPosition - 1;
    }

    //READY
    tab() {
        const tabEl = "    ";
        const caretPositionChange = 4;
        this.insertEl(tabEl, caretPositionChange);
        this.triggerEvent(this.oninput);
    }

    //READY
    delDelete() {
        const textarea = document.querySelector("textarea");
        const caretPosition = textarea.selectionStart;
        this.value = this.value.slice(0, caretPosition) + this.value.slice(caretPosition + 1);
        this.triggerEvent(this.oninput);
        textarea.selectionEnd = caretPosition;
    }

    // READY
    capsLock(key: Key) {
        this.capsLockOn = !this.capsLockOn;
        if (this.capsLockOn) {
            key.isActive();
        } else {
            key.removeActive();
        }
        this.changeKeyCase();
    }

    //READY
    enter() {
        const enterEl = "\n";
        const caretPositionChange = 1;
        this.insertEl(enterEl, caretPositionChange);
        this.triggerEvent(this.oninput);
    }

    // onShift() {
    //     for (const key of this.keys) {
    //         if (SHIFT_CHANGE_SYMBOLS.includes(key.textContent)) {
    //             key.textContent = SHIFT_CHANGED_SYMBOLS[SHIFT_CHANGE_SYMBOLS.indexOf(key.textContent)];
    //         }
    //     }
    // }

    // TEXTAREA/KEYBOARD ACTIONS
    insertEl(el: string, caretPositionChange: number) {
        const textarea = document.querySelector("textarea");
        const caretPosition = textarea.selectionStart;
        const arr = this.value.split('');
        arr.splice(caretPosition, 0, el);
        this.value = arr.join('');
        this.triggerEvent(this.oninput);
        textarea.selectionEnd = caretPosition + caretPositionChange;
    }

    changeKeyCase() {
        for (const key of this.keys) {
            if (key.classList.contains("changeCase")) {
                key.textContent = this.capsLockOn || this.shiftOn ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    }

    // SHIFT HANDLER
    // TODO!!! - to FINISH
    toggleShift() {
        this.shiftOn = !this.shiftOn;
        this.changeKeyCase();
    }

    switchLanguage() { }

}