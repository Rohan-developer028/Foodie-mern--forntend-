import React, { useState } from "react";
import {useNavigate  } from "react-router-dom";

export default function Forgotpass(){
    let navigate=useNavigate()
    const [email,setEmail]=useState("")
    const[err,setError]=useState("")
    const[password,setPassword]=useState("")
    const handleforgot=async()=>{
        let res=await fetch("http://localhost:5000/forgot",{
method:'post',
headers:{
    'Content-Type':'application/json'
},
body:JSON.stringify({email,password})
        })
       let data=await res.json()
        console.log(data.errors)
        if(data.success==true){
            console.log(res)

            console.log("tes")
 navigate("/login")
        }
        else if(data.success==false){
            setError("email not found")
        }
        else if(data.errors[0].msg)
            {
                setError(data.errors[0].msg)
            }
    }
    return(
        <div>
        <div className="container px-4 py-5 mx-auto">
    <div className="card card0">
        <div className="d-flex flex-lg-row flex-column-reverse">
            <div className="card card1">
                <div className="row justify-content-center my-auto">
                    <div className="col-md-8 col-10 my-5">
                        <div className="row justify-content-center px-3 mb-3">
                            <img id="logo" src="https://i.imgur.com/PSXxjNY.png" />
                        </div>
                        <h3 className="mb-5 text-center heading">We are Foodie</h3>


                        <div className="form-group">
                            <label className="form-control-label">Email</label>
                            <input type="email"  value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email id" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="form-control-label text-muted">Enter new password</label>
                            <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} placeholder=" New Password" className="form-control" />
                        </div>

                       
                        {err && (
                <div className="h-300 w-300" style={{  background: "crimson",padding:"10px",marginTop:"3px" }}>
                    <span>{err}</span>
                </div>
            )}


                        <div className="row justify-content-center my-3 px-3">
                            <button className="btn-block btn-color" onClick={handleforgot} >submit</button>
                        </div>
                        </div>
                        <sapn>
                            
                        </sapn>
                        </div>

                        </div>
                        <div className="card card2">
                <div className="my-auto mx-md-5 px-md-5 right">
                    <h3 className="text-white"> "Savor the Season: Embracing Spring's Bounty in Your Kitchen"</h3>
                    <small className="text-white">As we bid farewell to the dreary days of winter and embrace the renewal and growth of spring, let's revel in the abundance of fresh, seasonal ingredients that nature provides. Whether you're whipping up light and lively salads, experimenting with seasonal delights, or infusing your dishes with the vibrant flavors of fresh herbs, there's no shortage of ways to savor the season in your kitchen. So, roll up your sleeves, sharpen your knives, and let the culinary adventures begin!</small>
                </div>
            </div>
                        </div>
                        </div>
                        </div>
                        </div>



    )
}