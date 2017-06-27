/**
 * Main application module
 *
 * Created by allison on 6/25/17.
 */

const Koa = require('koa');

const cors = require('kcors');
const bodyParser = require('koa-bodyparser');

const router = require('./routes.js');

const app = new Koa();

app
    .use(cors())
    .use(bodyParser())
    .use(router.routes());

app.listen({
    hostname: '0.0.0.0',
    port: 3000
});
console.log('Listening on port 3000');

module.exports = app;