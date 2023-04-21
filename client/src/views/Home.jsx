import React, { useState, useEffect } from 'react';

export default function HomeView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [videojuegosState, setVideojuegosState] = useState([]);
  const [orderCard, setOrderCard] = useState();

  // const handleChangeOrder = (event) => {
  //   const valor = event.target.value
   
  //   if(valor === "a-z"){
  //     let result = videojuegosState.sort((a,b) => {return a.name - b.name})
  //     setOrderCard("a-z");
  //     return result
      
  //   } 
    
  //   if(valor === "z-a") {
  //     let result = videojuegosState.sort((a,b) => {return b.name - a.name})
  //     setOrderCard("z-a");
  //     return result
      
  //   }

  //   if(valor === "default") {
  //     let result = videojuegosState
  //     setOrderCard("default");
  //     return result
      
  //   }
    
      
    
  // }

  async function getVideogame(id) {
    const response = await fetch(`http://localhost:3001/videogames/${id}`);
    const data = await response.json();
    console.log(data);
    return {
      id: data.id,
      name: data.name,
      genres: data.genre,
      image: data.background_image,
    };
  }

  async function getVideogames(page) {
    const limit = 15;
    const start = limit * (page - 1);
    const end = limit * page;
    const requests = [];

    for (let i = start; i < end; i++) {
      requests.push(getVideogame(i));
    }

    const videogames = await Promise.all(requests);
    return videogames;
  }

  useEffect(() => {
    async function fetchVideogames() {
      const videogames = await getVideogames(currentPage);
      setVideojuegosState(videogames);
    }

    fetchVideogames();
  }, [currentPage]);

  const handlePrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  console.log(videojuegosState);

 

  
  return (
    <div>
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
                    <select>
                        <option value='default'>Default</option>
                        <option value='a-z'>a-z</option>
                        <option value='z-a'>z-a</option>
                    </select>
      </div>
      <div>
                    <h3>Genres:</h3>
                    <select>
                        <option value='default'>Default</option>
                        <option value='action'>Action</option>
                        <option value='indie'>Indie</option>
                        <option value='Adventure'>Adventure</option>
                        <option value='rpg'>RPG</option>
                        <option value='strategy'>Strategy</option>
                        <option value='shooter'>Shooter</option>
                        <option value='casual'>Casual</option>
                        <option value='simulation'>Simulation</option>
                        <option value='puzzle'>Puzzle</option>
                        <option value='arcade'>Arcade</option>
                        <option value='platformer'>Platformer</option>
                        <option value='racing'>Racing</option>
                        <option value='massively-multiplayer'>Massively Multiplayer</option>
                        <option value='Sports'>Sports</option>
                        <option value='fighting'>Fighting</option>
                        <option value='family'>Family</option>
                        <option value='board-games'>Board Games</option>
                        <option value='educational'>Educational</option>
                        <option value='card'>Card</option>
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
      {videojuegosState.length === 0 ? (
        <p>Cargando...</p>
      ) : (
        videojuegosState
          .filter((game) => game.name && game.image && game.genres !== undefined)
          .map((game) => (
            <div key={game.id}>
              <hr />
              <h2>{game.id}</h2>
              <h2>{game.name}</h2>
              <img
                src={game.image}
                alt="Game Picture"
                style={{ width: '200px', height: 'auto' }}
              />
              <h2>{game.genres}</h2>
            </div>
          ))
      )}
    </div>
  );
}






























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

















































