const mailJet = require('node-mailjet');
const ticketTemplate = require('../mailTemplates/ticket/ticket');

const key = process.env.MAILJET_API_KEY;
const sKey = process.env.MAILJET_SECRET_KEY;

const mailjet = mailJet.connect(key, sKey);

function sendMail(ticket) {
  try {
    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [ticketTemplate(ticket)],
    });
    console.log(ticketTemplate(ticket));
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

module.exports = sendMail;
