
import { contacts } from './data.js';
import { randomMessages } from './randomAns.js';
const { createApp } = Vue;
const { DateTime } = luxon;
const now = DateTime.now();
import Picker from './emoji-picker.js';

createApp({
    //È una funzione dati di Vue.js. Restituisce un oggetto contenente varie proprietà e i loro valori iniziali, che vengono utilizzati come dati iniziali per l'istanza di Vue.
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
            overIndexMex: null,
            showInfoOptions: false,
            muteActiveContactId: 1,
            muteOn: true,
            changeTheme: false,
            inputValue: '',
            startApp: true
        }
    },
    methods: {
        //Questo codice definisce un metodo setActive che aggiorna varie proprietà relative al contatto attivo nel contesto dell'applicazione. Imposta activeContactId sull'id fornito, reimposta activeMexIndex e overIndexMex su null e imposta showOverlay su true.
        setActive(id) {
            this.activeContactId = id;
            this.activeMexIndex = null;
            this.showOverlay = true;
            this.overIndexMex = null;
        },
        //Questo codice definisce una funzione createMex che prende msg e status come parametri e restituisce un oggetto con le proprietà data, messaggio e status. La data è formattata utilizzando l'oggetto now della libreria luxon.
        createMex(msg, status) {
            const newMex = {
                date: now.toFormat('dd/MM/yyyy HH:ss'),
                message: msg,
                status: status
            }
            return newMex;
        },
        //Questo codice definisce una funzione sentMex che simula l'invio di un messaggio. Crea un nuovo oggetto messaggio con il testo in ingresso e lo stato "inviato". Se il testo in ingresso è vuoto, esce prima. Quindi inserisce il nuovo messaggio nell'array dei messaggi del contatto attivo. Dopodiché, fa scorrere il messaggio, cancella il campo del testo di input, imposta momentaneamente isActive su false, genera un messaggio ricevuto a caso, lo spinge nell'array dei messaggi del contatto attivo e infine imposta nuovamente isActive su true dopo un certo ritardo.
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
        //Questo codice definisce un metodo activeMex che alterna una variabile activeMexIndex tra null e il valore dell'indice passato come argomento.
        activeMex(index) {
            this.activeMexIndex = this.activeMexIndex === index ? null : index;
        },
        //Questo codice definisce una funzione overMex che alterna il valore di this.overIndexMex tra null e index, in base al suo valore corrente. Se è uguale a index, this.overIndexMex diventa null; altrimenti, diventa index.
        overMex(index) {
            this.overIndexMex = this.overIndexMex === index ? null : index;
        },
        //Questo codice definisce un metodo deleteMex che rimuove un messaggio dall'array dei messaggi dell'oggetto activeContact all'indice specificato.
        deleteMex(index) {
            this.activeContact.messages.splice(index, 1);
        },
        //Questo codice definisce una funzione closeChat che imposta tre proprietà (showChatOptions, showInfoOptions e showOverlay) su false, utilizzate probabilmente per chiudere o nascondere le opzioni o gli overlay relativi alla chat nell'interfaccia utente.
        closeChat() {
            this.showChatOptions = false;
            this.showInfoOptions = false;
            this.showOverlay = false;
        },
        //Questo codice definisce una funzione chiamata onSelectEmoji che prende come parametro un oggetto emoji. Registra l'oggetto emoji nella console e poi aggiunge la proprietà i dell'oggetto emoji alla proprietà messageText dell'oggetto padre.
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
        //Questo codice definisce una funzione chiamata inputListener che registra il valore di this.inputValue nella console.
        inputListener() {
            console.log('Valore dell\'input:', this.inputValue);
        }

    },
    computed: {
        //Questo frammento di codice definisce un metodo chiamato activeContact che cerca e restituisce il contatto con un id corrispondente alla proprietà activeContactId dell'oggetto corrente.
        activeContact() {
            return this.contacts.find((el) => el.id === this.activeContactId);
        },
        //Questo frammento di codice definisce un metodo chiamato filteredContacts (Contatti filtrati) che filtra l'array dei contatti in base a una ricerca senza distinzione di maiuscole e minuscole per searchText nella proprietà name di ciascun elemento.
        filteredContacts() {
            return this.contacts.filter((el) => el.name.toLowerCase().includes(this.searchText.toLowerCase()));
        }
    },
    //Questo codice imposta this.startApp su false dopo un ritardo di 5000 millisecondi quando il componente viene montato.
    mounted() {
        setTimeout(() => {
            this.startApp = false;
        }, 5000)
    }
}).component('Picker', Picker).mount('#app')