
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import Endpoints from './endpoints';
import settings from '../settings.json';

mongoose.connect(settings.storage)
  .then(() => console.log('Connected to MongoDB.'))
  .catch(error => console.log(error));

const createApiRouter = () => {
  const router = express.Router();
  Endpoints.generate(router);
  router.get('/status', (req, res) => res.send({ status: 'success' }));
  return router;
}

const setupServer = () => {

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  const apiRouter = createApiRouter();

  app.use('/api', apiRouter);

  app.listen(3000, () => {
    console.log(`
      ##### Bump
      ##### Bump server started and listening on port 3000.
    `);
  });
};

export default setupServer;
