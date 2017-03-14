const Mail = require('../models/mail');

module.exports = (app) => {

  app.get('/mails', (req, res) => {
    Mail.find({}, (err, mails) => {
      if (err) {
        console.error(err);
        res.json({msg: `error: ${err}`, data: null});
      }
      if (mails) {
        res.json({msg: 'success', data: mails});
      }
    });
  });

  app.get('/mails/:id', (req, res) => {
    const id = req.params.id;

    Mail.findById(id, (err, mail) => {
      if (err) {
        console.error(err);
        res.json({msg: `error: ${err}`, data: null});
      }
      if (mail) {
        res.json({msg: 'success', data: mail});
      } else {
        res.json({msg: `error`, data: null});
      }
    });
  });

  app.post('/mails', (req, res) => {
    let newMail = new Mail(req.body);
    newMail.save((err, data) => {
      if (err) {
        console.error(err);
        res.json({msg: `error: ${err}`, data: null});
      }

      if (data) {
        res.json({msg: 'success', data: data});
      } else {
        res.json({msg: `error`, data: null});
      }
    });
  });

  app.put('/mails/:id', (req, res) => {
    let id = req.params.id;

    let data = req.body;

    Mail.findByIdAndUpdate(id, data, {new: true}, (err, mail) => {
      if (err) {
        console.error(err);
        res.json({msg: `error: ${err}`, data: null});
      }

      if (mail) {
        res.json({msg: 'success', data: mail});
      } else {
        res.json({msg: `error`, data: null});
      }
    });
  });

  app.delete('/mails/:id', (req, res) => {
    let id = req.params.id;

    Mail.findByIdAndRemove(id, (err, data) => {
      if (err) {
        console.error(`Error: ${err}`);
        res.json({msg: `error: ${err}`, data: null});
      }

      if (data) {
        res.json({msg: 'success', data: data});
      } else {
        res.json({msg: `error`, data: null});
      }
    });
  });

};