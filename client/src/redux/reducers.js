import { ORDER } from "./actions";

const initialState = {
    games: [],
    allgames: []
    
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER:
          
            return { ...state, allGames: ordenardata(action.payload, state.games) }
        default:
            return { ...state };
        }}

        const ordenardata = (tipo, array) => {

            if(tipo === 'Ascendente'){
        
                let result = array.sort((a,b) => {return a.id - b.id})
                return result
            } else { 
                
                let result = array.sort((a,b) => {return b.id - a.id})
                return result
        
            }
        }

export default rootReducer