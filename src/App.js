
import './App.css';
import Home from './screen/Home';
import Login from './screen/Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import'../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import'../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screen/Singnup';
import { CartProvider } from './component/contxred';
import Cart from './screen/Cart';
import Myorder from './screen/Myorder.js';
import Forgotpass from './component/Forgotpass.js';
function App() {
  return (
    <BrowserRouter>
      <CartProvider>

    <div>
      <Routes>
        <Route path='/' element={<Home />}  />
        <Route path='/login'element={ <Login />} />
        <Route path='/signup' element={ < Signup />}/>
        <Route path='/mycart' element={ <Cart />} />
        <Route path='/Myorder' element={ < Myorder /> } />
        <Route path='/forgot' element={ <Forgotpass /> }  />
      </Routes>
    </div>
    </CartProvider>
    </BrowserRouter>
    
  );
}

export default App;
