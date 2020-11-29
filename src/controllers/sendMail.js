const mailJet = require('node-mailjet');
const ticketTemplate = require('../mailTemplates/ticket/ticket');

const key = process.env.MAILJET_API_KEY;
const sKey = process.env.MAILJET_SECRET_KEY;

const mailjet = mailJet.connect(key, sKey);

function sendMail(ticket) {
  /** send mail only on development process */
  if (process.env.NODE_ENV === 'development') {
    try {
      const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [ticketTemplate(ticket)],
      });
      request
        .then((result) => {
          console.log(result.body);
        })
        .catch((err) => {
          console.log('sendMail', err.statusCode, err);
        });
    } catch (error) {
      console.log('sendMail', error);
    }
  }
}

module.exports = sendMail;
