const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame, Genre } = require("../db.js");

const getGameByName = async (req, res) => {
  try {
    const gameName = req.query.name;

   
    const nombreBuscados = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${gameName}%`,
        },
      },
      include: [{
        model: Genre,
        attributes: ['name'],
        through: {
            attributes: []
        }
    }]
    });

    const nombreBuscadosTotal = nombreBuscados.map((game) => ({
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      platforms: game.platforms,
      genres: game.genres.map((genre) => {
        return genre.name;
      }),
      rating: game.rating,
      createdInDb: game.createdInDb
    }));

    
    const apiKey = "0bf11d925a114c3ab287876cb7b5a77e";
    let url = "https://api.rawg.io/api/games";
    let gamesRawg = [];
    let response = {};
    let count = 0;

    do {
     
      response = await axios.get(url, {
        params: {
          key: apiKey,
          search: gameName
        },
      });

      
      const results = response.data.results.map((game) => ({
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        platforms: game.platforms.map((platform) => {
          return platform.platform.name;
        }),
        genres: game.genres.map((genre) => {
          return genre.name;
        }),
        rating: game.rating,
        createdInDb: false
      }));


      gamesRawg = gamesRawg.concat(results);
      url = response.data.next;
      count += results.length; 
    } while (response.data.next && count < 100); 


    const results = nombreBuscadosTotal.concat(gamesRawg);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getGameByName;

// const axios = require('axios');
// const { Op } = require('sequelize');
// const { Videogame, Genre } = require('../db.js');

// const getGameByName = async (req, res) => {
//   try {
//     const gameName = req.query.name;

//     // Buscar juegos en la base de datos que coincidan con el nombre
//     const nombreBuscados = await Videogame.findAll({
//       where: {
//         name: {
//           [Op.iLike]: `%${gameName}%`
//         }
//       },
//       include: {
//         model: Genre,
//         attributes: ['name'],
//         through: { attributes: [] } // Esto es para que no incluya la tabla intermedia en la respuesta
//       }
//     });

//     // Hacer la solicitud a la API Rawg.io
//     const apiKey = '49898ccb845e449090e95ea5942b8df9';
//     const response = await axios.get('https://api.rawg.io/api/games', {
//       params: {
//         key: apiKey,
//         search: gameName
//       }
//     });

//     // Obtener los datos de la API Rawg.io y mapearlos
//     const gamesRawg = response.data.results.map((game) => ({
//       id: game.id,
//       name: game.name,
//       description: game.description,
//       background_image: game.background_image,
//       platforms: game.platforms,
//       genre: game.genres,
//       released: game.released,
//       rating: game.rating
//     }));

//     // Combinar los resultados y enviarlos como respuesta
//     const results = nombreBuscados.concat(gamesRawg);
//     res.status(200).json(results);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = getGameByName;

// const axios = require('axios')
// const { Videogame, Genre } = require('../db.js')
// const { Op } = require('sequelize');

// const getGameByName = async (req, res) => {
//     try {
//       const URL = 'https://api.rawg.io/api/games';
//       const gameName = req.query.name;
//       const apiKey = '49898ccb845e449090e95ea5942b8df9';
//       const response = await axios.get(`${URL}?key=${apiKey}&search=${gameName}`);
//       const results = response.data;

//       const nombreBuscados = await Videogame.findAll({
//         where: {
//             name: {
//                 [Op.iLike]: `%${gameName}%`
//             }
//         }
//       })
//       const finalData = nombreBuscados.concat(results)
//       res.status(200).json(finalData);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: error.message });
//     }
//   };

// module.exports = getGameByName;
