{
  "name": "${appName}",
  "version: "1.0.0",
  "private": true,
  "devDependencies": {
    "cross-env": "^5.2.0",
    "react-scripts": "^2.1.1",
    "react-test-renderer": "^16.7.0",
    "redux-devtools-extension": "^2.13.7",
    "steiner-cli": "^0.19.0"
  },
  "dependencies": {
    "axios": "^0.18.0",
    "mousetrap": "^1.6.2",
    "prop-types": "^15.6.2",
    "query-string": "^5.0.1",
    "rc-pagination": "^1.17.3",
    "rc-tooltip": "^3.7.3",
    "react": "^16.7.0",
    "react-addons-css-transition-group": "^15.6.2",
    "react-addons-shallow-compare": "^15.6.2",
    "react-dom": "^16.7.0",
    "react-helmet": "^5.2.0",
    "react-highlight-words": "^0.14.0",
    "react-modal": "^3.8.1",
    "react-redux": "^6.0.0",
    "react-redux-loading-bar": "^4.1.0",
    "react-router-dom": "^4.3.1",
    "react-select": "^1.1.0",
    "react-sidebar": "^3.0.2",
    "react-virtualized": "^9.21.0",
    "reapop": "^2.0.1",
    "reapop-theme-wybo": "^1.0.2",
    "redux": "^4.0.1",
    "redux-batched-subscribe": "^0.1.6",
    "redux-form": "^8.0.4",
    "redux-localstorage": "^0.4.1",
    "redux-logger": "^3.0.6",
    "redux-saga": "^0.16.2",
    "redux-thunk": "^2.3.0",
    "revalidate": "^1.2.0",
    "seamless-immutable": "^7.1.3",
    "steiner": "^0.19.0",
    "text-spinners": "^1.0.5",
    "vivi": "^0.6.15"
  },
  "scripts": {
    "start:plain": "react-scripts start",
    "build:plain": "react-scripts build",
    "test:plain": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "start": "cross-env NODE_PATH=./src npm run start:plain",
    "build": "cross-env NODE_PATH=./src npm run build:plain",
    "test": "cross-env NODE_PATH=./src npm run test:plain"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}
