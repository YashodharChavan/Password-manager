import './App.css'
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar'
import Aside from './components/Aside'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Contact from './components/Contact';
import Account from './components/Account';
import Create from './components/Create';
import Manage from './components/Manage';
import Authorize from './components/Authorize';
import See from "./components/See"
const Home = () => {
  const [countPass, setCountPass] = useState(0)
  useEffect(() => {
    async function fetchData() {
      let a = await fetch("http://localhost:3000/count-passwords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
      let res = await a.text();
      setCountPass(res)
    }
    fetchData();
  }, [])


  document.title = "Forget Vault - trusted password manager"
  return (
    <>
      <Navbar />
      <div className='flex gap-x-3 '>
        <Aside /> 
        <div className="py-12 px-4">
          <h1 className="text-3xl font-semibold">Welcome to Forget Vault...🚀</h1>
          <br />
          <p className="text-xl font-medium">Just write your passwords and forget them at all 🎯</p>
          <br />
          <div className="bg-purple-300 p-2 rounded-md flex flex-col justify-center items-center h-[80px] w-1/2">
            <p className='text-xl font-medium'>Total Passwords: </p>
            <p>{countPass}</p>
          </div>
        </div>
      </div>
    </>
  )
}


function App() { 
  return (
    <>
      <Router>
      <Routes>   
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/contact-me" element={<Contact />} />
        <Route path="/account" element={<Account />} />
        <Route path="/create-passwords" element={<Create />} />
        <Route path="/manage-passwords" element={<Manage />} /> 
        <Route path="/authorization" element={<Authorize />} /> 
        <Route path="/see-passwords" element={<See />} /> 
      </Routes>
      </Router>
    </>
  )
}

export default App
