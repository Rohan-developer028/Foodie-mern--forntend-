import React, { useEffect, useState,useRef } from "react";
import { useDispatchCart,useCart } from "./contxred";
import { useNavigate } from "react-router-dom";
export default function Card(props)
{
   let dispatch=useDispatchCart()
   let option=props.options
   let priceRef=useRef()
   let priceOption = Object.keys(option)
   const[qty,setQty]=useState(1)
   const [size,setSize]=useState("")
   const [err,setError]=useState("")
   let data=useCart()
   let navigate=useNavigate()
useEffect(()=>{
   setSize(priceRef.current.value)
   
},[])
   const handleAddtoCart=async()=>{
      const auth=localStorage.getItem("token")
if(auth!==null){
      let food=[]
      console.log(food)
      for(const item of data){
         console.log(item)
         console.log(props.foodItem._id)
         if(item.id===props.foodItem._id)
            {
               food=item
               console.log()
               break;

            }
      }
      if(food !== null)
         {
            if(food.size===size){
               console.log(props.foodItem._id)
               await dispatch({type:"UPDATE",id:props.foodItem._id,price:finalPrice,qty:qty})
               console.warn("i am in size match")
               return
            }
            else if(food.size!==size)
               {
                  await dispatch({type:"ADD",id:props.foodItem._id,img:props.foodItem.img,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
                  return
               }
         }
  await dispatch({type:"ADD",id:props.foodItem._id,img:props.foodItem.img,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
      }
      else{
         
         setError(true)
         navigate("/login")
         
      }
   }
const finalPrice=qty*parseInt(option[size])
    return(
        <div>
         {
            err && (
               <div className="container "  style={{height:"500",width:"450",background:"light green"}}> please login</div>

            )
         }
           <div className="card mt-3 p-10" style={{"width": "18rem","maxHeight":"360px"}} >
  <img src={props.foodItem.img} className="card-img-top  " alt={props.foodItem.name}style={{height:"150px",objectFit:"fill"}} />
  <div className="card-body">
    <h5 className="card-title">{props.foodItem.name} </h5>
   <div className="conatiner w-100">
    <select className=" m-2  rounded bg-success" onChange={(e)=>setQty(e.target.value)}>
        {
           Array.from( Array(6), (e,i)=>{
            return(
             <option key={i+1} value={i+1}> {i+1} </option>
            )
           } )
        } 
    </select>
 <select className='m-2 rounded bg-success' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
    { 
      priceOption.map((data , index)=>(
         
            
               <option key={index} value={data}> {data}</option>
      
            )
         
      )
    }

 </select>
 <div className=" d-inline  h-100 fs-5 " >
 ₹{finalPrice}/-
   </div>
   </div>
  
  </div>
  <hr></hr>
  <div className="btn btn-success justify-center  rounded  mb-3" onClick={handleAddtoCart}>Add to cart</div>
</div>
</div>
           
    )
}