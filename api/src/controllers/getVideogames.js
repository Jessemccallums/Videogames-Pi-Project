require('dotenv').config();
const {
  API_KEY
} = process.env;


const getVideogame = async (id) => {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    const getdata = await response.data
    return {
      id: getdata.id,
      name: getdata.name,
      image: getdata.background_image,
    };
  }
  
  const getVideogames = async (req, res, next) => {
    const page = req.params.page;
    const limit = 15;
    const start = limit * (page - 1);
    const end = limit * page;
    const requests = [];
  
    for (let i = start; i < end; i++) {
      requests.push(getVideogame(i));
    }
  
    const videogames = await Promise.all(requests);
    res.status(200).json(videogames.filter(videogame => Object.values(videogame).every(value => value !== undefined)));
  };


  module.exports = getVideogames