## Synopsis

A re-creation of Wes Bos's [React for Beginners](reactforbeginners.com) Catch of the Day app from following along with the videos, but with a full test suite.

## Installation

```
yarn install
```

Refer to Create React App documentation.

App requires the use of some API keys. The following need to be added and set in a `.env` file in the root directory:

```
REACT_APP_FIREBASE_APIKEY=
REACT_APP_FIREBASE_AUTHDOMAIN=
REACT_APP_FIREBASE_DBURL=
REACT_APP_AUTH_UID=
```

The first three are from Firebase. The last one is a token you get back from Firebase when using a signin method. It is only required here for the tests. However, since the tests actually bypass authentication, it can be any string value.

After adding the `.env` file, start the app:

```
yarn start
```

## Tests

Run Jest:

```
yarn test
```

Run Coverage Report

```
yarn test --coverage
```
