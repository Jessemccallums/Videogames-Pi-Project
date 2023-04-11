const { Router } = require('express');
const getGames = require('../controllers/getGames');
const getGameById = require('../controllers/getGameById');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


router.get('/videogames', getGames)
router.get('/videogames/:id', getGameById)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
