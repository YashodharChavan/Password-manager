import React from 'react'
import Navbar from './Navbar'
import Aside from './Aside'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
const Manage = () => {
  document.title = "Manage your passwords - Forget Vault"
  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    formState: { errors: errorsUpdate },
  } = useForm();
 
  const {
    register: registerDelete,
    handleSubmit: handleSubmitDelete,
    formState: { errors: errorsDelete },
  } = useForm();


  const onUpdate =async (data) => {
    let a = await fetch("http://localhost:3000/update-password", {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(data)
  })
    let resp = await a.text();
    if(!toast.isActive(12, "updatePassword")) {
      if(resp==="password updated successfully") {
        toast.success(resp, {
          position: "bottom-right", 
          closeOnClick: true,
          draggable: false,
          toastId: 12
        })
      } else {
        toast.error(resp, {
          position: "bottom-right", 
          closeOnClick: true,
          draggable: false,
          toastId: 12
        })
      }
    }
  }
  
  const onDelete = async (data) => {
    console.log("delete")
    console.log(data);
    let a = await fetch("http://localhost:3000/delete-password", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
    let resp = await a.text();
    if(!toast.isActive(15, "updatePassword")) {
      if(resp==="password deleted successfully") {
        toast.success(resp, {
          position: "bottom-right", 
          closeOnClick: true,
          draggable: false,
          toastId: 15
        })
      } else {
        toast.error(resp, {
          position: "bottom-right", 
          closeOnClick: true,
          draggable: false,
          toastId: 15
        })
      }
    }
  }

  return (
    <>
        <Navbar />
        <div className='flex gap-x-3'>
        <Aside />
        <div className='px-3 py-3 my-14 rounded-md w-4/5 bg-slate-200'>
        <Link to="/">
          <img src="./src/assets/back.png" className='h-9 cursor-pointer' />
        </Link>
            <form onSubmit={handleSubmitUpdate(onUpdate)} className='flex flex-col'>
              <h1 className="text-2xl font-medium">Update your password</h1>
              <input type="text" {...registerUpdate("webUpdate", {required: {value: true, message: "Email is required"}})} placeholder='Enter Website' className='px-3 py-2 rounded-md w-4/5 sm:w-2/3 mt-3' />
              <input type="password" {...registerUpdate("existPass", {required: {value: true, message: "Email is required"}})} placeholder='Enter your password' className='px-3 py-2 rounded-md w-4/5 sm:w-2/3 mt-3' />
              <input type="password" {...registerUpdate("newPass", {required: {value: true, message: "Email is required"}})} placeholder='Enter New password' className='px-3 py-2 rounded-md w-4/5 sm:w-2/3 mt-3' />
              <input type="submit" value={"Update"} className='cursor-pointer w-fit mt-1 px-3 py-1 bg-yellow-300 rounded-md'/>
            </form>

            <form onSubmit={handleSubmitDelete(onDelete)} className='flex flex-col'>

            <h1 className="text-2xl font-medium">Delete your password</h1>
            <input type="text" {...registerDelete("webDelete", {required: {value: true, message: "Email is required"}})} placeholder='Enter website' className='px-3 py-2 rounded-md w-4/5 sm:w-2/3 mt-3' />
            <input type="password" {...registerDelete("password", {required: {value: true, message: "Email is required"}})} placeholder='Enter your password' className='px-3 py-2 rounded-md w-4/5 sm:w-2/3 mt-3' />
            <input type="submit" value={"Delete"} className='cursor-pointer w-fit mt-1 px-3 py-1 bg-blue-300 rounded-md'/>
            </form>
        </div>
        <ToastContainer containerId={"updatePassword"} />
        <ToastContainer containerId={"deletePassword"} />
        </div>
    </>
  )
}

export default Manage
