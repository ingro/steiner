export default {
    templates: {
        actionMessages: {
            createSuccess: '{{resource}} creato con successo!',
            createFail: 'Si è verificato un errore inaspettato durante la creazione di {{resource}}',
            updateSuccess: '{{resource}} aggiornato con successo!',
            updateFail: 'Si è verificato un errore inaspettato durante l\'aggiornamento di {{resource}}',
            deleteSuccess: '{{resource}} cancellato con successo!',
            deleteFail: 'Si è verificato un errore inaspettato durante la cancellazione di {{resource}})'
        }
    },
    messages: {
        auth: {
            loginFail: 'Impossibile effettuare il login!',
            updateProfileFail: 'Impossibile aggiornare il profilo!'
        },
        breadcrumbs: {
            editNew: 'Crea nuovo'
        },
        confirmDialog: {
            title: 'Attenzione!',
            btn_primary_text: 'Conferma',
            btn_secondary_text: 'Annulla'
        },
        forms: {
            genericSubmitErrorMessage: 'Si è verificato un errore inaspettato'
        },
        notifications: {
            auth: {
                loginSuccess: 'Autenticazione eseguita con successo!',
                profileUpdateFail: 'Si è verificato un errore durante l\'aggiornamento del profilo!',
                profileUpdateSuccess: 'Profilo aggiornato con successo!'
            },
            authError: 'Autenticazione fallita, si prega di effettuare nuovamente il login!',
            titles: {
                success: 'Successo!',
                fail: 'Errore!'
            }
        }
    },
    components: {
        labels: {
            actions: 'Azioni',
            cancel: 'Annulla',
            create: 'Crea',
            displaying: 'Visualizzati',
            edit: 'Modifica',
            help: 'Aiuto',
            profileAndSettings: 'Profilo & Impostazioni',
            reset: 'Resetta',
            searchPlaceholder: 'Ricerca...',
            submit: 'Salva'
        },
        messages: {
            confirmDelete: 'Vuoi davvero cancellare l\'oggetto selezionato?',
            confirmLogout: 'Vuoi davvero uscire dall\'applicazione?',
            confirmReload: 'La pagina deve essere aggiornata in maniera da applicare le modifiche.',
            confirmUnsaved: 'Sei sicuro? Tutte le modifiche non salvate andranno perse.',
            loading: 'Attendere prego...',
            noRows: 'Nessun oggetto da mostrare',
        }
    }
};