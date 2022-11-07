const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
    const { items, email } = req.body;

    const transformedItems = items.map(item => ({
        description: item.description,
        quantity: 1,
        price_data: {
            currency: 'php',
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.iamge]
            },
        },
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_rates: ['shr_1M1cktKI4gVWSObO6n79ONin'],
        shipping_address_collection: {
            allowed_countries: ["GB", "US", "CA"],
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/cancel`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.iamge))
        },
    });

    res.status(200).json({ id: session.id })
};