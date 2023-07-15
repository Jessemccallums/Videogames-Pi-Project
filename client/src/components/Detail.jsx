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
const {data} = await axios(`/videogames/${id}`)
    setId(data)
}
console.log(detail)
  return (
    <div className='detallado'>
      <h1 className='nombresymas'>{detail.name}</h1>
      <div className='divimagen'>
      <img
              src={detail.background_image}
              alt='Game Picture'
              
            />
      </div>
      <div className='contenttext'>
      <h2 className='description'>{detail.description}</h2>
      <h2 className='nombresymas1'>{detail.platforms}</h2>
      <h2 className='nombresymas'>{detail.released}</h2>
      <h2 className='nombresymas'>{detail.rating}</h2>
      <h2 className='nombresymas'>{detail.genres}</h2>
      </div>
    </div>
  )
}
