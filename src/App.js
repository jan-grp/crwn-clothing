import { Routes, Route } from 'react-router-dom'
import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from 'react-redux';

// redux actions
import { checkUserSession } from './store/user/user.action'

// styles
import { GlobalStyle } from './global.styles'

// components
import Spinner from './components/spinner/spinner';
const Checkout = lazy(() => import('./routes/checkout/checkout.component'))// import Checkout from './routes/checkout/checkout.component';
const Shop = lazy(() => import('./routes/shop/shop.component')) // import Shop from './routes/shop/shop.component'
const Navigation = lazy(() => import('./routes/navigation/navigation.component')) // import Navigation from './routes/navigation/navigation.component'
const Home = lazy(() => import("./routes/home/home.component")) // import Home from './routes/home/home.component';
const Authentication = lazy(() => import('./routes/authentication/authentication.component')) // import Authentication from './routes/authentication/authentication.component';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='authentication' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
