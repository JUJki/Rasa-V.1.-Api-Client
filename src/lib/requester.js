require('dotenv').config({path: './.env'});
const R = require('ramda');
const rp = require('request-promise');

const actions = {
  train: {
    method: 'POST',
    uri: '/model/train'
  },
  evaluate: {
    method: 'POST',
    uri: '/evaluate'
  },
  parse: {
    method: 'POST',
    uri: '/model/parse'
  },
  status: {
    method: 'GET',
    uri: '/status'
  },
  version: {
    method: 'GET',
    uri: '/version'
  },
  delete: {
    method: 'DELETE',
    uri: '/models'
  },
  update: {
    method: 'PUT',
    uri: '/model'
  }
}

const requester = (endpoint, queryParams, body, timeout) => {
  const conf = {
    baseUrl: process.env.RASA_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    qs: queryParams,
    timeout: timeout || 20000
  }
  if (endpoint === 'train') {
    conf.resolveWithFullResponse = true;
  }
  const payload = actions[endpoint];
  return new Promise((resolve, reject) => {
    if (['POST', 'PUT'].indexOf(payload.method) !== -1) {
        payload.body = JSON.stringify(body)
    }
    rp(R.mergeDeepRight(conf,payload))
      .then(result => {
        if(endpoint === 'train') {
          resolve(result.headers.filename)
        }
        if(endpoint === 'update') {
          resolve(true)
        }
        resolve(result)
      })
      .catch(error => {
        if(endpoint === 'parse' || endpoint === 'update') {
          resolve(false);
        } else {
          reject(error);
        }
      });
  });
}
module.exports = {
  requester
};
