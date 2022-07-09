import { Routes, Route } from 'react-router-dom'
import { useEffect } from "react";
import { useDispatch } from 'react-redux';

// components
import Navigation from './routes/navigation/navigation.component.jsx'
import Home from './routes/home/home.component';
import Shop from './routes/shop/shop.component.jsx'
import Authentication from './routes/authentication/authentication.component.jsx';
import Checkout from './routes/checkout/checkout.component.jsx';

// redux actions
import { checkUserSession } from './store/user/user.action'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='authentication' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
