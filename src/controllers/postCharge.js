const express = require('express');
const router = express.Router();
require('dotenv/config');
const sKey = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(sKey)
const sendMail = require('./sendMail')


router.post('/charge', postCharge)
router.all('*', (_, res) =>
  res.json({ message: 'please make a POST request to /stripe/charge' })
)

async function postCharge(req, res) {
  try {
    const { ticket, source, receiptEmail } = req.body
    console.log("333333333333333333333333333333333333333333", ticket);
    const charge = await stripe.charges.create({
      amount: ticket.totalPrice + "00",
      currency: 'sek',
      source,
      receipt_email: receiptEmail
    })
    sendMail(receiptEmail)

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


module.exports = router;
