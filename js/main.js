import * as Vue from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { contacts } from './data.js';
const { createApp } = Vue;

createApp({
    data() {
        return {
            message: 'Hello Vue!'
        }
    }
}).mount('#app')