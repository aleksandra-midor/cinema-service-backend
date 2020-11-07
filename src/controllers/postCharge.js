const express = require('express');
const router = express.Router();
require('dotenv/config');
const sKey = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(sKey)
const sendMail = require('./sendMail')
const Ticket = require('../models/ticket');
const SeatsBook = require('../models/seatsBook');

router.post('/charge', postCharge)
router.all('*', (_, res) =>
  res.json({ message: 'please make a POST request to /stripe/charge' })
)

async function postCharge(req, res) {
  try {
    const { ticket, source, receiptEmail } = req.body
    const charge = await stripe.charges.create({
      amount: ticket.totalPrice + "00",
      currency: 'sek',
      source,
      receipt_email: receiptEmail
    })
    sendMail(receiptEmail);
    ticketSave(ticket);
    seatsBook(ticket);

    if (!charge) throw new Error('charge unsuccessful')

    res.status(200).json({
      message: 'charge posted successfully',
      charge
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

async function ticketSave (ticket) {
  try {
    const newTicket = new Ticket (ticket);
    await newTicket.save();  
  } catch (error) {
    console.log(error)
  }
};

async function seatsBook (ticket) {
  try {
    const foundBooking = await SeatsBook.findOne({ 
      date: ticket.date, 
      hour:ticket.hour,
      movieId:ticket.movieId,
      cinemaId:ticket.cinemaId,});
      
      console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq", foundBooking);

    if (!foundBooking) {
      const newSeatsBook = new SeatsBook ({
        date: ticket.date,
        hour:ticket.hour,
        movieId:ticket.movieId,
        bookedSeats:ticket.seats,
        cinemaId:ticket.cinemaId,
      });
      await newSeatsBook.save()
    } else {
      console.log("haaaaaaaaaaaaaaaaaaa")
      foundBooking.bookedSeats = [...bookedSeats, ticket.seats]
      console.log("44444444444444444444444", foundBooking);
      await foundBooking.save()
    }
  } catch (error) {}
};

module.exports = router;
