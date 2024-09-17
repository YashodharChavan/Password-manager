import { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar'
import Aside from './Aside'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from 'react-router-dom';
const Authorize = () => { 
    const [inputType, SetInputType] = useState('password')
    const image = useRef(null)
    const navigate = useNavigate();
    const [route, setRoute] = useState("")
    document.title = "Authorize - Forget Vault"
const [b, setB] = useState("")
    useEffect(() => {
      async function fetchData() {
        let a= await fetch("http://localhost:3000/set-route", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            setB(await a.text())
            setRoute(b)
        }
        fetchData();
    }, [b])
    

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

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

    const onSubmit =async (data) => {
        let a = await fetch("http://localhost:3000/authorize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        let b = await a.text()
        if(!toast.isActive(13, "authoriztion")) {

            if(b==='unauthorized') {
                toast.error(b, {
                    toastId: 1
                })
            }
            else {
                toast.success(b, {
                    toastId: 1
                })
            }
        }
        
        if(b === "authorized") {
            setTimeout(() => {
                console.log("the route is, ", route)
                navigate(`/${route}`)
            }, 3000);
        }
        
    }

    document.title = "Forget Vault - trusted password manager"    
  return (
    <div>
      <>
        <Navbar />
        <div className='flex gap-x-3'>
        <Aside />
        <div className='px-3 py-6 my-14 rounded-md w-4/5 bg-slate-200'>
        <Link to="/">
            <img src="./src/assets/back.png" className='cursor-pointer h-8' />
        </Link>            
        <br />
        <h1 className="text-2xl md:text-3xl font-medium">Enter your account password: </h1>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className='relative'> 

            <br />
                <input placeholder='Enter Password...' type={inputType} {...register("pass", {required: {value: true, message: "Password is required"}})} className='w-2/3 h-8 p-1'/> 
                <img src="./src/assets/find.png" onClick={handleClick} className='absolute top-1/2 right-[35%] cursor-pointer h-6' ref={image} />
            </div> 
            <br />
            <input type="submit" value="Authorize" className='cursor-pointer bg-yellow-400 rounded-md px-3 py-1 w-fit'/>
            </form>
            <ToastContainer containerId={"authoriztion"}/>
        </div>
        </div>
    </>
    </div>
  )
}

export default Authorize
