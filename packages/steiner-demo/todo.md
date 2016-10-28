## Steiner-demo

- Breadcrumbs: wait for a better implementation of [react-router-addons-routes](https://github.com/ReactTraining/react-router-addons-routes) to find nested routes easily
- Write a simple getting started guide after bootstrap a new app with `steiner-cli`
- Use all the helpers from SteinerHelper
- Use [redux-seamless-immutable](https://www.npmjs.com/package/redux-seamless-immutable)?
- BUG: Wrapping a Link with a Tooltip results in a page change
- Translate missing strings (logout request, navigate away from forms)
- Make use of forms easier
- Make all the whole auth package of Steiner more customizable
- How to make update in user's language and rows per page be reflected in the store and the app? Languages needs to be dynamically loaded with webpack (chunks?) while perPage setting should be set in all the resource list reducers?
- Update Profile.js, App.js, reducers/index.js and createStore on app's skeleton
- How to load initial settings from localstorage or user's store?

## Current .env

REACT_APP_NAME=Steiner
REACT_APP_API_ROOT=https://ingruz-api-vqrljjkstb.now.sh/api
REACT_APP_LOGIN_URL=https://ingruz-api-vqrljjkstb.now.sh/login
REACT_APP_DEFAULT_LANGUAGE=en