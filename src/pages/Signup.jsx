
import { useState } from "react";
import { Link } from "react-router";
import getCsrfToken from '../utils/getCsrfToken.js';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const csrfToken = await getCsrfToken(); // Get the CSRF token

          const res = await fetch(`${import.meta.env.VITE_API_URL}/api/signup`, {
            method: 'POST',
            credentials: 'include', // Include cookies
            headers: { 
              'Content-Type': 'application/json',
              'x-csrf-token': csrfToken, // Send the CSRF token
             },
            body: JSON.stringify({ name, email, password, role }),
          })
          const data = await res.json();
          if(!res.ok) throw new Error(data.message || "Signup failed. Please try again");
          setMessage(data.message);

        
        } catch (error) {
          setMessage(error.message);
          // console.log(error); 
        }
        
      }
  return (
    <section>
        <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-5 h-screen'>
            <div className='relative grid place-content-center sm:w-1/2 mx-auto shadow-md sm:shadow-2xl rounded-2xl p-10'>
                <h1 className='text-red-custom mb-15 text-center '>Sign Up</h1>
                 <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>

                    <input value={name} onChange={e=>setName(e.target.value)} id='name' type="text" placeholder='Your Name' className='shadow py-4 px-10 rounded-lg bg-white'/>

                    <input value={email} onChange={e=>setEmail(e.target.value)} id='email' type="email" placeholder='Your Email' className='shadow py-4 px-10 rounded-lg bg-white'/>

                    <input value={password} onChange={e=>setPassword(e.target.value)} id='password' type="password" placeholder='Your Password' className='shadow py-4 px-10 rounded-lg bg-white'/>

                    <select name="role" id="role" className='shadow py-4 px-10 rounded-lg mb-2' onChange={e=>setRole(e.target.value)}>
                      <option>Role</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>

                    {message && <small className='text-red-custom'>{message}</small>}

                    <button type="submit" className='shadow py-2 px-10 rounded-lg sm:mx-auto bg-gray-custom text-white hover:bg-red-custom transition-all'>Create Account</button>

                    <span className='text-center text-gray-400'>Already have an account? <Link to="/" className='text-red-custom'>Sign In</Link></span>

                    <span className="animate-[moveAround_8s_ease-in-out_infinite] absolute h-32 w-32 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-10 -z-1"></span>
                 </form>
            </div>
        </div>
    </section>
  )
}
