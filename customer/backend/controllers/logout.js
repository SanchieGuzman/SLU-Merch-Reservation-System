    const logoutController = (req, res) => {
        //clear all cookies
        res.clearCookie('loggedin')
        res.clearCookie('username')
        res.clearCookie('user_id')
        res.clearCookie('token')
        res.sendStatus(200);
    }

export default logoutController;