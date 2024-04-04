
import { contacts } from './data.js';
const { createApp } = Vue;
const lux = luxon.DateTime;

createApp({
    data() {
        return {
            contacts: contacts,
            activeContactId: 1,
            messageText: '',
            searchText: ''
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
            this.messageText = '';
            setTimeout(() => {
                const newMex = this.createMex('ok', 'received');
                this.activeContact.messages.push(newMex);
            },1000);
        },
        // crea una funzione aggiunga la classe d-block a dropdown-menu
        menùVisibile()  {
            document.getElementsByClassName("dropdown-menu").classList.toggle('d-block');
        }
    },
    computed:{
        activeContact() {
            return this.contacts.find((el) => el.id === this.activeContactId);
        },
        filteredContacts(){
            return this.contacts.filter((el) => el.name.toLowerCase().includes(this.searchText.toLowerCase()));
        }
    },
    mounted(dateSplit){
        console.log(dateSplit)
    }
}).mount('#app')