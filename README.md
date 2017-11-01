# Headers Factory

Opinionated headers factory for easy use with fetch and other AJAX things too I guess.

99% of the time I'm hitting a JSON API in CORS mode, getting or posting some data, and maybe sending up a JWT token.

So I've designed this module to make that use case super easy.

## Install

```bash
# with npm
npm install --save headersfactory

# with yarn
yarn add headersfactory
```

## Use

`headersFactory(jwtToken)(method, data)`

```jsx
// with es6
import headersFactory from 'headersfactory';

// with CommonJS
const headersFactory = require('headersfactory');

// Example get with no JWT token
const githubUrl = 'https://api.github.com/users/tylerbuchea/repos?sort=updated';
const githubHeaders = headersFactory()('get');

fetch(url, githubHeaders)
    .then(response => response.json())
    .then(console.log)
    .then(console.error);

// Example post and get with JWT token
const madeupUrl = 'https://api.example.com/users';
const jwtToken = 'IMAJWTTOKEN';

// No we can use headers() to generate new headers with the JWT token automatically connected
const headers = headersWithAuth(jwtToken);

const headersPost = headers('post', { age: 27 });
fetch(madeupUrl, headersPost)
    .then(response => response.json())
    .then(console.log)
    .then(console.error);

const headersGet = headers('get');
fetch(madeupUrl, headersGet)
    .then(response => response.json())
    .then(console.log)
    .then(console.error);


```

## The actual code

This whole module is super tiny feel free to just copy paste it into your own file locally and modify as opposed to `npm install`-ing it.

```jsx
'use strict';

function headersFactory(jwtToken) {
  return function headers(method, data, headers) {
    var header = {
      mode: 'cors',
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    if (jwtToken) header.headers.Authorization = 'Bearer ' + jwtToken;
    if (data) header.body = JSON.stringify(data);
    return header;
  };
}

module.exports = headersFactory;
```