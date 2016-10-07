# Steiner

- Better naming/organization of things
- Better way to export modules for easier imports -> some improvements done, now almost all the most used function can be import from 'steiner'
- Single exports point for routes? (global `linkto` -> linkTo('hotels/list')) or use NamedLink from [react-router-addons-routes](https://github.com/ReactTraining/react-router-addons-routes)
- Add tests
- Optimistically update items on update?
- Create a global app helper, where you can define you app's default for various generators? (see below)
- Pass only the minimum state/actions from redux's connect?

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