const fs = require('fs');
const path = require('path');
const comicsdb = path.join(__dirname, '../comicdb.json');
const CadastroService = require('../services/CadastroService');
const ComicService = require('../services/ComicService')
const CadastroController = require('./CadastroController');

const ComicController = {
    storeComic: (req, res) => {
        
        const { filename } = req.file;
        
        ComicService.createComic(filename)

        res.json({
            url: `localhost:3000/uploads/${filename}`
        });
        
    },

    readComic: (req, res) =>{
        const { id } = req.params;
        const comic = ComicService.getComic(id);
        // return res.json(comic);
        return res.render('comicpage', {comic : comic })
    },

    updateComic:(req, res) => {
        const { id } = req.params

        const { nome } = req.body

        const comic = ComicService.updateValues(id, nome)

        if(comic == -1) return res.status(400).render('not-found')

        res.json({
            url: `localhost:3000/uploads/${nome}`
        })

    },

    deleteComic: (req, res) => {

        const { id } = req.params

        const comic = ComicService.comicDestroyer(id)

        if(comic == -1) return res.status(400).render('not-found');

        return res.json(comic)

    }
}

module.exports = ComicController;