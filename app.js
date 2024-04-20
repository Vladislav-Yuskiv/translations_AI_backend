const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const usersRouter = require('./routes/api/users');
const translationBundlesRouter = require('./routes/api/translationBundles/translationBundles');
const authRouter = require('./routes/api/auth');
const referenceRouter = require('./routes/api/referral');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/reference',referenceRouter)
app.use('/users', usersRouter);
app.use('/bundles', translationBundlesRouter);
app.use('/auth', authRouter);


app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
