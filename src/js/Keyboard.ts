import { keyLayoutENG, SHIFT_CHANGE_SYMBOLS_ENG, SHIFT_CHANGED_SYMBOLS_ENG } from "./keyLayoutENG";
import { keyLayoutRUS } from "./keyLayoutRUS";
import { Key } from "./Key";

enum LANGUAGE {
    eng ='eng',
    rus ='rus',
}

enum Arrows {
    up = "&#9650",
    down = "&#9660",
    left = "&#9668",
    right = "&#9658",
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

            const INSERT_lINEBREAK = ["Backspace", "DEL", "ENTER", "ShiftRight"].indexOf(key) !== -1;

            // Add styles and listeners to keys
            switch (key) {
                case "Backspace":
                    KEY.createSpecialKey(["keyboard__key-special-wide"], "Backspace", "Backspace");

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.deleteBackSpace();
                    });

                    break;

                case "Tab":
                    KEY.createSpecialKey(["keyboard__key-special"], "Tab", "Tab")

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.tab();
                    });

                    break;

                case "Del":
                    KEY.createSpecialKey(["keyboard__key-special"], "Del", "Delete");

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.delDelete();
                    });

                    break;

                case "Caps Lock":
                    KEY.createSpecialKey(["keyboard__key-special-wide", "CapsLock"], "Caps Lock", "CapsLock");
                    KEY_ELEMENT.addEventListener("click", () => {
                        this.capsLock();
                    });
                    break;

                case "Enter":
                    KEY.createSpecialKey(["keyboard__key-special-wide"], "ENTER", "Enter");
                    KEY_ELEMENT.addEventListener("click", () => {
                        this.enter();
                    });
                    break;

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

                case "Space":
                    KEY.createSpecialKey(["keyboard__key-space"], "", "Space");

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.space();
                    });

                    break;

                case "up":
                    KEY.createSpecialKey(["keyboard__key-special", "ArrowUp"], Arrows.up, "ArrowUp");
                    KEY_ELEMENT.addEventListener("click", () => {
                        this.ordinaryKey(KEY.keyElement.innerHTML);
                    });
                    break;

                case "down":
                    KEY.createSpecialKey(["keyboard__key-special", "ArrowDown"], Arrows.down, "ArrowDown");
                    KEY_ELEMENT.addEventListener("click", () => {
                        this.ordinaryKey(KEY.keyElement.innerHTML);
                    });
                    break;

                case "left":
                    KEY.createSpecialKey(["keyboard__key-special", "ArrowLeft"], Arrows.left, "ArrowLeft");
                    KEY_ELEMENT.addEventListener("click", () => {
                        this.ordinaryKey(KEY.keyElement.innerHTML);
                    });
                    break;

                case "right":
                    KEY.createSpecialKey(["keyboard__key-special", "ArrowRight"], Arrows.right, "ArrowRight");
                    KEY_ELEMENT.addEventListener("click", () => {
                        this.ordinaryKey(KEY.keyElement.innerHTML);
                    });
                    break;

                case "CtrlLeft":
                    KEY.createSpecialKey(["keyboard__key-special"], "ctrl", "ControlLeft");
                    break;

                case "CtrlRight":
                    KEY.createSpecialKey(["keyboard__key-special"], "ctrl", "ControlRight");
                    break;

                case "AltLeft":
                    KEY.createSpecialKey(["keyboard__key-special"], "alt", "AltLeft");
                    break;

                case "AltRight":
                    KEY.createSpecialKey(["keyboard__key-special"], "alt", "AltRight");
                    break;

                case "Win":
                    KEY.createSpecialKey(["keyboard__key-special"], "win", "MetaLeft");
                    break;

                default:
                    KEY.value = key.toLowerCase();

                    KEY_ELEMENT.textContent = KEY.value;

                    if (SHIFT_CHANGE_SYMBOLS_ENG.includes(KEY_ELEMENT.textContent)) {
                        KEY_ELEMENT.classList.add("changeKey");
                    } else {
                        KEY_ELEMENT.classList.add("changeCase");
                    }

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.capsLockOn && !this.shiftOn
                            ? this.ordinaryKey(key.toUpperCase())
                            : this.ordinaryKey(key.toLowerCase());
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
    deleteBackSpace() {
        const textarea = document.querySelector("textarea");
        const caretPosition = textarea.selectionStart;
        this.value = this.value.slice(0, caretPosition - 1) + this.value.slice(caretPosition);
        this.triggerEvent(this.oninput);
        textarea.selectionEnd = caretPosition - 1;
    }

    tab() {
        const tabEl = "    ";
        const caretPositionChange = 4;
        this.insertEl(tabEl, caretPositionChange);
        this.triggerEvent(this.oninput);
    }

    delDelete() {
        const textarea = document.querySelector("textarea");
        const caretPosition = textarea.selectionStart;
        this.value = this.value.slice(0, caretPosition) + this.value.slice(caretPosition + 1);
        this.triggerEvent(this.oninput);
        textarea.selectionEnd = caretPosition;
    }

    capsLock() {
        this.capsLockOn = !this.capsLockOn;
        const capsLock = document.querySelector('.CapsLock');
        if (this.capsLockOn) {
            capsLock.classList.add('keyboard__key--active');
        } else {
            capsLock.classList.remove('keyboard__key--active');
        }
        this.changeKeyCase();
    }

    enter() {
        const enterEl = "\n";
        const caretPositionChange = 1;
        this.insertEl(enterEl, caretPositionChange);
        this.triggerEvent(this.oninput);
    }

    space() {
        const spaceEl = ' ';
        const caretPositionChange = 1;
        this.insertEl(spaceEl, caretPositionChange);
        this.triggerEvent(this.oninput);
    }

    ordinaryKey(keyEl: string) {
        const caretPositionChange = 1;
        this.insertEl(keyEl, caretPositionChange);
        this.triggerEvent(this.oninput);
    }

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
                key.textContent = (this.capsLockOn && !this.shiftOn) || (this.shiftOn && !this.capsLockOn)
                    ? key.textContent.toUpperCase()
                    : key.textContent.toLowerCase();
            }
        }
    }

    changeSpecialKeys() {
        for (const key of this.keys) {
            if (key.classList.contains("changeKey")) {
                key.textContent = this.shiftOn
                    ? SHIFT_CHANGED_SYMBOLS_ENG[SHIFT_CHANGE_SYMBOLS_ENG.indexOf(key.textContent)]
                    : SHIFT_CHANGE_SYMBOLS_ENG[SHIFT_CHANGED_SYMBOLS_ENG.indexOf(key.textContent)];
            }
        }
    }

    toggleShift() {
        this.shiftOn = !this.shiftOn;
        this.changeKeyCase();
        this.changeSpecialKeys();
    }

    highlightKey(pressedKey: string, pressedKeyCode: string) {
        for (const key of this.keys) {
            // console.log(key);

            if (
                (key.getAttribute("value") === pressedKeyCode) ||
                (key.textContent === ("`" || "ё") && pressedKeyCode === "Backquote") ||
                (key.textContent === ("'" || "э") && pressedKeyCode === "Quote") ||
                (key.textContent === pressedKey) ||
                (key.textContent === pressedKeyCode)
            ) key.classList.add('keyboard__key--active');
            
        }
    }

    removeKeyHighlight(pressedKey: string, pressedKeyCode: string) {
        for (const key of this.keys) {
            // console.log('html', key.textContent);
            
            if (
                (key.getAttribute("value") === pressedKeyCode) ||
                (key.textContent === ("`" || "ё") && pressedKeyCode === "Backquote") ||
                (key.textContent === ("'" || "э") && pressedKeyCode === "Quote") ||
                (key.textContent === pressedKey) ||
                (key.textContent === pressedKeyCode)
            ) key.classList.remove('keyboard__key--active');
    
        }
    }

    switchLanguage() { }

}