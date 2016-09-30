# Steiner

## Development
This project uses [lerna](https://github.com/lerna/lerna) to manage multiple packages within a single repository.

- Install lerna globally: `npm install --global lerna@prerelease`
- Install global project dependencies: `npm install`
- Bootstrap project dependencies with `lerna bootstrap`

### Scripts
Various scripts have ben configured in the main package.json:

- `build`: builds the main `steiner` package
- `seed:demo`: create a fresh module for `steiner-demo` from `steiner-cli`
- `start:demo`: starts the demo