import React ,{useEffect,useState}from "react";
import {Link} from 'react-router-dom'
import Nav from "../component/Nav";
import Card from "../component/Card";
import Footer from "../component/Footer";


export default function Home(){
  const [search,setSearch]=useState("")
  const[foodCat,setfoodCat]=useState([])
  const[foodItem,setfoodItem]=useState([])
  const loadData= async()=>{
    let response=await fetch("http://localhost:5000/displaydata",{
      method:'post',
    headers:{
        "Conten-Type":"application/json"
      }
    })
    response=await response.json()
    setfoodItem(response[0])
    setfoodCat(response[1])
  }
  useEffect(()=>{
    loadData()
  },[])
    return(
        <div>
           <div> <Nav /> </div> 
         <div>   <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-caption" >
                
            </div>
                <div className="carousel-inner">
                <div className="d-flex mt-1 pb-10 bg-success mb-1 justify-content-center " style={{ zIndex: "20",width:'70%' }} >
                    <input className="form-control me-2 " type="search" placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)} aria-label="Search" />
                {/*    <button className="btn btn-outline-success text-white" type="submit">Search</button> */}
                </div>
                    <div className="carousel-item active" >
                        <img className="d-block w-100" style={{height:'500px',width:'600px',objectFit:'cover'}} src="https://source.unsplash.com/random/300×300/?burger" alt="First slide" />
                    </div>
                    <div className="carousel-item" style={{filter:"brightness(30%)"}}>
                        <img className="d-block w-100" src="https://source.unsplash.com/random/300×300/?momos" alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="https://source.unsplash.com/random/300×300/?burger" alt="Third slide" />
                    </div>
                </div>
                <Link className="carousel-control-prev" to="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </Link>
                <Link className="carousel-control-next" to="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </Link>

            </div>
             </div   >
            
         
           <div className="container "> 
           {
            foodCat !== null?
            foodCat.map((data )=>{
              return(<div key={data._id} className="row mbx-3 
              ">
                <div  className="fs-1 m-3"> {data.CategoryName} </div>
                <hr/>
                { 
                
                foodItem !== null ?
                foodItem.filter((item)=>(item.CategoryName === data.CategoryName)&&(item.name.toLowerCase().includes(search.toLowerCase()) ))
                .map((filteritems)=>{
                  return(
                    <div key={filteritems._id} className="col-12 col-md-6 col-lg-3">
                      {console.warn(filteritems)}
                      <Card 
                      
                      foodItem={filteritems}
                    
                      options={filteritems.options[0]}
                      
        
                      />
                    </div>
                  )
                })
                :<div> nothing is there</div>
              }
                </div>
              )
            }):
            <div> <h6>isEmpty </h6></div>

           }
          
           
           </div>
           
           <div> <Footer /> </div>
         
        </div>
    )
}
