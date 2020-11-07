const express = require('express');
const router = express.Router();
require('dotenv/config');
const sKey = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(sKey)
const sendMail = require('./sendMail')
const Ticket = require('../models/ticket');

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
    sendMail(receiptEmail)
    ticketInfo(ticket)

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

async function ticketInfo (ticket) {
  try {
    const newTicket = new Ticket (ticket);
    await newTicket.save();  
  } catch (error) {
    console.log(error)
  }
};

module.exports = router;
