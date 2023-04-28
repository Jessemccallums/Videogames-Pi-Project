const { Videogame, Genre } = require('../db.js')

const postGames = async (req, res) => {
    try {
      const { name, description, background_image, platforms, genre, released, rating } = req.body
        console.log(req.body)
        console.log(genre)
      if (!name || !description || !genre || !platforms || !background_image || !released || !rating) {
        return res.status(401).send('Faltan datos')
      }
  
      const juegoAgregado = await Videogame.create({
        name,
        description,
        background_image,
        platforms,
        released,
        rating,
      })
      // const genres = await Genre.findAll({ where: { id: genre } })
      juegoAgregado.addGenres(genre)
  
      res.status(200).json({
        status: "ok"
      })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}

module.exports = postGames
// const postGames = async (req,res) => {
    
// }


// const postGames =  async (req, res) => {

//     try {
    
//         const {name, description, background_image, platforms, genres, released, rating} = req.body
        
//         if(!name && !description && !genres && !platforms && !background_image && !released && !rating){
//             res.status(401).send('Faltan datos');
//         }
       
        
//         let juegosAgregados = await Videogame.create({name, description, background_image, platforms, released, rating})
//         await juegosAgregados.addGenres(genres)
//         return res.status(200).json(juegosAgregados);
          
//         } catch (error) {
//             console.log(error.message)
//             res.status(500).json({ error: error.message });
//     }
//     // if(!background_image){
//     //     background_image = 'https://media.rawg.io/media/screenshots/238/238b1d15ead30bfa1c76e3dad6365554.jpg'
//     // }
//     // if(name && description && genres && platforms){
//     //     let newgame = await Videogame.create({
//     //         name,
//     //         description,
//     //         released,
//     //         rating,
//     //         background_image,
//     //         platforms
//     //     })
//     //     let genreDb = await Genre.findAll({
//     //         where: {
//     //             name: genre
//     //         }
//     //     })
//     //     newgame.addGenre(genreDb)
//     //     res.status(200).json(genreDb)
//     // }else{
//     //     res.status(404).send('Please, Complete all the fields')
//     // }
// }
