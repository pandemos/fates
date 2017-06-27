# Fates

An implementation of Fate Core as a mechanically-playable system. 

Requires node 7.5.0 or higher.

## Running with NPM

To run, do `npm start` from the project root. This will run the API on port 3000 and the website on port 8000.

To stop, do `npm stop` from the project root.

You will need a MongoDB server listening on localhost:27017. There is not currently a way to customize this location via config.

## Running with Docker

The project is fully dockerized. Running `docker-compose up` from the root will create images for mongodb on port 27017, the API on port 3000, and the web service on port 8000. Those ports are all bound to the same ports on the host for easy access.
