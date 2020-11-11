const mailJet = require('node-mailjet');

const key = process.env.MAILJET_API_KEY;
const sKey = process.env.MAILJET_API_KEY;

const mailjet = mailJet.connect(key, sKey);

function sendMail(receiptEmail) {
  try {
    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'cinema@aleksandramidor.com',
            Name: 'Aleksandra',
          },
          To: [
            {
              Email: receiptEmail,
              Name: 'Mat',
            },
          ],
          Subject: 'Greetings from Mailjet 2.',
          TextPart: 'My first Mailjet email',
          HTMLPart:
            "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
          CustomID: 'AppGettingStartedTest',
        },
      ],
    });

    request
      .then((result) => {
        console.log(result.body);
      })
      .catch((err) => {
        console.log(err.statusCode);
      });
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendMail;
