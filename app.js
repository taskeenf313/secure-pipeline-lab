const express = require('express');
const _ = require('lodash');
const { exec } = require('child_process');
const app = express();
const DB_PASSWORD = 'admin123'; // Problem: hard-coded password
app.get('/', (req, res) => {
 res.send('<h1>Student Portal</h1><a href="/hello?name=Ali">Say hello</a>');
});
// Problem: user input goes straight into the HTML page
app.get('/hello', (req, res) => {
 res.send('<p>Hello ' + req.query.name + '</p>');
});
// Problem: user input goes straight into a system command
app.get('/ping', (req, res) => {
 exec('ping -c 1 ' + req.query.host, (err, output) => res.send(output));
});
// Problem: user input is executed as JavaScript code
app.get('/calc', (req, res) => {
 res.send(String(eval(req.query.expr)));
});
app.get('/merge', (req, res) => {
 res.json(_.merge({}, { course: 'SE' }));
});
app.listen(3000, () => console.log('App running on http://localhost:3000'));