const auth = (req, res, next) => {
    if (req.session.user) next()
    else res.send(`You must login first`)
}

module.exports = auth;
