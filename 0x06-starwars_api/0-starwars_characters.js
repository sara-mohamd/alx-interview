#!/usr/bin/node
const request = require('request');
const API_URL = 'https://swapi-api.hbtn.io/api';

if (process.argv.length > 2) {
  request(`${API_URL}/films/${process.argv[2]}/`, (err, _, body) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    try {
      const charactersURL = JSON.parse(body).characters;
      const charactersName = charactersURL.map(
        url => new Promise((resolve, reject) => {
          request(url, (promiseErr, __, charactersReqBody) => {
            if (promiseErr) {
              reject(promiseErr);
            }
            resolve(JSON.parse(charactersReqBody).name);
          });
        })
      );

      Promise.all(charactersName)
        .then(names => console.log(names.join('\n')))
        .catch(allErr => {
          console.log(allErr);
          process.exit(1);
        });
    } catch (jsonErr) {
      console.log('Error parsing JSON:', jsonErr);
      process.exit(1);
    }
  });
} else {
  console.log('Usage: ./0-starwars_characters.js <movie_id>');
  process.exit(1);
}
