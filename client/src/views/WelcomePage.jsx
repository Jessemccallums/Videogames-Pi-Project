import React from 'react'
import { Link } from 'react-router-dom';
import image from '../assets/welcome.jpg'

export default function WelcomePage() {
  return (
    <div className='welcomepagediv'>
    <div className='completo'>
      <h1 className='titulo'>Expanding Access to Video Games: Inclusive Gaming for All</h1>
      <h2 className='parrafo'>Our gaming website offers a search engine to find your favorite games and discover new ones, along with tools and resources for creating your own games. Join our community of game developers and let's get gaming!</h2>
    <Link to='/home'>
      <button className='firstbutton'>Search games!</button>
    </Link>
    </div>
    <img src={image} alt='welcomepage' className='imagenwelcome'/>
    </div>
  )
}
