const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

// Initialize session for /customer routes
app.use("/customer", session({
    secret: "fingerprint_customer", // Secret for signing the session ID
    resave: true,
    saveUninitialized: true
}));

// Authentication Middleware
app.use("/customer/auth/*", function auth(req, res, next) {
    // Check if the token exists in the session
    const token = req.session.token; // Assuming token is stored in session
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token
    jwt.verify(token, "fingerprint_customer", (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        }

        // Token is valid, attach decoded data to the request object
        req.user = decoded;
        next();
    }); });

const PORT = 5500;

// Routes
app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
