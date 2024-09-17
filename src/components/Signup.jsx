import React, { useRef, useState } from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const image = useRef(null)
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

      
      const onSubmit = (data) => {
        async function fetchData() {
            let a = await fetch("http://localhost:3000/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            let response = await a.text(); 
            if(response === "Account created successfully") {
                toast.success(response)
            }
            else {
                toast.error(response)
            
            }
            
            if(response === "Account created successfully") {
                setTimeout(() => {
                    navigate("/")
                }, 2000)
            }
        }
        fetchData();
      }
  return (
    <div className='flex p-2 justify-between'>

      <div className="main-content p-3 md:w-[49.4%] w-full h-[600px] rounded-md border border-black bg-slate-200">
        <Link to="/">
            <img src="./src/assets/back.png" className='h-9 cursor-pointer' />
        </Link>
        <br />
        <h1 className='text-3xl font-medium'>Create Account: </h1>
        <br />
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
            <p className='text-2xl font-medium'>Enter your email: </p>
            <input type="text" placeholder='Enter Email..'  {...register("email", {required: {value: true, message: "Email is required"}})} className='w-2/3 h-8 p-1'/>
            
            <div className='relative'> 

                <p className='text-2xl font-medium'>Create your password: </p>
                <input type={inputType} placeholder='Enter Password...'  {...register("password", {required: {value: true, message: "Password is required"}})} className='w-2/3 h-8 p-1'/> 
                <img src="./src/assets/find.png" alt="" className='absolute top-[52%] right-[35%] cursor-pointer h-6' onClick={handleClick} ref={image} />
            </div> 

      <ToastContainer />
            
            <input type="submit" value="Create Account" className='cursor-pointer bg-yellow-400 rounded-md px-3 py-1 w-fit' />
        </form>
        <br />
        <br />
        <p className='text-red-600'>* Your account details are stored in your local mongoDB, and I cannot access it</p>
        <p className='text-red-600'>* It is completely safe for you to create account</p>
      </div>




      <div className="main-content p-3 w-[49.4%] h-[600px] md:flex hidden  rounded-md border justify-center items-center border-black ">
        <img src="./src/assets/login-girl.jpg" className='h-[300px] lg:h-[400px]' />
      </div>

    </div>
  )
}

export default Signup
