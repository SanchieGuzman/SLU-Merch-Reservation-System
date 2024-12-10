const authenticate = (req, res, next) => {
    const isLoggedIn = req.signedCookies.loggedin === "true";
    if (isLoggedIn) return next(); // Allow access if authenticated

    //send a status 401 when accessing backend while not authorized
    if (req.originalUrl.startsWith('/api')) {
        return res.status(401).json({ error: 'Unauthorized' }); 
    }

    res.redirect('/'); // Redirect to login if not authenticated
};

export default authenticate;