import { buffer } from 'micro';
import * as admin from 'firebase-admin';

// Secure a connection to FIREBASE from the backend
const serviceAccount = require('../../../permissions.json');
const app = !admin.apps.length
    ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
    : admin.app();

// Establish connection to Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillORder = async (session) => {
    console.log('Fulfilling order', session);

    return app
        .firestore()
        .collection('users')
        .doc(session.metadata.email)
        .collection("orders").doc(session.id).set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log(`SUCCESS: Order ${session.id} has been added to the DB`)
        })
};

console.log("from webhook.js before async function - sessions to be printed in the terminal");

export default async (req, res) => {

    console.log("from webhook.js inside async function - sessions to be printed in the terminal");

    if (req.method === 'POST') {

        console.log("from webhook.js inside async function (if (req.method === 'POST') ) - sessions to be printed in the terminal");

        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event;

        // Verify that the EVENT posted came from stripe
        try {

            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

            console.log("from webhook.js inside async function (try... ) - sessions to be printed in the terminal");

        } catch (err) {
            console.log("from webhook.js inside async function (catch... ) - sessions to be printed in the terminal");
            console.log('ERROR: ', err.message)
            return res.status(400).send(`Webhook error: ${err.message}`)
        }

        // Handle the checkout.session.completed event
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            console.log("from webhook.js inside async function (if (event.type === 'checkout.session.completed') ) - sessions to be printed in the terminal");

            // Fulfill the order...
            return fulfillORder(session)
                .then(() => res.status(200))
                .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));

        }
    }
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}