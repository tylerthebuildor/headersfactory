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
