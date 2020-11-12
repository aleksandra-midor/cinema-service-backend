const mailJet = require('node-mailjet');

const key = process.env.MAILJET_API_KEY;
const sKey = process.env.MAILJET_SECRET_KEY;

const mailjet = mailJet.connect(key, sKey);

function sendMail(ticket) {
  try {
    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'cinema@aleksandramidor.com',
            Name: 'Cinema Paradiso',
          },
          To: [
            {
              Email: ticket.customerEmail,
              Name: ticket.customerEmail,
            },
          ],
          Subject: `Ticket/s for the ${ticket.movieTitle} screening`,
          TextPart: 'My first Mailjet email',
          HTMLPart: `<h3>Dear, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />Total price is: ${ticket.totalPrice}`,
          CustomID: 'AppGettingStartedTest',
        },
      ],
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

module.exports = sendMail;
