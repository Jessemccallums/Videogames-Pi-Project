import axios from 'axios'
export const ORDER = 'ORDER'
export const GET_BY_NAME = 'GET_BY_NAME'
export const GET_GENRES = 'GET_GENRES'


export const gameByName = (name) => {
    // const URL = 'http://localhost:3001/videogamesByName'
    // let infoByName = await axios.get(`http://localhost:3001/videogamesByName?name=` + name)
    // return (dispatch) => {
    //     dispatch({type: GET_BY_NAME, payload: infoByName})
    // }

    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/videogamesByName?name=${name}`)
            dispatch({type: GET_BY_NAME, payload: response.data})
        } catch (error) {
            console.log(error.message)
        }
    }
   
}

export const orderCards = (id) => {
    return {type: ORDER, payload: id}
}

export const getGenres = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3001/genres')
            dispatch({type: GET_GENRES, payload: response.data})
        } catch (error) {
            console.log(error.message)
        }
    }
}
