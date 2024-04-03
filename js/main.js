
import { contacts } from './data.js';
const { createApp } = Vue;

createApp({
    data() {
        return {
            message: 'Hello Vue!'
        }
    }
}).mount('#app')