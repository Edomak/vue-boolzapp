// Milestone 1:

// Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse;
// Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto, ricavandoli dall'array contacts.

// Milestone 2:

// Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all'interno del pannello della conversazione.
// Click sul contatto mostra la conversazione del contatto cliccato.

// Milestone 3:

// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

// Milestone 4:

// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

var app = new Vue(
    {
        el: "#app",
        data: {
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },     
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
            ],
            activeIndex: 0,
            myMessage: "",
            pcAnswer: "Ok!",
            currentDate: "",
            searchInput: "",
            msgIndex: -1
        },
        methods: {
            // Funzione che associa al click il rispettivo indice del contatto selezionato.
            setActive: function(newIndex) {
                this.activeIndex = newIndex;
                this.msgIndex = -1;
            },
            // Funzione che ritorna, tramite l activeIndex, la rispettiva immagine del contatto attivo e la compone con lo strumento "template literal".
            getAvatarImg: function (activeIndex) {
                return `img/avatar${this.contacts[activeIndex].avatar}.jpg`;
            },
            // Ricavo dai data l'ultimo messaggio ricevuto e con il metodo substr() creo una sottostringa che ha lunghezza max di 25 caratteri.
            getLastMessageText: function (contactIndex) {
                const lastMessageIndex = this.contacts[contactIndex].messages.length - 1;
                return this.contacts[contactIndex].messages[lastMessageIndex].text.substr(0, 25) + " ...";
            },
            // Ricavo la data dell'ultimo messaggio.
            getLastMessageDate: function (contactIndex) {
                const lastMessageIndex = this.contacts[contactIndex].messages.length - 1;
                return this.contacts[contactIndex].messages[lastMessageIndex].date;
            },
            // Funzione che pusha nell'array contacts il nuovo oggetto messaggio tramite l'input agganciato ad un v-model.
            sendMsg: function (activeIndex) {
                if (this.myMessage.trim().length > 0) {
                    this.contacts[this.activeIndex].messages.push({
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        text: this.myMessage,
                        status: 'sent'
                    });
                };
                this.myMessage = "";
                // Genero la risposta automatica dopo 2s e imposto lo status del messaggio pushato da "sent" a "received".
                setTimeout (() => {
                    this.contacts[this.activeIndex].messages.push({
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        text: this.pcAnswer,
                        status: 'received'
                    });
                },2000);
            },
            // Funzione che filtra i contatti confrontando il searchInput con gli element.name tramite un ciclo forEach.
            // toLowerCase: metodo che coverte una stringa in lettere minuiscole senza modificarla.
            // startsWith: metodo che determina se una stringa inizia con gli stessi caratteri di un'altra specifica (return Boolean). 
            search: function () {
                let searchContact = this.searchInput.toLowerCase();
                this.contacts.forEach(element => {
                    if (element.name.toLowerCase().startsWith(searchContact)) {
                        element.visible = true;
                    } else {
                        element.visible = false;
                    }
                });
            },
            // Funzione che associa l'apertura (e chiusura) del dropdown allo specifico messaggio cliccato.
            dropDownToggle: function (index) {
                if ( this.msgIndex == -1 || this.msgIndex != index) {
                    this.msgIndex = index;
                } else {
                    this.msgIndex = -1;
                }
            },
            // Con il metodo splice() cancello il messaggio selezionato.
            deleteMsg: function () {
                this.contacts[this.activeIndex].messages.splice(this.msgIndex, 1);

                this.msgIndex = -1;
            }
        }
    }
);