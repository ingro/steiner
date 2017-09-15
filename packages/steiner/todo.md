# Steiner

Split the package in 2: 
- `steiner`: contains only the utility functions for routes, actions, reducers and sagas plus auth, confirm, routing and settings addons (need to add `reapop` and `react-redux-loading-bar` to the dependencies)
- `steiner-components`: (name not definitive) contains all the components and relative dependencies, maybe more packages could be create to support bootstrap, material-design etc.

## General

- Better naming/organization of things
- Better way to export modules for easier imports -> some improvements done, now almost all the most used function can be import from 'steiner'
- Use NamedLink when it will be implemented from [react-router-config](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config) to generate Links to routes?
- Use [react-router-redux](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux) instead of the custom `ControlledRouter`?
- Add missing tests
- Optimistically update items on update success?
- Pass only the minimum state/actions from redux's connect?
- Use reselect for selectors?
- Find a way to cache template compiled for generate notification messages
- Find a way for the confirmSaga to pass onSuccess and onFail handlers as plain actions instead of functions
- In reducer listSuccess handler you can pass '' or null as path from `total` and this will be resolved to null, thus showing all the items in the table and not showing a paginator. If it's the desired behaviour, document it, otherwise fix it!
- Refactor the reducers? Create root reducers for entities, filters etc. and add (even lazily) keys corresponding to resources;
- Add option to omit generate actions for given group (list, create, delete etc.)
- Find a way to pass basename option's to all sagaCreators if needed
- If listSuccessOptions are defined in steinerHelper merge with those declared in modules
- Generate a notification for a failed logout
- Update code of `reduxFormSaga` -> https://github.com/mhssmnn/redux-form-saga/blob/master/src/index.js
- If the list is set on client mode paginate to slice the data
- Add an helper to create actions for something like START - SUCCESS - FAIL
- Add a single entry point for a module configuration (to avoid repeat things in different parts of the module)
- Create a css file for the things that needs styling (see ListLayout) instead of hardcode style in components
- Add a "Clear filter" button on list filter bar
- Re-enable `ctrl+d` shortcut for creating a new item in `ListLayout`

## Tests
- Split actionCreator-test createActions tests in multiple assertions for easier debugging with snapshots

## React Router v4 beta:
- Allow `getUserConfirmation` prop on `<ControlledBrowserRouter>`