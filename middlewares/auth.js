const auth = (req, res, next) => {
    if (req.session.user) next()
    else res.redirect(`/login?errors=You must login first!`)
}

module.exports = auth;
