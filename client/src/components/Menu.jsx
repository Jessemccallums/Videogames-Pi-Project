import { Link } from 'react-router-dom';
import React from 'react'
import './App.css'

export default function Menu() {
  return (
    <div className='nav'>
      
    <Link to={"/"} className='texto'>Home</Link> <br/>
    <Link to={"/home"} className='texto'>App</Link> <br/>
    <Link to={"/form"} className='texto'>Create new game</Link>
    </div>
  )
}
