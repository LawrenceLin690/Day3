const path = require('path');
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/wiki', require('./wiki'));
app.use('/reddit', require('./reddit'));
app.use('/buzzfeed', require('./buzzfeed'));

app.use((req, res, next) => {
  if (path.extname(req.path).length > 0) {
    res.status(404).end();
  } else {
    next();
  }
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(PORT, () => {
  console.log('Listening on PORT XXXX');
});

module.exports = app;
