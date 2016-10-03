# Steiner

## Disclaimer

The library is still very young and with some rough edges that I hope to eliminate in the coming months. Also docs and tests are lackluster at best, so it's absolutely not production ready!

## Concepts

Steiner is a collection of helpers that helps you quickly build user interfaces for CRUD backends with little-to-none configurations needed leveraging various other libraries like `react`, `redux`, `react-router`, `redux-saga` and `redux-form`.

While it's perfectly usable stand-alone in your existing react-redux app a boilerplate based on `create-react-app` is currently in development.

## Install

Install in your project with npm

```
npm install steiner --save
```

Steiner also has some peer-dependencies that you need to install:

```
npm install axios@^0.14.0 lodash@^4.0.0 react@^15.0.0 react-dom@^15.0.0 react-redux@^4.0.0 react-router@^4.0.0-alpha.4 reapop@^0.5.0 redux@^3.0.0 redux-form@^6.0.0 redux-saga^0.11.0 vivi@^0.1.4
```

## Usage

It's preferable to generate your apps modules with `steiner-cli` and then extend and modify them as you need.