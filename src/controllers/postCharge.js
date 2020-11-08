const express = require('express');
const router = express.Router();
require('dotenv/config');
const sKey = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(sKey)
// const sendMail = require('./sendMail')
const Ticket = require('../models/ticket');
const BookedSeat = require('../models/bookedSeat');

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
    // sendMail(receiptEmail);
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
    let finalBooking = await BookedSeat.findOneAndUpdate(
      { date: ticket.date, 
        hour:ticket.hour,
        movieId:ticket.movieId,
        cinemaId:ticket.cinemaId } , {$push: {
          bookedSeats: ticket.seats
        }}, {new: true}  
    )
    await finalBooking.save()

    if (!foundBooking) {
      const newSeatsBook = new BookedSeat ({
        date: ticket.date,
        hour:ticket.hour,
        movieId:ticket.movieId,
        bookedSeats:ticket.seats,
        cinemaId:ticket.cinemaId,
      });
      await newSeatsBook.save()
    }

  } catch (error) {
    
    }
};

module.exports = router;
