import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";


export default function AdminSignin() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location.state]);
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      try {
        if (!email || !password ) {
          setMessage("All fields are required");
          return;
        }

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Sign-In failed");
        navigate("/profile");
      } catch (error) {
        setMessage(error.message);
        // console.error(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <section>
        <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-5 h-screen'>
            <div className='grid place-content-center sm:w-1/2 mx-auto bg-white shadow-2xl rounded-2xl p-10'>
                <h1 className='text-red-custom mb-15 text-center'>Admin Sign-In</h1>
                 <form onSubmit={handleSubmit} className='flex flex-col gap-4 relative'>

                    <input value={email} onChange={e=>setEmail(e.target.value)} id='email' type="email" placeholder='Your Email' className='shadow py-4 px-10 rounded-lg'/>

                    <input value={password} onChange={e=>setPassword(e.target.value)} id='password' type="password" placeholder='Your Password' className='shadow py-4 px-10 rounded-lg mb-4'/>

                    {message && <small className='text-red-custom'>{message}</small>}

                    <button 
                    disabled={loading} 
                    type="submit" 
                    className='shadow py-2 px-10 rounded-lg bg-gray-custom
                     text-white hover:bg-red-custom transition-all
                     duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                     '>Sign In
                     </button>

                 </form>
            </div>
        </div>
    </section>
  )
}
