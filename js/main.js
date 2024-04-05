
import { contacts } from './data.js';
const { createApp } = Vue;
const lux = luxon.DateTime;
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
        }
    },
    methods:{
        setActive (id){
            this.activeContactId = id;
        },
        createMex(msg, status){
            const newMex = {
                date: lux.now().setLocale('it').toFormat('dd/MM/yyyy HH:mm:ss'),
                message: msg,
                status:status
            }
            return newMex;
        },
        sentMex(){
            const newMex = this.createMex(this.messageText, 'sent');
            this.activeContact.messages.push(newMex);
            this.$nextTick(() => {
                this.$refs.messages [this.$refs.messages.length - 1].scrollIntoView({ behavior: 'smooth' });
            });
            this.messageText = '';
            setTimeout(() => {
                let colorVV = document.getElementsById('msg-dblcheck');
                colorVV.classList.add('');
                const newMex = this.createMex('ok', 'received');
                this.activeContact.messages.push(newMex);
            },1000);
        },
        activeMex(index) {
            this.activeMexIndex = this.activeMexIndex === index ? null : index;
        },
        deleteMex (index) {
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
    computed:{
        activeContact() {
            return this.contacts.find((el) => el.id === this.activeContactId);
        },
        filteredContacts(){
            return this.contacts.filter((el) => el.name.toLowerCase().includes(this.searchText.toLowerCase()));
        }
    },
    mounted(){
    }
}).component('Picker', Picker).mount('#app')