# Steiner

## General

- Better naming/organization of things
- Better way to export modules for easier imports -> some improvements done, now almost all the most used function can be import from 'steiner'
- Use NamedLink from [react-router-addons-routes](https://github.com/ReactTraining/react-router-addons-routes) to generate Links to routes?
- Add missing tests
- Optimistically update items on update?
- Pass only the minimum state/actions from redux's connect?
- Use reselect for selectors?
- Find a way to cache template compiled for generate notification messages
- Find a way for the confirmSaga to pass onSuccess and onFail handlers as plain actions instead of functions
- In reducer listSuccess handler you can pass '' or null as path from `total` and this will be resolved to null, thus showing all the items in the table and not showing a paginator. If it's the desired behaviour, document it, otherwise fix it!

## Tests
- Split actionCreator-test createActions tests in multiple assertions for easier debugging with snapshots
- Use [redux-saga-test-plan](https://github.com/jfairbank/redux-saga-test-plan) for easier testing with redux-saga?