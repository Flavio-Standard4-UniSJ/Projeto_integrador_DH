// const fs = require('fs');
// const path = require('path');
// const comicsdb = path.join(__dirname, '../comicdb.json');
const ComicService = require('../services/ComicService')

const ComicController = {
    storeComic: async (req, res) => {
        
        const comicThings = req.files;

        const {
            titulo,
            autor,
            ano,
            sinopse
        } = req.body;
        
        const { endereço } = await ComicService.createComic(
            comicThings,
            titulo,
            autor,
            ano,
            sinopse
            )

        res.json({
            url: `localhost:3000${ endereço }`
        });
        
    },

    readComic: async (req, res) =>{
        const { id } = req.params;
        const comic = await ComicService.getComic(id);
        return res.render('comicpage', {comic : comic })
    },

    readPdf: async (req, res) =>{
        const { id } = req.params;
        const { endereço } = await ComicService.getComic(id);
        //return res.json(endereço);
        // return res.render('comicpage', {comic : comic })
        return res.render('viewer', {caminho: endereço})
    },

    updateComic: async (req, res) => {
        const { id } = req.params

        const comicThings = req.files
        console.log(comicThings)

        const { 
            titulo,
            autor,
            ano,
            sinopse,
        } = req.body

        const comic = await ComicService.updateValues(
            id,
            comicThings,
            titulo,
            autor,
            ano,
            sinopse
        )

        if(comic === null) return res.status(400).render('not-found')

        res.json({
            url: `localhost:3000${comic.endereço}`
        })

    },

    deleteComic: async (req, res) => {

        const { id } = req.params

        const comic = await ComicService.comicDestroyer(id)

        if(comic === null) return res.status(400).render('not-found');

        return res.json(comic)

    },

    findAssociation: async (req, res) => {
        const { id } = req.params
        const returnAssociation = await ComicService.relateTables(id)
        res.json(returnAssociation);
    },
}

module.exports = ComicController;