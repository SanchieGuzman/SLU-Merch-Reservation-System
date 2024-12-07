const authenticate = (req, res, next) => {
    const isLoggedIn = req.signedCookies.loggedin === "true";
    if (isLoggedIn) return next(); // Allow access if authenticated
    res.redirect('/'); // Redirect to login if not authenticated
};

export default authenticate;