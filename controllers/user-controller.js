const { User } = require('../models');
const { comparePassword } = require('../helpers/bcyrpt');
const bcrypt = require('bcryptjs');

class UserController {
    static login(req, res) {
        let errors = req.query.errors
        res.render('login', { errors })
    }

    static postLogin(req, res) {
        User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(user => {
            const correctPassword = comparePassword(req.body.password, user.password);
            if (user && correctPassword) {
                req.session.user = {
                    id: user.id,
                    username:user.username,
                    name: user.name
                }
                res.redirect('/')
            } else res.redirect(`/login?errors=Your username / password is incorrect!`)
        })
        .catch(err => {
            res.redirect(`/login?errors=Your username / password is incorrect!`)
        })
    }

    static signup(req, res) {
        let errors = req.query.errors;
        res.render('signup', { errors })
    }

    static postSignup(req, res) {
        let input = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        }
        User.create(input)
        .then(() => res.redirect('/login'))
        .catch(err => {
            let errors = [];
            err.errors.forEach(el => {
                errors.push(el.message)
            })
            res.redirect(`/signup?errors=${errors}`)
        })
    }

    static logout(req, res) {
        req.session.destroy(err => {
            if (err) res.send(err)
            else res.redirect('/login')
        })
    }
}

module.exports = UserController;
