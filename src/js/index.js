import '../css/style.css';
import '../scss/style.scss';

// import { Keyboard } from './Keyboard';

const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: '',
        capsLock: false
    },

    // INITIALIZE KEYBOARD
    init() {

    },

    // CREATE KEYS
    createKeys() {

    },

    // TRIGGER EVENT
    triggerEvent(handlerName) {
        console.log("Event triggered:" + handlerName);
    },

    // CAPSLOCK HANDLER
    toggleCapsLock() {
        console.log("CapsLock Toggled");
    }
}

window.onload = () => {
    createTextNode('TITLE', 'h1', `VIRTUAL KEYBOARD`);
    createTextarea();
    
    //HERE WILL BE KEYBOARD

    createTextNode('SUBTITLE', 'h3', `Keyboard created on Windows`);
    createTextNode('LANGUAGE', 'h3', `For language switch: shift + alt`);
    createTextNode('LANGUAGE_NOW', 'h3', `Language now:`);
}

function createTextNode(node, element, text) {
    node = document.createElement(element);
    node.innerHTML = text;
    document.body.append(node);
};

function createTextarea() {
    const TEXTAREA = document.createElement('textarea');
    TEXTAREA.name = 'textarea';
    TEXTAREA.className = 'textarea';
    TEXTAREA.cols = 30;
    TEXTAREA.rows = 5;
    document.body.append(TEXTAREA);
}