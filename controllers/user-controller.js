const { User } = require('../models');
const { comparePassword } = require('../helpers/bcyrpt');
const bcrypt = require('bcryptjs');

class UserController {
    static login(req, res) {
        res.render('login')
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
                    username:user.username
                }
                res.redirect('/')
            } else res.send(`login failed`)
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    }

    static signup(req, res) {
        res.render('signup')
    }

    static postSignup(req, res) {
        let input = {
            username: req.body.username,
            password: req.body.password
        }
        User.create(input)
        .then(() => res.redirect('/login'))
        .catch(err => res.send(err))
    }

    static logout(req, res) {
        req.session.destroy(err => {
            if (err) res.send(err)
            else res.redirect('/login')
        })
    }
}

module.exports = UserController;
