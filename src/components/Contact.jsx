import React from 'react'
import { Link } from 'react-router-dom'
const Contact = () => {
  document.title = "Contact me - Forget Vault"
  return (
    <div className='p-6'>
      <Link to="/">
        <img src="./src/assets/back.png" className='h-7 cursor-pointer' />
      </Link>
      <br />
      <br />
      <h1 className='text-3xl font-semibold'>Hello there 👋</h1>
      <p>This project was made with ❤️ by Yashodhar.</p>
      <br />
      <p className='text-xl font-medium'>Things to consider before moving on: </p>
      <ul className='list-disc list-inside'>
        <li>We don't have access to your email and password, as it is stored in your local mongoDB database. </li>
        <li>Your email and password are completely safe, and hence this app is safe to use.</li>
        <li>The Process may be complicated or time Consuming.</li>
      </ul>
      <br />
      <p className='text-xl font-medium'>Collaboraters are most welcomed</p>
      <p>You can react out to me via my email: <span className='bg-slate-200 rounded px-2 py-1 font-mono'>yashodhar.vgency@gmail.com</span></p>
      <br />
      <h1 className="text-3xl font-semibold">Attributes: </h1>
      <ul className='list-disc list-inside'>
        <li>I have used images and icons from <a href="https://flaticon.com/" target='_blank' className='text-blue-400 '>flaticon.com</a> whose services are good.</li>
        <li>I have also used images from <a href="https://freepik.com/" target='_blank' className='text-blue-400 '>freepik.com</a> whose services are good.</li>
        <li>Whenever I felt stuck, I used <a href="https://chatgpt.com/" target='_blank' className='text-blue-400 '>chatgpt.com</a>.</li>
      </ul>
      <br /><br />
      <p className="font-xl">start date: 13/09/2024</p>
      <p className="font-xl">end date: 16/09/2024</p>
    </div>
  )
}

export default Contact
