/* eslint-disable indent */
const translationPl = require('./ticketPl.json');
const translationSv = require('./ticketSv.json');

const email = (ticket) => {
  let t = translationSv;
  if (ticket.language === 'pl') {
    t = translationPl;
  }
  return {
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
    Subject: `Cinema Paradiso: ${t.ticketFor} ${ticket.movieTitle}`,
    TextPart: `Cinema Paradiso: ${t.ticketFor} ${ticket.movieTitle}`,
    HTMLPart: `
    <body style="background: black; font-size: 120%; border-bottom: 10px solid #bf2a2a!important">
    <div style="background: #bf2a2a; color: white; padding: 15px; font-size: 18px; font-weight: bold">Cinema Paradiso</div>
    <div style="max-width: 600px; margin: 40px auto; color: white!important;">
    <h1>${t.ticketFor} ${ticket.movieTitle}</h1>
    <p>${t.hi}, 
    <br/>${t.thisIsYourTicket}. 
    <br>${t.showItOrPrintIt}</p>
    <br/>
    <h2>${t.details}:</h2>
    <p><small>${t.movie}: </small><strong>${ticket.movieTitle}</strong></p>
    <p><small>${t.date}: </small><strong>${ticket.date}</strong></p>
    <p><small>${t.time}: </small><strong>${ticket.hour}</strong></p>
    <p><small>${t.seats}: </small><strong>${
      ticket.seats.length > 1 ? ticket.seats.join(', ') : ticket.seats[0]
    }</strong>
    </p>
    <p><small>${t.cinema}: </small><strong>${ticket.cinemaName}</strong></p>
    <br/>
    <h2>${t.paymentDetails}:</h2>
    <p><small>${t.price}: </small><strong>${ticket.totalPrice} SEK</strong></p>
    <p><small>${t.paymentStatus}: </small><strong>${
      ticket.paymentStatus
    }</strong></p>
    <p><small>${t.transactionId}:</small></p>
    <p><strong>${[ticket.paymentId]}</strong></p>
    <br/>
    <h3 style="margin-top: 35px">${t.thankYou}</h3>
    <p><a href="mailto:cinema@aleksandramidor.com" style="color: white!important;">cinema@aleksandramidor.com</a></p>
    <br/>
    </div>
    </body>
`,
    CustomID: 'AppGettingStartedTest',
  };
};

module.exports = email;
