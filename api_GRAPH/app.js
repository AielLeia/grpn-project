require('dotenv');
const express = require('express');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const { moduleFormationRoute } = require('./routes');

const app = express();

app.use(express.json());

app.use('/api-graph/module-formation', moduleFormationRoute);

app.use(notFound);
app.use(errorHandler);
const port = process.env.APP_PORT || 5000;
module.exports = app;
