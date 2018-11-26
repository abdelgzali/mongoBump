
  import Note from '../schemas/Note.js';

  export default {
    generate(app) {
      /*
      * Get multiple records of Note
      */
      app.get('/Note/list', (request, response) => {
        Note.find({ ...request.query, removed: { $ne: true } })
          .then(results => response.send({ status: 'success', results }))
          .catch(error => response.status(500).send({ status: 'error', error }));
      });
      /*
      * Get single record of Note
      */
      app.get('/Note/single', (request, response) => {
        Note.findOne({ _id: request.query._id, removed: { $ne: true }})
          .then(result => response.send({ status: 'success', result }))
          .catch(error => response.status(500).send({ status: 'error', error }));
      });
      /*
      * Create new record of Note
      */
      app.post('/Note/create', (request, response) => {
        const record = new Note(request.body);
        record.save()
          .then(() => response.send({ status: 'success', record }))
          .catch(error => response.status(500).send({ status: 'error', error }));
      });
      /*
      * Update existing record of Note
      */
      app.post('/Note/update', (request, response) => {
        Note.update(request.query, request.body, { multi: request.headers.multi })
          .then(() => response.send({ status: 'success' }))
          .catch(error => response.status(500).send({ status: 'error', error }));
      });
      /*
      * Remove existing record of Note
      */
      app.post('/Note/remove', (request, response) => {
        Note.update(request.query, { removed: true }, { multi: request.headers.multi })
          .then(() => response.send({ status: 'success' }))
          .catch(error => response.status(500).send({ status: 'error', error }));
      });
    }
  }
