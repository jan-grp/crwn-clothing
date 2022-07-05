import { Routes, Route } from 'react-router-dom'

// styles

// components
import Navigation from './routes/navigation/navigation.component.jsx'
import Home from './routes/home/home.component';
import Shop from './routes/shop/shop.component.jsx'
import Authentication from './routes/authentication/authentication.component.jsx';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/authentication" element={<Authentication />} />
      </Route>    
    </Routes>
  );
}

export default App;
