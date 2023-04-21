const axios = require('axios')
const { Videogame, Genre } = require('../db.js')
const { Op } = require('sequelize');



const getGameByName = async (req, res) => {
    try {
      const URL = 'https://api.rawg.io/api/games';
      const gameName = req.query.name;
      const apiKey = '49898ccb845e449090e95ea5942b8df9';
      const response = await axios.get(`${URL}?key=${apiKey}&search=${gameName}`);
      const results = response.data;

      const nombreBuscados = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: `%${gameName}%`
            }
        }
      })
      const finalData = nombreBuscados.concat(results)
      res.status(200).json(finalData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

module.exports = getGameByName;









