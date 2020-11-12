/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-use-before-define */
const express = require('express');

const router = express.Router();
require('dotenv/config');

const sKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(sKey);
const sendMail = require('./sendMail');
const Ticket = require('../models/ticket');
const BookedSeat = require('../models/bookedSeat');

// async function postCharge(req, res) {
//   console.log('---- post charge');
//   try {
//     const { ticket, source, receiptEmail } = req.body;
//     const charge = await stripe.charges.create({
//       amount: `${ticket.totalPrice}00`,
//       currency: 'sek',
//       source,
//       receipt_email: receiptEmail,
//     });
//     if (!charge) throw new Error('charge unsuccessful');
//     console.log('payment successful');

//     seatsBook(ticket);
//     ticketSave(ticket);
//     sendMail(receiptEmail);

//     res.status(200).json({
//       message: 'charge posted successfully',
//       charge,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// }

const intent = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { ticket } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: `${ticket.totalPrice}00`,
        currency: 'sek',
      });

      res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: err.message,
      });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

const confirm = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { ticket } = req.body;
      console.log(ticket);

      if (ticket.paymentStatus === 'confirmed') {
        seatsBook(ticket);
        ticketSave(ticket);
        sendMail(ticket.receiptEmail);
      }
      res.status(200).send(ticket.paymentStatus);
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: err.message,
      });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

async function ticketSave(ticket) {
  try {
    const newTicket = new Ticket(ticket);
    await newTicket.save();
  } catch (error) {
    console.log(error);
  }
}

async function seatsBook(ticket) {
  console.log('function seatsBook');

  try {
    const finalBooking = await BookedSeat.findOneAndUpdate(
      {
        date: ticket.date,
        hour: ticket.hour,
        movieId: ticket.movieId,
        cinemaId: ticket.cinemaId,
      },
      {
        $push: {
          bookedSeats: ticket.seats,
        },
      },
      { new: true }
    );
    console.log('-------- finalBooking', finalBooking);

    if (finalBooking) {
      await finalBooking.save();
    } else {
      const newSeatsBook = new BookedSeat({
        date: ticket.date,
        hour: ticket.hour,
        movieId: ticket.movieId,
        bookedSeats: ticket.seats,
        cinemaId: ticket.cinemaId,
      });
      await newSeatsBook.save();
    }
  } catch (error) {}
}

router.post('/intent', intent);
router.post('/confirm', confirm);
router.all('*', (_, res) => res.json({ message: 'please make a POST request to /stripe/charge' }));

module.exports = router;
