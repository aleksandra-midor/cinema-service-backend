const mailJet = require('node-mailjet');
const ticketTemplate = require('../mailTemplates/ticket/ticket');

const key = process.env.MAILJET_API_KEY;
const sKey = process.env.MAILJET_SECRET_KEY;

const mailjet = mailJet.connect(key, sKey);

async function sendMail(ticket) {
  /** send mail only on development process */
  if (process.env.NODE_ENV === 'development') {
    try {
      await mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [ticketTemplate(ticket)],
      });
    } catch (error) {
      console.log('sendMail', error);
    }
  }
}

module.exports = sendMail;
