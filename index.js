const express = require('express');
const app = express();
const dns = require('dns');

app.get('/domain/:domain', (req, res) => {
  dns.resolve4(req.params.domain, (err, addresses) => {
  if (err) {
    if (err.code === 'ENOTFOUND') {
      res.send({
        available: true,
        message: 'Domain available.'
      });
    }else {
      res.send({
        available: false,
        message: 'An error occured.'
      });
    }
  }else {
    addresses.forEach((a) => {
      dns.reverse(a, (err, hostnames) => {
        if (err) {
          res.send({
            available: false,
            message: 'An error occured.'
          });
        }else {
          res.send({
            available: false,
            message: 'Domain not available.',
            hostnames: hostnames
          });
        }
      });
    });
  }
});
})

app.use('/', express.static('client'));

app.listen(3000, () => {
  console.log('App is up.');
})
