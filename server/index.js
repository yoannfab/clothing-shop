const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(express.json());

app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
    const { amount, lineItems } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: lineItems,
          mode: 'payment',
          success_url: 'http://localhost:5000/success',
          cancel_url: 'http://localhost:5000/cancel',
        });
    
        res.json({ sessionId: session.id });
      } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
      }
});

app.listen(5000, () => console.log('Server running on port 5000'));