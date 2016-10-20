## Steiner-demo

- Breadcrumbs: wait for a better implementation of [react-router-addons-routes](https://github.com/ReactTraining/react-router-addons-routes) to find nested routes easily
- Sync between filters and browser url (wait for React-Router ControlledRouter with Redux, see this example https://github.com/este/este/pull/1156/files -> src/browser/app/Root.js)
- Write a simple getting started guide after bootstrap a new app with `steiner-cli`
- Use user's settings value for number of rows displayed in tables?
- Use all the helpers from SteinerHelper
- Move logic from hotels sagas into sagaCreator helper to sync filter and url
- Check deps (react-router-addons-controlled, history, query-string)
- Implement a better solution (debounce) for list filter input to allow a lower delay in handleFilter saga