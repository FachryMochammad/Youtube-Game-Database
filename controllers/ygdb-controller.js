const { Youtuber, Game } = require('../models');

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
        let name = req.params.name
        Youtuber.findOne({
            where: { name }
        })
        .then(youtuber => res.render('youtuber-profile', { youtuber }))
        .catch(err => res.send(err))
    }

    static listGame(req, res) {
        Game.findAll()
        .then(game => res.render('list-game', { game }))
        .catch(err => res.send(err))
    }

    static gameProfile(req, res) {
        let name = req.params.name
        Game.findOne({
            where: { name }
        })
        .then(game => res.render('game-profile', { game }))
        .catch(err => res.send(err))
    }
}

module.exports = Controller;
