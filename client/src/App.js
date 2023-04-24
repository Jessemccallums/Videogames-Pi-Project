import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import WelcomePage from './views/WelcomePage'
import HomeView from './views/Home'
import Detail from './components/Detail'
import Form from './components/Form'
import Menu from './components/Menu'

export default function App() {
  return (
    <div>
        <Menu />
        <section>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/home' element={<HomeView />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/form' element={<Form />} />
        </Routes>
      </section>
      
    </div>
  )
}
