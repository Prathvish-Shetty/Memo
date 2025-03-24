import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Mems from './pages/Mems.jsx'
import ViewMem from './pages/ViewMem.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/mems' element={<Mems />}/>
          <Route path='/mem/:id' element={<ViewMem />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
