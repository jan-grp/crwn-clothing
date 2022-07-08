import { Routes, Route } from 'react-router-dom'
import { useEffect } from "react";
import { useDispatch } from 'react-redux';

// utils
import { 
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  // getCategoriesAndDocuments
} from './utils/firebase/firebase.utils'

// components
import Navigation from './routes/navigation/navigation.component.jsx'
import Home from './routes/home/home.component';
import Shop from './routes/shop/shop.component.jsx'
import Authentication from './routes/authentication/authentication.component.jsx';
import Checkout from './routes/checkout/checkout.component.jsx';

// redux actions
import { setCurrentUser } from './store/user/user.action'
// import { setCategories } from './store/categories/categories.action'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

//   useEffect(() => {
//     console.log("effect is running in shop")
//     const getCategories = async () => {
//         const categories = await getCategoriesAndDocuments('categories');
//         dispatch(setCategories(categories));
//     };

//     getCategories();
// }, [dispatch]);

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
