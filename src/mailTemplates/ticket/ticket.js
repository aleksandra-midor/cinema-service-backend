/* eslint-disable indent */
const translationPl = require('./ticketPl.json');
const translationSv = require('./ticketSv.json');

const email = (ticket) => {
  let translation = translationSv;
  if (ticket.language === 'pl') {
    translation = translationPl;
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
    Subject: `Cinema paradiso bilet na ${ticket.movieTitle}`,
    // Subject: `Ticket/s for the ${ticket.movieTitle} screening`,
    TextPart: 'My first Mailjet email',
    HTMLPart: `
    <html>
    <body style="background: black; font-size: 120%">
    <div style="background: #bf2a2a; color: white; padding: 15px; font-size: 18px; font-weight: bold">Cinema Paradiso</div>
    <div style="max-width: 600px; margin: 40px auto; background: black; color: white; border-bottom: 10px solid #bf2a2a">
    <h1>${translation.ticketFor} ${ticket.movieTitle}</h1>
    <p>Cześć, 
    <br/>to jest twój bilet. 
    <br>Okaż tego maila przy wejściu na do kina lub wydrukuj i zabierz ze sobą.</p>
    <br/>
    <h2>Szczegóły:</h2>
    <p><small>Film: </small><strong>${ticket.movieTitle}</strong></p>
    <p><small>Data seansu: </small><strong>${ticket.date}</strong></p>
    <p><small>Godzina: </small><strong>${ticket.hour}</strong></p>
    <p><small>Miejsca: </small><strong>${
      ticket.seats.length > 1 ? ticket.seats.join(', ') : ticket.seats[0]
    }</strong>
    </p>
    <p><small>Kino: </small><strong>${ticket.cinemaName}</strong></p>
    <br/>
    <h2>Szczegóły płatność:</h2>
    <p><small>Cena: </small><strong>${ticket.totalPrice} SEK</strong></p>
    <p><small>Staus płatności: </small><strong>${
      ticket.paymentStatus
    }</strong></p>
    <p><small>Identyfikator transakcji:</small></p>
    <p><strong>${[ticket.paymentId]}</strong></p>
    <br/>
    <h3 style="margin-top: 20px">Dziękujemy i życzymy udanego seansu.</h3>
    </div>
    </body>
    </html>
    
`,
    CustomID: 'AppGettingStartedTest',
  };
};

module.exports = email;
