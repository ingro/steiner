## Example data

```
const schema = [
    {
        name: 'email',
        type: 'text',
        placeholder: 'Indirizzo email',
        label: 'Indirizzo email'
    },
    {
        name: 'active',
        label: 'Attivo',
        type: 'checkbox'
    },
    {
        name: 'type',
        label: 'Tipologia',
        type: 'select',
        options: [{
            value: 1,
            label: 'Articolo'
        }, {
            value: 2,
            label: 'Commento'
        }]
    },
    {
        name: 'theme',
        label: 'Tema',
        type: 'radio',
        options: [{
            value: '1',
            label: 'Bright'
        }, {
            value: '2',
            label: 'Dark'
        }]
    },
    {
        name: 'comment',
        type: 'textarea',
        onlyInput: true
    }
];
```