## Example data

```
const schema = [
    {
        name: 'email',
        label: 'Indirizzo email',
        type: 'text'
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
        name: 'comment',
        label: 'Commento',
        type: 'textarea'
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
    }
];
```