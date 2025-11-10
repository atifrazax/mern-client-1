import { NavLink } from 'react-router'
import { useAuth } from '../contexts/useAuth'
import { useNavigate } from 'react-router';

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

   const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include',
    });
    const data = await res.json();
    if(!res.ok) throw new Error('Error: ' + data.message);
    setUser(null);
    navigate('/');
    } catch (error) {
      console.log(error); 
    }
  }
  return (
    <nav className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-1'>
      <div className="navbar bg-transparent sm:mt-2 z-99">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-lg dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow bg-white">
              {user ? 
              <div className='flex'>
                <li className='pb-1'><NavLink to="/profile" className='text-center max-w-40 block'>Hello, {user.name}</NavLink></li> 
                <li className='pb-1'><NavLink to="/logout" onClick={handleLogout} className='text-center w-30 block'>Logout</NavLink></li>
              </div> :

                <div className='flex'>
                  <li className='pb-1'><NavLink to="/" className='text-center w-30 block'>Sign In</NavLink></li>
                  <li className='pb-1'><NavLink to="/signup" className='text-center w-30 block'>Sign Up</NavLink></li>
                </div>
                }
            </ul>
          </div>
          {/* <NavLink to="/"><img src="./logo.png" alt="logo" className='h-auto w-30'/></NavLink> */}
          <NavLink to="/profile"><span className='text-red-custom text-4xl'>a. <span className='text-gray-custom text-2xl'>Raza</span></span></NavLink>
        </div>
    
      <div className="navbar-end hidden lg:flex text-black">
        <ul className="menu menu-horizontal px-1 text-lg">
          {user ? 
          <div className='flex'>
            <li className='border-2 border-transparent hover:border-primary transition-all duration-200'><NavLink to="/profile" className='text-center max-w-40 block'>Hello, {user.name}</NavLink></li> 
            <li className='border-2 border-transparent hover:border-primary transition-all duration-200'><NavLink to="/logout" onClick={handleLogout} className='text-center w-30 block'>Logout</NavLink></li>
          </div> :

            <div className='flex'>
              <li className='border-2 border-transparent hover:border-primary transition-all duration-200'><NavLink to="/" className='text-center w-30 block'>Sign In</NavLink></li>
              <li className='border-2 border-transparent hover:border-primary transition-all duration-200'><NavLink to="/signup" className='text-center w-30 block'>Sign Up</NavLink></li>
            </div>
            }
          
        </ul>
      </div>
    </div>
  </nav>
  )
}
