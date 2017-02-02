{
  "name": "${appName}",
  "private": true,
  "devDependencies": {
    "cross-env": "^3.1.4",
    "react-scripts": "^0.8.5",
    "react-test-renderer": "^15.4.2",
    "redux-devtools-extension": "^1.0.0",
    "steiner-cli": "^0.16.1"
  },
  "dependencies": {
    "axios": "^0.15.3",
    "mousetrap": "^1.6.0",
    "query-string": "^4.3.1",
    "rc-pagination": "^1.6.5",
    "rc-tooltip": "^3.4.2",
    "react": "^15.3.2",
    "react-addons-css-transition-group": "^15.4.2",
    "react-addons-shallow-compare": "^15.4.2",
    "react-dom": "^15.4.2",
    "react-helmet": "^4.0.0",
    "react-highlighter": "^0.3.3",
    "react-modal": "^1.6.5",
    "react-redux": "^5.0.2",
    "react-redux-loading-bar": "^2.6.4",
    "react-router-dom": "^4.0.0-beta.4",
    "react-select": "^1.0.0-rc.2",
    "react-sidebar": "^2.2.1",
    "react-virtualized": "^8.11.0",
    "reapop": "^1.0.0",
    "reapop-theme-wybo": "^0.4.0",
    "redux": "^3.6.0",
    "redux-batched-subscribe": "^0.1.6",
    "redux-form": "^6.2.0",
    "redux-localstorage": "^0.4.1",
    "redux-logger": "^2.7.4",
    "redux-saga": "^0.14.3",
    "redux-thunk": "^2.1.0",
    "reflexbox": "^2.2.3",
    "revalidate": "^1.1.0",
    "seamless-immutable": "^7.0.1",
    "steiner": "^0.16.1",
    "text-spinners": "^1.0.5",
    "vivi": "^0.4.10"
  },
  "scripts": {
    "start:plain": "react-scripts start",
    "build:plain": "react-scripts build",
    "test:plain": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "start": "cross-env NODE_PATH=./src npm run start:plain",
    "build": "cross-env NODE_PATH=./src npm run build:plain",
    "test": "cross-env NODE_PATH=./src npm run test:plain"
  }
}
