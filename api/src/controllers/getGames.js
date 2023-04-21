const axios = require('axios')
const {Videogame} = require('../db')



const getGames = async (req, res) => {
    try {
        
        const data = await Videogame.findAll()
        await axios
        .get(`https://api.rawg.io/api/games?key=49898ccb845e449090e95ea5942b8df9`)
        .then((response) => {
            const results = response.data.results
            
    
            let array = []
    
            results.forEach(el => {
            let gameGenre = el.genres.map(el => {
                return el.name
            })
            array.push({
                id: el.id,
                name: el.name,
                genre: gameGenre,
                image: el.background_image
            })
            })
            const resultadoTotal = [data, array]
            
            
            res.status(200).json(resultadoTotal)
        }
        )
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
    
    
   

}

module.exports = getGames;
// const axios = require('axios');
// const { Op } = require('sequelize');
// const Videogame = require('../db');

// const getGames = async (req, res) => {
//   try {
//     const [dbGames, apiResponse] = await Promise.all([
//       Videogame.findAll({
//         attributes: ['name', 'description', 'released', 'rating'],
//         include: [
//           { association: 'genres', attributes: ['name'], through: { attributes: [] } },
//           { association: 'platforms', attributes: ['name'], through: { attributes: [] } },
//         ],
//       }),
//       axios.get('https://api.rawg.io/api/games', {
//         params: {
//           key: '49898ccb845e449090e95ea5942b8df9',
//           page_size: 15,
//         },
//       }),
//     ]);

//     const apiGames = apiResponse.data.results.map(({ name, background_image, genres }) => ({
//       name,
//       image: background_image,
//       genre: genres.map(({ name }) => name),
//     }));

//     const games = [...dbGames, ...apiGames];

//     res.status(200).json(games);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = getGames;

























