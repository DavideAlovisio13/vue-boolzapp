
import { contacts } from './data.js';
const { createApp } = Vue;

createApp({
    data() {
        return {
            contacts: contacts,
            activeContactId: 1
        }
    },
    methods:{
        
    },
    computed:{
        activeContactId() {
            return this.contacts.find((el) => el.id === this.activeContactId)
        },
    }
}).mount('#app')