import { useState, useRef } from 'react'
import Navbar from './Navbar'
import Aside from './Aside'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
  const image = useRef(null)

  const onSubmit = async (data) => {
    let a = await fetch("http://localhost:3000/create-password", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      }
    )
    let response = await a.text();
    
    if (!toast.isActive(13, "createPassword")) {
      if(response==="password already exist") {
        toast.error(response, {
          position: "bottom-right", 
          closeOnClick: true,
          draggable: false,
          toastId: 13
        })
      }
      else if(response==="password created successfully") {
        toast.success(response, {
            position: "bottom-right", 
            closeOnClick: true,
            draggable: false,
            toastId: 13                      
        })
      }
}
  }

  const {
    register,
    handleSubmit, 
    formState: { errors },
  } = useForm()

  const [inputType, SetInputType] = useState('password')

  const handleClick = () => {
    let currentSrc = image.current.src
    if(currentSrc.includes('find.png')) {
        image.current.src = './src/assets/hide.png'
        SetInputType('text')
    }
    else {
        image.current.src = './src/assets/find.png'
        SetInputType('password')
    }
  }

  document.title = "Create passwords - Forget Vault - trusted password manager"
 

  return (
    <>
        <Navbar />
        <div className='flex gap-x-3'>
          <Aside />
          <div className='px-3 py-6 my-14 rounded-md w-4/5 bg-slate-200'>
          <Link to="/">
          <img src="./src/assets/back.png" className='h-9'/>
          </Link>
          <br />
          <h1 className='text-3xl font-medium'>Create Passwords: </h1>
          <br />
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
            <p className='text-2xl font-medium'>Enter website name: </p>
            <input type="text" placeholder='Enter Website...'  {...register("webname", {required: {value: true, message: "website is required"}})} className='w-2/3 h-8 p-1'/>
            
            <div className='relative'> 

                <p className='text-2xl font-medium'>Enter password name: </p>
                <input placeholder='Enter Password...' type={inputType} {...register("webpassword", {required: {value: true, message: "Password is required"}})} className='w-2/3 h-8 p-1'/> 
                <img src="./src/assets/find.png" onClick={handleClick} className='absolute top-[52%] right-[35%] cursor-pointer h-6' ref={image} />
            </div> 

            
            <input type="submit" value="Add Password" className='cursor-pointer bg-yellow-400 rounded-md px-3 py-1 w-fit' />
        </form>
          <ToastContainer containerId={"createPassword"} />
          </div>
        </div>
    </>
  )
}

export default Create
