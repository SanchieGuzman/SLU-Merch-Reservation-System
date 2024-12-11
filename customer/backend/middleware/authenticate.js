import jwt from 'jsonwebtoken'

const authenticate = (req, res, next) => {
    //check when data is tampred
    const cookiesPayload = {
        username: req.cookies.username,
        user_id: req.cookies.user_id
    }

    // Verify JWT
    const token = req.signedCookies.token;
    
    if (!token) {
        return res.redirect('/');
    }

    //decode the token
    const decodedToken = jwt.verify(token, "stephen pogi")
    const { username, user_id } = decodedToken;  

    // Compare unsigned cookies with JWT payload
    if (cookiesPayload.username !== username || cookiesPayload.user_id !== String(user_id)) {
        res.clearCookie('loggedin')
        res.clearCookie('username')
        res.clearCookie('user_id')
        res.clearCookie('token')
        return res.redirect('/')
        // return res.status(401).send('Cookie values do not match');
    }

    const isLoggedIn = req.signedCookies.loggedin === "true";
    if (isLoggedIn) return next(); // Allow access if authenticated

    //send a status 401 when accessing backend while not authorized
    if (req.originalUrl.startsWith('/api')) {
        return res.status(401).json({ error: 'Unauthorized' }); 
    }

    res.redirect('/'); // Redirect to login if not authenticated
};

export default authenticate;