// auth middleware
const auth = (req, res, next) => {
    req.session?.name
        ?
        next()
        :
        res.redirect('/login');
}
module.exports = auth
