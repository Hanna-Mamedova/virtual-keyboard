export const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
    },

    properties: {
        value: '',
        capsLock: false
    },

    // INITIALIZE KEYBOARD
    init() {
        // Create main elements
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        // Setup main elements
        this.elements.main.classList.add('keyboard');
        this.elements.keysContainer.classList.add('keyboard__keys');
        this.elements.keysContainer.append(this.createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key")

        // Add to DOM
        this.elements.main.append(this.elements.keysContainer);
        document.body.append(this.elements.main);

        // Add use keyboard for elements
        this.open('', function (currentValue) {
            document.querySelector("textarea").value = currentValue;
        });
    },

    // CREATE KEYS
    createKeys() {
        const FRAGMENT = document.createDocumentFragment();
        const KEYLAYOUT_ENG = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
            "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "DEL",
            "Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "ENTER",
            "ShiftLeft", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "up", "ShiftRight",
            "Ctrl", "Win", "Alt", "space", "Alt", "left", "down", "right", "Ctrl"
        ];

        // Looping the keylayout

        KEYLAYOUT_ENG.forEach(key => {
            const KEY_ELEMENT = document.createElement('button');
            const INSERT_lINEBREAK = ["Backspace", "DEL", "ENTER", "ShiftRight", "&#9658;"].indexOf(key) !== -1;

            // Add attributes/classes
            KEY_ELEMENT.setAttribute("type", "button");
            KEY_ELEMENT.classList.add("keyboard__key");

            switch (key) {
                case "Backspace":
                    KEY_ELEMENT.classList.add("keyboard__key--special-wide");
                    KEY_ELEMENT.innerHTML = "Backspace";

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this.triggerEvent("oninput");
                    });

                    break;

                case "Tab":
                        KEY_ELEMENT.classList.add("keyboard__key--special");
                        KEY_ELEMENT.innerHTML = "Tab";

    
                        KEY_ELEMENT.addEventListener("click", () => {
                            KEY_ELEMENT.properties.value += "    ";
                            this.triggerEvent("oninput");
                        });
    
                    break;

                    // ADD EVENTLISTENER TO DELETE!!!

                case "DEL":
                    KEY_ELEMENT.classList.add("keyboard__key--special");
                    KEY_ELEMENT.innerHTML = "DEL";
    
                        KEY_ELEMENT.addEventListener("click", () => {
                            // this.properties.value = this.properties.value.substring(0, this.properties.value - 1);
                            this.triggerEvent("oninput");
                        });
    
                        break;

                case "Caps Lock":
                    KEY_ELEMENT.classList.add("keyboard__key--special-wide");
                    KEY_ELEMENT.innerHTML = "Caps Lock";

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.toggleCapsLock();
                        KEY_ELEMENT.classList.toggle('keyboard__key--active', this.properties.capsLock);
                    });

                    break;

                    case "ENTER":
                        KEY_ELEMENT.classList.add("keyboard__key--special-wide");
                        KEY_ELEMENT.innerHTML = "ENTER";
    
                        KEY_ELEMENT.addEventListener("click", () => {
                            this.properties.value += "\n";
                            this.triggerEvent("oninput");
                        });
    
                    break;

                        // ADD EVENTLISTENER TO SHIFT!!!
                    case "ShiftRight":
                    case "ShiftLeft":
                    KEY_ELEMENT.classList.add("keyboard__key--special-wide");
                    KEY_ELEMENT.innerHTML = "Shift";

                    KEY_ELEMENT.addEventListener("click", () => {
                        // this.toggleCapsLock();
                        // KEY_ELEMENT.classList.toggle('keyboard__key--active', this.properties.capsLock);
                    });

                    break;

                    case "space":
                        KEY_ELEMENT.classList.add("keyboard__key--space");
    
                        KEY_ELEMENT.addEventListener("click", () => {
                            this.properties.value += " ";
                            this.triggerEvent("oninput");
                        });
    
                    break;

                    // ADD HANDLERS TO ARROW KEYS

                    case "up":
                        KEY_ELEMENT.innerHTML = "&#9650;"
                        KEY_ELEMENT.classList.add("keyboard__key--special");

    
                        KEY_ELEMENT.addEventListener("click", () => {
                            // KEY_ELEMENT.properties.value += " ";
                            this.triggerEvent("oninput");
                        });
    
                    break;

                    case "down":
                        KEY_ELEMENT.innerHTML = "&#9660;"
                        KEY_ELEMENT.classList.add("keyboard__key--special");

    
                        KEY_ELEMENT.addEventListener("click", () => {
                            // KEY_ELEMENT.properties.value += " ";
                            this.triggerEvent("oninput");
                        });
    
                    break;

                    case "left":
                        KEY_ELEMENT.innerHTML = "&#9668;"
                        KEY_ELEMENT.classList.add("keyboard__key--special");

    
                        KEY_ELEMENT.addEventListener("click", () => {
                            // KEY_ELEMENT.properties.value += " ";
                            this.triggerEvent("oninput");
                        });
    
                    break;

                    case "right":
                        KEY_ELEMENT.innerHTML = "&#9658;"
                        KEY_ELEMENT.classList.add("keyboard__key--special");

    
                        KEY_ELEMENT.addEventListener("click", () => {
                            // KEY_ELEMENT.properties.value += " ";
                            this.triggerEvent("oninput");
                        });
    
                    break;

                    case "Ctrl":
                    case "Win":
                    case "Alt":
                        KEY_ELEMENT.textContent = key.toLowerCase();
                        KEY_ELEMENT.classList.add("keyboard__key--special");

    
                        KEY_ELEMENT.addEventListener("click", () => {
                            // KEY_ELEMENT.properties.value += " ";
                            this.triggerEvent("oninput");
                        });
    
                    break;

                    default:
                        KEY_ELEMENT.textContent = key.toLowerCase();
                        KEY_ELEMENT.classList.add("changeCase");
    
                        KEY_ELEMENT.addEventListener("click", () => {
                            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                            this.triggerEvent("oninput");
                        });
    
                    break;
            }

            FRAGMENT.append(KEY_ELEMENT);

            if(INSERT_lINEBREAK) {
                FRAGMENT.append(document.createElement("br"));
            }
        });

        return FRAGMENT;
    },

    // TRIGGER EVENT
    triggerEvent(handlerName) {
        if(typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    // CAPSLOCK HANDLER
    toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.classList.contains("changeCase")) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
    }
};