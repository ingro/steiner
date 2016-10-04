# Steiner

## Development
This project uses [lerna](https://github.com/lerna/lerna) to manage multiple packages within a single repository.

- Install lerna globally: `npm install --global lerna@prerelease`
- Install global project dependencies: `npm install`
- Bootstrap project dependencies with `npm run bootstrap`

### Scripts
Various scripts have ben configured in the main package.json:

- `build`: builds the main `steiner` package
- `seed:demo`: create a fresh module for `steiner-demo` from `steiner-cli`
- `start:demo`: starts the demo
- `bootstrap`: run `lerna bootstrap` and create symlinks for common packages to avoid instance problem (see [this issue](https://github.com/lerna/lerna/issues/176))
- `publish`: run `lerna publish` and `lerna-npm-readme-hack` to also publish readme on npm (see [this issue](https://github.com/npm/registry/issues/42))