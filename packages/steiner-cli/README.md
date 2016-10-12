# Steiner-cli

## Install

Install globally with npm 

```
npm install --global steiner-cli
```

## Usage

There are two commands available:

### GENERATE

Quickly generate a module in the desider folder.

```
steiner generate moduleName -o path/to/modules/folder
```

#### Options
- `-o, --output-path <path>`: output path of the module's files
- `-n, --no-components`: avoid the creation of component and container files
- `-r, --rich-component`: use react-helmet and keybindings in components

### BOOTSTRAP

Generate an app skeleton based on [create-react-app](https://github.com/facebookincubator/create-react-app)

```
steiner bootstrap appName
```
