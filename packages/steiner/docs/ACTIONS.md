# Actions

## actionTypes

The default action types created by the helper are (using `posts` as resource name):

```
Object {
  "posts/CHANGE_ORDER": "posts/CHANGE_ORDER",
  "posts/CHANGE_PAGE": "posts/CHANGE_PAGE",
  "posts/CHECK_FILTER_SYNC": "posts/CHECK_FILTER_SYNC",
  "posts/CREATE": "posts/CREATE",
  "posts/CREATE_FAIL": "posts/CREATE_FAIL",
  "posts/CREATE_SUCCESS": "posts/CREATE_SUCCESS",
  "posts/DELETE": "posts/DELETE",
  "posts/DELETE_FAIL": "posts/DELETE_FAIL",
  "posts/DELETE_SUCCESS": "posts/DELETE_SUCCESS",
  "posts/DESELECT": "posts/DESELECT",
  "posts/DESELECT_ALL": "posts/DESELECT_ALL",
  "posts/FETCH": "posts/FETCH",
  "posts/FETCH_FAIL": "posts/FETCH_FAIL",
  "posts/FETCH_SUCCESS": "posts/FETCH_SUCCESS",
  "posts/FILTER_COLLECTION": "posts/FILTER_COLLECTION",
  "posts/LIST": "posts/LIST",
  "posts/LIST_FAIL": "posts/LIST_FAIL",
  "posts/LIST_SUCCESS": "posts/LIST_SUCCESS",
  "posts/RESET_CURRENT": "posts/RESET_CURRENT",
  "posts/RESET_FILTERS": "posts/RESET_FILTERS",
  "posts/SELECT": "posts/SELECT",
  "posts/SELECT_ALL": "posts/SELECT_ALL",
  "posts/SET_FILTERS": "posts/SET_FILTERS",
  "posts/SYNC_FILTERS": "posts/SYNC_FILTERS",
  "posts/UDATE_FILTER": "posts/UDATE_FILTER",
  "posts/UPDATE": "posts/UPDATE",
  "posts/UPDATE_FAIL": "posts/UPDATE_FAIL",
  "posts/UPDATE_SUCCESS": "posts/UPDATE_SUCCESS"
}
```

If the option `addAlias` is set to true also the following alias will be created:

```
Object {
  "changeOrder": "posts/CHANGE_ORDER",
  "changePage": "posts/CHANGE_PAGE",
  "checkFilterSync": "posts/CHECK_FILTER_SYNC",
  "create": "posts/CREATE",
  "createFail": "posts/CREATE_FAIL",
  "createSuccess": "posts/CREATE_SUCCESS",
  "delete": "posts/DELETE",
  "deleteFail": "posts/DELETE_FAIL",
  "deleteSuccess": "posts/DELETE_SUCCESS",
  "deselect": "posts/DESELECT",
  "deselectAll": "posts/DESELECT_ALL",
  "fetch": "posts/FETCH",
  "fetchFail": "posts/FETCH_FAIL",
  "fetchSuccess": "posts/FETCH_SUCCESS",
  "filterCollection": "posts/FILTER_COLLECTION",
  "list": "posts/LIST",
  "listFail": "posts/LIST_FAIL",
  "listSuccess": "posts/LIST_SUCCESS",
  "resetCurrent": "posts/RESET_CURRENT",
  "resetFilters": "posts/RESET_FILTERS",
  "select": "posts/SELECT",
  "selectAll": "posts/SELECT_ALL",
  "setFilters": "posts/SET_FILTERS",
  "syncFilters": "posts/SYNC_FILTERS",
  "update": "posts/UPDATE",
  "updateFail": "posts/UPDATE_FAIL",
  "updateFilter": "posts/UDATE_FILTER",
  "updateSuccess": "posts/UPDATE_SUCCESS",
}
```

## actions

The following action creator methods are created by default using the helper:

### list

### fetch(id)

### create(data)

### createSuccess(response, notification)

### createFail(error, notification)

### update(id, data)

### updateSuccess(response, notification)

### updateFail(error, notification)

### delete(id)

### deleteSuccess(response, notification)

### deleteFail(error, notification)

### resetCurrent

Reset the `current` item in the store.

### updateFilter(key, value)

Updates a single filter value.

### syncFilters(filters)

Sync filters values in the store with arbitrary values (usually from the query string) and then filter the list.

### checkFilterSync(query)

Check if the filters needs to be synced.

### setFilters(filters)

Bulk update the filters values.

### resetFilters(query)

Reset the filters to their default state.

### changePage(page)

### changeOrder(key, direction)

### select(items)

### deselect(items)

### selectAll

### deselectAll

### filterCollection

Filter the collection on the client based on current filters.