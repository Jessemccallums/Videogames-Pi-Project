const axios = require('axios')



const getGames = (req, res) => {
    
    
    axios
    .get(`https://api.rawg.io/api/games?key=49898ccb845e449090e95ea5942b8df9`)
    .then((response) => {
        const results = response.data.results
        

        let array = []

        results.forEach(el => {
        let gameGenre = el.genres.map(el => {
            return el.name
        })
        array.push({
            name: el.name,
            genre: gameGenre,
            image: el.background_image
        })
        })
       
        
        
        res.status(200).json(array)
    })
    .catch((error) => {
        res.status(500).json({error:error.message})
    })


}

module.exports = getGames;