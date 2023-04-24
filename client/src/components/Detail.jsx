import { useParams } from 'react-router-dom';
import React, { useEffect, useState} from 'react'
import axios from 'axios';

export default function Detail() {

const {id} = useParams()

const [detail, setId] = useState([])

useEffect(() => {
  info()
})

const info = async () => {
const {data} = await axios(`http://localhost:3001/videogames/${id}`)
    setId(data)
}
console.log(detail)
  return (
    <div>
      <h1>{detail.name}</h1>
      <h2>{detail.description}</h2>
      <img
              src={detail.background_image}
              alt='Game Picture'
              style={{ width: '200px', height: 'auto' }}
            />
      <h2>{detail.platforms}</h2>
      <h2>{detail.released}</h2>
      <h2>{detail.rating}</h2>
      <h2>{detail.genre}</h2>
    </div>
  )
}
