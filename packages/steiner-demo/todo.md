## Steiner-demo

- Breadcrumbs: wait for a better implementation of [react-router-addons-routes](https://github.com/ReactTraining/react-router-addons-routes) to find nested routes easily
- Write a simple getting started guide after bootstrap a new app with `steiner-cli`
- Use [redux-seamless-immutable](https://www.npmjs.com/package/redux-seamless-immutable)?
- BUG: Wrapping a Link with a Tooltip results in a page change
- Translate missing strings (modal help)
- Add profile link and logout action to Omnibox
- Make all the whole auth package of Steiner more customizable
- Move confirm logout in saga? (to allow call it from Omnibox)
- Bug?: applying some filters to a list and then use the link in the sidebar will load the list filtered but with the url not updated

## Current .env

REACT_APP_NAME=Steiner
REACT_APP_API_ROOT=https://ingruz-api-vqrljjkstb.now.sh/api
REACT_APP_LOGIN_URL=https://ingruz-api-vqrljjkstb.now.sh/login
REACT_APP_DEFAULT_LANGUAGE=en