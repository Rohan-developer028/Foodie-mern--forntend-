

import React, { useEffect, useState } from "react";
import Nav from "../component/Nav";
import Footer from "../component/Footer";

export default function Myorder() {
    const [myorderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            let email = localStorage.getItem("userEmail");
            let res = await fetch("http://localhost:5000/myorder", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`

                },
                body: JSON.stringify({ email: email })
            });

            if (res.ok) {
                let response = await res.json();
                console.log(response)
                setOrderData(response);
            } else {
                console.error("Failed to fetch orders");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);
    //                 myorderData ? Array(myorderData).map((data) => {

    return (
        <>
            <div>
                <Nav />
            </div>

            <div className="container">
                {myorderData ? Array(myorderData).map((order, index) => (
                    <div key={index}>
                        {order.orderData ? (
                            order.orderData.Order_data.map((item, itemIndex) => (
                                <div key={itemIndex}>
                                    {item.map((product, productIndex) => (
                                        <div key={productIndex}>
                                            {product.Order_date ? (
                                                <div className="m-auto mt-5" key={productIndex}>
                                                    <span className="form-control-label text-muted fs-2">  Date:-{product.Order_date} </span>
                                                    <hr />
                                                </div>
                                            ) : (
                                                <div className="col-12 mt-3" key={productIndex}>
                                                    <div className="card col-sm-6 col-md-4">
                                                        <div className="card-horizontal">
                                                            <div className="img-square-wrapper">
                                                                <img className="" src={product.img} style={{ height: "130px", width: "150px", objectFit: "cover" }} alt="Card cap" />
                                                            </div>
                                                            <div className="card-body">
                                                                <h4 className="card-title">{product.name}</h4>
                                                                <div className="container w-100 p-0">
                                                                    <span>Quantity:-{product.qty}  </span>
                                                                <div></div>
                                                                    <span>  Size:-{product.size}</span>
                                                                </div>
                                                                <div> ₹{product.price}/-</div>
                                                            </div>
                                                        </div>
                                                        <div className="card-footer">
                                                            <small className="text-muted"></small>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <p>No order data found.</p>
                        )}
                    </div>
                )

                )
                    : <p> no order</p>
                }
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}

