const axios = require('axios')
const { Videogame } = require('../db.js');
require('dotenv').config();
const {
  API_KEY
} = process.env;



const isUUID = (id) => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(id);
};

const getGameById = async (req, res) => {
  const { id } = req.params;
  let URL = 'https://api.rawg.io/api/games';
  let KEY = 'API_KEY';

  try {
    if (isUUID(id)) {
      const game = await Videogame.findOne({ where: { id } });

      if (game) {
        const { name, description, released, rating, platforms, background_image } = game;
        const response = {
          name,
          description,
          released,
          rating,
          platforms,
          background_image
        };
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: 'No se encontró el juego con el id proporcionado' });
      }
    } else {
      const response = await axios.get(`${URL}/${id}?key=${API_KEY}`);
      const { name, description, background_image, parent_platforms, genres, released, rating } =
        response.data;
      let infodetailplatform = { name, description, background_image, parent_platforms, genres, released, rating };

      let array = [infodetailplatform];
      let arr2;
      array.forEach(el => {
        arr2 = el.parent_platforms;
      });

      platforms = arr2.map(el => el.platform.name);

      let infoArray = [infodetailplatform];
      let arr3;
      infoArray.forEach(el => {
        arr3 = el.genres;
      });

      let genre = arr3.map(el => el.name);

      res.status(200).json({ name, description, background_image, platforms, genre, released, rating });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  

module.exports = getGameById;