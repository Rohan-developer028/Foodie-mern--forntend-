import React, { createContext, useContext, useReducer } from 'react';


const CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state, action) => {
switch(action.type){
    case "ADD":
      console.warn(action.price)

        return[...state,{id:action.id,name:action.name,price:action.price,img:action.img,size:action.size,qty:action.qty}]
       case"REMOVE":
       let newArr=[...state]
       newArr.splice(action.index,1)
       console.warn(action.index)
       console.warn(newArr.length)
       return newArr
 case"UPDATE":
     let arr= [...state]
     arr.find((food,index)=>{
      console.log(index)

      if(food.id==action.id)
        {
    
          arr[index]={...food,qty:parseInt(action.qty)+food.qty,price:parseInt(action.price)+food.price}
        }
        
     })
        return arr
    
     case "DROP":
      console.log("in drop")
      let empArr=[]
      return empArr

        default :
        console.log("error in reducer")
}
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
