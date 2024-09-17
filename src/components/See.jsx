import Navbar from "./Navbar";
import Aside from "./Aside";
import { useEffect, useState } from "react";
const See = () => {
  document.title = "See Passwords - Forget Vault"
  const [JSON, setJSON] = useState([])

  useEffect(() => {
    async function fetchData() {
      let a = await fetch("http://localhost:3000/see-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let res = await a.json();
      setJSON(res);
      console.log(res);
    }
    fetchData();
  }, [])



  return (
    <>
      <Navbar />
      <div className="flex gap-x-3">
        <Aside />
        <div className='px-3 py-3 my-14 rounded-md w-4/5 bg-slate-200'>
        <h1 className="font-medium text-2xl">See Passwords</h1>
        <br />
        <div className="h-[340px] p-1 w-full overflow-auto rounded">
        <table className="w-full border-collapse text-left rounded">
      <thead>
        <tr className="bg-[#e5e5e5]">
          <th className="p-1 border border-gray-300">Sr No.</th>
          <th className="p-1 border border-gray-300">Website</th>
          <th className="p-1 border border-gray-300">Password</th>
        </tr>
      </thead>
      <tbody>
        { JSON.length>0 &&
          JSON.map((data, index) => {
            return (
              <tr key={index} className="bg-white">
                <td className="p-1 border border-gray-300">{index + 1}</td>
                <td className="p-1 border border-gray-300">{data.webname}</td>
                <td className="p-1 border border-gray-300">{data.password}</td>
              </tr>
            )
          })
        }
        
      </tbody>
    </table>
        </div>
        </div>
      </div>
    </>
  );
};

export default See;
