import React from 'react'
import { Link } from 'react-router-dom'
import image from '../assets/welcome.jpg'
import grimg from '../assets/grd4.png'

export default function WelcomePage () {
  return (
    <div className='contenthome'>
      {/* <img src={grimg} alt="gradient image" className='grdimg'/>
      <img src={grimg} alt="gradient image" className='grdimg2'/> */}
      <div className='welcomepagediv'>
        <div className='completo'>
          <h1 className='titulo'>
            Most complete videogame information search engine
          </h1>
          <Link to='/home'>
            <button className='firstbutton'>Search games!</button>
          </Link>
        </div>
      
      </div>
    </div>
  )
}
