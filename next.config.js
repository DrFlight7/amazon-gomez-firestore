module.exports = {
    images: {
        domains: ["links.papareact.com", "fakestoreapi.com", "rado-react-firebase.firebaseapp.com", "www.autoindustriya.com", "firebasestorage.googleapis.com"]
    },
    env: {
        stripe_public_key: process.env.STRIPE_PUBLIC_KEY
    },
    experimental: {
        esmExternals: false
    }
}

