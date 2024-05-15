import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../modal'
import Cart from '../screen/Cart'
import { useCart } from './contxred'
export default function Nav(){
  let data=useCart()
  const[cartView,setCaerView]=useState("")
  const navigate=useNavigate()
  const handleLogin=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
        localStorage.removeItem("userEmail")
        console.warn(typeof(data))
        

    navigate("/login")
  }
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-success" >
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">Foodie</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto  fs-5">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
        </li>
       
        {
          (localStorage.getItem("token"))?
          <li className="nav-item">
          <Link className="nav-link fs-5 " to='/myorder'>My Order's</Link>
        </li>:""
        }
        
        
      </ul>
      { (!localStorage.getItem("token"))?
      <div className='d-flex'>
         
    
          <Link className="btn bg-white fs-5 mx-3" to="/login">Login</Link>
       
          <Link className="btn bg-white fs-5 mx-3 " to="/signup">Signup</Link>
        
      </div>
      :
      <div className='d-flex me-5'>
      <div className='d-flex  '>
        <div className='btn bg-white text-success fs-5' onClick={(e)=>setCaerView(true)} >My cart 
        <Badge pill bg="danger" >{data.length}</Badge>

        </div>
        {
cartView?<Modal onClose={(e)=>setCaerView(false)}>  < Cart /> </Modal>:null 
        }
        </div>
        
        <div className='d-flex mx-3 '>
        <button  className='btn bg-white text-success fs-5' onClick={handleLogin} > Logout</button>
        </div>
        </div>
}
    </div>
  </div>
</nav>
    )
}