#!/usr/bin/node

const request = require('request');

request('https://swapi-api.hbtn.io/api/films/' + process.argv[2], function (err, res, body) {
  if (err) throw err;
  const actors = JSON.parse(body).characters;
  order(actors, 0);
});
const order = (actors, i) => {
  if (i === actors.length) return;
  request(actors[i], function (err, res, body) {
    if (err) throw err;
    console.log(JSON.parse(body).name);
    order(actors, i + 1);
  });
};