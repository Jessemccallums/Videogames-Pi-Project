import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gameByName } from '../redux/actions'
import { orderCards } from '../redux/actions'
import { Link } from 'react-router-dom';
import './Views.css'

export default function HomeView () {

  //Aqui tengo mis estados locales, los cuales me ayudan en mi aplicacion a tenerla de manera compleja, 
  // su proposito es tener un ordenamiento de manera dinamica. aplico un hook que me provee un estado local
  const [orderCard, setOrderCard] = useState()
  const [orderByRating, setOrderByRating] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [busqueda, setBusqueda] = useState('')
  const [orderCardGenre, setOrderCardGenre] = useState();
  const [orderCreated, setOrderCreated] = useState();
  //aqui aplico otro hook, el cual me ayuda a usar un dispatch, me ayudara a hacer mis dispatch en redux 
  const dispatch = useDispatch()
  // y aqui llamo a mi estado global con el hook useSelector, el cual tiene un proposito de acceder
  // al estado global gamesByName, el cual tiene el proposito de mostrar la informacion buscada por nombre.

  const stategames = useSelector(state => state.gamesByName)
  // aqui uso lo que yo llamo, una bandra, que me ayudara a hacer el paginado de 15 juegos por pagina
  const gamesPerPage = 15

  console.log(stategames)
  // a partir de ahora, muestro mis handlers, que me ayudara a darle vida a mi componente, 
  //con respecto a sus funcionamientos

  // 1) aqui aplico mi primer handlers, el cual me ayudara a reiniciar mis filtros
  const HandleRestore = () => {
    window.location.reload()
  }

  // 2) aqui aplico mi segundo handler, el cual con ayuda de mi estado local, setOrderCreated, y la propiedad event
  // hare una toma de informacion de los valores de los inputs, llamados target, este valor, me ayudara a darle 
  // valores a mi estado local ya mencionado, el cual usare para hacer el filtrado.
  const handleChangeCreated = (event) => {
    const valor = event.target.value;
    if (valor !== "default") {
      setOrderCreated(valor);
    } else {
      return true
    }
  };
  //3) aqui aplico mi tercer handlers, el cual con ayuda de un estado local, llamado setOrderByRating, 
  //y la propiedad  event, le dare valores a mi estado local, esos valores seran el valor de el input dado. 
  // ese valor lo usare en el futuro para mis filtrados y ordenamientos
  const handleChangeOrderByRating = (event) => {
    const valor = event.target.value
    if(valor !== "default"){
     setOrderByRating(valor);
    
    } else {
      return true
    }
    

  }
  //4) aqui aplico mi cuarto handler, el cual con ayuda de un estado local, llamado setOrderCardGenre, y la propiedad
  // event, voy a poder darle valores a mi estado local proveniente de el valor de mi input, este valor lo inserto
  //en mi estado local, el cual usare para el filtrado y ordenamiento de mi aplicacion
  const handleChangeGenre = (event) => {
    const valor = event.target.value
    if(valor !== 'default'){
      setOrderCardGenre(valor)
    }
  }

  //5) aqui esta mi quinto handlre, el cual con ayuda de mi estado local, llamado handleChangeOrder, y la 
  // propiedad event, yo voy a poder asignarle a mi estado local valores traidos del input el cual esta siendo 
  // aplicado este handler, y el valor que tendra mi estado local sera utilizado a futuro en mi filtrado y 
  // ordenamiento

  const handleChangeOrder = (event) => {
    const valor = event.target.value

    if (valor === 'Ascendente') {
     
      setOrderCard('Ascendente')
      
    } 
    if(valor === 'Descendente'){
     
      setOrderCard('Descendente')
     
    }
   
    
  }
  // aqui tengo un useEffect, el cual me ayudara con el renderizado de mi aplicacion, hare un dispatch a mi action
  // gameByName, el cual le pasare por parametro el valor de mi estado local setBusqueda, el cual me permitira 
  // buscar por nombre, los juegos traidos de mi back, ya sea que provienen de la api, o de mi base de datos,
  // es decir, los juegos creados directamente en mi base de datos
  useEffect(() => {
    dispatch(gameByName(busqueda))
    dispatch(orderCards(orderCard))
    setCurrentPage(1)
  }, [dispatch, busqueda, orderCreated, orderCard, orderCardGenre])
  //6) aqui tengo mi sexto handler, el cual me ayudara a hacer mi paginado, me ayudara a retrocer de pagina, 
  // con el boton Prev
  const handlePrev = () => {
    setCurrentPage(currentPage - 1)
  }
  //7) aqui tengo mi septimo handler, el cual me ayudara a hacer mi paginado, me ayudara a aumentar y avanzar
  // de pagina, con el boton Next
  const handleNext = () => {
    setCurrentPage(currentPage + 1)
  }
  //8) aqui aplico mi octavo handler, el cual me ayudara a otorgarle un valor a mi estado local setBusqueda,
  // y su valor, lo usare para buscar nombre en el futuro.
  const handleChange = event => {
    setBusqueda(event.target.value)
  }
  //9) aqui aplico mi noveno handler, el cual con ayuda de mi estado local setCurrentPage y mi funcion dispatch, 
  // hare una busqueda por nombre, esta me ayudara a renderizar mis juegos por nombre, el cual tambien le dare un
  // filtrado y ordenamiento
  const hanlderGamesByName = () => {
    setCurrentPage(1)
    dispatch(gameByName(busqueda))
  }

  // ahora, aqui uso una variable la cual mantiene los juegos de mi estado global, y le hace un ordenamiento 
  // y tambien le hace un filtrado, todos los oredenamientos y filtrado los hacemos con ayuda de mi estado global,
  // llamada stategames
  // la cual me ayuda a obtener lo valores para hacer el filtrado

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
  

  // aqui hago la parte del pagina, la cual me ayudara a hacer un paginado de los juegos que vienen
  // de mi estado global, pero ademas me ayudara a hacer paginado de los juegos filtrado.
  // uso una variable llamada indexOfLastGame. La cual multiplica el valor de la pagina actual, 
  // con los juegos por pagina.
  const indexOfLastGame = currentPage * gamesPerPage
  console.log(indexOfLastGame);
  // luego en mi variable indexOfFirstGame, hago una recta del resultado de mi variable indexOfLastGame
  // y los juegos por pagina. la cual me ayudara a obtener los primero juegos 
  const indexOfFirstGame = indexOfLastGame - gamesPerPage
  console.log(indexOfFirstGame);
  // Luego, aqui hago un slice, para obtener una copia de los juegos filtrados dependiendo de su posicion.
  // el cual me ayudara en el futuro en la parte de pagina, aqui tengo los juegos actules, currentGames
  // que estan por pagina.
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);
  // Luego, esta variable me ayudara a obtener el total de paginas, hago un redondeado de los juegos filtrados
  // y juegos por pagina. el cual me ayudara a obtener la cantidad de paginas.
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  console.log(totalPages);

  
  // Aqui tengo mi aplicacion, en la cual tengo todo en funcionamiento, renderizando una search bar, 
  // 

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
