const { Router } = require('express');
const getGames = require('../controllers/getGames');
const getGameById = require('../controllers/getGameById');
const getGameByName = require('../controllers/getGamesbyName');
// const {getVideogames} = require('../controllers/getVideogames');
const postGames = require('../controllers/postGames');
// const { apiGenre } = require('./commands');
// const Genres = require('../models/Genres');
const getGenresOfGames = require('../controllers/getGenresOfGames');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


router.get('/videogames', getGames)
router.get('/videogames/:id', getGameById)
router.get('/videogamesByName/', getGameByName)
// router.get('/videogames/:page', getVideogames);
router.post('/videogames/', postGames)

router.get('/genres', getGenresOfGames)




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
