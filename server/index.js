const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const messages = require('./db/messages');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Full Stack Message Board'
    });
});

app.get('/messages', (req, res) => {
    messages.getAll()
        .then(messages => {
            res.json(messages)
        });
});

app.post('/messages', (req, res) => {
    console.log(req.body);
    messages.create(req.body)
        .then(message => {
            res.json(message)
        }).catch((err) => {
            res.status(500);
            res.json(err);
        });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});