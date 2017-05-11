# Helpers

## actionCreator

It generates action types and actions for a given resource;

```
import { createActions, createActionTypes } from 'steiner';

export const actionTypes = createActionTypes('posts');
export const actions = createActions('posts', actionTypes);
```

### createActionTypes(resourceName, options)

Returns and object with all the action types defined. If `options.addAlias` is true (as the default) it also return an alias for the actions:

```
{
    ...,
    "posts/CREATE": "posts/CREATE",
    "create": "posts/CREATE" // alias
}
```

### createActions(resourceName, actionTypes)

Returns and object with all the redux's actions defined. The name of the method is the same as the alias of the action types.

## apiCreator

It generates a list of methods to call your api for a given resource following the REST pattern, using `axios`.

```
import { createApi } from 'steiner';
import axios from 'axios';

const client = axios.create({
    baseUrl: 'http://foo.bar'
});

export default createApi('posts', client, {
    filter: 'q',
    limit: 'perPage'
});
```

### createApi(endpoint, client, paramsMap, options)

Returns an object with methods to fetch a `list` of items and to `fetch`, `create`, `update` and `delete` a single item.
It accepts as arguments:

- `endpoint` (string): your API endpoint the given resource
- `client` (axios): `axios` instance
- `paramsMap` (object): an object that maps the filter set in redux's store to the api's query
- `options` (object):
    - `omit` (array): an array of methods to be omitted from the resulting object, if you don't need them

## connectCreator

Connect containers to the redux's store via `react-redux` for a single item and a list with all the props needed included.

```
import { connectCreator } from 'steiner';
import { actions } from './actions/posts';
import { selectors } from './reducers/posts';
import PostsTable from './PostTable';

export default connectCreator.connectList(PostsTable, actions, selectors);

```

### connectList(component, actions, selectors, options)

Connect a component to the store giving the following props taken from the store:

- filters: an object containing the current filters applied;
- items: an array of the items that should be displayed;
- selected: an array with the ids of the eventual selected items;
- currentRoute: the current route taken from the history.

And also all the actions provided bounded to the store.

The `options` parameter could contain an `additionalProps` object in which the keys are the props to be passed to the connected component, and the values are the selectors to be used to extract the data from the store:

```
connectList(ListComponent, actions, selectors, {
    user: getUser
});

```

### connectItem(component, actions, selectors, options)

Connect a component to the store giving the following props taken from the store:

- item: an object containing the data of the current item;
- previousUrl: the previous url (if present)

The `options` parameter object could contain:

- additionalProps: works as seen on `connectList` method;
- loadFromStore (bool): if set to true tries to get the item from the store if present, avoiding an api call to fetch from the server, default to false.

## reducerCreator

It generate a reducer and a list of selectors to handle the given resource in the store. It exports the following:

### DEFAULT_STATE

The default state of resource in the store, created with `seamless-immutable`.

### createHandlers(actionTypes, options)

Returns an object with the handlers for the action types provided, usually generated via the `actionCreator` helper.

The `options` parameter accepts the following properties:

- items (string|func): tells how to extract the array of the items from the api response. If it's a string it's used with the lodash's `get` method to extract the data (defaults to `"data.data"`). If it's a function it will be called with the whole response as argument;
- total (string|func): same as the above but to get the total number of items (useful for pagination), defaults to `"data.meta.total"`;
- idKey (string): the name of the key representing the id of the item, defaults to `"id"`;

These properties are used only if you plan to filter the list of items on the client:
- additionalFilters (object): an hash of additional filters to apply when querying the list with `sift`, every value of the hash should have the following properties:
    - field (string): the name of the field;
    - op (string): the operation to apply to the field (see sift's documentation);
- defaultOrderKey (string): the default field to order for, defaults to "`id`"
- searchKeys (array): an array of fields in which a full-text search should be performed, powered by `match-sorter`, defaults to `["name"]`.

### createReducer(handlers, defaultState, options)

Returns the proper reducer for the resource, using handlers created by `createHandlers` method.
The `options` parameter could contain:
- resetOnLogout (bool): reset the store to the default state if a logout action from the `auth` module of steiner is dispatched on the store, defaults to false.

### createSelectors(resourceName)

Returns an object of useful selectors for the resources's data in the store.