// application starting point

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
// log framework; used for debugging
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth', { useNewUrlParser: true, useUnifiedTopology: true });

// App setup
// middlewares
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port: ', port);