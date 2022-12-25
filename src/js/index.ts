import '../css/style.css';
import '../scss/style.scss';

import { Keyboard } from './Keyboard';

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
    createTextNode('h3', `Language now:`);
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

// window.addEventListener('keydown', (e) => {
//     // console.log('Value: --', e);
//     if (e.key == KEY.value || e.code == KEY.value) {
//         KEY.isActive();
//     }

//     if(e.key == 'CapsLock') {
//         this.toggleCapsLock();
//         console.log('CAPSLOCK--', this.capsLock);
//     }

// })

// window.addEventListener('keyup', () => {
//     if (KEY_ELEMENT.classList.contains('keyboard__key--active')) {
//         KEY.removeActive();
//     }
// })