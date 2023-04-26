import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { getGenres } from '../redux/actions'
import axios from 'axios'
import { validate } from '../utils/validate'
import './App.css'

export default function Form () {
  const gamesByGenre = useSelector(state => state.allgenres)
  const [radioRatingValue, setRadioRatingValue] = useState(1)
  const [genreSelected, setGenreSelected] = useState([])
  const [platformSelected, setPlatformSelected] = useState([])
  console.log(radioRatingValue)
  console.log(platformSelected)

  function handleRadioChange (event) {
    setRadioRatingValue(parseInt(event.target.value))
  }
  console.log(genreSelected)
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    name: '',
    background_image: '',
    description: '',
    platforms: [],
    released: '',
    rating: '',
    genre: []
  })
  const [errors, setErrors] = useState({
    name: '',
    background_image: '',
    description: '',
    released: ''
  })
  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])
  console.log(gamesByGenre)
  const plataformasObj = [
    { name: 'PlayStation 5' },
    { name: 'Xbox Series S/X' },
    { name: 'PlayStation 4' },
    { name: 'PC' },
    { name: 'PlayStation 3' },
    { name: 'Xbox 360' },
    { name: 'Xbox One' },
    { name: 'Nintendo Switch' },
    { name: 'Linux' },
    { name: 'macOS' },
    { name: 'Android' },
    { name: 'iOS' },
    { name: 'PS Vita' },
    { name: 'Xbox' },
    { name: 'Web' },
    { name: 'Wii U' },
    { name: 'Nintendo 3DS' },
    { name: 'PlayStation 2' },
    { name: 'Dreamcast' }
  ]
  const handleChange = event => {
    const property = event.target.name
    const value = event.target.value

    setForm({ ...form, [property]: value })

    setErrors(validate({ ...form, [property]: value }, errors))
  }

  const handleChangeOption = (event) => {
    const selectedGenre = event.target.value;
    if (event.target.checked) {
      if (!genreSelected.includes(selectedGenre)) {
        setGenreSelected([...genreSelected, selectedGenre]);
      }
    } else {
      setGenreSelected(genreSelected.filter((genre) => genre !== selectedGenre));
    }
  };
  
  const handleChangeOptionByPlatform = event => {
    const selectedPlatforms = event.target.value
    if (event.target.checked) {
      if (!platformSelected.includes(selectedPlatforms)) {
        setPlatformSelected([...platformSelected, selectedPlatforms]);
      }
      // setPlatformSelected([...platformSelected, selectedPlatforms])
    } else {
      setPlatformSelected(
        platformSelected.filter(platform => platform !== selectedPlatforms)
      )
    }
  }

  async function createGames ({
    name,
    background_image,
    description,
    platforms,
    released,
    rating,
    genre
  }) {
    const newJuego = {
      name: name,
      background_image: background_image,
      description: description,
      platforms: platformSelected,
      released: released,
      rating: radioRatingValue,
      genre: genreSelected
    }

    console.log(newJuego)

    await axios
      .post(`http://localhost:3001/videogames/`, newJuego)
      .then(res => {
        console.log('creado con exito')
        // setForm({
        //   name: '',
        //   background_image: '',
        //   description: '',
        //   platforms: [],
        //   released: '',
        //   rating: '',
        //   genre: []
        // })
        window.location.reload()
      })
      .catch(error => {
        console.log('hubo un error')
        console.log(error)
      })
  }
  const submitHandler = event => {
    event.preventDefault()
    if (genreSelected.length === 0) {
      alert('seleciona algun genero')
      return
    }
    if (radioRatingValue.length === 0) {
      alert('seleciona algun rating')
      return
    }
    if (platformSelected.length === 0) {
      alert('seleciona alguna plataforma')
      return
    }

    createGames(form)
  }
  return (
    <div className='formulariocontent'>
      <div className='formulario'>
        <form className='form' onSubmit={submitHandler}>
          <div className='labels1'>
            <label
            //className={styles.label} htmlFor="name"
            >
              Nombre:
            </label>
            <input
              placeholder='Name aqui....'
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              className='inputs'
              //className={`${errors.name ? styles.error : styles.success}  ${
              //styles.input
              //}`
              //}
            />
            <span className='errores'>{errors.name}</span>
          </div>
          <div className='labels1'>
            <label htmlFor='background_image'>Imagen:</label>
            <input
              placeholder='Image url....'
              type='text'
              name='background_image'
              value={form.background_image}
              onChange={handleChange}
              className='inputs'
              //className={`${errors.image ? styles.error : styles.success}  ${
              //styles.input
              //}`}
            />
            <span className='errores'>{errors.background_image}</span>
          </div>
          <div className='labels1'>
            <label>Description:</label>
            <input
              placeholder='Write description...'
              type='text'
              name='description'
              value={form.description}
              onChange={handleChange}
              className='inputs'
            />
            <span className='errores'>{errors.description}</span>
          </div>

          <div className='labels1'>
            <label>Released:</label>
            <input
              placeholder='Write released date..'
              type='text'
              name='released'
              value={form.released}
              onChange={handleChange}
              className='inputs'
            />
            <span className='errores'>{errors.released}</span>
          </div>
          <div className='labels'>
            <label>Genre:</label>
            <div className='allGenre'>
              {gamesByGenre.map(genero => {
                return (
                  <div key={genero.id}>
                    <input
                      type='checkbox'
                      value={genero.id}
                      onChange={handleChangeOption}
                      className='inputs'
                    />
                    <label value={genero.id}>{genero.name}</label>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='labels'>
            <label> Platforms </label>
            <div className='allGenre'>
              {plataformasObj.map(platforma => {
                return (
                  <div>
                    <input
                      className='inputs'
                      type='checkbox'
                      value={platforma.name}
                      onChange={handleChangeOptionByPlatform}
                    />
                    <label>{platforma.name}</label>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='labels'>
            <label>Rating</label>
            <label>
              <input
                type='radio'
                value='1'
                checked={radioRatingValue === 1}
                onChange={handleRadioChange}
                className='inputs'
              />
              1
            </label>
            <label>
              <input
                type='radio'
                value='2'
                checked={radioRatingValue === 2}
                onChange={handleRadioChange}
                className='inputs'
              />
              2
            </label>
            <label>
              <input
                type='radio'
                value='3'
                checked={radioRatingValue === 3}
                onChange={handleRadioChange}
                className='inputs'
              />
              3
            </label>
            <label>
              <input
                type='radio'
                value='4'
                checked={radioRatingValue === 4}
                onChange={handleRadioChange}
                className='inputs'
              />
              4
            </label>
            <label>
              <input
                type='radio'
                value='5'
                checked={radioRatingValue === 5}
                onChange={handleRadioChange}
              />
              5
            </label>
          </div>

          <button type='submit' className='botonsubmit'>
            Create Game
          </button>
        </form>
      </div>
    </div>
  )
}
