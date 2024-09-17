import { useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { Link } from 'react-router-dom'; 
const Aside = () => {
  const [route, setRoute] = useState("")

  const handleClick =async (event) => {
    setRoute(event.target.src)
    let a = await fetch("http://localhost:3000/get-route", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({route: event.target.src})
      })
    let b = await a.text();
    // let set = await fetch("http://localhost:3000/set-route", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({route: b})
    //   })
    // let c = await set.text();
    // console.log(c)
  }

  return (
    <div className='flex justify-center items-center min-w-[50px] max-w-[50px] h-[500px] m-2'>
      <div className="items relative flex flex-col gap-y-8 h-4/5 p-1 py-3 items-center bg-slate-200 rounded-md">
        <div className="item cursor-pointer">
            <Link to="/authorization">
              <img data-tooltip-id="fingerprint" src="./src/assets/fingerprint.png" onClick={handleClick} />  
            </Link>   
            <ReactTooltip id="fingerprint" place="top" effect="solid" className='relative z-10'>
                see passwords
            </ReactTooltip>       
        </div>
        <div className="item cursor-pointer">
            <Link to="/authorization">
              <img data-tooltip-id="key-chain" src="./src/assets/key-chain.png" onClick={handleClick} /> 
            </Link>  
            <ReactTooltip id="key-chain" place="top" effect="solid" className='relative z-10'>
                manage passwords
            </ReactTooltip>         
        </div>
        <div className="item cursor-pointer">
            <Link to="/create-passwords">
              <img data-tooltip-id="feather" src="./src/assets/feather.png" alt="" />
            </Link>   
            <ReactTooltip id="feather" place="top" effect="solid" className='relative z-10'>
                create passwords
            </ReactTooltip>         
        </div>
        <div className="item cursor-pointer absolute bottom-3 ">
            <Link to="/account">
              <img data-tooltip-id="account" src="./src/assets/account.png" className='h-[42px]' />   
            </Link>
            <ReactTooltip id="account" place="top" effect="solid" className='relative z-10'>
                Account
            </ReactTooltip>         
        </div>
      </div>
    </div>
  )
}

export default Aside
