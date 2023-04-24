import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gameByName } from '../redux/actions'
import { orderCards } from '../redux/actions'

export default function HomeView () {
  const [orderCard, setOrderCard] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [busqueda, setBusqueda] = useState('')
  const [orderCardGenre, setOrderCardGenre] = useState();
  const dispatch = useDispatch()
  const stategames = useSelector(state => state.gamesByName)
  const gamesPerPage = 15

  console.log(stategames)

  const handleChangeGenre = (event) => {
    const valor = event.target.value
    if(valor !== 'default'){
      setOrderCardGenre(valor)
    }
  }
  const handleChangeOrder = (event) => {
    const valor = event.target.value

    if (valor === 'Ascendente') {
      let result = stategames.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
      setOrderCard('Ascendente')
      return result
    } 
    if(valor === 'Descendente'){
      let result = stategames.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
      setOrderCard('Descendente')
      return result
    }
    if(valor === 'All'){
      let result = stategames
      setOrderCard('All')
      return result
    }
  }

  useEffect(() => {
    dispatch(gameByName(busqueda))
    dispatch(orderCards(orderCard))
  }, [])

  const handlePrev = () => {
    setCurrentPage(prevPage => prevPage - 1)
  }

  const handleNext = () => {
    setCurrentPage(prevPage => prevPage + 1)
  }

  const handleChange = event => {
    setBusqueda(event.target.value)
  }

  const hanlderGamesByName = () => {
    setCurrentPage(1)
    dispatch(gameByName(busqueda))
  }

  
  const filteredGames = stategames.filter(game => {
    if (orderCardGenre) {
      return game.genre.includes(orderCardGenre);
    } else {
      return true;
    }
  });
  const indexOfLastGame = currentPage * gamesPerPage
  const indexOfFirstGame = indexOfLastGame - gamesPerPage
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);



  return (
    <div>
      <div>
        <input
          value={busqueda}
          placeholder='Search your favorites games'
          onChange={handleChange}
        />
        <button onClick={hanlderGamesByName}>Buscar</button>
      </div>

      <div>
        <h3>Filter by:</h3>
        <select>
          <option value='default'>Default</option>
          <option value='own'>own</option>
          <option value='public'>public</option>
        </select>
      </div>
      <div>
        <h3>Ordering:</h3>
        <select name='' id='' onChange={handleChangeOrder}>
          <option value='All'>All</option>
          <option value='Ascendente'>Ascendente</option>
          <option value='Descendente'>Descendente</option>
        </select>
      </div>
      <div>
        <h3>Genres:</h3>
        <select name='' id='' onChange={handleChangeGenre}>
          <option value='default'>Default</option>
          <option value='Action'>Action</option>
          <option value='Indie'>Indie</option>
          <option value='Adventure'>Adventure</option>
          <option value='RPG'>RPG</option>
          <option value='Strategy'>Strategy</option>
          <option value='Shooter'>Shooter</option>
          <option value='Casual'>Casual</option>
          <option value='Simulation'>Simulation</option>
          <option value='Puzzle'>Puzzle</option>
          <option value='Arcade'>Arcade</option>
          <option value='Platformer'>Platformer</option>
          <option value='Racing'>Racing</option>
          <option value='Massively-multiplayer'>Massively Multiplayer</option>
          <option value='Sports'>Sports</option>
          <option value='Fighting'>Fighting</option>
          <option value='Family'>Family</option>
          <option value='Board-games'>Board Games</option>
          <option value='Educational'>Educational</option>
          <option value='Card'>Card</option>
        </select>
      </div>
      <div>
        <h3>Rating</h3>
        <select>
          <option value='default'>Default</option>
          <option value='0-5'>0-5</option>
          <option value='5-0'>5-0</option>
        </select>
      </div>

      <div>
        <button onClick={() => handlePrev()} disabled={currentPage === 1}>
          prev
        </button>
        <button onClick={() => setCurrentPage(1)}>1</button>
        <button onClick={() => setCurrentPage(2)}>2</button>
        <button onClick={() => setCurrentPage(3)}>3</button>
        <button onClick={() => handleNext()}>next</button>
      </div>

      {stategames.length === 0 ? (
        <p>Cargando...</p>
      ) : (
        currentGames.map(game => (
          <div key={game.id}>
            <hr />
            <h2>{game.id}</h2>
            <h2>{game.name}</h2>
            <img
              src={game.background_image}
              alt='Game Picture'
              style={{ width: '200px', height: 'auto' }}
            />
            <h2>{game.genre.join(' ') }</h2>
          </div>
        ))
      )}
    </div>
  )
}

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux'
// import { gameByName } from "../redux/actions";

// export default function HomeView() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [busqueda, setBusqueda] = useState("");
//   const dispatch = useDispatch()
//   const stategames = useSelector(state => state.gamesByName);

//   console.log(stategames)

//   useEffect(() => {

//     dispatch(gameByName(busqueda))

//   }, []);

//   const handlePrev = () => {
//     setCurrentPage((prevPage) => prevPage - 1);
//   };

//   const handleNext = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   console.log(stategames);

//   const handleChange = (event) => {
//     setBusqueda(event.target.value);
//     // filtrar(event.target.value);
//   };
//   console.log(busqueda)
//   const hanlderGamesByName = () => {
//       dispatch(gameByName(busqueda))
//   }

//   return (
//     <div>
//       <div>
//         <input
//           value={busqueda}
//           placeholder="Search your favorites games"
//           onChange={handleChange}
//         />
//         <button onClick={hanlderGamesByName}>Buscar</button>
//       </div>

//       <div>
//         <button onClick={() => handlePrev()} disabled={currentPage === 1}>
//           prev
//         </button>
//         <button onClick={() => setCurrentPage(1)}>1</button>
//         <button onClick={() => setCurrentPage(2)}>2</button>
//         <button onClick={() => setCurrentPage(3)}>3</button>
//         <button onClick={() => handleNext()}>next</button>
//       </div>
//       {stategames.length === 0 ? (
//         <p>Cargando...</p>
//       ) : (
//         stategames
//           // .filter(
//           //   (game) => game.name && game.image && game.genres !== undefined
//           // )
//           .map((game) => (
//             <div key={game.id}>
//               <hr />
//               <h2>{game.id}</h2>
//               <h2>{game.name}</h2>
//               <img
//                 src={game.background_image
//                 }
//                 alt="Game Picture"
//                 style={{ width: "200px", height: "auto" }}
//               />
//               <h2>{}</h2>
//             </div>
//           ))
//       )}
//     </div>
//   );
// }

// import axios from 'axios';
// import React, { useState, useEffect, useCallback } from 'react';

// export default function HomeView() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [videojuegosState, setVideojuegosState] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const getVideogame = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:3001/videogames/${id}`);
//       const get = response.data;
//       return {
//         id: get.id,
//         name: get.name,
//         image: get.background_image,
//       };
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getVideogames = async (currentPage) => {
//     const limit = 15;
//     const start = limit * (currentPage - 1);
//     const end = limit * currentPage;
//     const requests = [];

//     for (let i = start; i < end; i++) {
//       requests.push(getVideogame(i));
//     }

//     const videogames = await Promise.all(requests);
//     return videogames;
//   };

//   useEffect(() => {
//     async function fetchVideogames() {
//       setIsLoading(true);
//       const videogames = await getVideogames(currentPage);
//       setVideojuegosState(videogames);
//       setIsLoading(false);
//     }

//     fetchVideogames();
//   }, [currentPage]);

//   const handlePrev = useCallback(() => {
//     setCurrentPage((prevPage) => prevPage - 1);
//   }, []);

//   const handleNext = useCallback(() => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   }, []);

//   return (
//     <div>
//     <div>
//      <button onClick={() => handlePrev()} disabled={currentPage === 1}>
//        prev
//      </button>
//      <button onClick={() => setCurrentPage(1)}>1</button>
//      <button onClick={() => setCurrentPage(2)}>2</button>
//      <button onClick={() => setCurrentPage(3)}>3</button>
//      <button onClick={() => handleNext()}>next</button>
//    </div>
//    {videojuegosState.length === 0 ? (
//      <p>Cargando...</p>
//    ) : (
//      videojuegosState.map((game) => (
//        <div key={game.id}>
//          <hr />
//          <h2>{game.id}</h2>
//          <h2>{game.name}</h2>
//          <img src={game.image} alt="Game Picture" style={{ width: '200px', height: 'auto' }} />
//          </div>
// )))
// }
// </div>
//   )
// }

// import axios from 'axios'
// import React , {useState , useEffect} from 'react'

// export default function HomeView() {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [videojuegosState, setVideojuegosState] = useState([]);

//     const getVideogame = async (id) => {
//       const response = await axios.get(`http://localhost:3001/videogames/${id}`)
//       const get = response.data
//       return {
//         id: get.id,
//         name: get.name,
//         image: get.background_image,
//       };
//     }

//     const getVideogames = async (currentPage) => {
//       const limit = 15;
//       const start = limit * (currentPage - 1);
//       const end = limit * currentPage;
//       const requests = [];

//       for (let i = start ; i < end; i++) {
//         requests.push(getVideogame(i));
//       }

//       const videogames = await Promise.all(requests);
//       return videogames;
//     }
//     console.log(videojuegosState)
//     useEffect(() => {
//       async function fetchVideogames() {
//         const videogames = await getVideogames(currentPage);
//         setVideojuegosState(videogames.filter(videogame => Object.values(videogame).every(value => value !== undefined)));
//       }

//       fetchVideogames();
//     }, [currentPage]);

//     const handlePrev = () => {
//       setCurrentPage(currentPage - 1);
//     };

//     const handleNext = () => {
//       setCurrentPage(currentPage + 1);
//     };

//   return (
//     <div>
//        <div>
//         <button onClick={() => handlePrev()} disabled={currentPage === 1}>
//           prev
//         </button>
//         <button onClick={() => setCurrentPage(1)}>1</button>
//         <button onClick={() => setCurrentPage(2)}>2</button>
//         <button onClick={() => setCurrentPage(3)}>3</button>
//         <button onClick={() => handleNext()}>next</button>
//       </div>
//       {videojuegosState.length === 0 ? (
//         <p>Cargando...</p>
//       ) : (
//         videojuegosState.map((game) => (
//           <div key={game.id}>
//             <hr />
//             <h2>{game.id}</h2>
//             <h2>{game.name}</h2>
//             <img src={game.image} alt="Game Picture" style={{ width: '200px', height: 'auto' }} />
//             </div>
//   )))
// }
// </div>

//   )
// }

// import React , {useState , useEffect} from 'react';

// export default function HomeView() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [videojuegosState, setVideojuegosState] = useState([]);

//   useEffect(() => {
//     async function fetchVideogames() {
//       const response = await fetch(`http://localhost:3001/videogames/${currentPage}`);
//       const videogames = await response.json();
//       setVideojuegosState(videogames);
//     }

//     fetchVideogames();
//   }, [currentPage]);

//   const handlePrev = () => {
//     setCurrentPage((prevPage) => prevPage - 1);
//   };

//   const handleNext = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={() => handlePrev()} disabled={currentPage === 1}>
//           prev
//         </button>
//         <button onClick={() => setCurrentPage(1)}>1</button>
//         <button onClick={() => setCurrentPage(2)}>2</button>
//         <button onClick={() => setCurrentPage(3)}>3</button>
//         <button onClick={() => handleNext()}>next</button>
//       </div>
//       {videojuegosState.length === 0 ? (
//         <p>Cargando...</p>
//       ) : (
//         videojuegosState.map((game) => (
//         <div key={game.id}>
//             <hr />
//             <h2>{game.id}</h2>
//             <h2>{game.name}</h2>
//             <img src={game.image} alt="Game Picture" / >
//             </div>
//             )))

//       }
//       </div>)}
