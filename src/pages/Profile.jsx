import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import Loader from "../components/Loader";

export default function Home() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth(); // get user from context
  useEffect(() => {
        (async () => {          
          try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
              credentials: "include",
            }) 
            const data = await res.json();

            if(!res.ok) throw new Error('Not logged in ' + data.message);

            // console.log(JSON.stringify(data.user, null, 2)); // log response
            setUser(data.user); // set user in context
          
          } catch {
            setUser(null);
            navigate("/", {state: {message: "Your session has expired. Please log in again."}});
          } 
        })();
    }, [setUser, navigate]);
    
  if(!user) return <Loader />;
    return (
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-5'>
      {/* {user ? <h1 className="text-black">Welcome, {user.name}</h1> : <h1>Loading...</h1>} */}
      {user.role === "admin" && <h2 className="text-black">Admin Dashboard</h2>}
      <form className="flex flex-col justify-center items-center mt-10 space-y-6">
        <label className="bg-slate-200 text-black/50 rounded-2xl ps-4 pe-4 hover:pe-0 transition-all duration-300">Name
          <input type="text" placeholder={user.name} className="py-2 px-6 bg-red-custom rounded-2xl text-white ms-4" disabled/>
        </label>
        
        <label className="bg-slate-200 text-black/50 rounded-2xl ps-4 pe-4 hover:pe-0 transition-all duration-300">Email
          <input type="text" placeholder={user.email} className="py-2 px-6 bg-red-custom rounded-2xl text-white ms-4" disabled/>
        </label>

        <label className="bg-slate-200 text-black/50 rounded-2xl ps-4 pe-4 hover:pe-0 transition-all duration-300">Role
          <input type="text" placeholder={user.role} className="py-2 px-6 bg-red-custom rounded-2xl text-white ms-4 capitalize" disabled/>
        </label>

      </form>
      </div>
  )
}
