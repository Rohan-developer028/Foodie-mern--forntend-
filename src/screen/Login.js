import React ,{useEffect, useState} from "react";
import { Link,useNavigate } from "react-router-dom";

export default function Login(){
const navigate=useNavigate()
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
const[err,setErr]=useState("")
useEffect(
    ()=>{
        const auth=localStorage.getItem('user')
        if(auth)
        {
            navigate('/')
        }
    }
)
 const  loginUser=async()=>{
   

    
    console.log(password)
    let result=await fetch("http://localhost:5000/login",{
        method:'post',
        body:JSON.stringify({email,password}),
        headers:{
            "Content-Type":"application/json"
        }
    })
    result=await result.json()
    
   console.log(result)
   
   

     if(result.err||result.errors)
    {
        if (result.err){
            setErr(result.err)
        }
        else if( result.errors[0].msg){
            setErr(result.errors[0].msg)
        }  
        else{
            alert("invalid user ")
        }  
        return

    }
    else
    {
       if(result.userlog.name){
        navigate("/")
        localStorage.setItem("token",JSON.stringify(result.authtoken))
        localStorage.setItem("user",JSON.stringify(result.userlog))
        localStorage.setItem("userEmail",email)
       }
       else{
        alert("invalid user")
       }
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
                        <img className="d-block w-100" style={{height:'100px',width:'100px',objectFit:'cover'}} src="https://source.unsplash.com/random/300×300/?welcome" alt="First slide" />
                    
                        </div>
                        <h3 className="mb-5 text-center heading">We are Foddie</h3>

                        <h6 className="msg-info">Please login to your account</h6>

                        <div className="form-group">
                            <label className="form-control-label text-muted">Username</label>
                            <input type="text" value={email}  onChange={(e)=>{setEmail(e.target.value)}} name="email" placeholder=" email id" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label className="form-control-label text-muted">Password</label>
                            <input type="password" value={password}  onChange={(e=>{setPassword(e.target.value)})}  placeholder="Password" className="form-control" />
                        </div>
                        <div style={{background:"crimson"}}>
                            <span>{err}</span>
                        </div>

                        <div>
                            <Link to='/forgot'>forgot password ?</Link>
                        </div>



                        <div className="row justify-content-center my-3 px-3">
                            <button className="btn-block btn-color" onClick={loginUser}>Login to Foodie</button>
                        </div>

                       
                    </div>
                </div>
                <div className="bottom text-center mb-5">
                    <p  className="sm-text mx-auto mb-3">Don't have an account?<Link className="btn btn-white ml-2" to='/signup'>Create new </Link></p>
                </div>
            </div>
            <div className="card card2">
                <div className="my-auto mx-md-5 px-md-5 right">
                    <h3 className="text-white">"Savor the Season: Embracing Spring's Bounty in Your Kitchen"</h3>
                    <small className="text-white">As we bid farewell to the dreary days of winter and embrace the renewal and growth of spring, let's revel in the abundance of fresh, seasonal ingredients that nature provides. Whether you're whipping up light and lively salads, experimenting with seasonal delights, or infusing your dishes with the vibrant flavors of fresh herbs, there's no shortage of ways to savor the season in your kitchen. So, roll up your sleeves, sharpen your knives, and let the culinary adventures begin!</small>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
)
}