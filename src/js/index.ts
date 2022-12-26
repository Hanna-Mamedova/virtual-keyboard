import '../css/style.css';
import '../scss/style.scss';

import { Keyboard } from './Keyboard';

interface KeysPressed {
    [index: string]: boolean;
}; 

let keysPressed: KeysPressed = {};

const KEYBOARD = new Keyboard();

window.onload = () => {
    // TITLE
    createTextNode('h1', `VIRTUAL KEYBOARD`);

    // TEXTAREA
    createTextarea();

    // KEYBOARD
    KEYBOARD.init();

    // SUBTITLES
    createTextNode('h3', `Keyboard created on Windows`);
    createTextNode('h3', `For language switch: shift + alt`);
    createTextNode('h3', `Language now: ${KEYBOARD.language}`);
}

function createTextNode(element: string, text: string) {
    const node = document.createElement(element);
    node.innerHTML = text;
    document.body.append(node);
}

function createTextarea() {
    const TEXTAREA_CONTAINER = document.createElement('div');
    TEXTAREA_CONTAINER.classList.add("textarea__container");

    const TEXTAREA = document.createElement('textarea');
    TEXTAREA.name = 'textarea';
    TEXTAREA.className = 'textarea use-keyboard-input';
    TEXTAREA.cols = 50;
    TEXTAREA.rows = 10;
    TEXTAREA.setAttribute('autofocus', 'autofocus');

    TEXTAREA_CONTAINER.append(TEXTAREA)
    document.body.append(TEXTAREA_CONTAINER);
}

window.addEventListener('keydown', (e) => {
    // console.log('key: --', e.key);
    // console.log('code: --', e.code);
    KEYBOARD.highlightKey(e.key, e.code);

    switch (e.key) {
        case "Shift":
            KEYBOARD.toggleShift();
            break;
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
            e.preventDefault();
            break;
    }

    if (e.code === "ShiftLeft") {
        keysPressed[e.code] = true;
    }

    if (keysPressed['ShiftLeft'] && e.code === 'AltLeft') {
        KEYBOARD.switchLanguage();
    }
});

window.addEventListener('keyup', (e) => {
    KEYBOARD.removeKeyHighlight(e.key, e.code);

    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    KEYBOARD.value = textarea.value;

    if (e.code === "ShiftLeft") {
       delete keysPressed[e.code];
    }

    switch (e.code) {
        case "CapsLock":
            KEYBOARD.capsLock();
            break;
        case "Tab":
            KEYBOARD.tab();
            break;
        case "ShiftRight":
        case "ShiftLeft":
            KEYBOARD.toggleShift();
            break;
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
            const pressedKey = document.querySelector(`.${e.code}`);
            KEYBOARD.ordinaryKey(pressedKey.textContent);
            break;
    };

})