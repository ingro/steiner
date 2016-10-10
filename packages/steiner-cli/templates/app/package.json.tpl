{
  "name": "${appName}",
  "private": true,
  "devDependencies": {
    "cross-env": "^3.1.1",
    "react-scripts": "0.6.1",
    "react-test-renderer": "^15.3.2"
  },
  "dependencies": {
    "axios": "^0.14.0",
    "mousetrap": "^1.6.0",
    "rc-pagination": "^1.5.5",
    "rc-tooltip": "^3.4.2",
    "react": "^15.3.2",
    "react-addons-shallow-compare": "^15.3.2",
    "react-dom": "^15.3.2",
    "react-redux": "^5.0.0-beta.3",
    "react-redux-loading-bar": "^2.4.0",
    "react-router": "^4.0.0-alpha.4",
    "react-select": "^1.0.0-rc.2",
    "react-sidebar": "^2.2.1",
    "react-virtualized": "^8.0.11",
    "reapop": "^0.5.0",
    "reapop-theme-wybo": "^0.3.0",
    "redux": "^3.6.0",
    "redux-batched-subscribe": "^0.1.6",
    "redux-form": "^6.0.5",
    "redux-localstorage": "^0.4.1",
    "redux-logger": "^2.6.1",
    "redux-saga": "^0.12.0",
    "redux-thunk": "^2.1.0",
    "reflexbox": "^2.2.2",
    "revalidate": "^0.4.1",
    "seamless-immutable": "^6.1.3",
    "steiner": "^0.5.0",
    "steiner-cli": "^0.5.0",
    "vivi": "^0.1.11"
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
