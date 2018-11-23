# CHANGELOG

## 0.18.2 (November 23, 2018)

- Minor fixes

## 0.17.0 (March 23, 2017)

- **Breaking**: switch key/values in api's params mapper

## 0.16.3 (March 17, 2017)

- Added `footerComponent` props to `ListLayout`

## 0.16.1 (February 2, 2017)

- Removed `<HeaderLink>` component from main steiner package

## 0.16.0 (February 1, 2017)

- Update routing to `react-router@v4beta`
- Reworked `<FormWrapper />` to have less responsibilities

## 0.15.0 (January 19, 2017)

- Reworked generation of error payloads handled with redux-form and redux-saga

## 0.14.0 (November 30, 2016)

- Reworked auth module

## 0.13.1 (November 24, 2016)

- Added `createAuthErrorMiddleware`

## 0.13.0 (November 23, 2016)

- Easier way to extend routes

## 0.12.0 (November 10, 2016)

- Revorked translations (removed mostly from steinerHelper and simplified)

## 0.11.0 (November 4, 2016)

- Added `<MatchWhenAuthorizedAsync />` component
- Reworked routes to allow async loading of modules

## 0.10.0 (November 3, 2016)

- Added `<KeyBinderHoc />` component
- Added `<FormWrapper />` component
- Update and added translations

## 0.9.0 (October 26, 2016)

- Added messages translations

## 0.8.0 (October 20, 2016)

- Added `<ControlledRouter />` component
- Added sync between list filters and url (experimental)

## 0.7.0 (October 18, 2016)

- Added `SteinerHelper`

## 0.6.4 (October 13, 2016)

- Added global getLinkTo in `routeRegister`

## 0.6.2 (October 13, 2016)

- Updated selected logic in `ListTable`

## 0.6.0 (October 11, 2016)

- Update to `vivi@0.2.0`

## 0.5.0 (October 6, 2016)

- Changed internal structure of list reducer

## 0.4.1 (October 5, 2016)

- Added option to customize how data is extracted from api response in listSuccess reducers handler

## 0.4.0 (October 5, 2016)

- Removed custom reapop theme in favor of the default `reapop-theme-wybo`
- Added auth saga
- Added auth acionts
- Added user reducer

## 0.3.0 (October 3, 2016)

- Easier exports from main package

## 0.2.0 (October 3, 2016)

- Fixed some minor bugs
- Improved error handling on form submit
- Added support to query string endpoints on `createApi`
- Added support to transform data before submit on `createSubmit` helper
- `connectItem` does not pass `initialValues` props anymore

## 0.1.0 (September 30, 2016)

First release!