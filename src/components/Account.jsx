import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import Aside from "./Aside";

const Account = () => {
  document.title = "Account - Forget Vault - trusted password manager";
  const [Email, setEmail] = useState("");
  const [toastType, setToastType] = useState('error')

  useEffect(() => {
    async function fetchData() {
      let a = await fetch("http://localhost:3000/get-email", {
        method: "POST",
      });
      let res = await a.text();
      setEmail(res);
    }
    fetchData();
  }, []);

  async function handleClick() {
    document.body.style.cursor = "wait";
    let a = await fetch("http://localhost:3000/get-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res = await a.text();
    if(!toast.isActive(13, "forgetPassword")) {
      if(res==='error in sending email') {
        toast.error(res, {
          toastId: 13
        })
      }
      else {
        toast.success(res, {
          toastId: 13
        })
      }
    }
    document.body.style.cursor = "default";
  }

  return (
    <>
      <Navbar />
      <div className="flex gap-x-3">
        <Aside />
        <div className="px-3 py-14 w-4/5">
          <div className="flex justify-center items-center h-[400px] w-full">
            <div className="bg-slate-100 flex relative flex-col gap-y-1 py-7 h-[400px] w-full p-2 rounded-md">
              <Link to="/">
                <img
                  src="./src/assets/back.png"
                  className="h-8 w-8 cursor-pointer"
                />
              </Link>
              <br />
              <h1 className="text-4xl font-semibold">Your Account Details: </h1>
              <br />
              <p className="font-medium">
                Email:&nbsp;&nbsp;&nbsp;
                <span className="bg-slate-200 rounded px-2 py-1 break-words font-mono">{Email}</span>
              </p>
              <br />
              <p className="font-medium">
                Password:&nbsp;&nbsp;&nbsp;
                <span className="bg-slate-200 rounded px-2 py-1 font-mono">********</span>
              </p>
              <div className="flex justify-center">
                <button
                  className="bg-yellow-300 text-center rounded-md px-2 py-1 absolute bottom-3"
                  onClick={handleClick}
                >
                  Forget Password
                </button>
              </div>
              <ToastContainer containerId={"forgetPassword"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
