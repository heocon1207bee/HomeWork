const express = require('express')
const mangaRouter = express.Router();

const mangas = [
    {id: '1', name: 'Dragonball'},
    {id: '2', name: 'Doraemon'},
    {id: '3', name: 'Conan'},
]

mangaRouter.get('/', (req, res) => {
    res.send(mangas)
})

mangaRouter.post('/', (req, res) =>{
    const newManga = {
        id: `${mangas.length + 1}`,
        name: req.body.name,
    }
    mangas.push(newManga)
    res.send(mangas)
})

mangaRouter.put('/', (req, res) => {
    mangas.map(data => {
        if(data.id === req.body.id) {
            data.name = req.body.name
        }
    })
    res.send(mangas)
})

mangaRouter.delete('/', (req, res) => {
    const newManga = mangas.filter(data => data.id !== req.body.id)
    mangas.splice(0, mangas.length)
    mangas.push(...newManga)
    mangas.map((data, index) => {
        data.id = index + 1
    })
    res.send(mangas)
})

module.exports = mangaRouter