if (process.env.NODE_ENV !== 'production') {
    const Reactotron = require('reactotron-react-js').default;
    const sagaPlugin = require('reactotron-redux-saga');

    Reactotron
        .configure()
        .use(sagaPlugin())
        .connect();

    window.console.tron = Reactotron;
}
