import React from 'react'

import { useCart, useDispatchCart } from '../component/contxred';

export default function Cart() {
  let data = useCart()
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  const  handleCheckout= async()=>{
    const setemail=localStorage.getItem("userEmail")
    let response=await fetch("http://localhost:5000/orderdata",{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },

      body:JSON.stringify({
        email:setemail,
        order_data:data,
        order_date: new Date().toDateString()
      })
    })
    console.log(response)
    if(response.status===200){
      console.log("drop")
      dispatch({type:"DROP"})

    }
  }
 
  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {
      console.log(data.length)
      
      }
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4' >
            <tr>
              <th scope='col' > # </th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"> <img src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"  style={{height:"25px",width:"30px",objectFit:'fill'}} alt='delte'onClick={()=>dispatch({type:"REMOVE",index:index})} />  </button> </td></tr>
                
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckout} > Check Out </button>
        </div>
      </div>



    </div>
  )
}