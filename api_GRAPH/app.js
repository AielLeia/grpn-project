require('dotenv');
const express = require('express');
const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const {
  moduleFormationRoute,
  unitePedagogiqueRoutes,
  chaineDescriptiveRoutes,
} = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api-graph/module-formation', moduleFormationRoute);
app.use('/api-graph/unite-pedagogique', unitePedagogiqueRoutes);
app.use('/api-graph/chaine-descriptive', chaineDescriptiveRoutes);

app.use(notFound);
app.use(errorHandler);
const port = process.env.APP_PORT || 5000;
module.exports = app;
