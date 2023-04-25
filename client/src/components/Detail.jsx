import { useParams } from 'react-router-dom';
import React, { useEffect, useState} from 'react'
import axios from 'axios';
import './App.css'

export default function Detail() {

const {id} = useParams()

const [detail, setId] = useState([])

useEffect(() => {
  info()
}, [id])

const info = async () => {
const {data} = await axios(`http://localhost:3001/videogames/${id}`)
    setId(data)
}
console.log(detail)
  return (
    <div className='detallado'>
      <h1 className='nombresymas'>{detail.name}</h1>
      <h2 className='description'>{detail.description}</h2>
      <img
              src={detail.background_image}
              alt='Game Picture'
              style={{ width: '200px', height: 'auto' }}
            />
      <h2 className='nombresymas'>{detail.platforms}</h2>
      <h2 className='nombresymas'>{detail.released}</h2>
      <h2 className='nombresymas'>{detail.rating}</h2>
      <h2 className='nombresymas'>{detail.genres}</h2>
    </div>
  )
}
