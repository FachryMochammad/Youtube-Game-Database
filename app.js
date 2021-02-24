const express = require('express');
const router = require('./routers');
const session = require('express-session');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(router);

app.listen(port, () => console.log(`This app running on port: ${port}`));