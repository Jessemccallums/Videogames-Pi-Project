const axios = require('axios')
const { Videogame, Genre } = require('../db.js')

const getGenresOfGames = async (req,res) => {
        try {
            const getGenres = await axios.get(`https://api.rawg.io/api/genres?key=49898ccb845e449090e95ea5942b8df9`)       
            const info = getGenres.data.results.map(e => {
                return {
                    id: e.id,
                    name: e.name
                }
            })
            info.map(e => Genre.findOrCreate({
                where: {
                    id: e.id,
                    name: e.name
                }
            }))
            res.status(200).json(info)
        } catch (error) {
            res.status(500).json({error:error.message})
        }
}

module.exports = getGenresOfGames