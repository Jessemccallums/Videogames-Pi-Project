import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gameByName } from '../redux/actions'
import { orderCards } from '../redux/actions'
import { Link } from 'react-router-dom';
import './Views.css'

export default function HomeView () {
  const [orderCard, setOrderCard] = useState()
  const [orderByRating, setOrderByRating] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [busqueda, setBusqueda] = useState('')
  const [orderCardGenre, setOrderCardGenre] = useState();
  const [orderCreated, setOrderCreated] = useState();
  const dispatch = useDispatch()
  const stategames = useSelector(state => state.gamesByName)
  const gamesPerPage = 15

  console.log(stategames)

  const HandleRestore = () => {
    window.location.reload()
  }


  const handleChangeCreated = (event) => {
    const valor = event.target.value;
    if (valor !== "default") {
      setOrderCreated(valor);
    } else {
      return true
    }
  };
  
  const handleChangeOrderByRating = (event) => {
    const valor = event.target.value
    if(valor !== "default"){
     setOrderByRating(valor);
    
    } else {
      return true
    }
    

  }

  const handleChangeGenre = (event) => {
    const valor = event.target.value
    if(valor !== 'default'){
      setOrderCardGenre(valor)
    }
  }
  const handleChangeOrder = (event) => {
    const valor = event.target.value

    if (valor === 'Ascendente') {
     
      setOrderCard('Ascendente')
      
    } 
    if(valor === 'Descendente'){
     
      setOrderCard('Descendente')
     
    }
   
    
  }

  useEffect(() => {
    dispatch(gameByName(busqueda))
    dispatch(orderCards(orderCard))
    setCurrentPage(1)
  }, [dispatch, busqueda, orderCreated, orderCard, orderCardGenre])

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



  const filteredGames = stategames.filter((game) => {
    let passesFilter = true;

    if (orderCardGenre && !game.genres.includes(orderCardGenre)) {
      passesFilter = false;
    }

    if (orderCreated !== undefined && game.createdInDb !== (orderCreated === 'createdInDb')) {
      passesFilter = false;
    }

    if (busqueda && !game.name.toLowerCase().includes(busqueda.toLowerCase())) {
      passesFilter = false;
    }
  
    if (!orderCardGenre && orderCreated === undefined && !busqueda) {
      return true;
    }
  
    return passesFilter;
  })
  .sort((a, b) => {
    if (orderByRating === '0-5') {
      if (a.rating !== b.rating) {
        return a.rating - b.rating;
      } else {
        if (orderCard === 'Ascendente') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      }
    } else if (orderByRating === '5-0') {
      if (a.rating !== b.rating) {
        return b.rating - a.rating;
      } else {
        if (orderCard === 'Ascendente') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      }
    } else {
      if (orderCard === 'Ascendente') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    }
  });
  

  
  const indexOfLastGame = currentPage * gamesPerPage
  const indexOfFirstGame = indexOfLastGame - gamesPerPage
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  


  return (
    <div className='contenido'>
      
      <div className='div'>
        <input
          value={busqueda}
          placeholder='Search your favorites games'
          onChange={handleChange}
          className='searchbar'
        />
        <button onClick={hanlderGamesByName} className='buscadordejuegos'>Buscar</button>
      </div>
    <div className='filters'>
      <div className='filtradoscompleto'>
        <h3>Filter by:</h3>
        <select className='seleccionadores' onChange={handleChangeCreated}>
          <option value='default'>Default</option>
          <option value='createdInDb'>own</option>
          <option value='public'>public</option>
        </select>
      </div>
      <div className='filtradoscompleto'>
        <h3>Ordering:</h3>
        <select name='' id='' onChange={handleChangeOrder} className='seleccionadores'>
          <option value='All'>All</option>
          <option value='Ascendente'>Ascendente</option>
          <option value='Descendente'>Descendente</option>
        </select>
      </div>
      <div className='filtradoscompleto'>
        <h3>Genres:</h3>
        <select name='' id='' onChange={handleChangeGenre} className='seleccionadores'>
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
      <div className='filtradoscompleto' >
        <h3>Rating</h3>
        <select className='seleccionadores' onChange={handleChangeOrderByRating}>
          <option value='default'>Default</option>
          <option value='0-5'>0-5</option>
          <option value='5-0'>5-0</option>
        </select>
      </div>
      <div className='filtradoscompleto' >
        <h3>Restore</h3>
        <button className='seleccionadores' onClick={HandleRestore}>
          Restore
        </button>
      </div>
    </div>
    <div className='cardsfixed'>

      {stategames.length === 0 ? (
        <p>Cargando...</p>
      ) : (
        currentGames.map(game => (
          <div key={game.id} className='tarjetas'>
            
            {/* <h2 className='textotarjeta'>{game.id}</h2> */}
            <Link to={`/detail/${game.id}`} className='textotarjeta'>
            <h2 className='textotarjeta'>{game.name}</h2>
            </Link>
            <div className='cardsimage'>
              <img
              src={game.background_image}
              alt='Game Picture'
              className='textotarjeta'
              />
            </div>
            <h2 className='textotarjeta'>{game.genres.join(' ') }</h2>
          </div>
        ))
        )}
        </div>
      <div className='paginado'>
        <button onClick={() => handlePrev()} disabled={currentPage === 1}>
          Prev
        </button>
        <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
      </div>
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
