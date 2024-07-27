#!/usr/bin/env node
const axios = require('axios');

if (process.argv.length !== 3) {
  console.log('Usage: ./0-starwars_characters.js <movie_id>');
  process.exit(1);
}

const movieId = process.argv[2];
const baseUrl = 'https://swapi.dev/api/films/';

axios.get(`${baseUrl}${movieId}/`)
  .then(response => {
    const characters = response.data.characters;
    const characterPromises = characters.map(url => axios.get(url));

    return Promise.all(characterPromises);
  })
  .then(characterResponses => {
    characterResponses.forEach(response => {
      console.log(response.data.name);
    });
  })
  .catch(error => {
    console.error(`Error fetching data: ${error}`);
  });
