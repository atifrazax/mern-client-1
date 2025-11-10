import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
// import ProtectedRoute from './components/ProtectedRoute'


function App() {

  return (
    <>    
    <BrowserRouter>

      <Navbar/>
    <Routes>

      <Route path="/" element={<Signin />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/profile" element={<Profile />}/>
      
        {/* <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
            }/> */}
      <Route path="*" element={<h2>Page not found</h2>}/>
      
    </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
