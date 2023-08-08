import React from 'react'
import {Container} from '@mui/material'
import './App.css'
import SimpleBottomNavigation from './components/Navi'
import Top from './components/Top/top'
import Trend from './Pages/Trending/trend'
import Series from './Pages/Series/series'
import Movie from './Pages/Movies/movie'
import Search from './Pages/Search/search'
import { BrowserRouter ,Route ,Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Top/>
    <div className="App">
      <Container>
        <Routes>
          <Route path="/" element={<Trend/>} exact/>
          <Route path="/movies" element={<Movie/>}/>
          <Route path="/series" element={<Series/>}/>
          <Route path="/search" element={<Search/>}/>
        </Routes>
      </Container>
    </div>
    <SimpleBottomNavigation/>
    </BrowserRouter>
  )
}

export default App
