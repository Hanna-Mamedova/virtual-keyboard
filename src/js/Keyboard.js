import { keyLayoutENG } from "./keyLayoutENG";
import { keyLayoutRUS } from "./keyLayoutRUS";
import { Key } from  "./DefaultKey";

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
        if(this.language == 'eng') {
            keyLayout = keyLayoutENG;
        } else if (this.language == 'rus') {
            keyLayout = keyLayoutRUS;
        }

        // Looping the keylayout
        keyLayout.forEach(key => {

            // create a key
            const KEY = new Key();
            KEY.init();
            
            const KEY_ELEMENT = KEY.keyElement;

            const INSERT_lINEBREAK = ["Backspace", "DEL", "ENTER", "ShiftRight", "&#9658;"].indexOf(key) !== -1;


            //Add effect of pressing a key on a physical keyboard highlights the key on the virtual keyboard

            // ДОСМОТРЕТЬ ПОДСВЕТКУ СПЕЦ КЛАВИШ -  после Special Key
            window.addEventListener('keydown', (e) => {
                if(e.key == KEY_ELEMENT.innerHTML) {
                    KEY_ELEMENT.classList.add('keyboard__key--active');
                }
            })

            window.addEventListener('keyup', (e) => {
                if(e.key == KEY_ELEMENT.innerHTML) {
                    KEY_ELEMENT.classList.remove('keyboard__key--active');
                }
            })

            // Add styles and listeners to keys
            switch (key) {
                case "Backspace":
                    KEY_ELEMENT.classList.add("keyboard__key-special-wide");
                    KEY_ELEMENT.innerHTML = "Backspace";

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.value = this.value.substring(0, this.value.length - 1);
                        this.triggerEvent(this.oninput);
                    });

                    break;

                case "Tab":
                        KEY_ELEMENT.classList.add("keyboard__key-special");
                        KEY_ELEMENT.innerHTML = "Tab";

    
                        KEY_ELEMENT.addEventListener("click", () => {
                            this.value += "    ";
                            this.triggerEvent(this.oninput);
                        });
    
                    break;

                    // ADD EVENTLISTENER TO DELETE!!!

                case "DEL":
                    KEY_ELEMENT.classList.add("keyboard__key-special");
                    KEY_ELEMENT.innerHTML = "DEL";
    
                        KEY_ELEMENT.addEventListener("click", () => {
                            // this.value = this.value.substring(0, this.properties.value - 1);
                            this.triggerEvent(this.oninput);
                        });
    
                        break;

                case "Caps Lock":
                    KEY_ELEMENT.classList.add("keyboard__key-special-wide");
                    KEY_ELEMENT.innerHTML = "Caps Lock";

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.toggleCapsLock();
                        KEY_ELEMENT.classList.toggle('keyboard__key--active', this.capsLock);
                    });

                    break;

                    case "ENTER":
                        KEY_ELEMENT.classList.add("keyboard__key-special-wide");
                        KEY_ELEMENT.innerHTML = "ENTER";
    
                        KEY_ELEMENT.addEventListener("click", () => {
                            this.value += "\n";
                            this.triggerEvent(this.oninput);
                        });
    
                    break;

                        // ADD EVENTLISTENER TO SHIFT!!!
                    case "ShiftRight":
                    case "ShiftLeft":
                    KEY_ELEMENT.classList.add("keyboard__key-special-wide");
                    KEY_ELEMENT.innerHTML = "Shift";

                    KEY_ELEMENT.addEventListener("click", () => {
                        // this.toggleShift();
                        // KEY_ELEMENT.classList.toggle('keyboard__key--active', this.shift);
                    });

                    break;

                    case "space":
                        KEY_ELEMENT.classList.add("keyboard__key-space");
    
                        KEY_ELEMENT.addEventListener("click", () => {
                            this.value += " ";
                            this.triggerEvent(this.oninput);
                        });
    
                    break;

                    // ADD HANDLERS TO ARROW KEYS

                    case "up":
                        KEY_ELEMENT.innerHTML = "&#9650;"
                        KEY_ELEMENT.classList.add("keyboard__key-special");

    
                        KEY_ELEMENT.addEventListener("click", () => {
                            // KEY_ELEMENT.value += " ";
                        });
    
                    break;

                    case "down":
                        KEY_ELEMENT.innerHTML = "&#9660;"
                        KEY_ELEMENT.classList.add("keyboard__key-special");

    
                        KEY_ELEMENT.addEventListener("click", () => {
                            // KEY_ELEMENT.value += " ";
                        });
    
                    break;

                    case "left":
                        KEY_ELEMENT.innerHTML = "&#9668;"
                        KEY_ELEMENT.classList.add("keyboard__key-special");

    
                        KEY_ELEMENT.addEventListener("click", () => {
                            // KEY_ELEMENT.value += " ";
                        });
    
                    break;

                    case "right":
                        KEY_ELEMENT.innerHTML = "&#9658;"
                        KEY_ELEMENT.classList.add("keyboard__key-special");

    
                        KEY_ELEMENT.addEventListener("click", () => {
                            // KEY_ELEMENT.value += " ";
                        });
    
                    break;

                    case "Ctrl":
                    case "Win":
                    case "Alt":
                        KEY_ELEMENT.textContent = key.toLowerCase();
                        KEY_ELEMENT.classList.add("keyboard__key-special");

    
                        KEY_ELEMENT.addEventListener("click", () => {
                            // KEY_ELEMENT.value += " ";
                        });
    
                    break;

                    default:
                        KEY_ELEMENT.textContent = key.toLowerCase();
                        KEY_ELEMENT.classList.add("changeCase");
    
                        KEY_ELEMENT.addEventListener("click", () => {
                            this.value += this.capsLock ? key.toUpperCase() : key.toLowerCase();
                            this.triggerEvent(this.oninput);
                        });
    
                    break;
            }

            // Add each keyElement to fragment
            FRAGMENT.append(KEY_ELEMENT);

            // Add line break after keyElement
            if(INSERT_lINEBREAK) {
                FRAGMENT.append(document.createElement("br"));
            }
        });

        return FRAGMENT;
    }

    // TRIGGER EVENT
    triggerEvent(handler) {
        if(typeof handler == "function") {
            handler(this.value);
        }
    }

    // CAPSLOCK HANDLER
    toggleCapsLock() {
        this.capsLock = !this.capsLock;

        for (const key of this.keys) {
            if (key.classList.contains("changeCase")) {
                key.textContent = this.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    }

    onInput(initialValue, currentValue) {
        this.value = initialValue || "";
        this.oninput = currentValue;
    }

    // TODO!!!
    onPressShift() {}
    switchLanguage() {}

}