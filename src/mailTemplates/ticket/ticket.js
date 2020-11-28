const email = (ticket) => ({
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
});

module.exports = email;
