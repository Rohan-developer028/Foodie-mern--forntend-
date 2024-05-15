import  React, { useEffect } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { useState } from 'react'
export default function Signup (){
  const [name,setName]=useState("")
  const[email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const[location,setLoaction]=useState("")
  //const auth=localStorage.getItem('user')
 const navigte=useNavigate()
 useEffect(()=>{
  const auth=localStorage.getItem('user')
  if(auth)
  {
    navigte("/")
  }
 })
  const collectData=async()=>{

    
    console.log(name)
    let result=await fetch("http://localhost:5000/signup",{
      method:'POST',
      body:JSON.stringify({email,name,password,location}),
      headers:{
        'Content-Type':'application/json'
  }
    })
    //result for signup
     result= await result.json()
 
   if(result.result.name){
   navigte("/")
    
      localStorage.setItem("token",JSON.stringify(result.authtoken))
      localStorage.setItem("user",JSON.stringify(result.result))
     

   }
     else{
     alert("not  valid")
  }
  }
return(
    <div className='justify-content-center  align-items-center d-flex b-2 ' style={{margin:"100px"}}>
        <form className='  bg-light border-10-dark ' style={{width:"400px",paddingInline:"50px"}}  >

  <div className="mb-3   ">
  <label    className="form-label"  >Name</label>
    <div>
    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className=" form-control w-300 " id="exampl"    />
    </div>
    <label  className="form-label"  >Email address </label>
    <div>
    <input type="email"  value={email} onChange={(e)=>setEmail(e.target.value)} className=" form-control w-300 " id="exampleInputEmail1"    />
    </div>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <label    className="form-label"  >Adderss</label>
    <div>
    <input type="text" value={location} onChange={(e)=>setLoaction(e.target.value)} className=" form-control w-300 " id="example"    />
    </div>
  <div className="mb-3">

    <label  className="form-label "   >Password</label>
    <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} style={{width:"300px"}} className="form-control " id="exampleInputPassword1" />
  </div>
  
  <button type='button' onClick={collectData} className="btn btn-success m-3 ">Submit</button>
  
 <Link to='/login' className="btn btn-danger m-3" >   Already a User  </Link>
</form>
    </div>
)
}