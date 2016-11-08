# Steiner

## General

- Better naming/organization of things
- Better way to export modules for easier imports -> some improvements done, now almost all the most used function can be import from 'steiner'
- Use NamedLink from [react-router-addons-routes](https://github.com/ReactTraining/react-router-addons-routes) to generate Links to routes?
- Add missing tests
- Optimistically update items on update?
- Add all the missing helper's function on SteinerHelper
- Pass only the minimum state/actions from redux's connect?
- Use reselect for selectors?
- SteinerHelper loads all the languages by default, find a way to load only the current one?
- Find a way for the confirmSaga to pass onSuccess and onFail handlers as plain actions instead of functions
- In reducer listSuccess handler you can pass '' as path from `total` and this will be resolved to null, thus showing all the items in the table and not showing a paginator. If it's the desired behaviour, document it, otherwise fix it!

## Translations