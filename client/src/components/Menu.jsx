import { Link } from 'react-router-dom';
import React from 'react'

export default function Menu() {
  return (
    <div>
      
    <Link to={"/"}>Home</Link> <br/>
    <Link to={"/home"}>App</Link> <br/>
    <Link to={"/form"}>Create new game</Link>
    </div>
  )
}
