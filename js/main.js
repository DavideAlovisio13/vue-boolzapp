
import { contacts } from './data.js';
const { createApp } = Vue;

createApp({
    data() {
        return {
            contacts: contacts,
            activeIndex: 0,
        }
    }
}).mount('#app')