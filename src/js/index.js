import '../css/style.css';
import '../scss/style.scss';

import { Keyboard } from './Keyboard';


window.onload = () => {
    // TITLE
    createTextNode('TITLE', 'h1', `VIRTUAL KEYBOARD`);

    // TEXTAREA
    createTextarea();
    
    // KEYBOARD
    Keyboard.init();

    // SUBTITLES
    createTextNode('SUBTITLE', 'h3', `Keyboard created on Windows`);
    createTextNode('LANGUAGE', 'h3', `For language switch: shift + alt`);
    createTextNode('LANGUAGE_NOW', 'h3', `Language now:`);
}

function createTextNode(node, element, text) {
    node = document.createElement(element);
    node.innerHTML = text;
    document.body.append(node);
}

function createTextarea() {
    const TEXTAREA_CONTAINER = document.createElement('div');
    TEXTAREA_CONTAINER.classList.add("textarea__container");

    const TEXTAREA = document.createElement('textarea');
    TEXTAREA.name = 'textarea';
    TEXTAREA.className = 'textarea';
    TEXTAREA.cols = 50;
    TEXTAREA.rows = 10;

    TEXTAREA_CONTAINER.append(TEXTAREA)
    document.body.append(TEXTAREA_CONTAINER);
}