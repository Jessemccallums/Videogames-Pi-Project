import { ORDER, GET_BY_NAME } from "./actions";

const initialState = {
  gamesByName: [],
  allgames: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BY_NAME:
      return { ...state, gamesByName: action.payload };
    case ORDER:
      return {
        ...state,
        gamesByName: ordenarDatos(action.payload, state.gamesByName),
      };
    default:
      return { ...state };
  }
};

const ordenarDatos = (ordenamiento, array) => {
  switch (ordenamiento) {
    case "Ascendente":
      return array.sort((a, b) => a.name.localeCompare(b.name));
    case "Descendente":
      return array.sort((a, b) => b.name.localeCompare(a.name));
      case "All":
          default:
              return array;
            }
        };
        
export default rootReducer;
// import { ORDER, GET_BY_NAME } from "./actions";

// const initialState = {
//   gamesByName: [],
//   allgames: [],
// };

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_BY_NAME:
//       return { ...state, gamesByName: action.payload };
//     case ORDER:
//       return {
//         ...state,
//         gamesByName: ordenardata(action.payload, state.gamesByName),
//       };
//     default:
//       return { ...state };
//   }
// };

// const ordenardata = (tipo, array) => {

//     if(tipo === 'Ascendente'){

//         let result = array.sort((a, b) => a.name.localeCompare(b.name));
//         return result
//     } 
//     if(tipo === 'Descendente') { 
        
//         let result = array.sort((a, b) => b.name.localeCompare(a.name));
//         return result

//     }
//     if(tipo === 'All') { 
        
//         let result = array
//         return result

//     }
    
// }


