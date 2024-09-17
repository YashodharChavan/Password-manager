import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AllComponents.css'


const Navbar = () => {

  const [firstUser, setFirstUser] = useState(false)
  const [isLoggedOut, setIsLoggedOut] = useState(false)
  async function fetchData() {
    let a = await fetch('http://localhost:3000/check-user', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let res = await a.text();
    if(res==="first user") {
      setFirstUser(true)
    }
    else {
      setFirstUser(false)
    }
  }
  
  const handleLogout =async () => {
    let a = await fetch("http://localhost:3000/logout", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'   
        } 
      })
    let res = await a.text();
    if(res==="failed to logout") {
      toast.error(res)
    }
    else if(res==="logged out successfully") {
      toast.success(res)
    }
    setIsLoggedOut(true)
  }

  useEffect(() => {
    fetchData();
  }, [])
  useEffect(() => {
    fetchData();
  }, [isLoggedOut])
  


  return (
    <div className='flex justify-between px-4 py-1'>
      <div className="logo text-3xl bg-gradient-to-r from-[#C33764] via-[#FE9090] to-[#596164] bg-clip-text text-transparent font-semibold">
  Forget Vault
</div>
      <div className="options flex gap-x-2">
        {firstUser? <Link to="/sign-up" className="option bg-black text-white rounded-full px-3 py-1 cursor-pointer">Sign up</Link>: 
        <div className='options flex gap-x-2'>
          <button onClick={handleLogout} className="option border border-black rounded-full px-3 py-1 cursor-pointer">Logout</button>
          <Link to="/contact-me" className="option bg-black text-white rounded-full px-3 py-1 cursor-pointer">contact me</Link>
        </div>
        }
        <ToastContainer />
      </div>
    </div>
  )
}

export default Navbar
