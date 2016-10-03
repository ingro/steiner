# Steiner

- Get rid of misc/notifications as soon as `reapop` change his theming system
- Better naming/organization of things
- Better way to export modules for easier imports
- Single exports point for routes?
- Customize how data is extracted by list reducer
- Add tests
- Create a global app helper???

```javascripts
// helpers/app.js

import steiner from 'steiner';

const options = {
    ...
};

export default steiner(options);

// somewhere/else.js

import app from 'helpers/app';

export const actionTypes = app.createActionTypes('posts');
export const actions = app.createActions('posts', actionTypes);
```