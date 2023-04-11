const axios = require('axios')



const getGameById = (req, res) => {
    const { id } = req.params
    let URL = 'https://api.rawg.io/api/games'
    let KEY = '49898ccb845e449090e95ea5942b8df9'
    
    axios
    .get(`${URL}/${id}?key=${KEY}`)
    .then((response) => {
        const { name, description, background_image, parent_platforms, genres, released, rating } = response.data
        let infodetailplatform = { name, description, background_image, parent_platforms, genres, released, rating }



        let array = [infodetailplatform]
        let arr2
        array.forEach(el => {
        arr2 = el.parent_platforms
        }
        )

        platforms = arr2.map(el => el.platform.name)




        let infoArray = [infodetailplatform]
        let arr3
        infoArray.forEach(el => {
        arr3 = el.genres
        }
        )

        let genre = arr3.map(el => el.name)




        
        res.status(200).json({ name, description, background_image, platforms, genre, released, rating })
    })
    .catch((error) => {
        res.status(500).json({error:error.message})
    })


}

module.exports = getGameById;