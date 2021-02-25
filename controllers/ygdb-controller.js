const { Youtuber, Game, YoutuberGame, Subscribe, User } = require('../models');

class Controller {
    static ladingPage(req, res) {
        res.render('landing-page')
    }

    static listYoutuber(req, res) {
        Youtuber.findAll()
        .then(youtuber => res.render('list-youtuber', { youtuber }))
        .catch(err => res.send(err))
    }

    static youtuberProfile(req, res) {
        let name = req.params.name;
        let msg = req.query.msg;
        let youtuber;
        Youtuber.findOne({
            include: [{
                model: YoutuberGame
            }],
            where: { name }
        })
        .then(data => {
            youtuber = data;
            return Game.findAll()
        })
        .then(data => {
            let game = data;
            res.render('youtuber-profile', { youtuber, msg, game })
        })
        .catch(err => res.send(err))
    }

    static listGame(req, res) {
        Game.findAll()
        .then(game => res.render('list-game', { game }))
        .catch(err => res.send(err))
    }

    static gameProfile(req, res) {
        let name = req.params.name;
        let game;
        Game.findOne({
            include: [ {
                model: YoutuberGame
            }],
            where: { name }
        })
        .then(data => {
            game = data;
            return Youtuber.findAll()
        })
        .then(data => {
            let youtuber = data;
            res.render('game-profile', { game, youtuber })
        })
        .catch(err => res.send(err))
    }

    static userProfile(req, res) {
        let user = req.session.user;
        let subscribe;
        Subscribe.findAll()
        .then(data => {
            subscribe = data;
            return Youtuber.findAll()
        })
        .then(data => {
            let youtuber = data;
            res.render('profile', { user, subscribe, youtuber })
        })
        .catch(err => res.send(err))
    }

    static subscribe(req, res) {
        let input = {
            youtuber_id: +req.params.id,
            user_id: +req.session.user.id
        }
        let youtuberName = req.params.name;
        Subscribe.findAll()
        .then(data => {
            let isFound = false;
            data.forEach(el => {
                if (el.youtuber_id == input.youtuber_id && el.user_id == input.user_id) {
                    isFound = true;
                }
            })
            if (isFound) res.redirect(`/youtuber-profile/${youtuberName}?msg=You have already subscribed ${youtuberName}`)
            else return Subscribe.create(input)
            if (!data.length) return Subscribe.create(input)
        })
        .then(() => res.redirect(`/youtuber-profile/${youtuberName}`))
        .catch(err => res.send(err))
    }

    static unsubscribe(req, res) {
        let youtuberName = req.params.name;
        console.log(req.params.id, req.session.user.id);
        Subscribe.destroy({
            where: {
                youtuber_id: +req.params.id,
                user_id: +req.session.user.id
            }
        })
        .then(() => res.redirect(`/youtuber-profile/${youtuberName}`))
        .catch(err => res.send(err))
    }

    static getEditProfile(req, res) {
        let user = req.session.user;
        res.render('edit-profile', { user })
    }

    static postEditProfile(req, res) {
        let input = {
            name: req.body.name,
            username: req.body.username
        }
        let id = req.session.user.id;
        User.update(input, {
            where: { id }
        })
        .then(() => res.redirect('/login'))
        .catch(err => res.send(err))
    }
}

module.exports = Controller;
