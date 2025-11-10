import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location.state]);
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        if (!email || !password || !role) {
          setMessage("All fields are required");
          return;
        }

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/signin`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");
        navigate("/profile");
      } catch (error) {
        setMessage(error.message);
        // console.error(error);
      }
    };

  return (
    <section>
        <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-5 h-screen'>
            <div className='grid place-content-center sm:w-1/2 mx-auto bg-white shadow-2xl rounded-2xl p-10'>
                <h1 className='text-red-custom mb-15 text-center'>Sign In</h1>
                 <form onSubmit={handleSubmit} className='flex flex-col gap-4 relative'>

                    <input value={email} onChange={e=>setEmail(e.target.value)} id='email' type="email" placeholder='Your Email' className='shadow py-4 px-10 rounded-lg'/>

                    <input value={password} onChange={e=>setPassword(e.target.value)} id='password' type="password" placeholder='Your Password' className='shadow py-4 px-10 rounded-lg'/>

                    <select name="role" id="role" className='shadow py-4 px-10 rounded-lg mb-4' onChange={e=>setRole(e.target.value)}>
                      <option>Role</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>

                    {message && <small className='text-red-custom'>{message}</small>}

                    <button className='shadow py-2 px-10 rounded-lg bg-gray-custom text-white hover:bg-red-custom transition-all'>Sign In</button>

                    <span className='text-center text-gray-400'>Don't have an account? <Link to="/signup" className='text-red-custom'>Sign Up</Link></span>
                 </form>
            </div>
        </div>
    </section>
  )
}
