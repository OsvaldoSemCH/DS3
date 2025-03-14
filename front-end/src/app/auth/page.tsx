"use client"
import Image from "next/image";
import {useRouter} from "next/navigation";
import React, {useState} from "react";

export default function Home()
{
    const [Name, SetName] = useState<string>("");
    const [Password, SetPassword] = useState<string>("");
    const [Show, SetShow] = useState<boolean>(false);
    const Router = useRouter()

    function RegisterAndLogin()
    {
        if(Password == "" || Name == "")
        {
            return;
        }
        fetch
        (
            "http://localhost:8080/register",
            {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({name: Name, password: Password})
            }
        ).then(res => res.json())
        .then(data => console.log(data.message))
        .catch(err => console.log(err))
        Login()
    }

    function Login()
    {
        if(Password == "" || Name == "")
        {
            return;
        }
        fetch
        (
            "http://localhost:8080/login",
            {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({name: Name, password: Password})
            }
        ).then(res => res.json())
        .then(data =>
        {
            console.log(data.message)
            if(data.token !== undefined)
            {
                localStorage.setItem("token", data.token);
                Router.push("/home")
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            {Show &&
            <div className="bg-[#80808080] fixed top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="border border-slate-600 rounded-xl w-96 h-72 bg-blue-400 flex flex-col justify-center items-center gap-4">
                    <p>Name</p>
                    <input className="bg-gray-100 rounded-md border border-gray-300 text-black text-center" onChange={e => SetName(e.target.value)} value={Name}></input>
                    <p>Password</p>
                    <input className="bg-gray-100 rounded-md border border-gray-300 text-black text-center" onChange={e => SetPassword(e.target.value)} value={Password}></input>
                    <button className="border border-white bg-blue-500 rounded-md px-2" onClick={() => RegisterAndLogin()}>Submit</button>
                    <button className="border border-white bg-blue-500 rounded-md px-2" onClick={() => SetShow(false)}>Return</button>
                </div>
            </div>
            }
            <div className="border border-slate-600 rounded-xl w-96 h-72 bg-blue-400 flex flex-col justify-center items-center gap-4">
                <p>Name</p>
                <input className="bg-gray-100 rounded-md border border-gray-300 text-black text-center" onChange={e => SetName(e.target.value)} value={Name}></input>
                <p>Password</p>
                <input className="bg-gray-100 rounded-md border border-gray-300 text-black text-center" onChange={e => SetPassword(e.target.value)} value={Password}></input>
                <button className="border border-white bg-blue-500 rounded-md px-2" onClick={() => Login()}>Login</button>
                <button className="border border-white bg-blue-500 rounded-md px-2" onClick={() => SetShow(true)}>Register</button>
            </div>
        </>
    );
}
