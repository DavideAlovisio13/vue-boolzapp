
import { contacts } from './data.js';
import { randomMessages } from './randomAns.js';
const { createApp } = Vue;
const { DateTime } = luxon;
const now = DateTime.now();
import Picker from './emoji-picker.js';

createApp({
    data() {
        return {
            contacts: contacts,
            activeContactId: 1,
            messageText: '',
            searchText: '',
            activeMexIndex: null,
            showEmoji: false,
            isActive: true,
            showChatOptions: false,
            showOverlay: false,
            rotatePlus: false,
            overIndexMex: null
        }
    },
    methods: {
        setActive(id) {
            this.activeContactId = id;
            this.activeMexIndex = null;
            this.showOverlay = true;
            this.overIndexMex = null;
        },
        createMex(msg, status) {
            const newMex = {
                date: now.toFormat('dd/MM/yyyy HH:ss'),
                message: msg,
                status: status
            }
            return newMex;
        },
        sentMex() {
            const newMex = this.createMex(this.messageText, 'sent');
            if (this.messageText.trim() === '') return;
            this.activeContact.messages.push(newMex);
            this.$nextTick(() => {
                this.$refs.messages[this.$refs.messages.length - 1].scrollIntoView({ behavior: 'smooth' });
            });
            this.messageText = '';
            setTimeout(() => {
                this.isActive = false;
                const newMex = this.createMex(randomMessages[Math.floor(Math.random() * randomMessages.length)], 'received');
                this.activeContact.messages.push(newMex);
                setTimeout(() => {
                    this.isActive = true;
                }, 2000);
            }, 2000);
        },
        activeMex(index) {
            this.activeMexIndex = this.activeMexIndex === index ? null : index;
        },
        overMex(index) {
            this.overIndexMex = this.overIndexMex === index ? null : index;
        },
        deleteMex(index) {
            this.activeContact.messages.splice(index, 1);
        },

        onSelectEmoji(emoji) {
            console.log(emoji)
            this.messageText += emoji.i;
            /*
              // result
              { 
                  i: "😚", 
                  n: ["kissing face"], 
                  r: "1f61a", // with skin tone
                  t: "neutral", // skin tone
                  u: "1f61a" // without tone
              }
              */
        },

    },
    computed: {
        activeContact() {
            return this.contacts.find((el) => el.id === this.activeContactId);
        },
        filteredContacts() {
            return this.contacts.filter((el) => el.name.toLowerCase().includes(this.searchText.toLowerCase()));
        }
    },
    mounted() {

    }
}).component('Picker', Picker).mount('#app')