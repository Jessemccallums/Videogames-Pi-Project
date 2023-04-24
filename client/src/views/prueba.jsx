
//   // const handleChangeOrder = (event) => {
//   //   const valor = event.target.value

//   //   if(valor === "a-z"){
//   //     let result = videojuegosState.sort((a,b) => {return a.name - b.name})
//   //     setOrderCard("a-z");
//   //     return result

//   //   }

//   //   if(valor === "z-a") {
//   //     let result = videojuegosState.sort((a,b) => {return b.name - a.name})
//   //     setOrderCard("z-a");
//   //     return result

//   //   }

//   //   if(valor === "default") {
//   //     let result = videojuegosState
//   //     setOrderCard("default");
//   //     return result

//   //   }

//   // }

//   // async function getVideogame(id) {
//   //   const response = await fetch(`http://localhost:3001/videogames/${id}`);
//   //   const data = await response.json();
//   //   console.log(data);
//   //   return {
//   //     id: data.id,
//   //     name: data.name,
//   //     genres: data.genre,
//   //     image: data.background_image,
//   //   };
//   // }

//   // async function getVideogames(page) {
//   //   const limit = 15;
//   //   const start = limit * (page - 1);
//   //   const end = limit * page;
//   //   const requests = [];

//   //   for (let i = start; i < end; i++) {
//   //     requests.push(getVideogame(i));
//   //   }

//   //   const videogames = await Promise.all(requests);
//   //   return videogames;
//   // }
//   useEffect(() => {
//     // async function fetchVideogames() {
//     //   const videogames = await getVideogames(currentPage);
//     //   setVideojuegosState(videogames);
//     // }
//     dispatch(gameByName(busqueda))
  

//     // fetchVideogames();
//   }, []);
// //   <div>
// //         <h3>Filter by:</h3>
// //         <select>
// //           <option value="default">Default</option>
// //           <option value="own">own</option>
// //           <option value="public">public</option>
// //         </select>
// //       </div>
// //       <div>
// //         <h3>Ordering:</h3>
// //         <select>
// //           <option value="default">Default</option>
// //           <option value="a-z">a-z</option>
// //           <option value="z-a">z-a</option>
// //         </select>
// //       </div>
// //       <div>
// //         <h3>Genres:</h3>
// //         <select>
// //           <option value="default">Default</option>
// //           <option value="action">Action</option>
// //           <option value="indie">Indie</option>
// //           <option value="Adventure">Adventure</option>
// //           <option value="rpg">RPG</option>
// //           <option value="strategy">Strategy</option>
// //           <option value="shooter">Shooter</option>
// //           <option value="casual">Casual</option>
// //           <option value="simulation">Simulation</option>
// //           <option value="puzzle">Puzzle</option>
// //           <option value="arcade">Arcade</option>
// //           <option value="platformer">Platformer</option>
// //           <option value="racing">Racing</option>
// //           <option value="massively-multiplayer">Massively Multiplayer</option>
// //           <option value="Sports">Sports</option>
// //           <option value="fighting">Fighting</option>
// //           <option value="family">Family</option>
// //           <option value="board-games">Board Games</option>
// //           <option value="educational">Educational</option>
// //           <option value="card">Card</option>
// //         </select>
// //       </div>
// //       <div>
// //         <h3>Rating</h3>
// //         <select>
// //           <option value="default">Default</option>
// //           <option value="0-5">0-5</option>
// //           <option value="5-0">5-0</option>
// //         </select>
// //       </div>