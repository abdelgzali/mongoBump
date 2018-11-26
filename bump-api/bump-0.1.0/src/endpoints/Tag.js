
  import Tag from '../schemas/Tag.js';

  export default {
    generate(app) {
      /*
      * Get multiple records of Tag
      */
      app.get('/Tag/list', (request, response) => {
        Tag.find({ ...request.query, removed: { $ne: true } })
          .then(results => response.send({ status: 'success', results }))
          .catch(error => response.status(500).send({ status: 'error', error }));
      });
      /*
      * Get single record of Tag
      */
      app.get('/Tag/single', (request, response) => {
        Tag.findOne({ _id: request.query._id, removed: { $ne: true }})
          .then(result => response.send({ status: 'success', result }))
          .catch(error => response.status(500).send({ status: 'error', error }));
      });
      /*
      * Create new record of Tag
      */
      app.post('/Tag/create', (request, response) => {
        const record = new Tag(request.body);
        record.save()
          .then(() => response.send({ status: 'success', record }))
          .catch(error => response.status(500).send({ status: 'error', error }));
      });
      /*
      * Update existing record of Tag
      */
      app.post('/Tag/update', (request, response) => {
        Tag.update(request.query, request.body, { multi: request.headers.multi })
          .then(() => response.send({ status: 'success' }))
          .catch(error => response.status(500).send({ status: 'error', error }));
      });
      /*
      * Remove existing record of Tag
      */
      app.post('/Tag/remove', (request, response) => {
        Tag.update(request.query, { removed: true }, { multi: request.headers.multi })
          .then(() => response.send({ status: 'success' }))
          .catch(error => response.status(500).send({ status: 'error', error }));
      });
    }
  }
